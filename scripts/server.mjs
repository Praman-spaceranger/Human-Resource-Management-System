/**
 * Dayflow / HRMitra — HRMS Backend API Server
 *
 * Single-source-of-truth JSON database with real business logic:
 *  - Authentication (password-verified login, signup, password reset)
 *  - Attendance (validated punches, auto-derived attendance records, live status)
 *  - Leave workflow (balance + overlap validation, approval side effects)
 *  - Expenses / Shift requests (approval workflow + notifications)
 *  - Payroll engine (salary computation from structures, slip generation)
 *  - Recruitment (openings, applicants, interviews), Onboarding, Announcements
 *  - Reports & computed dashboards served with every snapshot
 *
 * All mutations bump `db.rev`; clients poll GET /api/data and swap the
 * snapshot when rev changes, so HR and Employee sessions stay in sync.
 */
import { createServer } from 'node:http'
import { readFile, writeFile, rename, mkdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'

const PORT = Number(process.env.PORT || 4173)
const root = process.cwd()
const dataDir = join(root, 'data')
const dbPath = join(dataDir, 'db.json')
const tmpPath = join(dataDir, 'db.json.tmp')

// Official demo profile photos per seeded employee
const EMPLOYEE_IMAGES = {
  'EMP-001': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&auto=format&fit=crop&q=80',
  'EMP-002': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&auto=format&fit=crop&q=80',
  'EMP-003': 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=240&auto=format&fit=crop&q=80',
  'EMP-004': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80',
  'EMP-005': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80',
  'EMP-006': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80',
  'EMP-007': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=240&auto=format&fit=crop&q=80',
  'EMP-008': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=240&auto=format&fit=crop&q=80',
  'EMP-009': 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=240&auto=format&fit=crop&q=80'
}

// ============================================================================
// SMALL HELPERS
// ============================================================================

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function pad2(n) { return String(n).padStart(2, '0') }

function localDateStr(d = new Date()) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

function localDateTimeStr(d = new Date()) {
  return `${localDateStr(d)} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`
}

function addDays(dateStr, days) {
  const d = new Date(`${dateStr}T00:00:00`)
  d.setDate(d.getDate() + days)
  return localDateStr(d)
}

function monthBounds(year, monthIndex) {
  const start = `${year}-${pad2(monthIndex + 1)}-01`
  const lastDay = new Date(year, monthIndex + 1, 0).getDate()
  return { start, end: `${year}-${pad2(monthIndex + 1)}-${pad2(lastDay)}` }
}

function datesInRange(fromStr, toStr) {
  const out = []
  let cur = fromStr
  let guard = 0
  while (cur <= toStr && guard < 400) {
    out.push(cur)
    cur = addDays(cur, 1)
    guard++
  }
  return out
}

function isWeekend(dateStr) {
  const dow = new Date(`${dateStr}T00:00:00`).getDay()
  return dow === 0 || dow === 6
}

function overlaps(aFrom, aTo, bFrom, bTo) {
  return aFrom <= bTo && bFrom <= aTo
}

// ============================================================================
// DATABASE
// ============================================================================

let db = null

async function persist() {
  db.rev = (db.rev || 0) + 1
  const json = JSON.stringify(db, null, 2)
  await writeFile(tmpPath, json, 'utf8')
  await rename(tmpPath, dbPath)
}

async function loadDb() {
  if (existsSync(dbPath)) {
    try {
      db = JSON.parse(await readFile(dbPath, 'utf8'))
      migrateDb()
      return
    } catch (e) {
      console.error('db.json corrupted, reseeding:', e.message)
    }
  }
  db = buildSeed()
  await persist()
}

function migrateDb() {
  let changed = false
  const defaults = { user_role: 'Employee', base_salary: 100000 }
  const salaryByDesignation = {
    'HR Manager': 160000, 'HR Executive': 60000, 'Senior Frontend Engineer': 125000,
    'Backend Developer': 110000, 'Full Stack Engineer': 120000, 'Product Manager': 135000,
    'UI/UX Designer': 95000, 'DevOps Specialist': 115000, 'Financial Analyst': 105000
  }
  for (const e of db.employees || []) {
    if (!e.user_role) {
      e.user_role = (e.department || '').toLowerCase().includes('human resources') ? 'HR' : defaults.user_role
      changed = true
    }
    if (e.base_salary === undefined) {
      e.base_salary = salaryByDesignation[e.designation] ?? defaults.base_salary
      changed = true
    }
    // Repair broken generated photo URLs from earlier seeds
    if (EMPLOYEE_IMAGES[e.name] && e.image !== EMPLOYEE_IMAGES[e.name] &&
        (!e.image || /photo-15\d+9142\?/.test(e.image))) {
      e.image = EMPLOYEE_IMAGES[e.name]
      changed = true
    }
  }
  // Repair invalid punch sequences (duplicate IN/IN or OUT/OUT in a row)
  const repairedCheckins = repairCheckins(db.checkins || [])
  if (repairedCheckins.length !== (db.checkins || []).length) {
    db.checkins = repairedCheckins
    changed = true
  }
  if (!Array.isArray(db.notifications)) { db.notifications = []; changed = true }
  if (typeof db.leave_allocations !== 'object') { db.leave_allocations = {}; changed = true }
  for (const coll of ['attendance', 'leave_applications', 'expense_claims', 'shift_requests',
    'job_openings', 'job_applicants', 'interviews', 'onboarding_records', 'payroll_entries',
    'salary_slips', 'announcements', 'holidays', 'shift_types', 'departments', 'designations']) {
    if (!Array.isArray(db[coll])) { db[coll] = []; changed = true }
  }
  if (!db.company_name) { db.company_name = 'Dayflow Technologies'; changed = true }
  if (changed) { db.rev = (db.rev || 0) + 1 }
}

function repairCheckins(checkins) {
  const byEmp = new Map()
  for (const c of [...checkins].sort((a, b) => (a.time < b.time ? -1 : 1))) {
    if (!byEmp.has(c.employee)) byEmp.set(c.employee, [])
    const list = byEmp.get(c.employee)
    const last = list[list.length - 1]
    if (!last || last.log_type !== c.log_type) list.push(c)
  }
  const kept = []
  for (const list of byEmp.values()) kept.push(...list)
  return kept.sort((a, b) => (a.time < b.time ? 1 : -1)) // newest first like UI expects
}

function nextSeq(collection, prefix) {
  let max = 0
  for (const item of db[collection] || []) {
    const m = String(item.name || '').match(new RegExp(`^${prefix}[\\w-]*?(\\d+)$`))
    if (m) max = Math.max(max, parseInt(m[1], 10))
  }
  return max + 1
}

function nextEmployeeNumber() {
  let max = 0
  for (const e of db.employees) {
    const m = String(e.name || '').match(/^EMP-(\d+)$/)
    if (m) max = Math.max(max, parseInt(m[1], 10))
  }
  return max + 1
}

function newEmployeeId() {
  const n = nextEmployeeNumber()
  return `EMP-${String(n).padStart(3, '0')}`
}

function generateLoginId(companyName, firstName, lastName, dateOfJoining, serialNumber) {
  const compWords = (companyName || 'Odoo India').trim().split(/\s+/)
  let compPrefix = compWords.length >= 2
    ? (compWords[0][0] + compWords[1][0]).toUpperCase()
    : ((companyName || 'OI').substring(0, 2)).toUpperCase()
  if (!compPrefix || compPrefix.length < 2) compPrefix = 'OI'
  const fn2 = (((firstName || 'Employee').replace(/[^a-zA-Z]/g, '')) + 'XX').substring(0, 2).toUpperCase()
  const ln2 = (((lastName || 'User').replace(/[^a-zA-Z]/g, '')) + 'XX').substring(0, 2).toUpperCase()
  let year = new Date().getFullYear()
  if (dateOfJoining) {
    const parsed = new Date(dateOfJoining)
    if (!isNaN(parsed)) year = parsed.getFullYear()
  }
  return `${compPrefix}${fn2}${ln2}${year}${String(serialNumber || 1).padStart(4, '0')}`
}

function addNotification(user, text, type) {
  const id = (db.notifications || []).reduce((m, n) => Math.max(m, n.id || 0), 0) + 1
  db.notifications.unshift({
    id, user, text, type,
    creation: localDateTimeStr().substring(0, 16),
    read: 0
  })
}

function notifyHR(text, type) {
  const hrUsers = db.employees.filter(e => e.user_role === 'HR' && e.status === 'Active')
  const targets = hrUsers.length ? hrUsers : db.employees.slice(0, 1)
  for (const hr of targets) addNotification(hr.name, text, type)
}

// ============================================================================
// BUSINESS RULES — ATTENDANCE
// ============================================================================

function getShift(name) {
  return db.shift_types.find(s => s.name === name) || db.shift_types[0] || { name: 'General Shift', start_time: '09:30:00', end_time: '18:30:00' }
}

function isHoliday(dateStr) {
  return db.holidays.some(h => h.holiday_date === dateStr)
}

function isWorkingDate(dateStr) {
  return !isWeekend(dateStr) && !isHoliday(dateStr)
}

function todaysPunches(empId, todayStr = localDateStr()) {
  return (db.checkins || [])
    .filter(c => c.employee === empId && String(c.time).startsWith(todayStr))
    .sort((a, b) => (a.time < b.time ? -1 : 1))
}

function minutesBetween(timeA, timeB) {
  const a = new Date(timeA.replace(' ', 'T'))
  const b = new Date(timeB.replace(' ', 'T'))
  return Math.max(0, Math.round((b - a) / 60000))
}

function workingMinutesFromPunches(punches, nowStr = localDateTimeStr()) {
  let total = 0
  let openIn = null
  for (const p of punches) {
    if (p.log_type === 'IN') openIn = p.time
    else if (p.log_type === 'OUT' && openIn) {
      total += minutesBetween(openIn, p.time)
      openIn = null
    }
  }
  if (openIn) total += minutesBetween(openIn, nowStr)
  return total
}

function approvedLeaveOn(empId, dateStr) {
  return (db.leave_applications || []).find(l =>
    l.employee === empId && l.status === 'Approved' && l.from_date <= dateStr && l.to_date >= dateStr)
}

function upsertAttendance(empId, dateStr, patch) {
  const emp = db.employees.find(e => e.name === empId)
  let rec = (db.attendance || []).find(a => a.employee === empId && a.attendance_date === dateStr)
  if (!rec) {
    rec = {
      name: `ATT-${nextSeq('attendance', 'ATT-')}`,
      employee: empId,
      employee_name: emp ? emp.employee_name : empId,
      attendance_date: dateStr,
      status: 'Present', working_hours: 0, late_entry: 0, early_exit: 0, in_time: null, out_time: null
    }
    db.attendance.unshift(rec)
  }
  Object.assign(rec, patch)
  return rec
}

function syncAttendanceFromPunches(empId, dateStr) {
  const emp = db.employees.find(e => e.name === empId)
  if (!emp) return
  const punches = todaysPunches(empId, dateStr)
  if (punches.length === 0) return
  const shift = getShift(emp.shift)
  const ins = punches.filter(p => p.log_type === 'IN')
  const outs = punches.filter(p => p.log_type === 'OUT')
  const firstIn = ins[0]?.time || null
  const lastOut = outs.length ? outs[outs.length - 1].time : null
  const minutes = workingMinutesFromPunches(punches)
  const late = firstIn ? String(firstIn).split(' ')[1] > shift.start_time : false
  const early = lastOut ? String(lastOut).split(' ')[1] < shift.end_time : false
  const onLeave = approvedLeaveOn(empId, dateStr)
  upsertAttendance(empId, dateStr, {
    status: onLeave && punches.length === 0 ? 'On Leave' : 'Present',
    in_time: firstIn ? String(firstIn).split(' ')[1].substring(0, 5) : null,
    out_time: lastOut ? String(lastOut).split(' ')[1].substring(0, 5) : null,
    working_hours: Math.round((minutes / 60) * 10) / 10,
    late_entry: late ? 1 : 0,
    early_exit: early ? 1 : 0
  })
}

function getLiveAttendance() {
  const today = localDateStr()
  const now = localDateTimeStr()
  const map = {}
  for (const emp of db.employees) {
    if (emp.status !== 'Active') continue
    const punches = todaysPunches(emp.name, today)
    const leave = approvedLeaveOn(emp.name, today)
    let status = 'Absent', currently_in = false, first_in = null, last_in = null, last_out = null
    if (leave) {
      status = 'On Leave'
    } else if (punches.length > 0) {
      const last = punches[punches.length - 1]
      currently_in = last.log_type === 'IN'
      status = currently_in ? 'Present' : 'Checked Out'
      const ins = punches.filter(p => p.log_type === 'IN')
      const outs = punches.filter(p => p.log_type === 'OUT')
      first_in = ins.length ? String(ins[0].time).split(' ')[1].substring(0, 5) : null
      last_in = ins.length ? String(ins[ins.length - 1].time).split(' ')[1].substring(0, 5) : null
      last_out = outs.length ? String(outs[outs.length - 1].time).split(' ')[1].substring(0, 5) : null
    }
    map[emp.name] = {
      status,
      currently_in,
      first_in,
      last_in,
      last_out,
      total_minutes: workingMinutesFromPunches(punches, now),
      punch_count: punches.length,
      leave_type: leave ? leave.leave_type : null
    }
  }
  return map
}

// ============================================================================
// BUSINESS RULES — LEAVE BALANCES
// ============================================================================

function leaveBalances() {
  const consumed = {}
  for (const l of db.leave_applications || []) {
    if (l.status !== 'Approved') continue
    consumed[l.employee] = consumed[l.employee] || {}
    consumed[l.employee][l.leave_type] = (consumed[l.employee][l.leave_type] || 0) + (Number(l.total_leave_days) || 0)
  }
  const out = {}
  for (const [empId, allocs] of Object.entries(db.leave_allocations || {})) {
    out[empId] = {}
    for (const [type, allocated] of Object.entries(allocs)) {
      const used = consumed[empId]?.[type] || 0
      out[empId][type] = { allocated, consumed: used, remaining: Math.max(0, allocated - used) }
    }
  }
  return out
}

// ============================================================================
// BUSINESS RULES — PAYROLL ENGINE
// ============================================================================

function computeSlip(emp, year, monthIndex) {
  const base = Number(emp.base_salary) || 100000
  const basic = Math.round(base * 0.5)
  const hra = Math.round(base * 0.2)
  const special = base - basic - hra
  const gross = basic + hra + special

  const { start, end } = monthBounds(year, monthIndex)
  const workingDays = datesInRange(start, end).filter(isWorkingDate).length

  const absentDays = (db.attendance || []).filter(a =>
    a.employee === emp.name && a.status === 'Absent' && a.attendance_date >= start && a.attendance_date <= end).length
  let unpaidDays = 0
  for (const l of db.leave_applications || []) {
    if (l.employee !== emp.name || l.status !== 'Approved' || l.leave_type !== 'Leave Without Pay') continue
    unpaidDays += datesInRange(l.from_date, l.to_date).filter(d => d >= start && d <= end && isWorkingDate(d)).length
  }
  const lopDays = Math.min(absentDays + unpaidDays, workingDays)
  const lopAmount = workingDays > 0 && lopDays > 0 ? Math.round((gross / workingDays) * lopDays) : 0

  const pf = Math.round(basic * 0.12)
  const pt = 200
  const tds = Math.round(gross * 0.10)

  const earnings = [
    { salary_component: 'Basic Salary', amount: basic },
    { salary_component: 'House Rent Allowance (HRA)', amount: hra },
    { salary_component: 'Special Allowance', amount: special }
  ]
  const deductions = [
    { salary_component: 'Provident Fund (PF)', amount: pf },
    { salary_component: 'Professional Tax (PT)', amount: pt },
    { salary_component: 'Income Tax (TDS)', amount: tds }
  ]
  if (lopAmount > 0) deductions.push({ salary_component: 'Loss of Pay (LOP)', amount: lopAmount })

  const totalDeduction = deductions.reduce((s, d) => s + d.amount, 0)
  return {
    gross_pay: gross,
    total_deduction: totalDeduction,
    net_pay: gross - totalDeduction,
    earnings,
    deductions,
    payment_days: workingDays - lopDays,
    working_days: workingDays,
    lop_days: lopDays
  }
}

// ============================================================================
// SEED (dynamically anchored to today so the demo always looks live)
// ============================================================================

function buildSeed() {
  const today = localDateStr()
  const now = new Date()
  const year = now.getFullYear()
  const monthIndex = now.getMonth()
  const { start: monthStart, end: monthEnd } = monthBounds(year, monthIndex)
  const companyName = 'Dayflow Technologies'

  const employees = [
    ['EMP-001', 'Aditi', 'Sharma', 'Female', '1992-04-15', '2022-01-10', 'Human Resources', 'HR Manager', 'HR', 160000, 'hr@dayflow.local', 'aditi.sharma92@gmail.com', '+91 98765 43210', 'General Shift', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&auto=format&fit=crop&q=80'],
    ['EMP-002', 'Nisha', 'Verma', 'Female', '1995-08-22', '2023-03-01', 'Engineering', 'Senior Frontend Engineer', 'Employee', 125000, 'nisha@dayflow.local', 'nisha.verma@example.com', '+91 98111 22334', 'General Shift', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&auto=format&fit=crop&q=80'],
    ['EMP-003', 'Kabir', 'Mehta', 'Male', '1994-11-12', '2023-06-15', 'Engineering', 'Backend Developer', 'Employee', 110000, 'kabir@dayflow.local', 'kabir.mehta@example.com', '+91 97234 56789', 'Morning Shift', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=240&auto=format&fit=crop&q=80'],
    ['EMP-004', 'Rohan', 'Deshmukh', 'Male', '1996-02-18', '2023-09-01', 'Product', 'Product Manager', 'Employee', 135000, 'rohan@dayflow.local', 'rohan.deshmukh@example.com', '+91 96321 09876', 'General Shift', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80'],
    ['EMP-005', 'Pooja', 'Nair', 'Female', '1997-06-25', '2024-01-08', 'Design', 'UI/UX Designer', 'Employee', 95000, 'pooja@dayflow.local', 'pooja.nair@example.com', '+91 99887 76655', 'General Shift', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80'],
    ['EMP-006', 'Vikram', 'Malhotra', 'Male', '1993-03-30', '2023-11-20', 'Engineering', 'DevOps Specialist', 'Employee', 115000, 'vikram@dayflow.local', 'vikram.m@example.com', '+91 98123 45678', 'Morning Shift', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80'],
    ['EMP-007', 'Priya', 'Sengupta', 'Female', '1998-09-12', '2024-04-02', 'Human Resources', 'HR Executive', 'HR', 60000, 'priya@dayflow.local', 'priya.s@example.com', '+91 97654 32109', 'General Shift', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=240&auto=format&fit=crop&q=80'],
    ['EMP-008', 'Arjun', 'Kapoor', 'Male', '1995-12-05', '2024-02-19', 'Engineering', 'Full Stack Engineer', 'Employee', 120000, 'arjun@dayflow.local', 'arjun.k@example.com', '+91 96543 21098', 'General Shift', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=240&auto=format&fit=crop&q=80'],
    ['EMP-009', 'Sunita', 'Rao', 'Female', '1991-07-08', '2023-08-14', 'Finance', 'Financial Analyst', 'Employee', 105000, 'sunita@dayflow.local', 'sunita.rao@example.com', '+91 95432 10987', 'General Shift']
  ].map(([name, fn, ln, gender, dob, doj, dept, desig, role, salary, cemail, pemail, phone, shift]) => ({
    name, login_id: '', password: 'Dayflow@123', employee_name: `${fn} ${ln}`, first_name: fn, last_name: ln,
    gender, date_of_birth: dob, date_of_joining: doj, status: 'Active', user_role: role, base_salary: salary,
    department: dept, designation: desig, company: companyName, company_email: cemail, personal_email: pemail,
    cell_phone: phone, reports_to: name === 'EMP-001' ? '' : 'EMP-001', leave_approver: 'EMP-001', expense_approver: 'EMP-001',
    shift, current_address: 'Bengaluru, Karnataka', permanent_address: 'India',
    emergency_phone_number: '+91 90000 00001', person_to_be_contacted: 'Family Contact', relation: 'Family',
    bank_name: 'HDFC Bank', bank_ac_no: `5010${name.substring(4)}9999`,
    image: EMPLOYEE_IMAGES[name] || ''
  }))

  for (const e of employees) {
    e.login_id = generateLoginId(companyName, e.first_name, e.last_name, e.date_of_joining, parseInt(e.name.substring(4), 10))
  }

  const leaveAllocations = {
    'EMP-001': { 'Casual Leave': 12, 'Sick Leave': 10, 'Earned Leave': 15, 'Compensatory Off': 2 },
    'EMP-002': { 'Casual Leave': 12, 'Sick Leave': 10, 'Earned Leave': 15, 'Compensatory Off': 1 },
    'EMP-003': { 'Casual Leave': 10, 'Sick Leave': 10, 'Earned Leave': 12, 'Compensatory Off': 0 },
    'EMP-004': { 'Casual Leave': 12, 'Sick Leave': 10, 'Earned Leave': 14, 'Compensatory Off': 1 },
    'EMP-005': { 'Casual Leave': 8, 'Sick Leave': 8, 'Earned Leave': 10, 'Compensatory Off': 0 },
    'EMP-006': { 'Casual Leave': 10, 'Sick Leave': 10, 'Earned Leave': 12, 'Compensatory Off': 1 },
    'EMP-007': { 'Casual Leave': 12, 'Sick Leave': 10, 'Earned Leave': 15, 'Compensatory Off': 0 },
    'EMP-008': { 'Casual Leave': 10, 'Sick Leave': 8, 'Earned Leave': 12, 'Compensatory Off': 0 },
    'EMP-009': { 'Casual Leave': 12, 'Sick Leave': 10, 'Earned Leave': 14, 'Compensatory Off': 1 }
  }

  const holidays = [
    { name: 'HOL-001', holiday_date: `${year}-08-15`, description: 'Independence Day' },
    { name: 'HOL-002', holiday_date: `${year}-10-02`, description: 'Mahatma Gandhi Jayanti' },
    { name: 'HOL-003', holiday_date: `${year}-10-20`, description: 'Dussehra / Vijayadashami' },
    { name: 'HOL-004', holiday_date: `${year}-11-08`, description: 'Diwali (Deepavali)' },
    { name: 'HOL-005', holiday_date: `${year}-12-25`, description: 'Christmas Day' }
  ]

  const isWorkDay = (d) => !isWeekend(d) && !holidays.some(h => h.holiday_date === d)

  const leaveApplications = [
    { name: 'LEAVE-2026-001', employee: 'EMP-002', employee_name: 'Nisha Verma', leave_type: 'Casual Leave', from_date: addDays(today, 3), to_date: addDays(today, 4), total_leave_days: 2, status: 'Open', description: 'Attending family celebration and personal errands.', posting_date: addDays(today, -2), leave_approver: 'EMP-001' },
    { name: 'LEAVE-2026-002', employee: 'EMP-003', employee_name: 'Kabir Mehta', leave_type: 'Casual Leave', from_date: monthStart, to_date: monthEnd, total_leave_days: datesInRange(monthStart, monthEnd).filter(isWorkDay).length, status: 'Approved', description: 'Annual paid leave and family travels.', posting_date: monthStart, leave_approver: 'EMP-001' },
    { name: 'LEAVE-2026-003', employee: 'EMP-004', employee_name: 'Rohan Deshmukh', leave_type: 'Earned Leave', from_date: addDays(today, -43), to_date: addDays(today, -39), total_leave_days: 5, status: 'Approved', description: 'Annual vacation.', posting_date: addDays(today, -52), leave_approver: 'EMP-001' },
    { name: 'LEAVE-2026-004', employee: 'EMP-005', employee_name: 'Pooja Nair', leave_type: 'Casual Leave', from_date: addDays(today, 6), to_date: addDays(today, 6), total_leave_days: 1, status: 'Open', description: 'Relocating apartment.', posting_date: addDays(today, -1), leave_approver: 'EMP-001' },
    { name: 'LEAVE-2026-005', employee: 'EMP-007', employee_name: 'Priya Sengupta', leave_type: 'Sick Leave', from_date: addDays(today, -7), to_date: addDays(today, -1), total_leave_days: datesInRange(addDays(today, -7), addDays(today, -1)).filter(isWorkDay).length, status: 'Approved', description: 'Medical recovery leave.', posting_date: addDays(today, -7), leave_approver: 'EMP-001' }
  ]

  // ---- Attendance history: current month, start -> yesterday, for everyone
  const attendance = []
  let attSeq = 1
  const leaveEmpMap = {}
  for (const l of leaveApplications) {
    if (l.status !== 'Approved') continue
    datesInRange(l.from_date, l.to_date).forEach(d => {
      if (d < today && isWorkDay(d)) {
        leaveEmpMap[`${l.employee}|${d}`] = l.leave_type
      }
    })
  }
  const employeesWithPunchToday = ['EMP-001', 'EMP-002', 'EMP-004', 'EMP-006', 'EMP-009']
  const todayInTimes = { 'EMP-001': '09:15:00', 'EMP-002': '09:32:15', 'EMP-004': '09:40:11', 'EMP-006': '08:50:00', 'EMP-009': '09:05:30' }

  for (const emp of employees) {
    for (const d of datesInRange(monthStart, addDays(today, -1))) {
      if (!isWorkDay(d)) continue
      const onLeave = leaveEmpMap[`${emp.name}|${d}`]
      if (onLeave) {
        attendance.push({ name: `ATT-${year}${pad2(monthIndex + 1)}-${String(attSeq++).padStart(3, '0')}`, employee: emp.name, employee_name: emp.employee_name, attendance_date: d, status: 'On Leave', working_hours: 0, late_entry: 0, early_exit: 0 })
        continue
      }
      const seedNum = parseInt(emp.name.substring(4), 10) + parseInt(d.substring(8), 10)
      const hours = 7.8 + (seedNum % 14) / 10
      const late = seedNum % 9 === 0 ? 1 : 0
      attendance.push({ name: `ATT-${year}${pad2(monthIndex + 1)}-${String(attSeq++).padStart(3, '0')}`, employee: emp.name, employee_name: emp.employee_name, attendance_date: d, status: 'Present', working_hours: Math.round(hours * 10) / 10, late_entry: late, early_exit: 0 })
    }
    // Today: seeded punch-ins for a subset (attendance derived the same way the punch API does)
    if (employeesWithPunchToday.includes(emp.name)) {
      attendance.push({
        name: `ATT-${year}${pad2(monthIndex + 1)}-${String(attSeq++).padStart(3, '0')}`, employee: emp.name,
        employee_name: emp.employee_name, attendance_date: today, status: 'Present',
        working_hours: 4, late_entry: 0, early_exit: 0, in_time: todayInTimes[emp.name].substring(0, 5)
      })
    }
  }

  const checkins = employeesWithPunchToday.map((empId, i) => ({
    name: `CHK-${String(i + 1).padStart(3, '0')}`, employee: empId, log_type: 'IN',
    time: `${today} ${todayInTimes[empId]}`, latitude: 12.9716, longitude: 77.5946
  })).reverse()

  // ---- Payroll history for previous two months (real computed slips)
  const payrollEntries = []
  const salarySlips = []
  for (let back = 1; back <= 2; back++) {
    const d = new Date(year, monthIndex - back, 1)
    const py = d.getFullYear(), pm = d.getMonth()
    const { start, end } = monthBounds(py, pm)
    let slipSeq = 1
    let totalNet = 0
    for (const emp of employees) {
      if (new Date(`${emp.date_of_joining}T00:00:00`) > new Date(end + 'T23:59:59')) continue
      const calc = computeSlipSeed(emp, py, pm, holidays)
      totalNet += calc.net_pay
      salarySlips.push({
        name: `SLIP-${py}-${pad2(pm + 1)}-${String(slipSeq++).padStart(3, '0')}`, employee: emp.name,
        employee_name: emp.employee_name, posting_date: end, start_date: start, end_date: end,
        gross_pay: calc.gross_pay, total_deduction: calc.total_deduction, net_pay: calc.net_pay,
        currency: 'INR', docstatus: 1, status: 'Issued',
        earnings: calc.earnings, deductions: calc.deductions
      })
    }
    payrollEntries.push({
      name: `PAY-${py}-${pad2(pm + 1)}`, posting_date: end, start_date: start, end_date: end,
      payroll_frequency: 'Monthly', company: companyName,
      number_of_employees: salarySlips.filter(s => s.start_date === start).length,
      status: 'Submitted', total_amount: totalNet
    })
  }

  return {
    rev: 1,
    company_name: companyName,
    employees,
    departments: ['Human Resources', 'Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Finance'],
    designations: ['HR Manager', 'HR Executive', 'Senior Frontend Engineer', 'Backend Developer', 'Full Stack Engineer', 'Product Manager', 'UI/UX Designer', 'DevOps Specialist', 'Financial Analyst'],
    shift_types: [
      { name: 'General Shift', start_time: '09:30:00', end_time: '18:30:00', description: 'Standard Office Shift' },
      { name: 'Morning Shift', start_time: '08:00:00', end_time: '16:30:00', description: 'Early Technical Support' },
      { name: 'Evening Shift', start_time: '14:00:00', end_time: '22:30:00', description: 'Afternoon / US Overlap' },
      { name: 'Night Shift', start_time: '22:00:00', end_time: '06:30:00', description: 'Night Infrastructure Rotation' }
    ],
    shift_requests: [
      { name: 'SR-2026-001', employee: 'EMP-002', employee_name: 'Nisha Verma', shift_type: 'Morning Shift', from_date: addDays(monthEnd, 1), to_date: addDays(monthEnd, 30), status: 'Draft', reason: 'Adjusting schedule for morning collaborative sprint sessions with EU team.' },
      { name: 'SR-2026-002', employee: 'EMP-003', employee_name: 'Kabir Mehta', shift_type: 'General Shift', from_date: monthStart, to_date: monthEnd, status: 'Approved', reason: 'Returning to core product delivery schedule.' }
    ],
    leave_allocations: leaveAllocations,
    leave_applications: leaveApplications,
    attendance,
    checkins,
    expense_claims: [
      { name: 'EXP-2026-001', employee: 'EMP-002', employee_name: 'Nisha Verma', expense_type: 'Travel', total_claimed_amount: 3450, total_sanctioned_amount: 3450, status: 'Unpaid', approval_status: 'Approved', posting_date: addDays(today, -7), description: 'Client on-site architecture workshop cab & transit fares.', expense_approver: 'EMP-001' },
      { name: 'EXP-2026-002', employee: 'EMP-002', employee_name: 'Nisha Verma', expense_type: 'Food and Beverage', total_claimed_amount: 1200, total_sanctioned_amount: 0, status: 'Draft', approval_status: 'Draft', posting_date: addDays(today, -1), description: 'Team sprint milestone celebratory dinner.', expense_approver: 'EMP-001' },
      { name: 'EXP-2026-003', employee: 'EMP-003', employee_name: 'Kabir Mehta', expense_type: 'Calls & Internet', total_claimed_amount: 1499, total_sanctioned_amount: 1499, status: 'Paid', approval_status: 'Approved', posting_date: addDays(today, -20), description: 'Monthly broadband reimbursement.', expense_approver: 'EMP-001' }
    ],
    job_openings: [
      { name: 'JOB-2026-001', job_title: 'Staff Full Stack Engineer', department: 'Engineering', designation: 'Senior Frontend Engineer', vacancies: 2, status: 'Open', posted_date: addDays(today, -21), description: 'Looking for a senior engineer with deep React, TypeScript, and distributed systems background.' },
      { name: 'JOB-2026-002', job_title: 'Senior Product Designer', department: 'Design', designation: 'UI/UX Designer', vacancies: 1, status: 'Open', posted_date: addDays(today, -17), description: 'Drive the next-generation enterprise UX design systems across web and mobile platforms.' },
      { name: 'JOB-2026-003', job_title: 'Technical Talent Recruiter', department: 'Human Resources', designation: 'HR Executive', vacancies: 1, status: 'Closed', posted_date: addDays(today, -38), description: 'Scale our engineering and AI talent acquisition across APAC.' }
    ],
    job_applicants: [
      { name: 'APP-2026-001', applicant_name: 'Varun Grover', email: 'varun.grover@devmail.io', phone: '+91 98877 66554', job_title: 'Staff Full Stack Engineer', job_opening: 'JOB-2026-001', status: 'Accepted', application_date: addDays(today, -18), source: 'LinkedIn', rating: 5, notes: 'Outstanding system design track record. Cleared executive panel.' },
      { name: 'APP-2026-002', applicant_name: 'Sneha Kulkarni', email: 'sneha.k@designer.co', phone: '+91 97766 55443', job_title: 'Senior Product Designer', job_opening: 'JOB-2026-002', status: 'Replied', application_date: addDays(today, -12), source: 'Dribbble', rating: 4, notes: 'Portfolio review passed with honors. Scheduling technical design round.' },
      { name: 'APP-2026-003', applicant_name: 'Ankit Rao', email: 'ankit.rao95@gmail.com', phone: '+91 96655 44332', job_title: 'Staff Full Stack Engineer', job_opening: 'JOB-2026-001', status: 'Open', application_date: addDays(today, -4), source: 'Referral', rating: 3, notes: 'Resume screened. Ready for initial phone screening.' },
      { name: 'APP-2026-004', applicant_name: 'Tanya Sen', email: 'tanya.sen@outlook.com', phone: '+91 95544 33221', job_title: 'Staff Full Stack Engineer', job_opening: 'JOB-2026-001', status: 'Hold', application_date: addDays(today, -10), source: 'Website', rating: 3, notes: 'Strong candidate, kept on warm hold for Q4 pipeline.' },
      { name: 'APP-2026-005', applicant_name: 'Deepak Chopra', email: 'deepak.c@tech.in', phone: '+91 94433 22110', job_title: 'Staff Full Stack Engineer', job_opening: 'JOB-2026-001', status: 'Rejected', application_date: addDays(today, -14), source: 'Naukri', rating: 2, notes: 'Experience level not meeting staff seniority requirement.' }
    ],
    interviews: [
      { name: 'INT-2026-001', applicant: 'APP-2026-002', applicant_name: 'Sneha Kulkarni', job_opening: 'JOB-2026-002', job_title: 'Senior Product Designer', scheduled_date: addDays(today, 3), from_time: '14:00', to_time: '15:00', interviewer: 'EMP-005 (Pooja Nair)', status: 'Scheduled', rating: 0, notes: 'Design System & Component architecture walkthrough.' },
      { name: 'INT-2026-002', applicant: 'APP-2026-001', applicant_name: 'Varun Grover', job_opening: 'JOB-2026-001', job_title: 'Staff Full Stack Engineer', scheduled_date: addDays(today, -8), from_time: '16:00', to_time: '17:30', interviewer: 'EMP-001 (Aditi Sharma)', status: 'Cleared', rating: 5, notes: 'Exceptional cultural and technical alignment.' }
    ],
    onboarding_records: [
      { name: 'ONB-2026-001', employee: 'EMP-005', employee_name: 'Pooja Nair', department: 'Design', designation: 'UI/UX Designer', boarding_status: 'In Progress', activities: [
        { name: 'Submit Signed Offer Letter', completed: 1 }, { name: 'Submit Tax & PAN Documents', completed: 1 },
        { name: 'Bank Account & Direct Deposit Setup', completed: 1 }, { name: 'IT Laptop & Security Keys Allocation', completed: 1 },
        { name: 'Figma & Design Tokens Workspace Access', completed: 1 }, { name: 'HR Benefits & Health Insurance Orientation', completed: 0 },
        { name: '30-Day Check-in with Department Lead', completed: 0 }
      ] },
      { name: 'ONB-2026-002', employee: 'EMP-004', employee_name: 'Rohan Deshmukh', department: 'Product', designation: 'Product Manager', boarding_status: 'Completed', activities: [
        { name: 'Submit Signed Offer Letter', completed: 1 }, { name: 'Submit Tax & PAN Documents', completed: 1 },
        { name: 'Bank Account & Direct Deposit Setup', completed: 1 }, { name: 'IT Equipment Allocation', completed: 1 },
        { name: 'Product Roadmap Alignment', completed: 1 }, { name: 'HR Orientation', completed: 1 }
      ] }
    ],
    payroll_entries: payrollEntries,
    salary_slips: salarySlips,
    announcements: [
      { name: 'ANN-001', subject: 'Dayflow Q3 All-Hands & Innovation Day', description: 'Join us this Thursday at 4 PM IST for our quarterly product roadmap reveal, team spotlights, and open Q&A with leadership. Refreshments provided at all regional hubs!', posted_by: 'Aditi Sharma (HR)', creation: `${addDays(today, -2)} 11:30:00` },
      { name: 'ANN-002', subject: 'Annual Wellness & Healthcare Policy Updates', description: 'We have upgraded all employee and dependent medical insurance coverage. Digital health cards and mental wellness consultation benefits are now active on your portals.', posted_by: 'Aditi Sharma (HR)', creation: `${addDays(today, -12)} 09:15:00` }
    ],
    holidays,
    notifications: [
      { id: 1, user: 'EMP-001', text: 'Nisha Verma submitted a Casual Leave request awaiting your approval.', type: 'leave', creation: `${addDays(today, -2)} 10:15`, read: 0 },
      { id: 2, user: 'EMP-001', text: 'Pooja Nair submitted a Casual Leave request awaiting your approval.', type: 'leave', creation: `${addDays(today, -1)} 09:30`, read: 0 },
      { id: 3, user: 'EMP-001', text: 'Nisha Verma submitted an expense claim of ₹1,200 for review.', type: 'expense', creation: `${addDays(today, -1)} 14:00`, read: 0 },
      { id: 4, user: 'EMP-002', text: 'Your latest salary slip has been published and is ready for download.', type: 'payroll', creation: `${addDays(today, -20)} 18:00`, read: 1 },
      { id: 5, user: 'EMP-002', text: 'Your expense claim EXP-2026-001 of ₹3,450 was approved by HR.', type: 'expense', creation: `${addDays(today, -6)} 11:20`, read: 1 }
    ]
  }
}

// Seed-time slip calc (no db access yet — operates on plain data)
function computeSlipSeed(emp, year, monthIndex, holidays) {
  const base = Number(emp.base_salary) || 100000
  const basic = Math.round(base * 0.5)
  const hra = Math.round(base * 0.2)
  const special = base - basic - hra
  const gross = basic + hra + special
  const pf = Math.round(basic * 0.12)
  const pt = 200
  const tds = Math.round(gross * 0.10)
  const deductions = [
    { salary_component: 'Provident Fund (PF)', amount: pf },
    { salary_component: 'Professional Tax (PT)', amount: pt },
    { salary_component: 'Income Tax (TDS)', amount: tds }
  ]
  const totalDeduction = pf + pt + tds
  return {
    gross_pay: gross, total_deduction: totalDeduction, net_pay: gross - totalDeduction,
    earnings: [
      { salary_component: 'Basic Salary', amount: basic },
      { salary_component: 'House Rent Allowance (HRA)', amount: hra },
      { salary_component: 'Special Allowance', amount: special }
    ],
    deductions
  }
}

// ============================================================================
// API SNAPSHOT (what clients receive — never exposes passwords)
// ============================================================================

function snapshot() {
  const employees = db.employees.map(e => {
    const { password, ...safe } = e
    return safe
  })
  return {
    ...db,
    employees,
    password: undefined,
    today: localDateStr(),
    server_time: localDateTimeStr(),
    live_attendance: getLiveAttendance(),
    leave_balances: leaveBalances()
  }
}

function publicEmployee(e) {
  if (!e) return null
  const { password, ...safe } = e
  return safe
}

// ============================================================================
// HTTP SERVER
// ============================================================================

const mime = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon'
}

function json(res, status, payload) {
  const body = JSON.stringify(payload)
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store'
  })
  res.end(body)
}

async function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    let size = 0
    req.on('data', chunk => {
      size += chunk.length
      if (size > 5 * 1024 * 1024) { reject(new Error('Payload too large')); req.destroy(); return }
      body += chunk
    })
    req.on('end', () => {
      if (!body) return resolve({})
      try { resolve(JSON.parse(body)) } catch { reject(new Error('Invalid JSON payload')) }
    })
    req.on('error', reject)
  })
}

function findEmployeeByIdentifier(identifier) {
  const q = String(identifier || '').trim().toLowerCase()
  if (!q) return null
  return db.employees.find(e =>
    (e.login_id && e.login_id.toLowerCase() === q) ||
    (e.company_email && e.company_email.toLowerCase() === q) ||
    (e.personal_email && e.personal_email.toLowerCase() === q) ||
    (e.name && e.name.toLowerCase() === q)) || null
}

function roleOf(emp) {
  return emp.user_role === 'HR' ? 'HR / Admin' : 'Employee'
}

const routes = []

function route(method, pattern, handler) {
  // pattern like '/api/leaves/:id/approve'
  const keys = []
  const regex = new RegExp('^' + pattern.replace(/:[^/]+/g, (m) => { keys.push(m.substring(1)); return '([^/]+)' }) + '$')
  routes.push({ method, regex, keys, handler })
}

// ---------------------------------------------------------------- AUTH ----

route('POST', '/api/login', async (req, res, body) => {
  const emp = findEmployeeByIdentifier(body.identifier)
  if (!emp) return json(res, 401, { error: 'No account found matching this identifier.' })
  if (String(body.password || '') !== String(emp.password || '')) {
    return json(res, 401, { error: 'Incorrect password. Please try again.' })
  }
  if (emp.status !== 'Active') {
    return json(res, 403, { error: `Account is ${emp.status}. Contact HR.` })
  }
  json(res, 200, { success: true, employee: publicEmployee(emp), role: roleOf(emp) })
})

route('POST', '/api/auth/signup', async (req, res, body) => {
  const companyName = (body.company_name || 'Odoo India').trim()
  const fullName = (body.name || 'Admin').trim()
  const email = (body.email || 'admin@odoo.local').trim().toLowerCase()
  const phone = body.phone || '+91 98000 00000'
  const password = body.password
  if (!password || password.length < 4) return json(res, 400, { error: 'Password must be at least 4 characters.' })
  if (db.employees.some(e => e.company_email?.toLowerCase() === email)) {
    return json(res, 409, { error: 'An account with this email already exists.' })
  }
  const parts = fullName.split(/\s+/)
  const firstName = parts[0] || 'Admin'
  const lastName = parts.slice(1).join(' ') || 'User'
  const serial = nextEmployeeNumber()
  const empId = `EMP-${String(serial).padStart(3, '0')}`
  const loginId = generateLoginId(companyName, firstName, lastName, `${new Date().getFullYear()}-01-01`, serial)
  const admin = {
    name: empId, login_id: loginId, password, employee_name: fullName, first_name: firstName, last_name: lastName,
    gender: 'Other', date_of_birth: '1990-01-01', date_of_joining: `${new Date().getFullYear()}-01-01`,
    status: 'Active', user_role: 'HR', base_salary: 100000,
    department: 'Human Resources', designation: 'HR Admin / Director', company: companyName,
    company_email: email, personal_email: email, cell_phone: phone, reports_to: '',
    leave_approver: empId, expense_approver: empId, shift: 'General Shift',
    current_address: 'HQ Campus', permanent_address: 'HQ Campus',
    emergency_phone_number: phone, person_to_be_contacted: 'Management', relation: 'Self',
    bank_name: 'HDFC Bank', bank_ac_no: '501009999999'
  }
  db.employees.unshift(admin)
  db.company_name = companyName
  db.leave_allocations[empId] = { 'Casual Leave': 15, 'Sick Leave': 12, 'Earned Leave': 18 }
  addNotification(empId, `Welcome to ${companyName}! Your HR workspace is ready.`, 'system')
  await persist()
  json(res, 201, { success: true, employee: publicEmployee(admin), role: roleOf(admin), login_id: loginId })
})

route('POST', '/api/auth/forgot-password', async (req, res, body) => {
  const emp = findEmployeeByIdentifier(body.identifier)
  if (!emp) return json(res, 404, { error: 'No account found with the provided identifier.' })
  if (!body.new_password || String(body.new_password).length < 4) {
    return json(res, 400, { error: 'New password must be at least 4 characters.' })
  }
  emp.password = String(body.new_password)
  await persist()
  json(res, 200, { success: true, message: `Password updated for ${emp.employee_name}.` })
})

// ---------------------------------------------------------------- DATA ----

route('GET', '/api/data', async (req, res) => {
  json(res, 200, snapshot())
})

route('POST', '/api/reset', async (req, res) => {
  db = buildSeed()
  await persist()
  json(res, 200, { success: true })
})

// ------------------------------------------------------------ EMPLOYEES ----

route('GET', '/api/employees', async (req, res) => {
  json(res, 200, { items: db.employees.map(publicEmployee) })
})

route('POST', '/api/employees', async (req, res, body) => {
  const firstName = (body.first_name || '').trim()
  const lastName = (body.last_name || '').trim()
  if (!firstName || !lastName) return json(res, 400, { error: 'First and last name are required.' })
  const email = (body.company_email || '').trim().toLowerCase()
  if (!email) return json(res, 400, { error: 'Company email is required.' })
  if (db.employees.some(e => e.company_email?.toLowerCase() === email)) {
    return json(res, 409, { error: 'An employee with this company email already exists.' })
  }
  const serial = nextEmployeeNumber()
  const empId = `EMP-${String(serial).padStart(3, '0')}`
  const doj = body.date_of_joining || localDateStr()
  const companyName = db.company_name || 'Odoo India'
  const loginId = generateLoginId(companyName, firstName, lastName, doj, serial)
  const autoPassword = `Welcome@${new Date(doj).getFullYear() || new Date().getFullYear()}`
  const emp = {
    name: empId, login_id: loginId, password: autoPassword,
    employee_name: `${firstName} ${lastName}`, first_name: firstName, last_name: lastName,
    gender: body.gender || 'Male', date_of_birth: body.date_of_birth || '1996-01-01',
    date_of_joining: doj, status: 'Active', user_role: body.user_role === 'HR' ? 'HR' : 'Employee',
    base_salary: Number(body.base_salary) || 100000,
    department: body.department || 'Engineering', designation: body.designation || 'Full Stack Engineer',
    company: companyName, company_email: email, personal_email: body.personal_email || '',
    cell_phone: body.cell_phone || '+91 98000 00000', reports_to: body.reports_to || 'EMP-001',
    leave_approver: body.leave_approver || 'EMP-001', expense_approver: body.expense_approver || 'EMP-001',
    shift: body.shift || 'General Shift',
    current_address: body.current_address || '', permanent_address: body.permanent_address || '',
    emergency_phone_number: body.emergency_phone_number || '', person_to_be_contacted: '', relation: '',
    bank_name: body.bank_name || '', bank_ac_no: body.bank_ac_no || ''
  }
  db.employees.push(emp)
  db.leave_allocations[empId] = { 'Casual Leave': 12, 'Sick Leave': 10, 'Earned Leave': 15, 'Compensatory Off': 0 }
  addNotification(empId, `Welcome aboard, ${emp.employee_name}! Your portal login ID is ${loginId}.`, 'system')
  await persist()
  json(res, 201, { success: true, employee: { ...publicEmployee(emp), password: autoPassword }, login_id: loginId, password: autoPassword })
})

route('PUT', '/api/employees/:id', async (req, res, body, params) => {
  const emp = db.employees.find(e => e.name === params.id)
  if (!emp) return json(res, 404, { error: 'Employee not found.' })
  const allowed = ['employee_name', 'status', 'department', 'designation', 'cell_phone', 'shift',
    'gender', 'date_of_birth', 'date_of_joining', 'company_email', 'personal_email', 'base_salary',
    'user_role', 'reports_to', 'leave_approver', 'expense_approver',
    'current_address', 'permanent_address', 'emergency_phone_number', 'person_to_be_contacted', 'relation',
    'bank_name', 'bank_ac_no', 'image']
  for (const key of allowed) {
    if (body[key] !== undefined) emp[key] = body[key]
  }
  await persist()
  json(res, 200, { success: true, employee: publicEmployee(emp) })
})

route('PUT', '/api/profile', async (req, res, body) => {
  const emp = db.employees.find(e => e.name === body.employee)
  if (!emp) return json(res, 404, { error: 'Employee not found.' })
  for (const key of ['personal_email', 'cell_phone', 'current_address', 'person_to_be_contacted', 'emergency_phone_number']) {
    if (body[key] !== undefined) emp[key] = body[key]
  }
  await persist()
  json(res, 200, { success: true, employee: publicEmployee(emp) })
})

// --------------------------------------------------------------- PUNCH ----

route('POST', '/api/punch', async (req, res, body) => {
  const emp = db.employees.find(e => e.name === body.employee)
  if (!emp) return json(res, 404, { error: 'Employee not found.' })
  const logType = body.log_type === 'OUT' ? 'OUT' : 'IN'
  const today = localDateStr()
  const nowStr = localDateTimeStr()
  const punches = todaysPunches(emp.name, today)
  const last = punches[punches.length - 1]
  if (last && last.log_type === logType) {
    return json(res, 409, {
      error: logType === 'IN'
        ? `Already checked in at ${String(last.time).split(' ')[1].substring(0, 5)}. Check out first.`
        : `Not currently checked in. Last check-out was at ${String(last.time).split(' ')[1].substring(0, 5)}.`
    })
  }
  const punch = {
    name: `CHK-${nextSeq('checkins', 'CHK-')}-${Date.now().toString().slice(-4)}`,
    employee: emp.name,
    employee_name: emp.employee_name,
    log_type: logType,
    time: nowStr,
    latitude: body.latitude ?? 12.9716,
    longitude: body.longitude ?? 77.5946
  }
  db.checkins.unshift(punch)
  syncAttendanceFromPunches(emp.name, today)
  await persist()
  json(res, 201, { success: true, punch, live: getLiveAttendance()[emp.name] })
})

// --------------------------------------------------------------- LEAVE ----

route('GET', '/api/leaves', async (req, res) => {
  json(res, 200, { items: db.leave_applications })
})

route('POST', '/api/leaves', async (req, res, body) => {
  const emp = db.employees.find(e => e.name === body.employee)
  if (!emp) return json(res, 404, { error: 'Employee not found.' })
  const { leave_type, from_date, to_date } = body
  if (!leave_type || !from_date || !to_date) return json(res, 400, { error: 'Leave type and dates are required.' })
  if (from_date > to_date) return json(res, 400, { error: 'From date cannot be after to date.' })

  const days = datesInRange(from_date, to_date).filter(isWorkingDate).length
  if (days < 1) return json(res, 400, { error: 'Selected range contains no working days (weekends/holidays excluded).' })

  const overlap = db.leave_applications.find(l =>
    l.employee === emp.name && l.status !== 'Rejected' && overlaps(from_date, to_date, l.from_date, l.to_date))
  if (overlap) {
    return json(res, 409, { error: `You already have a ${overlap.status.toLowerCase()} ${overlap.leave_type} (${overlap.from_date} to ${overlap.to_date}) overlapping these dates.` })
  }

  if (leave_type !== 'Leave Without Pay') {
    const balances = leaveBalances()[emp.name] || {}
    const bal = balances[leave_type]
    if (!bal) return json(res, 400, { error: `No allocation exists for ${leave_type}.` })
    if (bal.remaining < days) {
      return json(res, 400, { error: `Insufficient balance: ${bal.remaining} day(s) of ${leave_type} remaining, ${days} requested.` })
    }
  }

  const seq = nextSeq('leave_applications', 'LEAVE-')
  const doc = {
    name: `LEAVE-${new Date().getFullYear()}-${String(seq).padStart(3, '0')}`,
    employee: emp.name, employee_name: emp.employee_name, leave_type,
    from_date, to_date, total_leave_days: days, status: 'Open',
    description: body.description || '', posting_date: localDateStr(),
    leave_approver: emp.leave_approver || 'EMP-001'
  }
  db.leave_applications.unshift(doc)
  addNotification(doc.leave_approver, `${emp.employee_name} submitted a ${leave_type} request for ${days} day(s) (${from_date} to ${to_date}).`, 'leave')
  await persist()
  json(res, 201, { success: true, leave: doc })
})

route('POST', '/api/leaves/:id/approve', async (req, res, body, params) => {
  const doc = db.leave_applications.find(l => l.name === params.id)
  if (!doc) return json(res, 404, { error: 'Leave application not found.' })
  if (doc.status !== 'Open') return json(res, 409, { error: `Already ${doc.status.toLowerCase()}.` })

  // Re-validate balance at approval time
  if (doc.leave_type !== 'Leave Without Pay') {
    const bal = (leaveBalances()[doc.employee] || {})[doc.leave_type]
    if (bal && bal.remaining < doc.total_leave_days) {
      return json(res, 400, { error: `Insufficient balance: only ${bal.remaining} day(s) of ${doc.leave_type} remaining.` })
    }
  }
  doc.status = 'Approved'
  // Side effect: mark attendance 'On Leave' for each working day in the range
  for (const d of datesInRange(doc.from_date, doc.to_date)) {
    if (!isWorkingDate(d)) continue
    const existing = db.attendance.find(a => a.employee === doc.employee && a.attendance_date === d)
    if (existing) {
      if (existing.status !== 'Present') existing.status = 'On Leave'
    } else {
      upsertAttendance(doc.employee, d, { status: 'On Leave' })
    }
  }
  addNotification(doc.employee, `Your ${doc.leave_type} (${doc.from_date} to ${doc.to_date}) was approved.`, 'leave')
  await persist()
  json(res, 200, { success: true, leave: doc })
})

route('POST', '/api/leaves/:id/reject', async (req, res, body, params) => {
  const doc = db.leave_applications.find(l => l.name === params.id)
  if (!doc) return json(res, 404, { error: 'Leave application not found.' })
  if (doc.status !== 'Open') return json(res, 409, { error: `Already ${doc.status.toLowerCase()}.` })
  doc.status = 'Rejected'
  addNotification(doc.employee, `Your ${doc.leave_type} (${doc.from_date} to ${doc.to_date}) was rejected.`, 'leave')
  await persist()
  json(res, 200, { success: true, leave: doc })
})

// ------------------------------------------------------------- EXPENSE ----

route('POST', '/api/expenses', async (req, res, body) => {
  const emp = db.employees.find(e => e.name === body.employee)
  if (!emp) return json(res, 404, { error: 'Employee not found.' })
  const amt = Number(body.amount)
  if (!amt || amt <= 0) return json(res, 400, { error: 'Amount must be greater than zero.' })
  const seq = nextSeq('expense_claims', 'EXP-')
  const doc = {
    name: `EXP-${new Date().getFullYear()}-${String(seq).padStart(3, '0')}`,
    employee: emp.name, employee_name: emp.employee_name,
    expense_type: body.expense_type || 'Travel',
    total_claimed_amount: amt, total_sanctioned_amount: 0,
    status: 'Draft', approval_status: 'Draft',
    posting_date: body.date || localDateStr(),
    description: body.description || '',
    expense_approver: emp.expense_approver || 'EMP-001'
  }
  db.expense_claims.unshift(doc)
  addNotification(doc.expense_approver, `${emp.employee_name} submitted an expense claim of ₹${amt.toLocaleString('en-IN')} for review.`, 'expense')
  await persist()
  json(res, 201, { success: true, claim: doc })
})

route('POST', '/api/expenses/:id/approve', async (req, res, body, params) => {
  const doc = db.expense_claims.find(c => c.name === params.id)
  if (!doc) return json(res, 404, { error: 'Expense claim not found.' })
  if (doc.approval_status !== 'Draft') return json(res, 409, { error: 'Already processed.' })
  doc.approval_status = 'Approved'
  doc.status = 'Unpaid'
  doc.total_sanctioned_amount = doc.total_claimed_amount
  addNotification(doc.employee, `Your expense claim ${doc.name} of ₹${Number(doc.total_claimed_amount).toLocaleString('en-IN')} was approved by HR.`, 'expense')
  await persist()
  json(res, 200, { success: true, claim: doc })
})

route('POST', '/api/expenses/:id/reject', async (req, res, body, params) => {
  const doc = db.expense_claims.find(c => c.name === params.id)
  if (!doc) return json(res, 404, { error: 'Expense claim not found.' })
  if (doc.approval_status !== 'Draft') return json(res, 409, { error: 'Already processed.' })
  doc.approval_status = 'Rejected'
  doc.status = 'Rejected'
  addNotification(doc.employee, `Your expense claim ${doc.name} was rejected by HR.`, 'expense')
  await persist()
  json(res, 200, { success: true, claim: doc })
})

// --------------------------------------------------------- SHIFT REQS ----

route('POST', '/api/shift-requests', async (req, res, body) => {
  const emp = db.employees.find(e => e.name === body.employee)
  if (!emp) return json(res, 404, { error: 'Employee not found.' })
  const { shift_type, from_date, to_date } = body
  if (!shift_type || !from_date || !to_date) return json(res, 400, { error: 'Shift type and dates are required.' })
  if (from_date > to_date) return json(res, 400, { error: 'From date cannot be after to date.' })
  const seq = nextSeq('shift_requests', 'SR-')
  const doc = {
    name: `SR-${new Date().getFullYear()}-${String(seq).padStart(3, '0')}`,
    employee: emp.name, employee_name: emp.employee_name, shift_type,
    from_date, to_date, status: 'Draft', reason: body.reason || ''
  }
  db.shift_requests.unshift(doc)
  addNotification(emp.leave_approver || 'EMP-001', `${emp.employee_name} requested a shift change to ${shift_type}.`, 'shift')
  await persist()
  json(res, 201, { success: true, request: doc })
})

route('POST', '/api/shift-requests/:id/approve', async (req, res, body, params) => {
  const doc = db.shift_requests.find(s => s.name === params.id)
  if (!doc) return json(res, 404, { error: 'Shift request not found.' })
  if (doc.status !== 'Draft') return json(res, 409, { error: 'Already processed.' })
  doc.status = 'Approved'
  const emp = db.employees.find(e => e.name === doc.employee)
  if (emp) emp.shift = doc.shift_type
  addNotification(doc.employee, `Your shift change to ${doc.shift_type} was approved and is now active.`, 'shift')
  await persist()
  json(res, 200, { success: true, request: doc })
})

route('POST', '/api/shift-requests/:id/reject', async (req, res, body, params) => {
  const doc = db.shift_requests.find(s => s.name === params.id)
  if (!doc) return json(res, 404, { error: 'Shift request not found.' })
  if (doc.status !== 'Draft') return json(res, 409, { error: 'Already processed.' })
  doc.status = 'Rejected'
  addNotification(doc.employee, `Your shift change request to ${doc.shift_type} was rejected.`, 'shift')
  await persist()
  json(res, 200, { success: true, request: doc })
})

// ------------------------------------------------------- ANNOUNCEMENTS ----

route('POST', '/api/announcements', async (req, res, body) => {
  if (!body.subject || !body.description) return json(res, 400, { error: 'Subject and message are required.' })
  const poster = db.employees.find(e => e.name === body.posted_by)
  const seq = nextSeq('announcements', 'ANN-')
  const doc = {
    name: `ANN-${new Date().getFullYear()}-${String(seq).padStart(3, '0')}`,
    subject: body.subject, description: body.description,
    posted_by: poster ? `${poster.employee_name} (HR)` : 'HR Team',
    creation: localDateTimeStr()
  }
  db.announcements.unshift(doc)
  for (const emp of db.employees) {
    if (emp.status === 'Active' && emp.name !== (poster && poster.name)) {
      addNotification(emp.name, `New announcement: ${doc.subject}`, 'announcement')
    }
  }
  await persist()
  json(res, 201, { success: true, announcement: doc })
})

// -------------------------------------------------------- RECRUITMENT ----

route('POST', '/api/job-openings', async (req, res, body) => {
  if (!body.job_title || !body.department) return json(res, 400, { error: 'Job title and department are required.' })
  const seq = nextSeq('job_openings', 'JOB-')
  const doc = {
    name: `JOB-${new Date().getFullYear()}-${String(seq).padStart(3, '0')}`,
    job_title: body.job_title, department: body.department,
    designation: body.designation || '',
    vacancies: Math.max(1, Number(body.vacancies) || 1),
    status: 'Open', posted_date: localDateStr(),
    description: body.description || ''
  }
  db.job_openings.unshift(doc)
  await persist()
  json(res, 201, { success: true, opening: doc })
})

route('POST', '/api/applicants', async (req, res, body) => {
  if (!body.applicant_name || !body.email) return json(res, 400, { error: 'Candidate name and email are required.' })
  const job = db.job_openings.find(j => j.name === body.job_opening)
  if (!job) return json(res, 400, { error: 'Select a valid job opening.' })
  const seq = nextSeq('job_applicants', 'APP-')
  const doc = {
    name: `APP-${new Date().getFullYear()}-${String(seq).padStart(3, '0')}`,
    applicant_name: body.applicant_name, email: body.email,
    phone: body.phone || '+91 98000 11111',
    job_title: job.job_title, job_opening: job.name,
    status: 'Open', application_date: localDateStr(),
    source: body.source || 'Direct', rating: Number(body.rating) || 4,
    notes: body.notes || 'Initial profile candidate created in pipeline.'
  }
  db.job_applicants.unshift(doc)
  await persist()
  json(res, 201, { success: true, applicant: doc })
})

route('PUT', '/api/applicants/:id', async (req, res, body, params) => {
  const doc = db.job_applicants.find(a => a.name === params.id)
  if (!doc) return json(res, 404, { error: 'Applicant not found.' })
  const stages = ['Open', 'Replied', 'Accepted', 'Rejected', 'Hold']
  if (body.status !== undefined) {
    if (!stages.includes(body.status)) return json(res, 400, { error: 'Invalid stage.' })
    doc.status = body.status
  }
  if (body.rating !== undefined) doc.rating = Number(body.rating)
  if (body.notes !== undefined) doc.notes = body.notes
  await persist()
  json(res, 200, { success: true, applicant: doc })
})

route('POST', '/api/interviews', async (req, res, body) => {
  const applicant = db.job_applicants.find(a => a.name === body.applicant)
  if (!applicant) return json(res, 400, { error: 'Select a valid applicant.' })
  let fromTime = '15:00', toTime = '16:00'
  const window = String(body.time_window || '').trim()
  const m = window.match(/(\d{1,2}:\d{2})\s*(?:-|–|to)\s*(\d{1,2}:\d{2})/)
  if (m) { fromTime = m[1]; toTime = m[2] }
  const seq = nextSeq('interviews', 'INT-')
  const doc = {
    name: `INT-${new Date().getFullYear()}-${String(seq).padStart(3, '0')}`,
    applicant: applicant.name, applicant_name: applicant.applicant_name,
    job_opening: applicant.job_opening, job_title: applicant.job_title,
    scheduled_date: body.scheduled_date || addDays(localDateStr(), 3),
    from_time: fromTime, to_time: toTime,
    interviewer: body.interviewer || 'HR Panel',
    status: 'Scheduled', rating: 0, notes: body.notes || 'Technical evaluation round.'
  }
  db.interviews.unshift(doc)
  await persist()
  json(res, 201, { success: true, interview: doc })
})

// --------------------------------------------------------- ONBOARDING ----

route('PUT', '/api/onboarding/:id', async (req, res, body, params) => {
  const doc = db.onboarding_records.find(o => o.name === params.id)
  if (!doc) return json(res, 404, { error: 'Onboarding record not found.' })
  const idx = Number(body.activity_index)
  if (!doc.activities || !doc.activities[idx]) return json(res, 400, { error: 'Invalid activity index.' })
  doc.activities[idx].completed = doc.activities[idx].completed ? 0 : 1
  doc.boarding_status = doc.activities.every(a => a.completed) ? 'Completed' : 'In Progress'
  await persist()
  json(res, 200, { success: true, record: doc })
})

// -------------------------------------------------------------- PAYROLL ----

route('POST', '/api/payroll/run', async (req, res, body) => {
  const monthName = body.month || MONTHS[new Date().getMonth()]
  const monthIndex = MONTHS.indexOf(monthName)
  const year = Number(body.year) || new Date().getFullYear()
  if (monthIndex < 0) return json(res, 400, { error: 'Invalid month.' })
  const deptFilter = body.department && body.department !== 'All' ? body.department : null
  const { start, end } = monthBounds(year, monthIndex)
  const entryName = `PAY-${year}-${pad2(monthIndex + 1)}`
  if (db.payroll_entries.some(p => p.name === entryName)) {
    return json(res, 409, { error: `Payroll for ${monthName} ${year} has already been run.` })
  }

  const targets = db.employees.filter(e => e.status === 'Active' && (!deptFilter || e.department === deptFilter))
  if (targets.length === 0) return json(res, 400, { error: 'No active employees match this scope.' })

  let seq = nextSeq('salary_slips', `SLIP-${year}-${pad2(monthIndex + 1)}-`)
  let totalNet = 0, totalGross = 0
  const created = []
  for (const emp of targets) {
    // One slip per employee per period
    if (db.salary_slips.some(s => s.employee === emp.name && s.start_date === start && s.end_date === end)) continue
    const calc = computeSlip(emp, year, monthIndex)
    totalNet += calc.net_pay
    totalGross += calc.gross_pay
    const slip = {
      name: `SLIP-${year}-${pad2(monthIndex + 1)}-${String(seq++).padStart(3, '0')}`,
      employee: emp.name, employee_name: emp.employee_name,
      posting_date: localDateStr(), start_date: start, end_date: end,
      gross_pay: calc.gross_pay, total_deduction: calc.total_deduction, net_pay: calc.net_pay,
      currency: 'INR', docstatus: 1, status: 'Issued',
      payment_days: calc.payment_days, working_days: calc.working_days, lop_days: calc.lop_days,
      earnings: calc.earnings, deductions: calc.deductions
    }
    db.salary_slips.unshift(slip)
    created.push(slip)
    addNotification(emp.name, `Your ${monthName} ${year} salary slip (${slip.name}) has been published.`, 'payroll')
  }

  const entry = {
    name: entryName, posting_date: localDateStr(), start_date: start, end_date: end,
    payroll_frequency: 'Monthly', company: db.company_name,
    number_of_employees: created.length, status: 'Submitted',
    total_amount: totalNet, total_gross: totalGross
  }
  db.payroll_entries.unshift(entry)
  await persist()
  json(res, 201, {
    success: true, entry,
    slips_created: created.length,
    total_net: totalNet, total_gross: totalGross,
    month: monthName, year
  })
})

// -------------------------------------------------------- NOTIFICATIONS ----

route('POST', '/api/notifications/read-all', async (req, res, body) => {
  const user = body.user
  const asHR = body.role === 'HR / Admin'
  let count = 0
  for (const n of db.notifications) {
    if (asHR || n.user === user) {
      if (!n.read) count++
      n.read = 1
    }
  }
  await persist()
  json(res, 200, { success: true, updated: count })
})

// ============================================================================
// REQUEST DISPATCH
// ============================================================================

const server = createServer(async (request, response) => {
  const urlObj = new URL(request.url, `http://${request.headers.host || 'localhost'}`)
  const pathname = decodeURIComponent(urlObj.pathname)

  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (request.method === 'OPTIONS') {
    response.writeHead(204)
    response.end()
    return
  }

  if (pathname.startsWith('/api/')) {
    for (const r of routes) {
      if (r.method !== request.method) continue
      const match = pathname.match(r.regex)
      if (!match) continue
      const params = {}
      r.keys.forEach((k, i) => { params[k] = match[i + 1] })
      try {
        const body = (request.method === 'POST' || request.method === 'PUT') ? await readBody(request) : {}
        await r.handler(request, response, body, params)
      } catch (err) {
        json(response, 400, { error: err.message || 'Bad request' })
      }
      return
    }
    json(response, 404, { error: 'API endpoint not found.' })
    return
  }

  // STATIC FILES — never expose the database directory
  if (pathname.startsWith('/data/')) {
    response.writeHead(403, { 'Content-Type': 'text/plain' })
    response.end('Forbidden')
    return
  }

  try {
    const rawPath = pathname === '/' ? 'index.html' : pathname
    const filePath = normalize(join(root, rawPath))
    if (!filePath.startsWith(root)) throw new Error('Forbidden')
    const fileStat = await stat(filePath)
    if (!fileStat.isFile()) throw new Error('Not found')
    response.writeHead(200, {
      'Content-Type': mime[extname(filePath)] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    })
    response.end(await readFile(filePath))
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain' })
    response.end('Not found')
  }
})

// ============================================================================
// BOOT
// ============================================================================

try {
  if (!existsSync(dataDir)) await mkdir(dataDir, { recursive: true })
} catch (e) {
  console.error('Error creating data dir:', e)
}

if (process.argv.includes('--reseed')) {
  db = buildSeed()
  await persist()
  console.log('Database reseeded with fresh demo data.')
  if (process.argv.includes('--reseed-only')) process.exit(0)
} else {
  await loadDb()
}

server.listen(PORT, () => {
  console.log(`Dayflow HRMS backend running at http://localhost:${PORT}`)
  console.log(`Database: ${dbPath} (rev ${db.rev})`)
})
