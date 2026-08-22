/**
 * Dayflow / HRMitra - Complete Enterprise HRMS Application
 * Integrated with all hrms-portal functionality and Frappe HR UI/UX
 */

(function () {
  'use strict';

  // =========================================================================
  // SVG ICONS SYSTEM
  // =========================================================================
  const ICONS = {
    users: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    calendar: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    sun: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
    chart: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    card: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
    receipt: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="13" y2="15"/></svg>`,
    repeat: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
    rocket: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="15" x2="15.01" y2="15"/></svg>`,
    briefcase: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    target: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    mic: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
    dollar: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    zap: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    fileText: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    activity: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    building: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="22.01"/><line x1="15" y1="22" x2="15" y2="22.01"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><line x1="9" y1="14" x2="9" y2="14.01"/><line x1="15" y1="14" x2="15" y2="14.01"/></svg>`,
    bell: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
    speaker: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
    settings: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    search: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    clock: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    user: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    logOut: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
    menu: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
    check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    x: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    plane: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z"/></svg>`,
    mapPin: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    mail: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    phone: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    edit: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    download: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    eye: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    eyeOff: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`,
    upload: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
    google: `<svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>`,
    info: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  };



  // =========================================================================
  // LOGIN ID & CREDENTIAL GENERATOR (OI + FN2 + LN2 + YEAR + SERIAL)
  // =========================================================================
  function generateLoginId(companyName, firstName, lastName, dateOfJoining, serialNumber) {
    const compWords = (companyName || 'Odoo India').trim().split(/\s+/);
    let compPrefix = compWords.length >= 2
      ? (compWords[0][0] + compWords[1][0]).toUpperCase()
      : ((companyName || 'OI').substring(0, 2)).toUpperCase();
    if (!compPrefix || compPrefix.length < 2) compPrefix = 'OI';

    const fnClean = (firstName || 'Employee').replace(/[^a-zA-Z]/g, '');
    const lnClean = (lastName || 'User').replace(/[^a-zA-Z]/g, '');
    const fn2 = (fnClean + 'XX').substring(0, 2).toUpperCase();
    const ln2 = (lnClean + 'XX').substring(0, 2).toUpperCase();

    let year = 2026;
    if (dateOfJoining) {
      const parsedYear = new Date(dateOfJoining).getFullYear();
      if (!isNaN(parsedYear)) year = parsedYear;
      else if (String(dateOfJoining).length >= 4) year = parseInt(String(dateOfJoining).substring(0, 4), 10) || 2026;
    }

    const serialStr = String(serialNumber || 1).padStart(4, '0');
    return `${compPrefix}${fn2}${ln2}${year}${serialStr}`;
  }

  // =========================================================================
  // 1. INITIAL MOCK DATABASE & DATA STORE
  // =========================================================================

  const INITIAL_DATA = {
    employees: [
      {
        name: 'EMP-001',
        login_id: 'DTADSH20220001',
        user_role: 'HR',
        base_salary: 160000,
        password: 'Dayflow@123',
        employee_name: 'Aditi Sharma',
        first_name: 'Aditi',
        last_name: 'Sharma',
        gender: 'Female',
        date_of_birth: '1992-04-15',
        date_of_joining: '2022-01-10',
        status: 'Active',
        department: 'Human Resources',
        designation: 'HR Manager',
        company: 'Dayflow Technologies',
        company_email: 'hr@dayflow.local',
        personal_email: 'aditi.sharma92@gmail.com',
        cell_phone: '+91 98765 43210',
        reports_to: '',
        leave_approver: 'EMP-001',
        expense_approver: 'EMP-001',
        shift: 'General Shift',
        current_address: 'Flat 402, Green Glen Layout, Bellandur, Bengaluru, Karnataka 560103',
        permanent_address: 'House 12, Sector 14, Gurugram, Haryana 122001',
        emergency_phone_number: '+91 98765 00001',
        person_to_be_contacted: 'Rajesh Sharma',
        relation: 'Father',
        bank_name: 'HDFC Bank',
        bank_ac_no: '50100234567890',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&auto=format&fit=crop&q=80'
      },
      {
        name: 'EMP-002',
        login_id: 'DTNIVE20230002',
        user_role: 'Employee',
        base_salary: 125000,
        password: 'Dayflow@123',
        employee_name: 'Nisha Verma',
        first_name: 'Nisha',
        last_name: 'Verma',
        gender: 'Female',
        date_of_birth: '1995-08-22',
        date_of_joining: '2023-03-01',
        status: 'Active',
        department: 'Engineering',
        designation: 'Senior Frontend Engineer',
        company: 'Dayflow Technologies',
        company_email: 'nisha@dayflow.local',
        personal_email: 'nisha.verma@example.com',
        cell_phone: '+91 98111 22334',
        reports_to: 'EMP-001',
        leave_approver: 'EMP-001',
        expense_approver: 'EMP-001',
        shift: 'General Shift',
        current_address: '42, 4th Cross, Indiranagar, Bengaluru, Karnataka 560038',
        permanent_address: '15 Civil Lines, Jaipur, Rajasthan 302006',
        emergency_phone_number: '+91 98111 99887',
        person_to_be_contacted: 'Suresh Verma',
        relation: 'Father',
        bank_name: 'ICICI Bank',
        bank_ac_no: '002305001234',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&auto=format&fit=crop&q=80'
      },
      {
        name: 'EMP-003',
        login_id: 'DTKAME20230003',
        user_role: 'Employee',
        base_salary: 110000,
        password: 'Dayflow@123',
        employee_name: 'Kabir Mehta',
        first_name: 'Kabir',
        last_name: 'Mehta',
        gender: 'Male',
        date_of_birth: '1994-11-12',
        date_of_joining: '2023-06-15',
        status: 'Active',
        department: 'Engineering',
        designation: 'Backend Developer',
        company: 'Dayflow Technologies',
        company_email: 'kabir@dayflow.local',
        personal_email: 'kabir.mehta@example.com',
        cell_phone: '+91 97234 56789',
        reports_to: 'EMP-001',
        leave_approver: 'EMP-001',
        expense_approver: 'EMP-001',
        shift: 'Morning Shift',
        current_address: '108, Koramangala 5th Block, Bengaluru, Karnataka 560095',
        permanent_address: '77 Nariman Point, Mumbai, Maharashtra 400021',
        emergency_phone_number: '+91 97234 11223',
        person_to_be_contacted: 'Ananya Mehta',
        relation: 'Spouse',
        bank_name: 'State Bank of India',
        bank_ac_no: '30987654321',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=240&auto=format&fit=crop&q=80'
      },
      {
        name: 'EMP-004',
        login_id: 'DTRODE20230004',
        user_role: 'Employee',
        base_salary: 135000,
        password: 'Dayflow@123',
        employee_name: 'Rohan Deshmukh',
        first_name: 'Rohan',
        last_name: 'Deshmukh',
        gender: 'Male',
        date_of_birth: '1996-02-18',
        date_of_joining: '2023-09-01',
        status: 'Active',
        department: 'Product',
        designation: 'Product Manager',
        company: 'Dayflow Technologies',
        company_email: 'rohan@dayflow.local',
        personal_email: 'rohan.deshmukh@example.com',
        cell_phone: '+91 96321 09876',
        reports_to: 'EMP-001',
        leave_approver: 'EMP-001',
        expense_approver: 'EMP-001',
        shift: 'General Shift',
        current_address: 'B-201, Ferns Residency, HSR Layout, Bengaluru, Karnataka 560102',
        permanent_address: '22 Deccan Gymkhana, Pune, Maharashtra 411004',
        emergency_phone_number: '+91 96321 55443',
        person_to_be_contacted: 'Meera Deshmukh',
        relation: 'Mother',
        bank_name: 'Axis Bank',
        bank_ac_no: '918010045678901',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80'
      },
      {
        name: 'EMP-005',
        login_id: 'DTPONA20240005',
        user_role: 'Employee',
        base_salary: 95000,
        password: 'Dayflow@123',
        employee_name: 'Pooja Nair',
        first_name: 'Pooja',
        last_name: 'Nair',
        gender: 'Female',
        date_of_birth: '1998-07-30',
        date_of_joining: '2024-01-15',
        status: 'Active',
        department: 'Design',
        designation: 'UI/UX Designer',
        company: 'Dayflow Technologies',
        company_email: 'pooja@dayflow.local',
        personal_email: 'pooja.nair@example.com',
        cell_phone: '+91 95432 10987',
        reports_to: 'EMP-001',
        leave_approver: 'EMP-001',
        expense_approver: 'EMP-001',
        shift: 'General Shift',
        current_address: '14/2, 1st Main, Domlur, Bengaluru, Karnataka 560071',
        permanent_address: 'Kalyan Nagar, Kochi, Kerala 682025',
        emergency_phone_number: '+91 95432 66778',
        person_to_be_contacted: 'Gopal Nair',
        relation: 'Father',
        bank_name: 'HDFC Bank',
        bank_ac_no: '50100987654321',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80'
      },
      {
        name: 'EMP-006',
        login_id: 'DTVIMA20220006',
        user_role: 'Employee',
        base_salary: 115000,
        employee_name: 'Vikram Malhotra',
        first_name: 'Vikram',
        last_name: 'Malhotra',
        gender: 'Male',
        date_of_birth: '1993-03-24',
        date_of_joining: '2022-11-01',
        status: 'Active',
        department: 'Engineering',
        designation: 'DevOps Specialist',
        company: 'Dayflow Technologies',
        company_email: 'vikram@dayflow.local',
        personal_email: 'vikram.malhotra@example.com',
        cell_phone: '+91 98222 33445',
        reports_to: 'EMP-001',
        leave_approver: 'EMP-001',
        expense_approver: 'EMP-001',
        shift: 'Morning Shift',
        current_address: 'Flat 304, Palm Meadows, Whitefield, Bengaluru, Karnataka 560066',
        permanent_address: 'Sector 29, Chandigarh 160030',
        emergency_phone_number: '+91 98222 99881',
        person_to_be_contacted: 'Sunil Malhotra',
        relation: 'Brother',
        bank_name: 'Kotak Mahindra Bank',
        bank_ac_no: '481200987654',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80'
      },
      {
        name: 'EMP-007',
        login_id: 'DTPRSE20230007',
        user_role: 'HR',
        base_salary: 60000,
        employee_name: 'Priya Sengupta',
        first_name: 'Priya',
        last_name: 'Sengupta',
        gender: 'Female',
        date_of_birth: '1996-09-10',
        date_of_joining: '2023-04-15',
        status: 'Active',
        department: 'Human Resources',
        designation: 'HR Executive',
        company: 'Dayflow Technologies',
        company_email: 'priya@dayflow.local',
        personal_email: 'priya.sengupta@example.com',
        cell_phone: '+91 97333 44556',
        reports_to: 'EMP-001',
        leave_approver: 'EMP-001',
        expense_approver: 'EMP-001',
        shift: 'General Shift',
        current_address: '77, 8th Main, Malleshwaram, Bengaluru, Karnataka 560003',
        permanent_address: 'Salt Lake City, Kolkata, West Bengal 700091',
        emergency_phone_number: '+91 97333 11229',
        person_to_be_contacted: 'Debabrata Sengupta',
        relation: 'Father',
        bank_name: 'Axis Bank',
        bank_ac_no: '919010078654321',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=240&auto=format&fit=crop&q=80'
      },
      {
        name: 'EMP-008',
        login_id: 'DTARKA20230008',
        user_role: 'Employee',
        base_salary: 120000,
        employee_name: 'Arjun Kapoor',
        first_name: 'Arjun',
        last_name: 'Kapoor',
        gender: 'Male',
        date_of_birth: '1995-12-05',
        date_of_joining: '2023-10-01',
        status: 'Active',
        department: 'Engineering',
        designation: 'Full Stack Engineer',
        company: 'Dayflow Technologies',
        company_email: 'arjun@dayflow.local',
        personal_email: 'arjun.kapoor@example.com',
        cell_phone: '+91 98444 55667',
        reports_to: 'EMP-001',
        leave_approver: 'EMP-001',
        expense_approver: 'EMP-001',
        shift: 'General Shift',
        current_address: '302, Prestige Park, Electronic City, Bengaluru, Karnataka 560100',
        permanent_address: 'Model Town, Ludhiana, Punjab 141002',
        emergency_phone_number: '+91 98444 00112',
        person_to_be_contacted: 'Harsh Kapoor',
        relation: 'Father',
        bank_name: 'HDFC Bank',
        bank_ac_no: '50100445566778',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=240&auto=format&fit=crop&q=80'
      },
      {
        name: 'EMP-009',
        login_id: 'DTSURA20230009',
        user_role: 'Employee',
        base_salary: 105000,
        employee_name: 'Sunita Rao',
        first_name: 'Sunita',
        last_name: 'Rao',
        gender: 'Female',
        date_of_birth: '1993-06-18',
        date_of_joining: '2023-01-20',
        status: 'Active',
        department: 'Finance',
        designation: 'Financial Analyst',
        company: 'Dayflow Technologies',
        company_email: 'sunita@dayflow.local',
        personal_email: 'sunita.rao@example.com',
        cell_phone: '+91 98555 66778',
        reports_to: 'EMP-001',
        leave_approver: 'EMP-001',
        expense_approver: 'EMP-001',
        shift: 'General Shift',
        current_address: '55, Outer Ring Road, Marathahalli, Bengaluru, Karnataka 560037',
        permanent_address: 'Banjara Hills, Hyderabad, Telangana 500034',
        emergency_phone_number: '+91 98555 12340',
        person_to_be_contacted: 'Nagesh Rao',
        relation: 'Father',
        bank_name: 'ICICI Bank',
        bank_ac_no: '002305009988',
        image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=240&auto=format&fit=crop&q=80'
      }
    ],

    departments: ['Human Resources', 'Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Finance'],
    designations: ['HR Manager', 'HR Executive', 'Senior Frontend Engineer', 'Backend Developer', 'Full Stack Engineer', 'Product Manager', 'UI/UX Designer', 'DevOps Specialist', 'Financial Analyst'],

    shift_types: [
      { name: 'General Shift', start_time: '09:30:00', end_time: '18:30:00', description: 'Standard Office Shift' },
      { name: 'Morning Shift', start_time: '08:00:00', end_time: '16:30:00', description: 'Early Technical Support' },
      { name: 'Evening Shift', start_time: '14:00:00', end_time: '22:30:00', description: 'Afternoon / US Overlap' },
      { name: 'Night Shift', start_time: '22:00:00', end_time: '06:30:00', description: 'Night Infrastructure Rotation' }
    ],

    shift_requests: [
      {
        name: 'SR-2026-001',
        employee: 'EMP-002',
        employee_name: 'Nisha Verma',
        shift_type: 'Morning Shift',
        from_date: '2026-09-01',
        to_date: '2026-09-30',
        status: 'Draft',
        reason: 'Adjusting schedule for morning collaborative sprint sessions with EU team.'
      },
      {
        name: 'SR-2026-002',
        employee: 'EMP-003',
        employee_name: 'Kabir Mehta',
        shift_type: 'General Shift',
        from_date: '2026-08-01',
        to_date: '2026-08-31',
        status: 'Approved',
        reason: 'Returning to core product delivery schedule.'
      }
    ],

    leave_allocations: {
      'EMP-001': { 'Casual Leave': 12, 'Sick Leave': 10, 'Earned Leave': 15, 'Compensatory Off': 2 },
      'EMP-002': { 'Casual Leave': 12, 'Sick Leave': 10, 'Earned Leave': 15, 'Compensatory Off': 1 },
      'EMP-003': { 'Casual Leave': 10, 'Sick Leave': 10, 'Earned Leave': 12, 'Compensatory Off': 0 },
      'EMP-004': { 'Casual Leave': 12, 'Sick Leave': 10, 'Earned Leave': 14, 'Compensatory Off': 1 },
      'EMP-005': { 'Casual Leave': 8, 'Sick Leave': 8, 'Earned Leave': 10, 'Compensatory Off': 0 },
      'EMP-006': { 'Casual Leave': 10, 'Sick Leave': 10, 'Earned Leave': 12, 'Compensatory Off': 1 },
      'EMP-007': { 'Casual Leave': 12, 'Sick Leave': 10, 'Earned Leave': 15, 'Compensatory Off': 0 },
      'EMP-008': { 'Casual Leave': 10, 'Sick Leave': 8, 'Earned Leave': 12, 'Compensatory Off': 0 },
      'EMP-009': { 'Casual Leave': 12, 'Sick Leave': 10, 'Earned Leave': 14, 'Compensatory Off': 1 }
    },

    leave_applications: [
      {
        name: 'LEAVE-2026-001',
        employee: 'EMP-002',
        employee_name: 'Nisha Verma',
        leave_type: 'Casual Leave',
        from_date: '2026-08-25',
        to_date: '2026-08-26',
        total_leave_days: 2,
        status: 'Open',
        description: 'Attending family celebration and personal errands.',
        posting_date: '2026-08-20',
        leave_approver: 'EMP-001'
      },
      {
        name: 'LEAVE-2026-002',
        employee: 'EMP-003',
        employee_name: 'Kabir Mehta',
        leave_type: 'Casual Leave',
        from_date: '2026-08-01',
        to_date: '2026-08-31',
        total_leave_days: 20,
        status: 'Approved',
        description: 'Annual paid leave and family travels.',
        posting_date: '2026-08-01',
        leave_approver: 'EMP-001'
      },
      {
        name: 'LEAVE-2026-003',
        employee: 'EMP-004',
        employee_name: 'Rohan Deshmukh',
        leave_type: 'Earned Leave',
        from_date: '2026-07-10',
        to_date: '2026-07-14',
        total_leave_days: 5,
        status: 'Approved',
        description: 'Annual vacation.',
        posting_date: '2026-07-01',
        leave_approver: 'EMP-001'
      },
      {
        name: 'LEAVE-2026-004',
        employee: 'EMP-005',
        employee_name: 'Pooja Nair',
        leave_type: 'Casual Leave',
        from_date: '2026-08-28',
        to_date: '2026-08-28',
        total_leave_days: 1,
        status: 'Open',
        description: 'Relocating apartment.',
        posting_date: '2026-08-21',
        leave_approver: 'EMP-001'
      },
      {
        name: 'LEAVE-2026-005',
        employee: 'EMP-007',
        employee_name: 'Priya Sengupta',
        leave_type: 'Sick Leave',
        from_date: '2026-08-15',
        to_date: '2026-08-25',
        total_leave_days: 10,
        status: 'Approved',
        description: 'Medical recovery leave.',
        posting_date: '2026-08-15',
        leave_approver: 'EMP-001'
      }
    ],

    attendance: [
      { name: 'ATT-2026-08-01', employee: 'EMP-002', employee_name: 'Nisha Verma', attendance_date: '2026-08-01', status: 'Present', working_hours: 8.5, late_entry: 0, early_exit: 0 },
      { name: 'ATT-2026-08-02', employee: 'EMP-002', employee_name: 'Nisha Verma', attendance_date: '2026-08-02', status: 'Present', working_hours: 8.2, late_entry: 0, early_exit: 0 },
      { name: 'ATT-2026-08-03', employee: 'EMP-002', employee_name: 'Nisha Verma', attendance_date: '2026-08-03', status: 'Present', working_hours: 8.8, late_entry: 0, early_exit: 0 },
      { name: 'ATT-2026-08-04', employee: 'EMP-002', employee_name: 'Nisha Verma', attendance_date: '2026-08-04', status: 'Present', working_hours: 8.0, late_entry: 0, early_exit: 0 },
      { name: 'ATT-2026-08-05', employee: 'EMP-002', employee_name: 'Nisha Verma', attendance_date: '2026-08-05', status: 'Present', working_hours: 9.0, late_entry: 0, early_exit: 0 },
      { name: 'ATT-2026-08-08', employee: 'EMP-002', employee_name: 'Nisha Verma', attendance_date: '2026-08-08', status: 'Present', working_hours: 8.3, late_entry: 0, early_exit: 0 },
      { name: 'ATT-2026-08-09', employee: 'EMP-002', employee_name: 'Nisha Verma', attendance_date: '2026-08-09', status: 'Present', working_hours: 8.5, late_entry: 0, early_exit: 0 },
      { name: 'ATT-2026-08-10', employee: 'EMP-002', employee_name: 'Nisha Verma', attendance_date: '2026-08-10', status: 'Present', working_hours: 8.1, late_entry: 0, early_exit: 0 },
      { name: 'ATT-2026-08-11', employee: 'EMP-002', employee_name: 'Nisha Verma', attendance_date: '2026-08-11', status: 'Work From Home', working_hours: 8.0, late_entry: 0, early_exit: 0 },
      { name: 'ATT-2026-08-12', employee: 'EMP-002', employee_name: 'Nisha Verma', attendance_date: '2026-08-12', status: 'Present', working_hours: 8.6, late_entry: 0, early_exit: 0 },
      { name: 'ATT-2026-08-15', employee: 'EMP-002', employee_name: 'Nisha Verma', attendance_date: '2026-08-15', status: 'On Leave', working_hours: 0, late_entry: 0, early_exit: 0 },
      { name: 'ATT-2026-08-16', employee: 'EMP-002', employee_name: 'Nisha Verma', attendance_date: '2026-08-16', status: 'Present', working_hours: 8.4, late_entry: 0, early_exit: 0 },
      { name: 'ATT-2026-08-17', employee: 'EMP-002', employee_name: 'Nisha Verma', attendance_date: '2026-08-17', status: 'Present', working_hours: 8.0, late_entry: 0, early_exit: 0 },
      { name: 'ATT-2026-08-18', employee: 'EMP-002', employee_name: 'Nisha Verma', attendance_date: '2026-08-18', status: 'Present', working_hours: 8.5, late_entry: 0, early_exit: 0 },
      { name: 'ATT-2026-08-19', employee: 'EMP-002', employee_name: 'Nisha Verma', attendance_date: '2026-08-19', status: 'Half Day', working_hours: 4.5, late_entry: 1, early_exit: 0 },
      { name: 'ATT-2026-08-22', employee: 'EMP-002', employee_name: 'Nisha Verma', attendance_date: '2026-08-22', status: 'Present', working_hours: 4.0, late_entry: 0, early_exit: 0 }
    ],

    checkins: [
      { name: 'CHK-001', employee: 'EMP-002', log_type: 'IN', time: '2026-08-22 09:32:15', latitude: 12.9716, longitude: 77.5946 },
      { name: 'CHK-002', employee: 'EMP-001', log_type: 'IN', time: '2026-08-22 09:15:00', latitude: 12.9716, longitude: 77.5946 },
      { name: 'CHK-004', employee: 'EMP-004', log_type: 'IN', time: '2026-08-22 09:40:11', latitude: 12.9716, longitude: 77.5946 },
      { name: 'CHK-005', employee: 'EMP-006', log_type: 'IN', time: '2026-08-22 08:50:00', latitude: 12.9716, longitude: 77.5946 },
      { name: 'CHK-006', employee: 'EMP-009', log_type: 'IN', time: '2026-08-22 09:05:30', latitude: 12.9716, longitude: 77.5946 }
    ],

    expense_claims: [
      {
        name: 'EXP-2026-001',
        employee: 'EMP-002',
        employee_name: 'Nisha Verma',
        expense_type: 'Travel',
        total_claimed_amount: 3450,
        total_sanctioned_amount: 3450,
        status: 'Unpaid',
        approval_status: 'Approved',
        posting_date: '2026-08-15',
        description: 'Client on-site architecture workshop cab & transit fares.',
        expense_approver: 'EMP-001'
      },
      {
        name: 'EXP-2026-002',
        employee: 'EMP-002',
        employee_name: 'Nisha Verma',
        expense_type: 'Food and Beverage',
        total_claimed_amount: 1200,
        total_sanctioned_amount: 0,
        status: 'Draft',
        approval_status: 'Draft',
        posting_date: '2026-08-21',
        description: 'Team sprint milestone celebratory dinner.',
        expense_approver: 'EMP-001'
      },
      {
        name: 'EXP-2026-003',
        employee: 'EMP-003',
        employee_name: 'Kabir Mehta',
        expense_type: 'Calls & Internet',
        total_claimed_amount: 1499,
        total_sanctioned_amount: 1499,
        status: 'Paid',
        approval_status: 'Approved',
        posting_date: '2026-08-02',
        description: 'Monthly broadband reimbursement.',
        expense_approver: 'EMP-001'
      }
    ],

    job_openings: [
      {
        name: 'JOB-2026-001',
        job_title: 'Staff Full Stack Engineer',
        department: 'Engineering',
        designation: 'Senior Frontend Engineer',
        vacancies: 2,
        status: 'Open',
        posted_date: '2026-08-01',
        description: 'Looking for a senior engineer with deep React, TypeScript, and distributed systems background.'
      },
      {
        name: 'JOB-2026-002',
        job_title: 'Senior Product Designer',
        department: 'Design',
        designation: 'UI/UX Designer',
        vacancies: 1,
        status: 'Open',
        posted_date: '2026-08-05',
        description: 'Drive the next-generation enterprise UX design systems across web and mobile platforms.'
      },
      {
        name: 'JOB-2026-003',
        job_title: 'Technical Talent Recruiter',
        department: 'Human Resources',
        designation: 'HR Executive',
        vacancies: 1,
        status: 'Closed',
        posted_date: '2026-07-15',
        description: 'Scale our engineering and AI talent acquisition across APAC.'
      }
    ],

    job_applicants: [
      {
        name: 'APP-2026-001',
        applicant_name: 'Varun Grover',
        email: 'varun.grover@devmail.io',
        phone: '+91 98877 66554',
        job_title: 'Staff Full Stack Engineer',
        job_opening: 'JOB-2026-001',
        status: 'Accepted',
        application_date: '2026-08-04',
        source: 'LinkedIn',
        rating: 5,
        notes: 'Outstanding system design track record. Cleared executive panel.'
      },
      {
        name: 'APP-2026-002',
        applicant_name: 'Sneha Kulkarni',
        email: 'sneha.k@designer.co',
        phone: '+91 97766 55443',
        job_title: 'Senior Product Designer',
        job_opening: 'JOB-2026-002',
        status: 'Replied',
        application_date: '2026-08-10',
        source: 'Dribbble',
        rating: 4,
        notes: 'Portfolio review passed with honors. Scheduling technical design round.'
      },
      {
        name: 'APP-2026-003',
        applicant_name: 'Ankit Rao',
        email: 'ankit.rao95@gmail.com',
        phone: '+91 96655 44332',
        job_title: 'Staff Full Stack Engineer',
        job_opening: 'JOB-2026-001',
        status: 'Open',
        application_date: '2026-08-18',
        source: 'Referral',
        rating: 3,
        notes: 'Resume screened. Ready for initial phone screening.'
      },
      {
        name: 'APP-2026-004',
        applicant_name: 'Tanya Sen',
        email: 'tanya.sen@outlook.com',
        phone: '+91 95544 33221',
        job_title: 'Staff Full Stack Engineer',
        job_opening: 'JOB-2026-001',
        status: 'Hold',
        application_date: '2026-08-12',
        source: 'Website',
        rating: 3,
        notes: 'Strong candidate, kept on warm hold for Q4 pipeline.'
      },
      {
        name: 'APP-2026-005',
        applicant_name: 'Deepak Chopra',
        email: 'deepak.c@tech.in',
        phone: '+91 94433 22110',
        job_title: 'Staff Full Stack Engineer',
        job_opening: 'JOB-2026-001',
        status: 'Rejected',
        application_date: '2026-08-08',
        source: 'Naukri',
        rating: 2,
        notes: 'Experience level not meeting staff seniority requirement.'
      }
    ],

    interviews: [
      {
        name: 'INT-2026-001',
        applicant: 'APP-2026-002',
        applicant_name: 'Sneha Kulkarni',
        job_opening: 'JOB-2026-002',
        job_title: 'Senior Product Designer',
        scheduled_date: '2026-08-25',
        from_time: '14:00',
        to_time: '15:00',
        interviewer: 'EMP-005 (Pooja Nair)',
        status: 'Scheduled',
        rating: 0,
        notes: 'Design System & Component architecture walkthrough.'
      },
      {
        name: 'INT-2026-002',
        applicant: 'APP-2026-001',
        applicant_name: 'Varun Grover',
        job_opening: 'JOB-2026-001',
        job_title: 'Staff Full Stack Engineer',
        scheduled_date: '2026-08-14',
        from_time: '16:00',
        to_time: '17:30',
        interviewer: 'EMP-001 (Aditi Sharma)',
        status: 'Cleared',
        rating: 5,
        notes: 'Exceptional cultural and technical alignment.'
      }
    ],

    onboarding_records: [
      {
        name: 'ONB-2026-001',
        employee: 'EMP-005',
        employee_name: 'Pooja Nair',
        department: 'Design',
        designation: 'UI/UX Designer',
        boarding_status: 'In Progress',
        activities: [
          { name: 'Submit Signed Offer Letter', completed: 1 },
          { name: 'Submit Tax & PAN Documents', completed: 1 },
          { name: 'Bank Account & Direct Deposit Setup', completed: 1 },
          { name: 'IT Laptop & Security Keys Allocation', completed: 1 },
          { name: 'Figma & Design Tokens Workspace Access', completed: 1 },
          { name: 'HR Benefits & Health Insurance Orientation', completed: 0 },
          { name: '30-Day Check-in with Department Lead', completed: 0 }
        ]
      },
      {
        name: 'ONB-2026-002',
        employee: 'EMP-004',
        employee_name: 'Rohan Deshmukh',
        department: 'Product',
        designation: 'Product Manager',
        boarding_status: 'Completed',
        activities: [
          { name: 'Submit Signed Offer Letter', completed: 1 },
          { name: 'Submit Tax & PAN Documents', completed: 1 },
          { name: 'Bank Account & Direct Deposit Setup', completed: 1 },
          { name: 'IT Equipment Allocation', completed: 1 },
          { name: 'Product Roadmap Alignment', completed: 1 },
          { name: 'HR Orientation', completed: 1 }
        ]
      }
    ],

    payroll_entries: [
      {
        name: 'PAY-2026-07',
        posting_date: '2026-07-31',
        start_date: '2026-07-01',
        end_date: '2026-07-31',
        payroll_frequency: 'Monthly',
        company: 'Dayflow Technologies',
        number_of_employees: 5,
        status: 'Submitted',
        total_amount: 585000
      },
      {
        name: 'PAY-2026-06',
        posting_date: '2026-06-30',
        start_date: '2026-06-01',
        end_date: '2026-06-30',
        payroll_frequency: 'Monthly',
        company: 'Dayflow Technologies',
        number_of_employees: 5,
        status: 'Submitted',
        total_amount: 585000
      }
    ],

    salary_slips: [
      {
        name: 'SLIP-2026-07-002',
        employee: 'EMP-002',
        employee_name: 'Nisha Verma',
        posting_date: '2026-07-31',
        start_date: '2026-07-01',
        end_date: '2026-07-31',
        gross_pay: 125000,
        total_deduction: 12500,
        net_pay: 112500,
        currency: 'INR',
        docstatus: 1,
        earnings: [
          { salary_component: 'Basic Salary', amount: 62500 },
          { salary_component: 'House Rent Allowance (HRA)', amount: 25000 },
          { salary_component: 'Special Allowance', amount: 27500 },
          { salary_component: 'Performance Bonus', amount: 10000 }
        ],
        deductions: [
          { salary_component: 'Provident Fund (PF)', amount: 7500 },
          { salary_component: 'Professional Tax (PT)', amount: 200 },
          { salary_component: 'Income Tax (TDS)', amount: 4800 }
        ]
      },
      {
        name: 'SLIP-2026-06-002',
        employee: 'EMP-002',
        employee_name: 'Nisha Verma',
        posting_date: '2026-06-30',
        start_date: '2026-06-01',
        end_date: '2026-06-30',
        gross_pay: 125000,
        total_deduction: 12500,
        net_pay: 112500,
        currency: 'INR',
        docstatus: 1,
        earnings: [
          { salary_component: 'Basic Salary', amount: 62500 },
          { salary_component: 'House Rent Allowance (HRA)', amount: 25000 },
          { salary_component: 'Special Allowance', amount: 27500 },
          { salary_component: 'Performance Bonus', amount: 10000 }
        ],
        deductions: [
          { salary_component: 'Provident Fund (PF)', amount: 7500 },
          { salary_component: 'Professional Tax (PT)', amount: 200 },
          { salary_component: 'Income Tax (TDS)', amount: 4800 }
        ]
      },
      {
        name: 'SLIP-2026-07-001',
        employee: 'EMP-001',
        employee_name: 'Aditi Sharma',
        posting_date: '2026-07-31',
        start_date: '2026-07-01',
        end_date: '2026-07-31',
        gross_pay: 160000,
        total_deduction: 18000,
        net_pay: 142000,
        currency: 'INR',
        docstatus: 1,
        earnings: [
          { salary_component: 'Basic Salary', amount: 80000 },
          { salary_component: 'House Rent Allowance (HRA)', amount: 32000 },
          { salary_component: 'Executive Special Allowance', amount: 48000 }
        ],
        deductions: [
          { salary_component: 'Provident Fund (PF)', amount: 9600 },
          { salary_component: 'Professional Tax (PT)', amount: 200 },
          { salary_component: 'Income Tax (TDS)', amount: 8200 }
        ]
      },
      {
        name: 'SLIP-2026-07-003',
        employee: 'EMP-003',
        employee_name: 'Kabir Mehta',
        posting_date: '2026-07-31',
        start_date: '2026-07-01',
        end_date: '2026-07-31',
        gross_pay: 110000,
        total_deduction: 11000,
        net_pay: 99000,
        currency: 'INR',
        docstatus: 1,
        earnings: [
          { salary_component: 'Basic Salary', amount: 55000 },
          { salary_component: 'HRA', amount: 22000 },
          { salary_component: 'Special Allowance', amount: 33000 }
        ],
        deductions: [
          { salary_component: 'PF', amount: 6600 },
          { salary_component: 'TDS', amount: 4400 }
        ]
      }
    ],

    announcements: [
      {
        name: 'ANN-001',
        subject: 'Dayflow Q3 All-Hands & Innovation Day',
        description: 'Join us this Thursday at 4 PM IST for our quarterly product roadmap reveal, team spotlights, and open Q&A with leadership. Refreshments provided at all regional hubs!',
        posted_by: 'Aditi Sharma (HR)',
        creation: '2026-08-20 11:30:00'
      },
      {
        name: 'ANN-002',
        subject: 'Annual Wellness & Healthcare Policy Updates',
        description: 'We have upgraded all employee and dependent medical insurance coverage. Digital health cards and mental wellness consultation benefits are now active on your portals.',
        posted_by: 'Aditi Sharma (HR)',
        creation: '2026-08-10 09:15:00'
      }
    ],

    holidays: [
      { name: 'HOL-001', holiday_date: '2026-08-15', description: 'Independence Day' },
      { name: 'HOL-002', holiday_date: '2026-10-02', description: 'Mahatma Gandhi Jayanti' },
      { name: 'HOL-003', holiday_date: '2026-10-20', description: 'Dussehra / Vijayadashami' },
      { name: 'HOL-004', holiday_date: '2026-11-08', description: 'Diwali (Deepavali)' },
      { name: 'HOL-005', holiday_date: '2026-12-25', description: 'Christmas Day' }
    ],

    notifications: [
      { id: 1, user: 'EMP-001', text: 'Nisha Verma submitted a Casual Leave request for Aug 25-26.', type: 'leave', creation: '2026-08-20 10:15', read: 0 },
      { id: 2, user: 'EMP-001', text: 'Pooja Nair submitted a Casual Leave request for Aug 28.', type: 'leave', creation: '2026-08-21 09:30', read: 0 },
      { id: 3, user: 'EMP-001', text: 'Nisha Verma submitted an expense claim of ₹1,200 for review.', type: 'expense', creation: '2026-08-21 14:00', read: 0 },
      { id: 4, user: 'EMP-002', text: 'July 2026 Salary Slip has been published and is ready for download.', type: 'payroll', creation: '2026-07-31 18:00', read: 1 },
      { id: 5, user: 'EMP-002', text: 'Your expense claim EXP-2026-001 of ₹3,450 was approved by HR.', type: 'expense', creation: '2026-08-16 11:20', read: 1 }
    ]
  };

  // =========================================================================
  // 2. STORE ENGINE & PERSISTENCE
  // =========================================================================

  const STORAGE_KEY = 'dayflow_hrms_data_v3';
  const SESSION_KEY = 'dayflow_hrms_session_v3';

  // Central REST API client. All mutations go through the backend, which is
  // the single source of truth — clients never push the whole database.
  const API = {
    online: false,
    async req(path, method = 'GET', body) {
      let res;
      try {
        res = await fetch(path, {
          method,
          headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
          body: body !== undefined ? JSON.stringify(body) : undefined
        });
      } catch (err) {
        const e = new Error('Server unreachable. Running in offline mode.');
        e.isNetwork = true;
        throw e;
      }
      let json = null;
      try { json = await res.json(); } catch (err) {}
      if (!res.ok) {
        const e = new Error((json && json.error) || `Request failed (${res.status})`);
        e.status = res.status;
        throw e;
      }
      return json;
    },
    get(path) { return this.req(path, 'GET'); },
    post(path, body) { return this.req(path, 'POST', body || {}); },
    put(path, body) { return this.req(path, 'PUT', body || {}); }
  };

  function todayStr() {
    return (store && store.data && store.data.today) || new Date().toISOString().split('T')[0];
  }

  class Store {
    constructor() {
      this.data = this.load();
      this.listeners = [];
      this.initServerSync();
    }

    load() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (e) {
        console.warn('Failed to parse stored HRMS data:', e);
      }
      return JSON.parse(JSON.stringify(INITIAL_DATA));
    }

    // Local persistence only (cache). The server is authoritative.
    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      } catch (e) {
        console.error('Failed to persist HRMS data locally:', e);
      }
      this.notify();
    }

    // Fetch the authoritative snapshot from the backend.
    async reload() {
      try {
        const snap = await API.get('/api/data');
        API.online = true;
        if (snap && Array.isArray(snap.employees) && snap.employees.length > 0) {
          this.data = snap;
          this.save();
        }
        return true;
      } catch (err) {
        if (err.isNetwork) API.online = false;
        return false;
      }
    }

    async initServerSync() {
      if (typeof fetch === 'undefined') return;

      await this.reload();

      // Cross-tab synchronization via storage event (offline mode)
      if (typeof window !== 'undefined') {
        window.addEventListener('storage', (e) => {
          if (e.key === STORAGE_KEY && e.newValue && !API.online) {
            try {
              this.data = JSON.parse(e.newValue);
              this.notify();
              renderApp();
            } catch (err) {}
          }
        });

        // Poll the backend for revision changes. The server bumps `rev` on
        // every mutation, so HR and Employee sessions converge automatically.
        setInterval(async () => {
          try {
            const snap = await API.get('/api/data');
            API.online = true;
            if (snap && snap.rev !== undefined && snap.rev !== this.data.rev) {
              this.data = snap;
              this.save();
              const ae = document.activeElement;
              const typing = ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA' || ae.tagName === 'SELECT');
              if (!typing && !activeModal) renderApp();
              // Read-only live modals (e.g. punch log) refresh in place
              if (activeModal && activeModalLiveTag) renderModal();
            }
          } catch (e) { /* backend temporarily unreachable */ }
        }, 3000);
      }
    }

    async reset() {
      try {
        await API.post('/api/reset');
        await this.reload();
        return;
      } catch (e) {
        console.warn('Server reset unavailable, resetting locally:', e.message);
      }
      this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
      this.save();
    }

    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }

    notify() {
      this.listeners.forEach(fn => fn(this.data));
    }
  }

  const store = new Store();

  // Standard action wrapper: run against the backend, refresh the snapshot,
  // fall back to a local mutation when the server is unreachable.
  // localFn must return true when the local mutation actually happened.
  async function runAction(serverFn, localFn, successMsg) {
    let ok = false;
    try {
      await serverFn();
      await store.reload();
      ok = true;
    } catch (err) {
      if (err.isNetwork) {
        if (localFn) ok = localFn() !== false;
        store.save();
      } else {
        showToast('danger', err.message);
      }
    }
    renderApp();
    if (ok && successMsg) showToast('success', successMsg);
    return ok;
  }

  // =========================================================================
  // 3. ERPNEXT / FRAPPE API COMPATIBILITY LAYER
  // =========================================================================

  const erpnext = {
    async getList(doctype, options = {}) {
      const dtKey = doctype.toLowerCase().replace(/\s+/g, '_') + 's';
      let items = store.data[dtKey] || [];
      if (!Array.isArray(items)) {
        // Map common aliases
        if (doctype === 'Leave Application') items = store.data.leave_applications || [];
        else if (doctype === 'Employee Checkin') items = store.data.checkins || [];
        else if (doctype === 'Expense Claim') items = store.data.expense_claims || [];
        else if (doctype === 'Shift Type') items = store.data.shift_types || [];
        else if (doctype === 'Shift Request') items = store.data.shift_requests || [];
        else if (doctype === 'Job Opening') items = store.data.job_openings || [];
        else if (doctype === 'Job Applicant') items = store.data.job_applicants || [];
        else if (doctype === 'Salary Slip') items = store.data.salary_slips || [];
        else if (doctype === 'Payroll Entry') items = store.data.payroll_entries || [];
        else if (doctype === 'Employee Onboarding') items = store.data.onboarding_records || [];
        else if (doctype === 'Company Announcement') items = store.data.announcements || [];
        else if (doctype === 'Holiday') items = store.data.holidays || [];
        else if (doctype === 'Attendance') items = store.data.attendance || [];
        else items = [];
      }

      // Filter handling
      let result = [...items];
      if (options.filters) {
        if (Array.isArray(options.filters)) {
          for (const f of options.filters) {
            if (Array.isArray(f) && f.length === 3) {
              const [k, op, v] = f;
              result = result.filter(item => {
                if (op === '=') return item[k] === v;
                if (op === '!=') return item[k] !== v;
                if (op === '>=') return item[k] >= v;
                if (op === '<=') return item[k] <= v;
                if (op === 'like') return String(item[k] || '').toLowerCase().includes(String(v || '').toLowerCase());
                return true;
              });
            }
          }
        } else if (typeof options.filters === 'object') {
          for (const [k, v] of Object.entries(options.filters)) {
            result = result.filter(item => {
              if (Array.isArray(v) && v[0] === 'between') {
                return item[k] >= v[1][0] && item[k] <= v[1][1];
              }
              if (Array.isArray(v) && v[0] === '!=') return item[k] !== v[1];
              if (Array.isArray(v) && v[0] === '>=') return item[k] >= v[1];
              if (Array.isArray(v) && v[0] === '<=') return item[k] <= v[1];
              return item[k] === v;
            });
          }
        }
      }

      if (options.order_by) {
        const parts = options.order_by.split(' ');
        const field = parts[0];
        const asc = parts[1] !== 'desc';
        result.sort((a, b) => {
          const va = a[field] ?? '';
          const vb = b[field] ?? '';
          return asc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
        });
      }

      if (options.limit_page_length && options.limit_page_length > 0) {
        result = result.slice(0, options.limit_page_length);
      }

      return result;
    },

    async getDoc(doctype, name) {
      const list = await this.getList(doctype);
      return list.find(item => item.name === name) || null;
    },

    async insert(doctype, doc) {
      const dtKey = doctype.toLowerCase().replace(/\s+/g, '_') + 's';
      let items = store.data[dtKey];
      if (!Array.isArray(items)) {
        if (doctype === 'Leave Application') items = store.data.leave_applications;
        else if (doctype === 'Employee Checkin') items = store.data.checkins;
        else if (doctype === 'Expense Claim') items = store.data.expense_claims;
        else if (doctype === 'Shift Request') items = store.data.shift_requests;
        else if (doctype === 'Job Opening') items = store.data.job_openings;
        else if (doctype === 'Job Applicant') items = store.data.job_applicants;
        else if (doctype === 'Interview') items = store.data.interviews;
        else if (doctype === 'Employee') items = store.data.employees;
        else if (doctype === 'Company Announcement') items = store.data.announcements;
        else if (doctype === 'Payroll Entry') items = store.data.payroll_entries;
        else if (doctype === 'Salary Slip') items = store.data.salary_slips;
        else items = [];
      }

      const count = (items?.length || 0) + 1;
      const prefix = doctype.split(' ').map(w => w[0]).join('').toUpperCase();
      const newDoc = {
        name: doc.name || `${prefix}-${new Date().getFullYear()}-${String(count).padStart(3, '0')}`,
        creation: new Date().toISOString().replace('T', ' ').substring(0, 19),
        ...doc
      };
      items.unshift(newDoc);
      store.save();
      return newDoc;
    },

    async updateDoc(doctype, name, values) {
      const list = await this.getList(doctype);
      const target = list.find(i => i.name === name);
      if (target) {
        Object.assign(target, values);
        store.save();
      }
      return target;
    },

    async callMethod(method, args = {}) {
      if (method === 'hrms.api.get_leave_balance_map') {
        return store.data.leave_allocations;
      }
      if (method === 'frappe.client.insert') {
        return this.insert(args.doc.doctype, args.doc);
      }
      return { message: 'ok' };
    }
  };

  // =========================================================================
  // 4. AUTH & SESSION STORE
  // =========================================================================

  let session = (function () {
    try {
      const s = localStorage.getItem(SESSION_KEY);
      if (s) return JSON.parse(s);
    } catch (e) {
      console.warn('Session parse error:', e);
    }
    return null;
  })();

  function saveSession(s) {
    session = s;
    if (s) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }

  function getActiveEmployee() {
    if (!session || !session.employeeId) return null;
    return store.data.employees.find(e => e.name === session.employeeId) || null;
  }

  // =========================================================================
  // 5. TOAST NOTIFICATION SERVICE
  // =========================================================================

  const toasts = [];
  let toastIdSeq = 1;

  function showToast(type, message) {
    const id = toastIdSeq++;
    toasts.push({ id, type, message });
    renderToasts();
    setTimeout(() => {
      const idx = toasts.findIndex(t => t.id === id);
      if (idx !== -1) {
        toasts.splice(idx, 1);
        renderToasts();
      }
    }, 4000);
  }

  function renderToasts() {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    container.innerHTML = toasts.map(t => `
      <div class="toast ${t.type}">
        <span>${t.type === 'success' ? '✓' : t.type === 'danger' ? '✕' : 'ℹ'}</span>
        <span>${escapeHtml(t.message)}</span>
      </div>
    `).join('');
  }

  // =========================================================================
  // 6. MODAL & DIALOG SYSTEM
  // =========================================================================

  let activeModal = null;
  let activeModalLiveTag = null; // set for read-only modals that should auto-refresh on data changes

  function openModal(templateFn, liveTag) {
    activeModal = templateFn;
    activeModalLiveTag = liveTag || null;
    renderModal();
  }

  function closeModal() {
    activeModal = null;
    activeModalLiveTag = null;
    renderModal();
  }

  window.openModal = openModal;
  window.closeModal = closeModal;

  function renderModal() {
    let host = document.getElementById('modal-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'modal-host';
      document.body.appendChild(host);
    }
    if (!activeModal) {
      host.innerHTML = '';
      return;
    }
    host.innerHTML = activeModal();
  }

  // =========================================================================
  // 7. UTILITIES & HELPERS
  // =========================================================================

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatCurrency(amount, currency = 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(amount || 0);
  }

  function formatDate(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  // ISO date string offset by N days from today
  function dateOffset(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  }

  // '09:30:00' | '09:30' -> '09:30 AM'
  function fmtTime12(t) {
    if (!t) return '—';
    const parts = String(t).split(':');
    let h = parseInt(parts[0], 10);
    const m = parts[1] || '00';
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${String(h).padStart(2, '0')}:${m} ${ampm}`;
  }

  function getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function nameToColor(name) {
    const colors = ['#2563eb', '#059669', '#7c3aed', '#d97706', '#dc2626', '#0284c7', '#4f46e5', '#0d9488'];
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) hash = (name.charCodeAt(i) + ((hash << 5) - hash));
    return colors[Math.abs(hash) % colors.length];
  }

  // Attendance & work status calculator (uses backend-computed live map when
  // connected; recomputes locally as offline fallback)
  function getLiveAttendance(empId) {
    const live = store.data.live_attendance;
    if (live && live[empId]) return live[empId];
    // Offline fallback: derive from checkins/leaves for the real today
    const t = new Date().toISOString().split('T')[0];
    const punches = store.data.checkins
      .filter(c => c.employee === empId && String(c.time).startsWith(t))
      .sort((a, b) => (a.time < b.time ? -1 : 1));
    const leave = store.data.leave_applications.find(l =>
      l.employee === empId && l.status === 'Approved' && l.from_date <= t && l.to_date >= t);
    let minutes = 0, openIn = null;
    for (const p of punches) {
      if (p.log_type === 'IN') openIn = new Date(p.time.replace(' ', 'T')).getTime();
      else if (openIn) { minutes += Math.max(0, (new Date(p.time.replace(' ', 'T')).getTime() - openIn) / 60000); openIn = null; }
    }
    if (openIn) minutes += Math.max(0, (Date.now() - openIn) / 60000);
  const ins = punches.filter(p => p.log_type === 'IN');
  const outs = punches.filter(p => p.log_type === 'OUT');
  const currentlyIn = punches.length > 0 && punches[punches.length - 1].log_type === 'IN';
  return {
    status: leave ? 'On Leave' : punches.length === 0 ? 'Absent' : (currentlyIn ? 'Present' : 'Checked Out'),
    currently_in: currentlyIn,
    first_in: ins.length ? String(ins[0].time).split(' ')[1].substring(0, 5) : null,
    last_in: ins.length ? String(ins[ins.length - 1].time).split(' ')[1].substring(0, 5) : null,
    last_out: outs.length ? String(outs[outs.length - 1].time).split(' ')[1].substring(0, 5) : null,
    total_minutes: Math.round(minutes),
    punch_count: punches.length,
    leave_type: leave ? leave.leave_type : null
  };
}

  // Elapsed-time helpers — always computed fresh from the (server-synced)
  // punch records so durations keep ticking between punches.
  function todaysPunchList(empId) {
    const t = new Date().toISOString().split('T')[0];
    return store.data.checkins
      .filter(c => c.employee === empId && String(c.time).startsWith(t))
      .sort((a, b) => (a.time < b.time ? -1 : 1));
  }

  function hasPunchedToday(empId) {
    return todaysPunchList(empId).length > 0;
  }

  function liveWorkingMinutes(empId) {
    let minutes = 0;
    let openIn = null;
    for (const p of todaysPunchList(empId)) {
      if (p.log_type === 'IN') openIn = new Date(p.time.replace(' ', 'T')).getTime();
      else if (openIn) {
        minutes += Math.max(0, (new Date(p.time.replace(' ', 'T')).getTime() - openIn) / 60000);
        openIn = null;
      }
    }
    if (openIn) minutes += Math.max(0, (Date.now() - openIn) / 60000);
    return Math.round(minutes);
  }

  function fmtDuration(minutes) {
    if (minutes <= 0) return '< 1m';
    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);
    return `${h}h ${m}m`;
  }

  function getEmployeeWorkStatus(empId) {
    const live = getLiveAttendance(empId);

    if (live.status === 'On Leave') {
      return {
        status: 'leave',
        label: 'On Leave',
        iconHtml: '<span class="card-status-icon icon-plane" title="Employee is on leave">' + ICONS.plane + '</span>',
        badgeClass: 'badge-warning',
        description: `On Leave (${live.leave_type || 'Approved'})`
      };
    }

    if (live.currently_in) {
      return {
        status: 'present',
        label: 'Present',
        iconHtml: '<span class="card-status-dot dot-green" title="Employee is present in the office"></span>',
        badgeClass: 'badge-success',
        description: `Present (In since ${live.last_in || live.first_in || '—'})`
      };
    }

    if (live.punch_count > 0) {
      return {
        status: 'checked_out',
        label: 'Checked Out',
        iconHtml: '<span class="card-status-dot dot-blue" title="Employee completed the shift today"></span>',
        badgeClass: 'badge-info',
        description: `Present (Checked out at ${live.last_out || '—'})`
      };
    }

    return {
      status: 'absent',
      label: 'Absent',
      iconHtml: '<span class="card-status-dot dot-yellow" title="Employee is absent (has not applied time off)"></span>',
      badgeClass: 'badge-danger',
      description: 'Absent (No time off applied)'
    };
  }

  // Most recent check-in time today (for the systray "Since ..." label)
  function getLatestCheckinTime(empId) {
    const t = new Date().toISOString().split('T')[0];
    const ins = store.data.checkins
      .filter(c => c.employee === empId && c.log_type === 'IN' && String(c.time).startsWith(t))
      .sort((a, b) => (a.time < b.time ? 1 : -1));
    const checkin = ins[0];
    if (!checkin) return '—';
    const timeStr = checkin.time.split(' ')[1] || '09:15:00';
    const parts = timeStr.split(':');
    let hours = parseInt(parts[0], 10);
    const minutes = parts[1] || '00';
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
  }

  // =========================================================================
  // 8. ROUTING & CONTROLLER
  // =========================================================================

  let currentRoute = '#employees';
  let routeParams = {};
  let mobileSidebarOpen = false;

  function parseHash() {
    const isHR = session && session.role === 'HR / Admin';
    const defaultHash = isHR ? '#employees' : '#attendance';
    let hash = window.location.hash || defaultHash;
    const parts = hash.split('/');
    currentRoute = parts[0];

    // Restrict Employee Portal from HR-only routes & removed sections
    if (!isHR) {
      const hrOnlyRoutes = [
        '#dashboard',
        '#employees',
        '#employee-new',
        '#settings',
        '#leave-approvals',
        '#payroll',
        '#payroll-run',
        '#payroll-slips',
        '#recruitment',
        '#recruitment-applicants',
        '#recruitment-interviews',
        '#onboarding',
        '#reports'
      ];
      if (hrOnlyRoutes.includes(currentRoute)) {
        currentRoute = '#attendance';
        hash = '#attendance';
      }
    }

    routeParams = { id: parts[1] || null, sub: parts[2] || null };
  }

  window.addEventListener('hashchange', () => {
    parseHash();
    mobileSidebarOpen = false;
    renderApp();
  });

  // Clock tick timer for Checkin widget
  let liveTime = new Date();
  setInterval(() => {
    liveTime = new Date();
    const clockEl = document.getElementById('live-clock-text');
    if (clockEl) {
      clockEl.textContent = liveTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    }
  }, 1000);

  // Live duration ticker — elapsed work durations, shift hours, and the systray
  // "Since" label are pure arithmetic on punch data we already hold, so they are
  // recomputed in place every 15s without a server round-trip or full re-render.
  setInterval(() => {
    try {
      if (!session || !session.authenticated) return;
      const emp = getActiveEmployee();
      if (!emp) return;

      // Check-in page "Shift Hours Today"
      const shiftHrsEl = document.getElementById('shift-hours-today');
      if (shiftHrsEl && hasPunchedToday(emp.name)) {
        shiftHrsEl.textContent = fmtDuration(liveWorkingMinutes(emp.name));
      }

      // Topbar systray "Since" label
      const sinceEl = document.getElementById('systray-since-text');
      if (sinceEl) sinceEl.textContent = `Since ${getLatestCheckinTime(emp.name)}`;

      // HR attendance table duration cells
      document.querySelectorAll('[data-duration-for]').forEach(td => {
        const empId = td.getAttribute('data-duration-for');
        if (hasPunchedToday(empId)) {
          td.textContent = fmtDuration(liveWorkingMinutes(empId));
        }
      });
    } catch (e) { /* ticker is best-effort */ }
  }, 15000);

  // =========================================================================
  // 9. VIEW TEMPLATES (COMPONENTS)
  // =========================================================================

  function renderApp() {
    const root = document.getElementById('app');
    if (!root) return;

    if (!session || !session.authenticated) {
      root.innerHTML = renderAuthView();
      bindAuthEvents();
      return;
    }

    if (!getActiveEmployee()) {
      // Logged-in employee no longer exists in the database — force re-auth
      saveSession(null);
      root.innerHTML = renderAuthView();
      bindAuthEvents();
      return;
    }

    const emp = getActiveEmployee();
    const isHR = session.role === 'HR / Admin';
    const empStatus = emp ? getEmployeeWorkStatus(emp.name) : { status: 'absent' };

    root.innerHTML = `
      <div class="app-layout">
        ${mobileSidebarOpen ? '<div class="sidebar-backdrop" onclick="window.toggleMobileSidebar()"></div>' : ''}
        
        <!-- SIDEBAR -->
        <aside class="sidebar ${mobileSidebarOpen ? 'open' : ''}">
          <div class="sidebar-header">
            <div class="sidebar-brand">
              <div class="brand-logo">D</div>
              <span>Dayflow</span>
              <small>${isHR ? 'HR Core' : 'Employee Portal'}</small>
            </div>
          </div>

          <div class="sidebar-content">
            <!-- MAIN SECTION (WORKFORCE HUB) -->
            <div>
              <div class="nav-group-title">Workforce Hub</div>
              <ul class="nav-list">
                ${isHR ? `
                  <li class="nav-item ${currentRoute === '#employees' || currentRoute === '#employee' || currentRoute === '#employee-new' ? 'active' : ''}">
                    <button onclick="window.location.hash='#employees'">
                      <span class="nav-icon">${ICONS.users}</span>
                      <span>Employees</span>
                      <span class="nav-badge">${store.data.employees.length}</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#attendance' ? 'active' : ''}">
                    <button onclick="window.location.hash='#attendance'">
                      <span class="nav-icon">${ICONS.calendar}</span>
                      <span>Attendance</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#leave-approvals' ? 'active' : ''}">
                    <button onclick="window.location.hash='#leave-approvals'">
                      <span class="nav-icon">${ICONS.sun}</span>
                      <span>Leave Approvals</span>
                      <span class="nav-badge">${store.data.leave_applications.filter(l => l.status === 'Open').length}</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#dashboard' ? 'active' : ''}">
                    <button onclick="window.location.hash='#dashboard'">
                      <span class="nav-icon">${ICONS.chart}</span>
                      <span>HR Dashboard</span>
                    </button>
                  </li>
                ` : `
                  <li class="nav-item ${currentRoute === '#attendance' ? 'active' : ''}">
                    <button onclick="window.location.hash='#attendance'">
                      <span class="nav-icon">${ICONS.calendar}</span>
                      <span>Attendance</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#leave' ? 'active' : ''}">
                    <button onclick="window.location.hash='#leave'">
                      <span class="nav-icon">${ICONS.sun}</span>
                      <span>Time Off</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#payslip' ? 'active' : ''}">
                    <button onclick="window.location.hash='#payslip'">
                      <span class="nav-icon">${ICONS.card}</span>
                      <span>My Payslips</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#expenses' ? 'active' : ''}">
                    <button onclick="window.location.hash='#expenses'">
                      <span class="nav-icon">${ICONS.receipt}</span>
                      <span>Expense Claims</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#shifts' ? 'active' : ''}">
                    <button onclick="window.location.hash='#shifts'">
                      <span class="nav-icon">${ICONS.repeat}</span>
                      <span>Shift Requests</span>
                    </button>
                  </li>
                `}
              </ul>
            </div>

            <!-- HR / ADMIN OPERATIONS -->
            ${isHR ? `
              <div>
                <div class="nav-group-title">Talent & Operations</div>
                <ul class="nav-list">
                  <li class="nav-item ${currentRoute === '#onboarding' ? 'active' : ''}">
                    <button onclick="window.location.hash='#onboarding'">
                      <span class="nav-icon">${ICONS.rocket}</span>
                      <span>Onboarding</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#recruitment' ? 'active' : ''}">
                    <button onclick="window.location.hash='#recruitment'">
                      <span class="nav-icon">${ICONS.briefcase}</span>
                      <span>Job Openings</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#recruitment-applicants' ? 'active' : ''}">
                    <button onclick="window.location.hash='#recruitment-applicants'">
                      <span class="nav-icon">${ICONS.target}</span>
                      <span>Applicants Board</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#recruitment-interviews' ? 'active' : ''}">
                    <button onclick="window.location.hash='#recruitment-interviews'">
                      <span class="nav-icon">${ICONS.mic}</span>
                      <span>Interviews</span>
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <div class="nav-group-title">Payroll & Compensation</div>
                <ul class="nav-list">
                  <li class="nav-item ${currentRoute === '#payroll' ? 'active' : ''}">
                    <button onclick="window.location.hash='#payroll'">
                      <span class="nav-icon">${ICONS.dollar}</span>
                      <span>Payroll Overview</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#payroll-run' ? 'active' : ''}">
                    <button onclick="window.location.hash='#payroll-run'">
                      <span class="nav-icon">${ICONS.zap}</span>
                      <span>Run Payroll</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#payroll-slips' ? 'active' : ''}">
                    <button onclick="window.location.hash='#payroll-slips'">
                      <span class="nav-icon">${ICONS.fileText}</span>
                      <span>Salary Slips</span>
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <div class="nav-group-title">Analytics & Intelligence</div>
                <ul class="nav-list">
                  <li class="nav-item ${currentRoute === '#reports' ? 'active' : ''}">
                    <button onclick="window.location.hash='#reports'">
                      <span class="nav-icon">${ICONS.activity}</span>
                      <span>Reports & Insights</span>
                    </button>
                  </li>
                </ul>
              </div>
            ` : ''}

            <!-- GENERAL / COMPANY -->
            <div>
              <div class="nav-group-title">Company</div>
              <ul class="nav-list">
                <li class="nav-item ${currentRoute === '#directory' ? 'active' : ''}">
                  <button onclick="window.location.hash='#directory'">
                    <span class="nav-icon">${ICONS.building}</span>
                    <span>Team Directory</span>
                  </button>
                </li>
                <li class="nav-item ${currentRoute === '#announcements' ? 'active' : ''}">
                  <button onclick="window.location.hash='#announcements'">
                    <span class="nav-icon">${ICONS.speaker}</span>
                    <span>Announcements</span>
                  </button>
                </li>
                ${isHR ? `
                  <li class="nav-item ${currentRoute === '#settings' ? 'active' : ''}">
                    <button onclick="window.location.hash='#settings'">
                      <span class="nav-icon">${ICONS.settings}</span>
                      <span>Settings</span>
                    </button>
                  </li>
                ` : ''}
              </ul>
            </div>
          </div>

          <!-- SIDEBAR FOOTER -->
          <div class="sidebar-footer">
            <div class="user-quick-card">
              <div class="user-avatar-sm" style="background: ${nameToColor(emp?.employee_name)}22; color: ${nameToColor(emp?.employee_name)};">
                ${getInitials(emp?.employee_name)}
              </div>
              <div class="user-info-text">
                <div class="user-name-text">${escapeHtml(emp?.employee_name || 'User')}</div>
                <div class="user-role-text">${escapeHtml(session.role)}</div>
              </div>
            </div>
            
            <button class="role-switcher-btn" onclick="window.toggleRole()">
              <span>Switch to ${isHR ? 'Employee Portal' : 'HR Admin'}</span>
              <span>⇄</span>
            </button>
          </div>
        </aside>

        <!-- MAIN WORKSPACE -->
        <div class="main-workspace">
          <!-- TOPBAR WITH COMPANY LOGO, NAV TABS, SYSTRAY CHECK IN/OUT & PROFILE AVATAR -->
          <header class="topbar">
            <div class="topbar-left">
              <button class="mobile-menu-toggle" onclick="window.toggleMobileSidebar()">${ICONS.menu}</button>
              <div class="sidebar-brand" style="cursor: pointer;" onclick="window.location.hash='${isHR ? '#employees' : '#attendance'}'">
                <div class="brand-logo" style="width: 30px; height: 30px; font-size: 15px;">D</div>
                <span style="font-weight: 700; font-size: 16px; color: var(--text-primary); letter-spacing: -0.3px;">Dayflow</span>
              </div>

              <!-- TOPBAR NAVIGATION TABS -->
              <nav class="topbar-nav">
                ${isHR ? `
                  <a href="#employees" class="topbar-nav-link ${currentRoute === '#employees' || currentRoute === '#employee' || currentRoute === '#employee-new' ? 'active' : ''}">
                    Employees
                  </a>
                ` : ''}
                <a href="#attendance" class="topbar-nav-link ${currentRoute === '#attendance' ? 'active' : ''}">
                  Attendance
                </a>
                <a href="${isHR ? '#leave-approvals' : '#leave'}" class="topbar-nav-link ${currentRoute === '#leave' || currentRoute === '#leave-approvals' ? 'active' : ''}">
                  Time Off
                </a>
                ${!isHR ? `
                  <a href="#directory" class="topbar-nav-link ${currentRoute === '#directory' ? 'active' : ''}">
                    Directory
                  </a>
                ` : ''}
              </nav>
            </div>

            <div class="topbar-right">
              <!-- CHECK IN / CHECK OUT SYSTRAY WIDGET -->
              <div class="topbar-systray">
                ${empStatus.status === 'present' ? `
                  <button class="systray-btn checked-in" onclick="window.handlePunch('OUT')" title="You are currently Checked In. Click to Check Out.">
                    <span class="systray-dot-green"></span>
                    <span class="systray-text" id="systray-since-text">Since ${getLatestCheckinTime(emp?.name)}</span>
                    <span class="systray-action">Check Out &rarr;</span>
                  </button>
                ` : `
                  <button class="systray-btn checked-out" onclick="window.handlePunch('IN')" title="You are currently Checked Out. Click to Check In.">
                    <span class="systray-dot-red"></span>
                    <span class="systray-action">Check IN &rarr;</span>
                  </button>
                `}
              </div>

              <div class="badge ${isHR ? 'badge-purple' : 'badge-info'}" style="margin: 0 4px;">
                <span class="badge-dot"></span>
                <span>${escapeHtml(session.role)}</span>
              </div>

              <button class="icon-btn" onclick="window.location.hash='#notifications'" title="Notifications">
                ${ICONS.bell}
                ${getUnreadCount() > 0 ? `<span class="notification-count">${getUnreadCount()}</span>` : ''}
              </button>

              <!-- PROFILE AVATAR WITH LIVE ATTENDANCE STATUS DOT -->
              <div class="profile-dropdown-container">
                <button class="profile-avatar-btn" onclick="window.toggleUserMenu()" title="User Profile Menu">
                  <div class="avatar-with-status">
                    ${emp?.image ? `
                      <img src="${escapeHtml(emp.image)}" alt="${escapeHtml(emp.employee_name)}" class="topbar-avatar-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                      <div class="topbar-avatar-initials" style="display: none; background: ${nameToColor(emp?.employee_name)}22; color: ${nameToColor(emp?.employee_name)};">
                        ${getInitials(emp?.employee_name)}
                      </div>
                    ` : `
                      <div class="topbar-avatar-initials" style="background: ${nameToColor(emp?.employee_name)}22; color: ${nameToColor(emp?.employee_name)};">
                        ${getInitials(emp?.employee_name)}
                      </div>
                    `}
                    <span class="avatar-live-status ${empStatus.status === 'present' ? 'live-green' : 'live-red'}" title="${empStatus.status === 'present' ? 'Checked In (Present)' : 'Checked Out (Absent)'}"></span>
                  </div>
                </button>
                
                <div id="user-menu-dropdown" class="dropdown-menu" style="display: none;">
                  <div class="dropdown-user-header">
                    <div class="dropdown-user-name">${escapeHtml(emp?.employee_name || 'User')}</div>
                    <div class="dropdown-user-email">${escapeHtml(emp?.company_email || '')}</div>
                    <div class="dropdown-user-status">
                      <span class="card-status-dot ${empStatus.status === 'present' ? 'dot-green' : 'dot-red'}"></span>
                      <span>${empStatus.status === 'present' ? 'Currently Checked In' : 'Currently Checked Out'}</span>
                    </div>
                  </div>
                  <button class="dropdown-item" onclick="window.location.hash='#profile'; window.toggleUserMenu();">
                    My Profile
                  </button>
                  <button class="dropdown-item" onclick="window.handlePunch('${empStatus.status === 'present' ? 'OUT' : 'IN'}'); window.toggleUserMenu();">
                    ${empStatus.status === 'present' ? 'Check Out Now' : 'Check In Now'}
                  </button>
                  <button class="dropdown-item" onclick="window.toggleRole(); window.toggleUserMenu();">
                    ⇄ Switch Mode (${isHR ? 'Employee' : 'HR Admin'})
                  </button>
                  ${isHR ? `
                    <button class="dropdown-item" onclick="window.location.hash='#settings'; window.toggleUserMenu();">
                      Settings
                    </button>
                  ` : ''}
                  <div class="dropdown-divider"></div>
                  <button class="dropdown-item dropdown-logout" style="color: var(--danger);" onclick="window.logout()">
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </header>

          <!-- PAGE BODY -->
          <main class="page-container">
            ${renderRouteContent()}
          </main>
        </div>
      </div>
    `;

    bindPageEvents();
  }

  function getRouteTitle() {
    switch (currentRoute) {
      case '#dashboard': return 'Dashboard';
      case '#checkin': return 'Attendance Check In / Out';
      case '#attendance': return session.role === 'HR / Admin' ? 'Workforce Attendance' : 'Monthly Attendance';
      case '#leave': return 'Leave Management';
      case '#leave-approvals': return 'Leave Approvals';
      case '#payslip': return 'Salary Slips';
      case '#payroll': return 'Payroll Management';
      case '#payroll-run': return 'Run Monthly Payroll Wizard';
      case '#payroll-slips': return 'Salary Slips Master Browser';
      case '#expenses': return 'Expense Claims';
      case '#shifts': return 'Shift Management';
      case '#directory': return 'Team Directory';
      case '#announcements': return 'Company Announcements';
      case '#profile': return 'My Employee Profile';
      case '#employees': return 'Employee Directory';
      case '#employee': return 'Employee Document';
      case '#employee-new': return 'Onboard New Employee';
      case '#recruitment': return 'Job Openings';
      case '#recruitment-applicants': return 'Applicant Tracking Pipeline';
      case '#recruitment-interviews': return 'Interview Schedule & Feedback';
      case '#onboarding': return 'Employee Onboarding Progress';
      case '#reports': return 'Reports & HR Analytics';
      case '#notifications': return 'Notifications Center';
      case '#settings': return 'Workspace Preferences';
      default: return 'HRMS Workspace';
    }
  }

  function getUnreadCount() {
    const emp = getActiveEmployee();
    if (!emp) return 0;
    return store.data.notifications.filter(n => n.user === emp.name && !n.read).length;
  }

  // =========================================================================
  // 10. ROUTE VIEW RENDERERS
  // =========================================================================

  function renderRouteContent() {
    const isHR = session.role === 'HR / Admin';
    const emp = getActiveEmployee();

    switch (currentRoute) {
      case '#dashboard':
        return isHR ? renderHRDashboard() : renderEmployeeAttendanceView();
      case '#checkin':
        return renderCheckinView();
      case '#attendance':
        return isHR ? renderHRAttendanceView() : renderEmployeeAttendanceView();
      case '#leave':
        return renderEmployeeLeaveView();
      case '#leave-approvals':
        return isHR ? renderHRLeaveApprovalsView() : renderEmployeeLeaveView();
      case '#payslip':
        return renderEmployeePayslipView();
      case '#payroll':
        return isHR ? renderHRPayrollOverview() : renderEmployeePayslipView();
      case '#payroll-run':
        return isHR ? renderRunPayrollWizard() : renderEmployeePayslipView();
      case '#payroll-slips':
        return isHR ? renderHRSalarySlipsView() : renderEmployeePayslipView();
      case '#expenses':
        return renderExpensesView();
      case '#shifts':
        return renderShiftsView();
      case '#directory':
        return renderDirectoryView();
      case '#announcements':
        return renderAnnouncementsView();
      case '#profile':
        return renderProfileView();
      case '#employees':
        return isHR ? renderEmployeesListView() : renderEmployeeAttendanceView();
      case '#employee':
        return renderEmployeeDetailView(routeParams.id);
      case '#employee-new':
        return isHR ? renderAddEmployeeView() : renderEmployeeAttendanceView();
      case '#recruitment':
        return isHR ? renderRecruitmentOpeningsView() : renderDirectoryView();
      case '#recruitment-applicants':
        return isHR ? renderRecruitmentApplicantsView() : renderDirectoryView();
      case '#recruitment-interviews':
        return isHR ? renderRecruitmentInterviewsView() : renderDirectoryView();
      case '#onboarding':
        return isHR ? renderOnboardingView() : renderDirectoryView();
      case '#reports':
        return isHR ? renderReportsView() : renderEmployeeAttendanceView();
      case '#notifications':
        return renderNotificationsView();
      case '#settings':
        return isHR ? renderSettingsView() : renderProfileView();
      default:
        return `<div class="card"><div class="card-body"><p>Page not found.</p></div></div>`;
    }
  }

  // -------------------------------------------------------------------------
  // EMPLOYEE DASHBOARD
  // -------------------------------------------------------------------------
  function renderEmployeeDashboard() {
    const emp = getActiveEmployee();
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    const nowD = new Date();
    const todayIso = nowD.toISOString().split('T')[0];
    const monthPrefix = `${nowD.getFullYear()}-${String(nowD.getMonth() + 1).padStart(2, '0')}`;

    // Calculate leave balance (remaining)
    let totalRemaining = 0, casualRemaining = 0, sickRemaining = 0, earnedRemaining = 0;
    const balMap = store.data.leave_balances && store.data.leave_balances[emp.name];
    const allocs = store.data.leave_allocations[emp.name] || {};
    const consumedOf = (type) => store.data.leave_applications
      .filter(l => l.employee === emp.name && l.status === 'Approved' && l.leave_type === type)
      .reduce((s, l) => s + (Number(l.total_leave_days) || 0), 0);
    const balanceOf = (type) => {
      if (balMap && balMap[type]) return balMap[type].remaining;
      return Math.max(0, (allocs[type] || 0) - consumedOf(type));
    };
    casualRemaining = balanceOf('Casual Leave');
    sickRemaining = balanceOf('Sick Leave');
    earnedRemaining = balanceOf('Earned Leave');
    totalRemaining = casualRemaining + sickRemaining + earnedRemaining
      + balanceOf('Compensatory Off') + balanceOf('Leave Without Pay');

    const myLeaves = store.data.leave_applications.filter(l => l.employee === emp.name);
    const pendingCount = myLeaves.filter(l => l.status === 'Open').length;

    // Attendance count this month (current calendar month)
    const myAttThisMonth = store.data.attendance.filter(a =>
      a.employee === emp.name &&
      String(a.attendance_date || '').startsWith(monthPrefix) &&
      (a.status === 'Present' || a.status === 'Work From Home')).length;

    // Upcoming Holidays (from today onward)
    const holidays = store.data.holidays
      .filter(h => h.holiday_date >= todayIso)
      .sort((a, b) => (a.holiday_date < b.holiday_date ? -1 : 1))
      .slice(0, 3);

    // Team on leave today
    const teamLeaves = store.data.leave_applications.filter(l =>
      l.status === 'Approved' && l.employee !== emp.name && l.from_date <= todayIso && l.to_date >= todayIso);

    // Shift definition
    const shiftDef = store.data.shift_types.find(s => s.name === emp.shift) || { start_time: '09:30:00', end_time: '18:30:00' };

    return `
      <!-- GREETING & QUICK ACTIONS -->
      <div class="page-header">
        <div class="page-title-group">
          <h1>${greeting}, ${escapeHtml(emp.employee_name.split(' ')[0])}</h1>
          <p>Here is your personal attendance, leave, and compensation summary.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="window.location.hash='#checkin'">Punch Attendance</button>
          <button class="btn btn-secondary" onclick="window.openApplyLeaveModal()">Apply Leave</button>
          <button class="btn btn-secondary" onclick="window.location.hash='#payslip'">View Payslip</button>
        </div>
      </div>

      <!-- KPI STAT CARDS -->
      <div class="stats-grid">
        <div class="stat-card primary">
          <div class="stat-card-header">
            <span class="stat-card-title">Available Leave Balance</span>
            <span class="stat-card-icon" style="background: var(--primary-pale); color: var(--primary);">${ICONS.sun}</span>
          </div>
          <div class="stat-card-value">${totalRemaining} Days</div>
          <div class="stat-card-footer">
            <span>Casual: ${casualRemaining} | Sick: ${sickRemaining} | Earned: ${earnedRemaining}</span>
          </div>
        </div>

        <div class="stat-card success">
          <div class="stat-card-header">
            <span class="stat-card-title">Attendance This Month</span>
            <span class="stat-card-icon" style="background: var(--success-pale); color: var(--success);">${ICONS.calendar}</span>
          </div>
          <div class="stat-card-value">${myAttThisMonth} Days</div>
          <div class="stat-card-footer">
            <span class="badge badge-success">On Track</span>
            <span>Recorded present days</span>
          </div>
        </div>

        <div class="stat-card warning">
          <div class="stat-card-header">
            <span class="stat-card-title">Pending Requests</span>
            <span class="stat-card-icon" style="background: var(--warning-pale); color: var(--warning);">${ICONS.clock}</span>
          </div>
          <div class="stat-card-value">${pendingCount}</div>
          <div class="stat-card-footer">
            <span>Awaiting HR approval</span>
          </div>
        </div>

        <div class="stat-card purple">
          <div class="stat-card-header">
            <span class="stat-card-title">Assigned Shift</span>
            <span class="stat-card-icon" style="background: var(--purple-pale); color: var(--purple);">${ICONS.repeat}</span>
          </div>
          <div class="stat-card-value" style="font-size: 18px;">${escapeHtml(emp.shift || 'General Shift')}</div>
          <div class="stat-card-footer">
            <span>${fmtTime12(shiftDef.start_time)} — ${fmtTime12(shiftDef.end_time)}</span>
          </div>
        </div>
      </div>

      <!-- TWO-COLUMN MAIN CONTENT -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
        <!-- RECENT LEAVE APPLICATIONS -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">Recent Leave Applications</span>
            <a href="#leave" class="btn btn-ghost btn-sm">View All →</a>
          </div>
          <div class="table-container" style="border: none; border-radius: 0;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>Dates</th>
                  <th style="text-align: center;">Days</th>
                  <th style="text-align: center;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${myLeaves.length === 0 ? `
                  <tr><td colspan="4" style="text-align: center; padding: 24px; color: var(--text-muted);">No leave applications submitted yet.</td></tr>
                ` : myLeaves.slice(0, 5).map(l => `
                  <tr>
                    <td><strong>${escapeHtml(l.leave_type)}</strong></td>
                    <td>${formatDate(l.from_date)} &mdash; ${formatDate(l.to_date)}</td>
                    <td style="text-align: center;">${l.total_leave_days}</td>
                    <td style="text-align: center;">
                      <span class="badge ${l.status === 'Approved' ? 'badge-success' : l.status === 'Open' ? 'badge-warning' : 'badge-danger'}">
                        ${l.status === 'Open' ? 'Pending' : l.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- RIGHT SIDEBAR WIDGETS -->
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <!-- UPCOMING HOLIDAYS -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">Upcoming Holidays</span>
            </div>
            <div class="card-body" style="padding: 10px 14px; display: flex; flex-direction: column; gap: 10px;">
              ${holidays.map(h => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border-subtle);">
                  <div>
                    <div style="font-weight: 600; font-size: 12.5px;">${escapeHtml(h.description)}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${formatDate(h.holiday_date)}</div>
                  </div>
                  <span class="badge badge-neutral">Holiday</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- TEAM ON LEAVE -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">Team on Leave</span>
            </div>
            <div class="card-body" style="padding: 12px 14px;">
              ${teamLeaves.length === 0 ? `
                <p style="color: var(--text-muted); font-size: 12px;">Everyone in your team is working today.</p>
              ` : teamLeaves.slice(0, 3).map(tl => `
                <div style="display: flex; align-items: center; gap: 10px; padding: 6px 0;">
                  <div class="user-avatar-sm" style="background: #eff6ff; color: #2563eb; width: 26px; height: 26px; font-size: 10px;">
                    ${getInitials(tl.employee_name)}
                  </div>
                  <div style="font-size: 12px;">
                    <span style="font-weight: 600;">${escapeHtml(tl.employee_name)}</span>
                    <span style="color: var(--text-muted);"> &middot; ${escapeHtml(tl.leave_type)}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // HR ADMIN DASHBOARD
  // -------------------------------------------------------------------------
  function renderHRDashboard() {
    const totalEmployees = store.data.employees.length;
    const activeEmployees = store.data.employees.filter(e => e.status === 'Active').length;
    const openPositions = store.data.job_openings.filter(j => j.status === 'Open').length;
    const pendingLeaves = store.data.leave_applications.filter(l => l.status === 'Open');
    const pendingExpenses = store.data.expense_claims.filter(e => e.approval_status === 'Draft');
    const pendingShifts = store.data.shift_requests.filter(s => s.status === 'Draft');
    const totalPendingApprovals = pendingLeaves.length + pendingExpenses.length + pendingShifts.length;

    // Attendance breakdown today — computed from live attendance map
    const activeEmps = store.data.employees.filter(e => e.status === 'Active');
    const liveStats = activeEmps.map(e => getLiveAttendance(e.name));
    const cameToWork = liveStats.filter(s => s.status === 'Present' || s.status === 'Checked Out').length;
    const onLeaveToday = liveStats.filter(s => s.status === 'On Leave').length;
    const presentToday = cameToWork;
    const absentToday = liveStats.filter(s => s.status === 'Absent').length;
    const attendanceRate = activeEmps.length ? Math.round((cameToWork / activeEmps.length) * 100) : 0;

    // Recruitment pipeline — computed from applicants & interviews
    const applicants = store.data.job_applicants;
    const stageOpen = applicants.filter(a => a.status === 'Open').length;
    const stageScreened = applicants.filter(a => a.status === 'Replied' || a.status === 'Hold').length;
    const stageInterviewed = new Set(store.data.interviews.map(i => i.applicant)).size;
    const stageAccepted = applicants.filter(a => a.status === 'Accepted').length;
    const maxStage = Math.max(stageOpen, stageScreened, stageInterviewed, stageAccepted, 1);

    // Next payroll run — current month, slips still to generate
    const nowD = new Date();
    const curMonth = nowD.getMonth();
    const curYear = nowD.getFullYear();
    const lastDayOfMonth = new Date(curYear, curMonth + 1, 0).getDate();
    const monthStart = `${curYear}-${String(curMonth + 1).padStart(2, '0')}-01`;
    const monthEnd = `${curYear}-${String(curMonth + 1).padStart(2, '0')}-${String(lastDayOfMonth).padStart(2, '0')}`;
    const slipsThisMonth = store.data.salary_slips.filter(s => s.start_date === monthStart && s.end_date === monthEnd).length;
    const slipsPending = Math.max(0, activeEmps.length - slipsThisMonth);

    // Operational feed — latest system notifications
    const feed = (store.data.notifications || []).slice(0, 5);

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Workforce & Operations Dashboard</h1>
          <p>Real-time organizational headcount, attendance metrics, recruitment funnel, and pending approval queues.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="window.location.hash='#employee-new'">+ Onboard Employee</button>
          <button class="btn btn-secondary" onclick="window.location.hash='#payroll-run'">Run Payroll</button>
          <button class="btn btn-secondary" onclick="window.location.hash='#reports'">Full Analytics</button>
        </div>
      </div>

      <!-- 6 KPI STAT CARDS -->
      <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
        <div class="stat-card primary">
          <div class="stat-card-header">
            <span class="stat-card-title">Total Headcount</span>
            <span class="stat-card-icon" style="background: var(--primary-pale); color: var(--primary);">${ICONS.users}</span>
          </div>
          <div class="stat-card-value">${totalEmployees}</div>
          <div class="stat-card-footer">
            <span class="badge badge-success">${activeEmployees} Active</span>
            <span>${totalEmployees - activeEmployees} Inactive</span>
          </div>
        </div>

        <div class="stat-card success">
          <div class="stat-card-header">
            <span class="stat-card-title">Attendance Rate</span>
            <span class="stat-card-icon" style="background: var(--success-pale); color: var(--success);">${ICONS.chart}</span>
          </div>
          <div class="stat-card-value">${attendanceRate}%</div>
          <div class="stat-card-footer">
            <span>${presentToday} Present | ${onLeaveToday} On Leave</span>
          </div>
        </div>

        <div class="stat-card warning">
          <div class="stat-card-header">
            <span class="stat-card-title">Pending Approvals</span>
            <span class="stat-card-icon" style="background: var(--warning-pale); color: var(--warning);">${ICONS.clock}</span>
          </div>
          <div class="stat-card-value">${totalPendingApprovals}</div>
          <div class="stat-card-footer">
            <span>${pendingLeaves.length} Leaves &middot; ${pendingExpenses.length} Expenses &middot; ${pendingShifts.length} Shifts</span>
          </div>
        </div>

        <div class="stat-card info">
          <div class="stat-card-header">
            <span class="stat-card-title">Open Positions</span>
            <span class="stat-card-icon" style="background: var(--info-pale); color: var(--info);">${ICONS.briefcase}</span>
          </div>
          <div class="stat-card-value">${openPositions}</div>
          <div class="stat-card-footer">
            <span>${store.data.job_applicants.length} Total Applicants</span>
          </div>
        </div>

        <div class="stat-card purple">
          <div class="stat-card-header">
            <span class="stat-card-title">Onboarding Pipeline</span>
            <span class="stat-card-icon" style="background: var(--purple-pale); color: var(--purple);">${ICONS.rocket}</span>
          </div>
          <div class="stat-card-value">${store.data.onboarding_records.filter(o => o.boarding_status === 'In Progress').length}</div>
          <div class="stat-card-footer">
            <span>New Hires in induction</span>
          </div>
        </div>

        <div class="stat-card danger">
          <div class="stat-card-header">
            <span class="stat-card-title">Next Payroll Run</span>
            <span class="stat-card-icon" style="background: var(--danger-pale); color: var(--danger);">${ICONS.card}</span>
          </div>
          <div class="stat-card-value" style="font-size: 18px;">${nowD.toLocaleDateString('en-US', { month: 'short' })} ${lastDayOfMonth}</div>
          <div class="stat-card-footer">
            <span>${slipsPending} Slips Pending Run</span>
          </div>
        </div>
      </div>

      <!-- MAIN SPLIT SECTIONS -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
        <!-- UNIFIED PENDING APPROVALS QUEUE -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">Pending Action Approvals</span>
            <span class="badge badge-warning">${totalPendingApprovals} Action Required</span>
          </div>
          <div class="table-container" style="border: none; border-radius: 0;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Request Type</th>
                  <th>Requester</th>
                  <th>Details</th>
                  <th>Date</th>
                  <th style="text-align: right;">Quick Action</th>
                </tr>
              </thead>
              <tbody>
                ${totalPendingApprovals === 0 ? `
                  <tr><td colspan="5" style="text-align: center; padding: 24px; color: var(--text-muted);">All approval queues are completely cleared!</td></tr>
                ` : `
                  ${pendingLeaves.map(l => `
                    <tr>
                      <td><span class="badge badge-info">Leave</span></td>
                      <td><strong>${escapeHtml(l.employee_name)}</strong></td>
                      <td>${escapeHtml(l.leave_type)} (${l.total_leave_days}d: ${l.from_date} to ${l.to_date})</td>
                      <td>${formatDate(l.posting_date)}</td>
                      <td style="text-align: right;">
                        <button class="btn btn-sm btn-success" onclick="window.quickApproveLeave('${l.name}')">Approve</button>
                        <button class="btn btn-sm btn-danger" onclick="window.quickRejectLeave('${l.name}')">Reject</button>
                      </td>
                    </tr>
                  `).join('')}
                  ${pendingExpenses.map(e => `
                    <tr>
                      <td><span class="badge badge-warning">Expense</span></td>
                      <td><strong>${escapeHtml(e.employee_name)}</strong></td>
                      <td>${escapeHtml(e.expense_type)} (${formatCurrency(e.total_claimed_amount)})</td>
                      <td>${formatDate(e.posting_date)}</td>
                      <td style="text-align: right;">
                        <button class="btn btn-sm btn-success" onclick="window.quickApproveExpense('${e.name}')">Approve</button>
                        <button class="btn btn-sm btn-danger" onclick="window.quickRejectExpense('${e.name}')">Reject</button>
                      </td>
                    </tr>
                  `).join('')}
                  ${pendingShifts.map(s => `
                    <tr>
                      <td><span class="badge badge-purple">Shift</span></td>
                      <td><strong>${escapeHtml(s.employee_name)}</strong></td>
                      <td>${escapeHtml(s.shift_type)} (From ${s.from_date})</td>
                      <td>${formatDate(s.from_date)}</td>
                      <td style="text-align: right;">
                        <button class="btn btn-sm btn-success" onclick="window.quickApproveShift('${s.name}')">Approve</button>
                        <button class="btn btn-sm btn-danger" onclick="window.quickRejectShift('${s.name}')">Reject</button>
                      </td>
                    </tr>
                  `).join('')}
                `}
              </tbody>
            </table>
          </div>
        </div>

        <!-- RECRUITMENT & RECENT ACTIVITIES -->
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <!-- RECRUITMENT PIPELINE WIDGET -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">Recruitment Pipeline</span>
              <a href="#recruitment-applicants" class="btn btn-ghost btn-sm">Kanban →</a>
            </div>
            <div class="card-body" style="padding: 16px;">
              <div class="report-bar-row">
                <span class="report-bar-label">Open / Sourced</span>
                <div class="report-bar-track"><div class="report-bar-fill" style="width: ${Math.round(stageOpen / maxStage * 100)}%; background: #94a3b8;"></div></div>
                <span class="report-bar-value">${stageOpen}</span>
              </div>
              <div class="report-bar-row">
                <span class="report-bar-label">Replied / Screened</span>
                <div class="report-bar-track"><div class="report-bar-fill" style="width: ${Math.round(stageScreened / maxStage * 100)}%; background: #3b82f6;"></div></div>
                <span class="report-bar-value">${stageScreened}</span>
              </div>
              <div class="report-bar-row">
                <span class="report-bar-label">Interview Stage</span>
                <div class="report-bar-track"><div class="report-bar-fill" style="width: ${Math.round(stageInterviewed / maxStage * 100)}%; background: #8b5cf6;"></div></div>
                <span class="report-bar-value">${stageInterviewed}</span>
              </div>
              <div class="report-bar-row">
                <span class="report-bar-label">Offer Accepted</span>
                <div class="report-bar-track"><div class="report-bar-fill" style="width: ${Math.round(stageAccepted / maxStage * 100)}%; background: #10b981;"></div></div>
                <span class="report-bar-value">${stageAccepted}</span>
              </div>
            </div>
          </div>

          <!-- RECENT ACTIVITY FEED -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">Operational Feed</span>
            </div>
            <div class="card-body" style="padding: 10px 14px; font-size: 12px;">
              ${feed.length === 0 ? `
                <div style="padding: 8px 0; color: var(--text-muted);">No recent activity recorded.</div>
              ` : feed.map(n => `
                <div style="padding: 8px 0; border-bottom: 1px solid var(--border-subtle);">
                  ${escapeHtml(n.text)}
                  <div style="font-size: 10.5px; color: var(--text-light);">${escapeHtml(String(n.creation))}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // CHECK-IN / CHECK-OUT MODULE (Portal)
  // -------------------------------------------------------------------------
  function renderCheckinView() {
    const emp = getActiveEmployee();
    const t = new Date().toISOString().split('T')[0];
    const myLogs = store.data.checkins.filter(c => c.employee === emp.name && String(c.time).startsWith(t));
    const lastCheckin = myLogs[0];
    const isCheckedIn = lastCheckin?.log_type === 'IN';
    const nextAction = isCheckedIn ? 'OUT' : 'IN';

    // Total working time today from all IN/OUT pairs — recomputed fresh from
    // punch records so it keeps ticking between punches
    const workingMinutes = liveWorkingMinutes(emp.name);
    const hrs = Math.floor(workingMinutes / 60);
    const mins = Math.round(workingMinutes % 60);
    const shiftHoursText = workingMinutes > 0
      ? `${hrs}h ${mins}m`
      : (isCheckedIn ? '< 1m' : '0h 0m');

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Attendance Check In / Out</h1>
          <p>Record your work attendance with automated timestamping and location verification.</p>
        </div>
      </div>

      <!-- MAIN PUNCH CARD -->
      <div class="clockin-card">
        <div class="clock-display" id="live-clock-text">
          ${liveTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
        </div>
        <div class="date-display">
          ${liveTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </div>

        <div style="margin: 18px 0 10px;">
          <span class="badge ${isCheckedIn ? 'badge-success' : 'badge-neutral'}" style="font-size: 12px; padding: 4px 12px;">
            <span class="badge-dot"></span>
            ${isCheckedIn ? 'Currently Checked In' : 'Not Checked In'}
          </span>
        </div>

        <!-- BIG PUNCH BUTTON -->
        <button class="punch-btn ${nextAction === 'IN' ? 'in' : 'out'}" onclick="window.handlePunch('${nextAction}')">
          <span style="font-size: 20px; font-weight: 800; letter-spacing: 1px;">${nextAction === 'IN' ? 'IN' : 'OUT'}</span>
          <span>Check ${nextAction === 'IN' ? 'In' : 'Out'}</span>
        </button>

        <div class="location-badge">
          <span>${ICONS.mapPin}</span>
          <span>Coordinates captured: 12.9716° N, 77.5946° E (Bengaluru Core HQ)</span>
        </div>

        <div style="display: flex; justify-content: center; gap: 32px; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
          <div>
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Shift Hours Today</div>
            <div id="shift-hours-today" style="font-size: 20px; font-weight: 700; color: var(--text-primary); margin-top: 2px;">
              ${shiftHoursText}
            </div>
          </div>
          <div style="width: 1px; background: var(--border-color);"></div>
          <div>
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Today's Punches</div>
            <div style="font-size: 20px; font-weight: 700; color: var(--text-primary); margin-top: 2px;">${myLogs.length}</div>
          </div>
        </div>
      </div>

      <!-- TODAY'S TIMELINE HISTORY -->
      <div class="card" style="max-width: 520px; margin: 20px auto 0;">
        <div class="card-header">
          <span class="card-title">Today's Check-in Log History</span>
        </div>
        <div class="card-body" style="padding: 0;">
          <div class="table-container" style="border: none; border-radius: 0;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Timestamp</th>
                  <th>Location Verification</th>
                </tr>
              </thead>
              <tbody>
                ${myLogs.length === 0 ? `
                  <tr><td colspan="3" style="text-align: center; padding: 20px; color: var(--text-muted);">No punches recorded yet today.</td></tr>
                ` : myLogs.map(l => `
                  <tr>
                    <td>
                      <span class="badge ${l.log_type === 'IN' ? 'badge-success' : 'badge-danger'}">
                        ${l.log_type === 'IN' ? 'Check In' : 'Check Out'}
                      </span>
                    </td>
                    <td><strong>${l.time.split(' ')[1]}</strong></td>
                    <td style="color: var(--text-muted); font-size: 11px;">12.9716, 77.5946</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // EMPLOYEE ATTENDANCE VIEW (Calendar & List)
  // -------------------------------------------------------------------------
  let attendanceViewMode = 'calendar'; // 'calendar' | 'list'
  let currentMonthOffset = 0;

  function renderEmployeeAttendanceView() {
    const emp = getActiveEmployee();
    const base = new Date();
    const now = new Date(base.getFullYear(), base.getMonth() + currentMonthOffset, 1);
    const year = now.getFullYear();
    const month = now.getMonth();
    const monthName = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`;
    const todayIso = base.toISOString().split('T')[0];

    const records = store.data.attendance
      .filter(a => a.employee === emp.name && String(a.attendance_date || '').startsWith(monthPrefix))
      .sort((a, b) => (a.attendance_date < b.attendance_date ? 1 : -1));
    const presentCount = records.filter(r => r.status === 'Present' || r.status === 'Work From Home').length;
    const leaveCount = records.filter(r => r.status === 'On Leave').length;
    const halfDayCount = records.filter(r => r.status === 'Half Day').length;
    const hoursList = records.map(r => Number(r.working_hours) || 0).filter(h => h > 0);
    const avgHours = hoursList.length
      ? (hoursList.reduce((a, b) => a + b, 0) / hoursList.length).toFixed(1)
      : null;

    // Calendar generation
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const attMap = {};
    records.forEach(r => { attMap[r.attendance_date] = r; });

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Attendance Management</h1>
          <p>Review monthly logged hours, status records, and calendar breakdown.</p>
        </div>
        <div class="page-actions">
          <div style="display: flex; border: 1px solid var(--border-strong); border-radius: var(--radius-md); overflow: hidden;">
            <button class="btn btn-sm ${attendanceViewMode === 'calendar' ? 'btn-primary' : 'btn-ghost'}" onclick="window.setAttendanceView('calendar')">Calendar</button>
            <button class="btn btn-sm ${attendanceViewMode === 'list' ? 'btn-primary' : 'btn-ghost'}" onclick="window.setAttendanceView('list')">List</button>
          </div>
        </div>
      </div>

      <!-- STATS STRIP -->
      <div class="stats-grid" style="grid-template-columns: repeat(4, 1fr);">
        <div class="stat-card success">
          <span class="stat-card-title">Present Days</span>
          <div class="stat-card-value">${presentCount}</div>
        </div>
        <div class="stat-card warning">
          <span class="stat-card-title">Half Days</span>
          <div class="stat-card-value">${halfDayCount}</div>
        </div>
        <div class="stat-card info">
          <span class="stat-card-title">Leaves Taken</span>
          <div class="stat-card-value">${leaveCount}</div>
        </div>
        <div class="stat-card primary">
          <span class="stat-card-title">Avg Working Hours</span>
          <div class="stat-card-value">${avgHours === null ? '—' : `${avgHours} hrs`}</div>
        </div>
      </div>

      <!-- MONTH SELECTOR -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="btn btn-secondary btn-sm" onclick="window.shiftAttendanceMonth(-1)">&larr; Prev Month</button>
          <h2 style="font-size: 16px; font-weight: 700; min-width: 180px; text-align: center;">${monthName}</h2>
          <button class="btn btn-secondary btn-sm" onclick="window.shiftAttendanceMonth(1)">Next Month &rarr;</button>
        </div>
      </div>

      <!-- CALENDAR OR LIST VIEW -->
      ${attendanceViewMode === 'calendar' ? `
        <div class="card" style="margin-top: 10px;">
          <div class="calendar-grid-header">
            <div class="calendar-header-cell">Sun</div>
            <div class="calendar-header-cell">Mon</div>
            <div class="calendar-header-cell">Tue</div>
            <div class="calendar-header-cell">Wed</div>
            <div class="calendar-header-cell">Thu</div>
            <div class="calendar-header-cell">Fri</div>
            <div class="calendar-header-cell">Sat</div>
          </div>
          <div class="calendar-grid">
            ${Array.from({ length: firstDay }).map(() => `<div class="calendar-day-cell other-month"></div>`).join('')}
            ${Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const att = attMap[dateStr];
              const dayOfWeek = (firstDay + idx) % 7;
              const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
              const isToday = dateStr === todayIso;

              let tag = '';
              if (att) {
                if (att.status === 'Present') tag = '<span class="calendar-tag badge-success">Present</span>';
                else if (att.status === 'Work From Home') tag = '<span class="calendar-tag badge-info">WFH</span>';
                else if (att.status === 'On Leave') tag = '<span class="calendar-tag badge-danger">On Leave</span>';
                else if (att.status === 'Half Day') tag = '<span class="calendar-tag badge-warning">Half Day</span>';
              } else if (isWeekend) {
                tag = '<span class="calendar-tag badge-neutral">Weekend</span>';
              }

              return `
                <div class="calendar-day-cell ${isWeekend ? 'weekend' : ''} ${isToday ? 'today' : ''}">
                  <div class="calendar-day-number">${day}</div>
                  <div>${tag}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : `
        <div class="card" style="margin-top: 10px;">
          <div class="table-container" style="border: none;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Attendance Status</th>
                  <th style="text-align: center;">Working Hours</th>
                  <th>Late Entry</th>
                  <th>Early Exit</th>
                </tr>
              </thead>
              <tbody>
                ${records.map(r => `
                  <tr>
                    <td><strong>${formatDate(r.attendance_date)}</strong></td>
                    <td>
                      <span class="badge ${r.status === 'Present' ? 'badge-success' : r.status === 'Work From Home' ? 'badge-info' : r.status === 'Half Day' ? 'badge-warning' : 'badge-danger'}">
                        ${escapeHtml(r.status)}
                      </span>
                    </td>
                    <td style="text-align: center;">${r.working_hours ? `${r.working_hours} hrs` : '—'}</td>
                    <td>${r.late_entry ? '<span class="badge badge-warning">Late</span>' : '—'}</td>
                    <td>${r.early_exit ? '<span class="badge badge-warning">Early Exit</span>' : '—'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `}
    `;
  }

  // -------------------------------------------------------------------------
  // EMPLOYEE LEAVE VIEW
  // -------------------------------------------------------------------------
  let activeLeaveFilterTab = 'All';

  function renderEmployeeLeaveView() {
    const emp = getActiveEmployee();
    const applications = store.data.leave_applications.filter(l => l.employee === emp.name);

    // Remaining balances (backend-computed when connected, derived locally otherwise)
    let balMap = store.data.leave_balances && store.data.leave_balances[emp.name];
    if (!balMap) {
      balMap = {};
      const allocs = store.data.leave_allocations[emp.name] || {};
      for (const [type, allocated] of Object.entries(allocs)) {
        const consumed = store.data.leave_applications
          .filter(l => l.employee === emp.name && l.status === 'Approved' && l.leave_type === type)
          .reduce((s, l) => s + (Number(l.total_leave_days) || 0), 0);
        balMap[type] = { allocated, consumed, remaining: Math.max(0, allocated - consumed) };
      }
    }

    const filtered = activeLeaveFilterTab === 'All'
      ? applications
      : applications.filter(a => a.status === activeLeaveFilterTab);

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Leave Management</h1>
          <p>Track your real-time allocated leave quotas, pending approvals, and submit new requests.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="window.openApplyLeaveModal()">+ Apply Leave</button>
        </div>
      </div>

      <!-- LEAVE ALLOCATION BALANCE CARDS -->
      <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
        ${Object.entries(balMap).map(([lt, bal]) => {
          const allocated = Number(bal.allocated) || 0;
          const pct = allocated > 0 ? Math.round((Number(bal.remaining) / allocated) * 100) : 0;
          return `
          <div class="stat-card primary">
            <div class="stat-card-header">
              <span class="stat-card-title">${escapeHtml(lt)}</span>
              <span class="stat-card-icon" style="background: var(--primary-pale); color: var(--primary);">${ICONS.sun}</span>
            </div>
            <div class="stat-card-value">${bal.remaining} Days</div>
            <div class="stat-card-footer">
              <span style="font-size: 11px; color: var(--text-muted);">${bal.consumed} of ${allocated} consumed</span>
              <div style="width: 100%; height: 5px; background: var(--bg-muted); border-radius: 3px; overflow: hidden; margin-top: 6px;">
                <div style="width: ${pct}%; height: 100%; background: var(--primary);"></div>
              </div>
            </div>
          </div>
        `;}).join('')}
      </div>

      <!-- FILTER TABS & APPLICATIONS TABLE -->
      <div class="card" style="margin-top: 20px;">
        <div class="card-header" style="border-bottom: none; padding-bottom: 0;">
          <div class="tabs-nav" style="border-bottom: none; margin-bottom: 0;">
            ${['All', 'Open', 'Approved', 'Rejected'].map(tab => `
              <button class="tab-btn ${activeLeaveFilterTab === tab ? 'active' : ''}" onclick="window.setLeaveTab('${tab}')">
                ${tab === 'Open' ? 'Pending' : tab}
                <span class="tab-pill">${tab === 'All' ? applications.length : applications.filter(a => a.status === tab).length}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="table-container" style="border: none; border-radius: 0; border-top: 1px solid var(--border-color);">
          <table class="data-table">
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Dates Requested</th>
                <th style="text-align: center;">Total Days</th>
                <th>Reason / Description</th>
                <th style="text-align: center;">Status</th>
                <th>Applied On</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length === 0 ? `
                <tr><td colspan="6" style="text-align: center; padding: 28px; color: var(--text-muted);">No leave applications matching this filter.</td></tr>
              ` : filtered.map(a => `
                <tr>
                  <td><strong>${escapeHtml(a.leave_type)}</strong></td>
                  <td>${formatDate(a.from_date)} &mdash; ${formatDate(a.to_date)}</td>
                  <td style="text-align: center;"><strong>${a.total_leave_days}</strong></td>
                  <td style="color: var(--text-secondary); max-width: 260px;">${escapeHtml(a.description || '—')}</td>
                  <td style="text-align: center;">
                    <span class="badge ${a.status === 'Approved' ? 'badge-success' : a.status === 'Open' ? 'badge-warning' : 'badge-danger'}">
                      ${a.status === 'Open' ? 'Pending Approval' : a.status}
                    </span>
                  </td>
                  <td style="color: var(--text-muted);">${formatDate(a.posting_date)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // HR LEAVE APPROVALS VIEW
  // -------------------------------------------------------------------------
  let hrLeaveFilterTab = 'Open';

  function renderHRLeaveApprovalsView() {
    const apps = store.data.leave_applications;
    const filtered = hrLeaveFilterTab === 'All' ? apps : apps.filter(a => a.status === hrLeaveFilterTab);

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Leave Approvals Management</h1>
          <p>Review employee leave requests, verify team balance allocations, and approve or reject submissions.</p>
        </div>
      </div>

      <div class="card">
        <div class="card-header" style="border-bottom: none; padding-bottom: 0;">
          <div class="tabs-nav" style="border-bottom: none; margin-bottom: 0;">
            ${['Open', 'Approved', 'Rejected', 'All'].map(tab => `
              <button class="tab-btn ${hrLeaveFilterTab === tab ? 'active' : ''}" onclick="window.setHRLeaveTab('${tab}')">
                ${tab === 'Open' ? 'Pending Review' : tab}
                <span class="tab-pill">${tab === 'All' ? apps.length : apps.filter(a => a.status === tab).length}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="table-container" style="border: none; border-radius: 0; border-top: 1px solid var(--border-color);">
          <table class="data-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Leave Type</th>
                <th>Duration</th>
                <th style="text-align: center;">Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length === 0 ? `
                <tr><td colspan="7" style="text-align: center; padding: 28px; color: var(--text-muted);">No leave requests in this queue.</td></tr>
              ` : filtered.map(a => `
                <tr>
                  <td>
                    <div style="font-weight: 600;">${escapeHtml(a.employee_name)}</div>
                    <div style="font-size: 10.5px; color: var(--text-muted);">${escapeHtml(a.employee)}</div>
                  </td>
                  <td><strong>${escapeHtml(a.leave_type)}</strong></td>
                  <td>${formatDate(a.from_date)} &mdash; ${formatDate(a.to_date)}</td>
                  <td style="text-align: center;">${a.total_leave_days}</td>
                  <td style="max-width: 220px; color: var(--text-secondary);">${escapeHtml(a.description || '—')}</td>
                  <td>
                    <span class="badge ${a.status === 'Approved' ? 'badge-success' : a.status === 'Open' ? 'badge-warning' : 'badge-danger'}">
                      ${a.status}
                    </span>
                  </td>
                  <td style="text-align: right;">
                    ${a.status === 'Open' ? `
                      <button class="btn btn-sm btn-success" onclick="window.quickApproveLeave('${a.name}')">Approve</button>
                      <button class="btn btn-sm btn-danger" onclick="window.quickRejectLeave('${a.name}')">Reject</button>
                    ` : `
                      <span style="font-size: 11px; color: var(--text-muted);">Processed</span>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // EMPLOYEE PAYSLIP VIEW
  // -------------------------------------------------------------------------
  function renderEmployeePayslipView() {
    const emp = getActiveEmployee();
    const slips = store.data.salary_slips
      .filter(s => s.employee === emp.name)
      .sort((a, b) => ((a.start_date || '') < (b.start_date || '') ? 1 : -1));
    const activeSlip = slips[0]; // Latest

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>My Salary Slips & Compensation</h1>
          <p>View breakdown of earnings, statutory tax deductions, and download official payslips.</p>
        </div>
        <div class="page-actions">
          ${activeSlip ? `<button class="btn btn-primary" onclick="window.downloadPayslipPDF('${activeSlip.name}')">Download PDF</button>` : ''}
        </div>
      </div>

      ${!activeSlip ? `
        <div class="card"><div class="card-body" style="text-align: center; padding: 40px;"><p style="color: var(--text-muted);">No processed salary slips found.</p></div></div>
      ` : `
        <!-- PAY SUMMARY CARDS -->
        <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr);">
          <div class="stat-card success">
            <span class="stat-card-title">Gross Monthly Pay</span>
            <div class="stat-card-value">${formatCurrency(activeSlip.gross_pay)}</div>
            <div class="stat-card-footer"><span>Base + HRA + Allowances</span></div>
          </div>
          <div class="stat-card danger">
            <span class="stat-card-title">Total Deductions</span>
            <div class="stat-card-value">${formatCurrency(activeSlip.total_deduction)}</div>
            <div class="stat-card-footer"><span>PF + TDS + Professional Tax</span></div>
          </div>
          <div class="stat-card primary">
            <span class="stat-card-title">Net Take-Home Pay</span>
            <div class="stat-card-value">${formatCurrency(activeSlip.net_pay)}</div>
            <div class="stat-card-footer"><span class="badge badge-success">Deposited to ${escapeHtml(emp.bank_name || 'Bank')}</span></div>
          </div>
        </div>

        <!-- ITEMIZED EARNINGS & DEDUCTIONS BREAKDOWN -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
          <!-- EARNINGS -->
          <div class="card">
            <div class="card-header" style="background: var(--success-pale); border-bottom-color: var(--success-border);">
              <span class="card-title" style="color: var(--success-text);">Earnings Breakdown</span>
            </div>
            <div class="table-container" style="border: none;">
              <table class="data-table">
                <tbody>
                  ${(activeSlip.earnings || []).map(e => `
                    <tr>
                      <td>${escapeHtml(e.salary_component)}</td>
                      <td style="text-align: right; font-weight: 600;">${formatCurrency(e.amount)}</td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot style="background: var(--bg-subtle);">
                  <tr>
                    <td><strong>Total Gross Earnings</strong></td>
                    <td style="text-align: right; font-weight: 700; color: var(--success);">${formatCurrency(activeSlip.gross_pay)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <!-- DEDUCTIONS -->
          <div class="card">
            <div class="card-header" style="background: var(--danger-pale); border-bottom-color: var(--danger-border);">
              <span class="card-title" style="color: var(--danger-text);">Deductions Breakdown</span>
            </div>
            <div class="table-container" style="border: none;">
              <table class="data-table">
                <tbody>
                  ${(activeSlip.deductions || []).map(d => `
                    <tr>
                      <td>${escapeHtml(d.salary_component)}</td>
                      <td style="text-align: right; font-weight: 600; color: var(--danger);">${formatCurrency(d.amount)}</td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot style="background: var(--bg-subtle);">
                  <tr>
                    <td><strong>Total Statutory Deductions</strong></td>
                    <td style="text-align: right; font-weight: 700; color: var(--danger);">${formatCurrency(activeSlip.total_deduction)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <!-- HISTORICAL PAYSLIPS TABLE -->
        <div class="card" style="margin-top: 20px;">
          <div class="card-header">
            <span class="card-title">Historical Salary Records</span>
          </div>
          <div class="table-container" style="border: none;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Gross Pay</th>
                  <th>Total Deductions</th>
                  <th>Net Disbursed</th>
                  <th>Status</th>
                  <th style="text-align: right;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${slips.map(s => `
                  <tr>
                    <td><strong>${formatDate(s.start_date)} &mdash; ${formatDate(s.end_date)}</strong></td>
                    <td>${formatCurrency(s.gross_pay)}</td>
                    <td style="color: var(--danger);">${formatCurrency(s.total_deduction)}</td>
                    <td><strong>${formatCurrency(s.net_pay)}</strong></td>
                    <td><span class="badge ${s.status === 'Issued' || s.docstatus ? 'badge-success' : 'badge-warning'}">${escapeHtml(s.status || 'Issued')}</span></td>
                    <td style="text-align: right;">
                      <button class="btn btn-sm btn-secondary" onclick="window.downloadPayslipPDF('${s.name}')">Download</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `}
    `;
  }

  // -------------------------------------------------------------------------
  // HR PAYROLL OVERVIEW & WIZARD
  // -------------------------------------------------------------------------
  function renderHRPayrollOverview() {
    const entries = [...store.data.payroll_entries].sort((a, b) => (a.start_date < b.start_date ? 1 : -1));
    const slips = store.data.salary_slips;
    const latestEntry = entries[0];
    const avgNet = slips.length
      ? Math.round(slips.reduce((s, x) => s + (Number(x.net_pay) || 0), 0) / slips.length)
      : 0;

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Payroll Management Overview</h1>
          <p>Manage monthly compensation cycles, run payroll calculation wizard, and inspect salary slips.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="window.location.hash='#payroll-run'">Run Monthly Payroll Wizard</button>
          <button class="btn btn-secondary" onclick="window.location.hash='#payroll-slips'">Browse All Salary Slips</button>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card primary">
          <span class="stat-card-title">Total Processed Payroll</span>
          <div class="stat-card-value">${formatCurrency(latestEntry ? latestEntry.total_amount : 0)}</div>
          <div class="stat-card-footer"><span>${latestEntry ? `Last Cycle (${formatDate(latestEntry.end_date)}) Disbursed` : 'No payroll run yet'}</span></div>
        </div>
        <div class="stat-card success">
          <span class="stat-card-title">Salaries Generated</span>
          <div class="stat-card-value">${slips.length}</div>
          <div class="stat-card-footer"><span>Across ${new Set(slips.map(s => s.employee)).size} Employees</span></div>
        </div>
        <div class="stat-card info">
          <span class="stat-card-title">Average Net CTC</span>
          <div class="stat-card-value">${formatCurrency(avgNet)}</div>
          <div class="stat-card-footer"><span>Per Employee / Month</span></div>
        </div>
      </div>

      <div class="card" style="margin-top: 20px;">
        <div class="card-header">
          <span class="card-title">Monthly Payroll Entries</span>
        </div>
        <div class="table-container" style="border: none;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Payroll ID</th>
                <th>Period</th>
                <th>Posting Date</th>
                <th style="text-align: center;">Employees</th>
                <th>Total Disbursed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${entries.map(e => `
                <tr>
                  <td><strong>${escapeHtml(e.name)}</strong></td>
                  <td>${formatDate(e.start_date)} &mdash; ${formatDate(e.end_date)}</td>
                  <td>${formatDate(e.posting_date)}</td>
                  <td style="text-align: center;">${e.number_of_employees}</td>
                  <td><strong>${formatCurrency(e.total_amount)}</strong></td>
                  <td><span class="badge badge-success">${escapeHtml(e.status)}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // 3-Step Wizard for Run Payroll
  let wizardStep = 1;
  const currentWizardDate = new Date();
  let wizardConfig = {
    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][currentWizardDate.getMonth()],
    year: String(currentWizardDate.getFullYear()),
    dept: 'All'
  };
  let lastPayrollResult = null;

  // Mirror of the backend payroll formula for the wizard preview
  function payPreview(emp) {
    const base = Number(emp.base_salary) || 100000;
    const gross = base;
    const basic = Math.round(base * 0.5);
    const deductions = Math.round(basic * 0.12) + 200 + Math.round(gross * 0.10);
    return { gross, deductions, net: gross - deductions };
  }

  function renderRunPayrollWizard() {
    const MONTHS_ALL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const yr = new Date().getFullYear();
    const years = [yr + 1, yr, yr - 1].filter((v, i, a) => a.indexOf(v) === i);
    const previewEmps = (wizardConfig.dept === 'All'
      ? store.data.employees.filter(e => e.status === 'Active')
      : store.data.employees.filter(e => e.status === 'Active' && e.department === wizardConfig.dept));
    const totals = previewEmps.reduce((acc, e) => {
      const p = payPreview(e);
      acc.gross += p.gross; acc.ded += p.deductions; acc.net += p.net;
      return acc;
    }, { gross: 0, ded: 0, net: 0 });
    const slipsCount = lastPayrollResult ? lastPayrollResult.slips_created : previewEmps.length;

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Run Monthly Payroll Wizard</h1>
          <p>3-step guided workflow to calculate attendance, compute deductions, and issue official salary slips.</p>
        </div>
      </div>

      <!-- PROGRESS BAR -->
      <div class="wizard-steps">
        <div class="wizard-step ${wizardStep >= 1 ? 'active' : ''} ${wizardStep > 1 ? 'completed' : ''}">
          <div class="step-circle">${wizardStep > 1 ? '✓' : '1'}</div>
          <span>1. Configure Period</span>
        </div>
        <div style="width: 40px; height: 2px; background: var(--border-color);"></div>
        <div class="wizard-step ${wizardStep >= 2 ? 'active' : ''} ${wizardStep > 2 ? 'completed' : ''}">
          <div class="step-circle">${wizardStep > 2 ? '✓' : '2'}</div>
          <span>2. Preview Salaries</span>
        </div>
        <div style="width: 40px; height: 2px; background: var(--border-color);"></div>
        <div class="wizard-step ${wizardStep >= 3 ? 'active' : ''}">
          <div class="step-circle">3</div>
          <span>3. Confirm & Disburse</span>
        </div>
      </div>

      <!-- WIZARD STEP CONTENT -->
      <div class="card" style="max-width: 800px; margin: 0 auto;">
        ${wizardStep === 1 ? `
          <div class="card-header"><span class="card-title">Step 1: Select Payroll Cycle Parameters</span></div>
          <div class="card-body">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Month</label>
                <select class="form-control" id="wiz-month">
                  ${MONTHS_ALL.map(m => `<option ${wizardConfig.month === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Year</label>
                <select class="form-control" id="wiz-year">
                  ${years.map(y => `<option ${String(wizardConfig.year) === String(y) ? 'selected' : ''}>${y}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="form-group" style="margin-top: 14px;">
              <label class="form-label">Department Scope</label>
              <select class="form-control" id="wiz-dept">
                <option value="All Departments" ${wizardConfig.dept === 'All' ? 'selected' : ''}>All Departments</option>
                ${store.data.departments.map(d => `<option ${wizardConfig.dept === d ? 'selected' : ''}>${escapeHtml(d)}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="card-footer" style="display: flex; justify-content: flex-end;">
            <button class="btn btn-primary" onclick="window.setWizardStep(2)">Proceed to Preview →</button>
          </div>
        ` : wizardStep === 2 ? `
          <div class="card-header"><span class="card-title">Step 2: Employee Payroll Calculation Preview — ${escapeHtml(wizardConfig.month)} ${escapeHtml(String(wizardConfig.year))} (${escapeHtml(wizardConfig.dept === 'All' ? 'All Departments' : wizardConfig.dept)})</span></div>
          <div class="card-body" style="padding: 0;">
            <div class="table-container" style="border: none;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Gross Pay</th>
                    <th>PF, PT & TDS</th>
                    <th>Net Disbursable</th>
                  </tr>
                </thead>
                <tbody>
                  ${previewEmps.length === 0 ? `
                    <tr><td colspan="4" style="text-align: center; padding: 24px; color: var(--text-muted);">No active employees in this scope.</td></tr>
                  ` : previewEmps.map(e => {
                    const p = payPreview(e);
                    return `
                    <tr>
                      <td><strong>${escapeHtml(e.employee_name)}</strong> <small>(${escapeHtml(e.department || '—')})</small></td>
                      <td>${formatCurrency(p.gross)}</td>
                      <td style="color: var(--danger);">${formatCurrency(p.deductions)}</td>
                      <td><strong style="color: var(--success);">${formatCurrency(p.net)}</strong></td>
                    </tr>
                  `;}).join('')}
                </tbody>
                ${previewEmps.length > 0 ? `
                <tfoot style="background: var(--bg-subtle);">
                  <tr>
                    <td><strong>Total (${previewEmps.length} employees)</strong></td>
                    <td><strong>${formatCurrency(totals.gross)}</strong></td>
                    <td><strong style="color: var(--danger);">${formatCurrency(totals.ded)}</strong></td>
                    <td><strong style="color: var(--success);">${formatCurrency(totals.net)}</strong></td>
                  </tr>
                </tfoot>` : ''}
              </table>
            </div>
          </div>
          <div class="card-footer" style="display: flex; justify-content: space-between;">
            <button class="btn btn-secondary" onclick="window.setWizardStep(1)">← Back</button>
            <button class="btn btn-success" onclick="window.finalizePayroll()">Generate & Publish Payroll</button>
          </div>
        ` : `
          <div class="card-body" style="text-align: center; padding: 40px;">
            <div style="font-size: 40px; color: var(--success); font-weight: 700;">&#10003;</div>
            <h2 style="font-size: 20px; font-weight: 700; margin-top: 12px;">Payroll Cycle Successfully Published!</h2>
            <p style="color: var(--text-muted); margin-top: 6px; font-size: 13px;">
              ${slipsCount} salary slip(s) for <strong>${escapeHtml(wizardConfig.month)} ${escapeHtml(String(wizardConfig.year))}</strong>${wizardConfig.dept !== 'All' ? ` (${escapeHtml(wizardConfig.dept)})` : ''} have been generated${lastPayrollResult ? ` and ${formatCurrency(lastPayrollResult.total_net)} net is queued for disbursement` : ''}. Notifications were dispatched to all employee self-service portals.
            </p>
            <div style="margin-top: 24px;">
              <button class="btn btn-primary" onclick="window.location.hash='#payroll-slips'">View Salary Slips</button>
              <button class="btn btn-secondary" onclick="window.location.hash='#payroll'">Return to Overview</button>
            </div>
          </div>
        `}
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // HR SALARY SLIPS MASTER BROWSER
  // -------------------------------------------------------------------------
  let expandedSlipId = null;

  function renderHRSalarySlipsView() {
    const slips = store.data.salary_slips;

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Salary Slips Master Browser</h1>
          <p>Inspect itemized earnings and tax deductions across all company workforce records.</p>
        </div>
      </div>

      <div class="card">
        <div class="table-container" style="border: none;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Slip ID</th>
                <th>Employee Name</th>
                <th>Period</th>
                <th>Gross Pay</th>
                <th>Deductions</th>
                <th>Net Pay</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${slips.map(s => `
                <tr onclick="window.toggleExpandSlip('${s.name}')" style="cursor: pointer;">
                  <td><strong>${escapeHtml(s.name)}</strong></td>
                  <td>${escapeHtml(s.employee_name)}</td>
                  <td>${formatDate(s.start_date)} &mdash; ${formatDate(s.end_date)}</td>
                  <td>${formatCurrency(s.gross_pay)}</td>
                  <td style="color: var(--danger);">${formatCurrency(s.total_deduction)}</td>
                  <td><strong style="color: var(--success);">${formatCurrency(s.net_pay)}</strong></td>
                  <td style="text-align: right;">
                    <span style="font-size: 11px; color: var(--primary);">${expandedSlipId === s.name ? 'Collapse' : 'Breakdown'}</span>
                  </td>
                </tr>
                ${expandedSlipId === s.name ? `
                  <tr style="background: #f8fafc;">
                    <td colspan="7" style="padding: 16px 24px;">
                      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                          <strong style="color: var(--success); font-size: 12px;">Earnings Breakdown</strong>
                          <div style="margin-top: 6px; font-size: 11.5px;">
                            ${(s.earnings || []).map(e => `<div style="display: flex; justify-content: space-between; padding: 3px 0;"><span>${escapeHtml(e.salary_component)}</span><span>${formatCurrency(e.amount)}</span></div>`).join('')}
                          </div>
                        </div>
                        <div>
                          <strong style="color: var(--danger); font-size: 12px;">Deductions Breakdown</strong>
                          <div style="margin-top: 6px; font-size: 11.5px;">
                            ${(s.deductions || []).map(d => `<div style="display: flex; justify-content: space-between; padding: 3px 0;"><span>${escapeHtml(d.salary_component)}</span><span>${formatCurrency(d.amount)}</span></div>`).join('')}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ` : ''}
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // EXPENSE CLAIMS MODULE
  // -------------------------------------------------------------------------
  function renderExpensesView() {
    const emp = getActiveEmployee();
    const isHR = session.role === 'HR / Admin';
    const claims = isHR ? store.data.expense_claims : store.data.expense_claims.filter(c => c.employee === emp.name);

    const totalClaimed = claims.reduce((a, c) => a + (c.total_claimed_amount || 0), 0);
    const totalApproved = claims.filter(c => c.approval_status === 'Approved').reduce((a, c) => a + (c.total_sanctioned_amount || 0), 0);
    const pendingCount = claims.filter(c => c.approval_status === 'Draft').length;

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Expense Claims & Reimbursements</h1>
          <p>Submit travel, meals, equipment, and medical reimbursement claims with receipt uploads.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="window.openNewExpenseModal()">+ New Expense Claim</button>
        </div>
      </div>

      <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr);">
        <div class="stat-card primary">
          <span class="stat-card-title">Total Claimed</span>
          <div class="stat-card-value">${formatCurrency(totalClaimed)}</div>
        </div>
        <div class="stat-card success">
          <span class="stat-card-title">Total Sanctioned / Paid</span>
          <div class="stat-card-value">${formatCurrency(totalApproved)}</div>
        </div>
        <div class="stat-card warning">
          <span class="stat-card-title">Pending Approval</span>
          <div class="stat-card-value">${pendingCount} Claims</div>
        </div>
      </div>

      <div class="card" style="margin-top: 20px;">
        <div class="card-header"><span class="card-title">Expense Claims List</span></div>
        <div class="table-container" style="border: none;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Claim ID</th>
                <th>Employee</th>
                <th>Expense Type</th>
                <th>Date</th>
                <th>Claimed Amount</th>
                <th>Status</th>
                ${isHR ? '<th style="text-align: right;">Action</th>' : ''}
              </tr>
            </thead>
            <tbody>
              ${claims.length === 0 ? `
                <tr><td colspan="7" style="text-align: center; padding: 28px; color: var(--text-muted);">No expense claims found.</td></tr>
              ` : claims.map(c => `
                <tr>
                  <td><strong>${escapeHtml(c.name)}</strong></td>
                  <td>${escapeHtml(c.employee_name)}</td>
                  <td><span class="badge badge-neutral">${escapeHtml(c.expense_type)}</span></td>
                  <td>${formatDate(c.posting_date)}</td>
                  <td><strong>${formatCurrency(c.total_claimed_amount)}</strong></td>
                  <td>
                    <span class="badge ${c.approval_status === 'Approved' ? 'badge-success' : c.approval_status === 'Draft' ? 'badge-warning' : 'badge-danger'}">
                      ${c.approval_status === 'Draft' ? 'Pending Review' : c.approval_status}
                    </span>
                  </td>
                  ${isHR ? `
                    <td style="text-align: right;">
                      ${c.approval_status === 'Draft' ? `
                        <button class="btn btn-sm btn-success" onclick="window.quickApproveExpense('${c.name}')">Approve</button>
                        <button class="btn btn-sm btn-danger" onclick="window.quickRejectExpense('${c.name}')">Reject</button>
                      ` : '<span style="font-size: 11px; color: var(--text-muted);">Resolved</span>'}
                    </td>
                  ` : ''}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // SHIFT MANAGEMENT MODULE
  // -------------------------------------------------------------------------
  function renderShiftsView() {
    const emp = getActiveEmployee();
    const isHR = session.role === 'HR / Admin';
    const requests = isHR ? store.data.shift_requests : store.data.shift_requests.filter(s => s.employee === emp.name);

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Shift Allocation & Change Requests</h1>
          <p>View assigned work shifts, rotational rosters, and submit shift schedule requests.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="window.openRequestShiftModal()">+ Request Shift Change</button>
        </div>
      </div>

      <!-- CURRENT ASSIGNED SHIFT CARD -->
        <div class="card">
          <div class="card-header"><span class="card-title">Currently Active Assigned Shift</span></div>
          <div class="card-body" style="display: flex; align-items: center; justify-content: space-between;">
          ${(() => {
            const def = store.data.shift_types.find(s => s.name === emp.shift) || { start_time: '09:30:00', end_time: '18:30:00', description: 'Standard Office Shift' };
            return `
            <div>
              <h2 style="font-size: 18px; font-weight: 700; color: var(--primary);">${escapeHtml(emp.shift || 'General Shift')}</h2>
              <p style="color: var(--text-muted); font-size: 12px; margin-top: 4px;">Standard timings: ${fmtTime12(def.start_time)} to ${fmtTime12(def.end_time)} — ${escapeHtml(def.description || '')}</p>
            </div>
            <span class="badge badge-success">Assigned & Active</span>
          `; })()}
          </div>
        </div>

      <!-- SHIFT CHANGE REQUESTS TABLE -->
      <div class="card">
        <div class="card-header"><span class="card-title">Shift Change Request History</span></div>
        <div class="table-container" style="border: none;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Employee</th>
                <th>Target Shift</th>
                <th>Effective Period</th>
                <th>Reason</th>
                <th>Status</th>
                ${isHR ? '<th style="text-align: right;">Action</th>' : ''}
              </tr>
            </thead>
            <tbody>
              ${requests.length === 0 ? `
                <tr><td colspan="7" style="text-align: center; padding: 28px; color: var(--text-muted);">No shift change requests found.</td></tr>
              ` : requests.map(s => `
                <tr>
                  <td><strong>${escapeHtml(s.name)}</strong></td>
                  <td>${escapeHtml(s.employee_name)}</td>
                  <td><span class="badge badge-purple">${escapeHtml(s.shift_type)}</span></td>
                  <td>${formatDate(s.from_date)} &mdash; ${formatDate(s.to_date)}</td>
                  <td style="max-width: 220px; color: var(--text-secondary);">${escapeHtml(s.reason)}</td>
                  <td>
                    <span class="badge ${s.status === 'Approved' ? 'badge-success' : s.status === 'Draft' ? 'badge-warning' : 'badge-danger'}">
                      ${s.status === 'Draft' ? 'Pending Approval' : s.status}
                    </span>
                  </td>
                  ${isHR ? `
                    <td style="text-align: right;">
                      ${s.status === 'Draft' ? `
                        <button class="btn btn-sm btn-success" onclick="window.quickApproveShift('${s.name}')">Approve</button>
                        <button class="btn btn-sm btn-danger" onclick="window.quickRejectShift('${s.name}')">Reject</button>
                      ` : '<span style="font-size: 11px; color: var(--text-muted);">Resolved</span>'}
                    </td>
                  ` : ''}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // TEAM DIRECTORY VIEW
  // -------------------------------------------------------------------------
  let directorySearch = '';
  let directoryDept = 'All';

  function renderDirectoryView() {
    let list = store.data.employees;
    if (directorySearch) {
      const q = directorySearch.toLowerCase();
      list = list.filter(e => e.employee_name.toLowerCase().includes(q) || (e.designation || '').toLowerCase().includes(q) || (e.department || '').toLowerCase().includes(q));
    }
    if (directoryDept !== 'All') {
      list = list.filter(e => e.department === directoryDept);
    }

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Team Directory</h1>
          <p>Find and connect with colleagues across all organizational departments and hubs.</p>
        </div>
      </div>

      <!-- SEARCH & FILTER TOOLBAR -->
      <div class="filter-toolbar">
        <div class="filter-group-left">
          <div class="search-box">
            <span class="icon">${ICONS.search}</span>
            <input type="text" placeholder="Search by name, role, or department..." value="${escapeHtml(directorySearch)}" oninput="window.setDirectorySearch(this.value)">
          </div>
          <select class="filter-select" onchange="window.setDirectoryDept(this.value)">
            <option ${directoryDept === 'All' ? 'selected' : ''}>All Departments</option>
            ${store.data.departments.map(d => `<option ${directoryDept === d ? 'selected' : ''}>${escapeHtml(d)}</option>`).join('')}
          </select>
        </div>
        <div class="filter-group-right">
          <span style="font-size: 12px; color: var(--text-muted);">${list.length} Colleagues</span>
        </div>
      </div>

      <!-- CARDS GRID -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
        ${list.map(emp => `
          <div class="card" style="padding: 16px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; gap: 12px; align-items: flex-start;">
              <div class="user-avatar-sm" style="width: 44px; height: 44px; font-size: 16px; background: ${nameToColor(emp.employee_name)}22; color: ${nameToColor(emp.employee_name)};">
                ${getInitials(emp.employee_name)}
              </div>
              <div style="min-width: 0; flex: 1;">
                <h3 style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin-bottom: 2px;">${escapeHtml(emp.employee_name)}</h3>
                <p style="font-size: 12px; color: var(--text-muted);">${escapeHtml(emp.designation || 'Specialist')}</p>
                <span class="badge badge-neutral" style="margin-top: 6px;">${escapeHtml(emp.department || 'General')}</span>
              </div>
            </div>

            <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border-subtle); font-size: 11.5px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
              <div style="display:flex;align-items:center;gap:6px;">${ICONS.mail} ${escapeHtml(emp.company_email)}</div>
              <div style="display:flex;align-items:center;gap:6px;">${ICONS.phone} ${escapeHtml(emp.cell_phone || '—')}</div>
              <div style="display:flex;align-items:center;gap:6px;">${ICONS.building} ${escapeHtml(emp.company || 'Dayflow')}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // COMPANY ANNOUNCEMENTS VIEW
  // -------------------------------------------------------------------------
  function renderAnnouncementsView() {
    const isHR = session.role === 'HR / Admin';
    const list = store.data.announcements;

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Company Announcements</h1>
          <p>Official notices, leadership memos, and all-hands organizational updates.</p>
        </div>
        <div class="page-actions">
          ${isHR ? '<button class="btn btn-primary" onclick="window.openPostAnnouncementModal()">+ Post Announcement</button>' : ''}
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 800px;">
        ${list.map(a => `
          <div class="card" style="padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <h2 style="font-size: 16px; font-weight: 700; color: var(--text-primary);">${escapeHtml(a.subject)}</h2>
              <span class="badge badge-neutral">${a.creation.split(' ')[0]}</span>
            </div>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; white-space: pre-wrap;">${escapeHtml(a.description)}</p>
            <div style="margin-top: 14px; font-size: 11px; color: var(--text-light);">
              Posted by <strong>${escapeHtml(a.posted_by)}</strong>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // EMPLOYEE PROFILE VIEW (4 Sections)
  // -------------------------------------------------------------------------
  function renderProfileView() {
    const emp = getActiveEmployee();

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>My Employee Profile</h1>
          <p>Personal credentials, emergency contacts, banking information, and job assignment.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="window.openEditProfileModal()">Edit Contact Info</button>
        </div>
      </div>

      <!-- PROFILE HEADER CARD -->
      <div class="card" style="padding: 24px; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 20px;">
          <div class="user-avatar-sm" style="width: 72px; height: 72px; font-size: 26px; font-weight: 700; background: ${nameToColor(emp.employee_name)}; color: #fff;">
            ${getInitials(emp.employee_name)}
          </div>
          <div>
            <h2 style="font-size: 20px; font-weight: 700;">${escapeHtml(emp.employee_name)}</h2>
            <p style="color: var(--text-muted); font-size: 13px;">${escapeHtml(emp.designation)} &middot; ${escapeHtml(emp.department)}</p>
            <div style="display: flex; gap: 8px; margin-top: 8px;">
              <span class="badge badge-success">Active Full-Time</span>
              <span class="badge badge-neutral">Employee ID: ${escapeHtml(emp.name)}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 4 DETAILED PROFILE SECTIONS -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <!-- PERSONAL INFORMATION -->
        <div class="card">
          <div class="card-header"><span class="card-title">Personal Information</span></div>
          <div class="card-body" style="font-size: 12.5px; display: flex; flex-direction: column; gap: 10px;">
            <div><span style="color: var(--text-muted);">Work Email:</span> <strong>${escapeHtml(emp.company_email)}</strong></div>
            <div><span style="color: var(--text-muted);">Personal Email:</span> <strong>${escapeHtml(emp.personal_email || '—')}</strong></div>
            <div><span style="color: var(--text-muted);">Cell Phone:</span> <strong>${escapeHtml(emp.cell_phone || '—')}</strong></div>
            <div><span style="color: var(--text-muted);">Date of Birth:</span> <strong>${formatDate(emp.date_of_birth)}</strong></div>
            <div><span style="color: var(--text-muted);">Current Address:</span> <div style="margin-top: 2px;">${escapeHtml(emp.current_address || '—')}</div></div>
          </div>
        </div>

        <!-- EMPLOYMENT DETAILS -->
        <div class="card">
          <div class="card-header"><span class="card-title">Employment Details</span></div>
          <div class="card-body" style="font-size: 12.5px; display: flex; flex-direction: column; gap: 10px;">
            <div><span style="color: var(--text-muted);">Date of Joining:</span> <strong>${formatDate(emp.date_of_joining)}</strong></div>
            <div><span style="color: var(--text-muted);">Designation:</span> <strong>${escapeHtml(emp.designation)}</strong></div>
            <div><span style="color: var(--text-muted);">Department:</span> <strong>${escapeHtml(emp.department)}</strong></div>
            <div><span style="color: var(--text-muted);">Company:</span> <strong>${escapeHtml(emp.company)}</strong></div>
            <div><span style="color: var(--text-muted);">Leave Approver:</span> <strong>${escapeHtml(emp.leave_approver || 'HR Team')}</strong></div>
          </div>
        </div>

        <!-- EMERGENCY CONTACT -->
        <div class="card">
          <div class="card-header"><span class="card-title">Emergency Contact</span></div>
          <div class="card-body" style="font-size: 12.5px; display: flex; flex-direction: column; gap: 10px;">
            <div><span style="color: var(--text-muted);">Contact Name:</span> <strong>${escapeHtml(emp.person_to_be_contacted || '—')}</strong></div>
            <div><span style="color: var(--text-muted);">Relationship:</span> <strong>${escapeHtml(emp.relation || '—')}</strong></div>
            <div><span style="color: var(--text-muted);">Emergency Phone:</span> <strong>${escapeHtml(emp.emergency_phone_number || '—')}</strong></div>
          </div>
        </div>

        <!-- BANK DETAILS -->
        <div class="card">
          <div class="card-header"><span class="card-title">Direct Deposit Banking</span></div>
          <div class="card-body" style="font-size: 12.5px; display: flex; flex-direction: column; gap: 10px;">
            <div><span style="color: var(--text-muted);">Bank Name:</span> <strong>${escapeHtml(emp.bank_name || 'HDFC Bank')}</strong></div>
            <div><span style="color: var(--text-muted);">Account Number:</span> <strong>•••• •••• ${escapeHtml((emp.bank_ac_no || '1234').slice(-4))}</strong></div>
            <span class="badge badge-success" style="align-self: flex-start;">Verified for Payroll</span>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // HR EMPLOYEES ROSTER CARD GRID VIEW (#employees)
  // -------------------------------------------------------------------------
  let employeeSearch = '';
  let employeeFilterDept = 'All';

  function renderEmployeesListView() {
    let list = store.data.employees;
    if (employeeSearch) {
      const q = employeeSearch.toLowerCase().trim();
      list = list.filter(e => 
        e.employee_name.toLowerCase().includes(q) || 
        e.name.toLowerCase().includes(q) || 
        (e.department || '').toLowerCase().includes(q) ||
        (e.designation || '').toLowerCase().includes(q)
      );
    }
    if (employeeFilterDept !== 'All') {
      list = list.filter(e => e.department === employeeFilterDept);
    }

    return `
      <!-- TOP ACTION BAR -->
      <div class="employees-action-bar">
        <div class="action-bar-left">
          <button class="btn-purple-new" onclick="window.location.hash='#employee-new'">
            <span>NEW</span>
          </button>
        </div>

        <div class="action-bar-right" style="display: flex; align-items: center; gap: 12px;">
          <select class="filter-select" style="height: 38px; border-radius: var(--radius-full); padding: 0 14px; background: #ffffff;" onchange="window.setEmployeeDept(this.value)">
            <option ${employeeFilterDept === 'All' ? 'selected' : ''}>All Departments</option>
            ${store.data.departments.map(d => `<option ${employeeFilterDept === d ? 'selected' : ''}>${escapeHtml(d)}</option>`).join('')}
          </select>

          <div class="search-pill-box">
            <span class="search-icon">${ICONS.search}</span>
            <input type="text" placeholder="Search" value="${escapeHtml(employeeSearch)}" oninput="window.setEmployeeSearch(this.value)">
          </div>
        </div>
      </div>

      <!-- STATUS LEGEND INDICATOR BAR -->
      <div class="status-legend-bar">
        <span style="font-weight: 700; color: var(--text-primary); font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.5px;">Status Indicators:</span>
        <span class="legend-item"><span class="card-status-dot dot-green"></span> <strong>Green dot:</strong> Employee is present in the office.</span>
        <span class="legend-item"><span class="card-status-dot dot-blue"></span> <strong>Blue dot:</strong> Employee already checked out today.</span>
        <span class="legend-item"><span class="card-status-icon icon-plane">${ICONS.plane}</span> <strong>On-Leave Icon:</strong> Employee is on leave.</span>
        <span class="legend-item"><span class="card-status-dot dot-yellow"></span> <strong>Yellow dot:</strong> Employee is absent. (Employee has not applied time off and is absent.)</span>
        <span style="margin-left: auto; color: var(--text-muted); font-size: 12px; font-weight: 600;">${list.length} Employees</span>
      </div>

      <!-- EMPLOYEES CARDS GRID -->
      <div class="employees-cards-grid">
        ${list.map(e => {
          const statusObj = getEmployeeWorkStatus(e.name);
          return `
            <div class="employee-card" onclick="window.location.hash='#employee/${e.name}'" role="button" tabindex="0" title="Click to view full employee information">
              <!-- TOP-RIGHT ATTENDANCE / WORK STATUS INDICATOR -->
              <div class="employee-card-status-badge" title="${statusObj.description}">
                ${statusObj.iconHtml}
              </div>

              <!-- PROFILE PICTURE (AVATAR) -->
              <div class="employee-card-avatar-wrap">
                ${e.image ? `
                  <img src="${escapeHtml(e.image)}" alt="${escapeHtml(e.employee_name)}" class="emp-card-photo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                  <div class="emp-card-avatar-fallback" style="display: none; background: ${nameToColor(e.employee_name)}22; color: ${nameToColor(e.employee_name)};">
                    ${getInitials(e.employee_name)}
                  </div>
                ` : `
                  <div class="emp-card-avatar-fallback" style="background: ${nameToColor(e.employee_name)}22; color: ${nameToColor(e.employee_name)};">
                    ${getInitials(e.employee_name)}
                  </div>
                `}
              </div>

              <!-- BASIC INFORMATION -->
              <h3 class="emp-card-name">${escapeHtml(e.employee_name)}</h3>
              <div class="emp-card-designation">${escapeHtml(e.designation)}</div>
              <div class="emp-card-dept-badge">${escapeHtml(e.department)}</div>

              <div class="emp-card-meta-row">
                <span><strong>ID:</strong> ${escapeHtml(e.name)}</span>
                <span class="badge ${statusObj.badgeClass}" style="font-size: 10.5px; padding: 2px 8px;">${statusObj.label}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // HR / EMPLOYEE VIEW-ONLY DETAIL VIEW (#employee/:id)
  // -------------------------------------------------------------------------
  let activeEmpTab = 'personal';

  function renderEmployeeDetailView(empId) {
    const emp = store.data.employees.find(e => e.name === empId) || store.data.employees[0];
    const statusObj = getEmployeeWorkStatus(emp.name);

    return `
      <div class="page-header">
        <div class="page-title-group">
          <div class="breadcrumbs" style="margin-bottom: 6px;">
            <a href="#employees">Employees</a>
            <span class="separator">/</span>
            <span class="current">${escapeHtml(emp.name)}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <h1>${escapeHtml(emp.employee_name)}</h1>
            <span class="view-only-tag">View-Only Mode</span>
          </div>
        </div>
        <div class="page-actions">
          <a href="#employees" class="btn btn-secondary">← Back to Employees</a>
          <button class="btn btn-ghost" onclick="window.openEditEmployeeModal('${emp.name}')">Edit Details</button>
        </div>
      </div>

      <!-- HERO PROFILE CARD -->
      <div class="emp-profile-hero">
        <div class="emp-profile-hero-left">
          ${emp.image ? `
            <img src="${escapeHtml(emp.image)}" alt="${escapeHtml(emp.employee_name)}" class="emp-hero-avatar" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
            <div class="emp-hero-initials" style="display: none; background: ${nameToColor(emp.employee_name)}22; color: ${nameToColor(emp.employee_name)};">
              ${getInitials(emp.employee_name)}
            </div>
          ` : `
            <div class="emp-hero-initials" style="background: ${nameToColor(emp.employee_name)}22; color: ${nameToColor(emp.employee_name)};">
              ${getInitials(emp.employee_name)}
            </div>
          `}
          <div>
            <h2 class="emp-hero-title">${escapeHtml(emp.employee_name)}</h2>
            <div class="emp-hero-subtitle">
              <span><strong>${escapeHtml(emp.designation)}</strong></span>
              <span>•</span>
              <span>${escapeHtml(emp.department)}</span>
              <span>•</span>
              <span>${escapeHtml(emp.name)}</span>
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="text-align: right;">
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Attendance Status</div>
            <div style="display: flex; align-items: center; gap: 6px; justify-content: flex-end; margin-top: 4px;">
              ${statusObj.iconHtml}
              <span class="badge ${statusObj.badgeClass}" style="font-size: 12px; font-weight: 600;">${statusObj.label}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- VIEW-ONLY FORM TABS -->
      <div class="card">
        <div class="card-header" style="border-bottom: none; padding-bottom: 0;">
          <div class="tabs-nav" style="border-bottom: none; margin-bottom: 0;">
            <button class="tab-btn ${activeEmpTab === 'personal' ? 'active' : ''}" onclick="window.setEmpDocTab('personal')">Personal Details</button>
            <button class="tab-btn ${activeEmpTab === 'job' ? 'active' : ''}" onclick="window.setEmpDocTab('job')">Job & Organization</button>
            <button class="tab-btn ${activeEmpTab === 'emergency' ? 'active' : ''}" onclick="window.setEmpDocTab('emergency')">Emergency & Bank</button>
          </div>
        </div>

        <div class="card-body" style="border-top: 1px solid var(--border-color); padding: 24px;">
          ${activeEmpTab === 'personal' ? `
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
              <div class="view-only-field-group">
                <span class="view-only-label">Full Name</span>
                <span class="view-only-value">${escapeHtml(emp.employee_name)}</span>
              </div>
              <div class="view-only-field-group">
                <span class="view-only-label">Gender</span>
                <span class="view-only-value">${escapeHtml(emp.gender || '—')}</span>
              </div>
              <div class="view-only-field-group">
                <span class="view-only-label">Date of Birth</span>
                <span class="view-only-value">${formatDate(emp.date_of_birth)}</span>
              </div>
              <div class="view-only-field-group">
                <span class="view-only-label">Cell Phone</span>
                <span class="view-only-value">${escapeHtml(emp.cell_phone || '—')}</span>
              </div>
              <div class="view-only-field-group">
                <span class="view-only-label">Company Email</span>
                <span class="view-only-value">${escapeHtml(emp.company_email)}</span>
              </div>
              <div class="view-only-field-group">
                <span class="view-only-label">Personal Email</span>
                <span class="view-only-value">${escapeHtml(emp.personal_email || '—')}</span>
              </div>
              <div class="view-only-field-group" style="grid-column: span 2;">
                <span class="view-only-label">Current Residential Address</span>
                <span class="view-only-value">${escapeHtml(emp.current_address || '—')}</span>
              </div>
              <div class="view-only-field-group" style="grid-column: span 2;">
                <span class="view-only-label">Permanent Address</span>
                <span class="view-only-value">${escapeHtml(emp.permanent_address || '—')}</span>
              </div>
            </div>
          ` : activeEmpTab === 'job' ? `
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
              <div class="view-only-field-group">
                <span class="view-only-label">Department</span>
                <span class="view-only-value">${escapeHtml(emp.department)}</span>
              </div>
              <div class="view-only-field-group">
                <span class="view-only-label">Designation</span>
                <span class="view-only-value">${escapeHtml(emp.designation)}</span>
              </div>
              <div class="view-only-field-group">
                <span class="view-only-label">Date of Joining</span>
                <span class="view-only-value">${formatDate(emp.date_of_joining)}</span>
              </div>
              <div class="view-only-field-group">
                <span class="view-only-label">Employment Status</span>
                <span class="view-only-value"><span class="badge badge-success">${escapeHtml(emp.status)}</span></span>
              </div>
              <div class="view-only-field-group">
                <span class="view-only-label">Reports To</span>
                <span class="view-only-value">${escapeHtml(emp.reports_to || 'Management')}</span>
              </div>
              <div class="view-only-field-group">
                <span class="view-only-label">Shift Schedule</span>
                <span class="view-only-value">${escapeHtml(emp.shift || 'General Shift')}</span>
              </div>
              <div class="view-only-field-group">
                <span class="view-only-label">Leave Approver</span>
                <span class="view-only-value">${escapeHtml(emp.leave_approver || 'HR Manager')}</span>
              </div>
              <div class="view-only-field-group">
                <span class="view-only-label">Expense Approver</span>
                <span class="view-only-value">${escapeHtml(emp.expense_approver || 'HR Manager')}</span>
              </div>
            </div>
          ` : `
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
              <div class="view-only-field-group">
                <span class="view-only-label">Emergency Contact Person</span>
                <span class="view-only-value">${escapeHtml(emp.person_to_be_contacted || '—')}</span>
              </div>
              <div class="view-only-field-group">
                <span class="view-only-label">Relationship</span>
                <span class="view-only-value">${escapeHtml(emp.relation || '—')}</span>
              </div>
              <div class="view-only-field-group">
                <span class="view-only-label">Emergency Phone Number</span>
                <span class="view-only-value">${escapeHtml(emp.emergency_phone_number || '—')}</span>
              </div>
              <div class="view-only-field-group">
                <span class="view-only-label">Bank Name</span>
                <span class="view-only-value">${escapeHtml(emp.bank_name || 'HDFC Bank')}</span>
              </div>
              <div class="view-only-field-group" style="grid-column: span 2;">
                <span class="view-only-label">Bank Account Number</span>
                <span class="view-only-value">•••• •••• •••• ${escapeHtml((emp.bank_ac_no || '1234').slice(-4))}</span>
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // HR ADD EMPLOYEE VIEW (#employee-new)
  // -------------------------------------------------------------------------
  function renderAddEmployeeView() {
    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Onboard New Employee</h1>
          <p>Register official profile, assign initial department & designation, and grant portal credentials.</p>
        </div>
      </div>

      <div class="card" style="max-width: 800px; margin: 0 auto;">
        <form id="new-employee-form" onsubmit="window.handleCreateEmployee(event)">
          <div class="card-body">
            <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 14px;">1. Personal Details</h3>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">First Name <span class="required">*</span></label>
                <input type="text" class="form-control" name="first_name" required placeholder="e.g. Rahul">
              </div>
              <div class="form-group">
                <label class="form-label">Last Name <span class="required">*</span></label>
                <input type="text" class="form-control" name="last_name" required placeholder="e.g. Sen">
              </div>
            </div>

            <div class="form-row" style="margin-top: 12px;">
              <div class="form-group">
                <label class="form-label">Gender</label>
                <select class="form-control" name="gender">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-binary</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Date of Birth</label>
                <input type="date" class="form-control" name="date_of_birth" value="1996-05-10">
              </div>
            </div>

            <h3 style="font-size: 14px; font-weight: 600; margin: 20px 0 14px;">2. Employment & Assignment</h3>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Department <span class="required">*</span></label>
                <select class="form-control" name="department" required>
                  ${store.data.departments.map(d => `<option>${escapeHtml(d)}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Designation <span class="required">*</span></label>
                <select class="form-control" name="designation" required>
                  ${store.data.designations.map(d => `<option>${escapeHtml(d)}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="form-row" style="margin-top: 12px;">
              <div class="form-group">
                <label class="form-label">Company Email <span class="required">*</span></label>
                <input type="email" class="form-control" name="company_email" required placeholder="e.g. rahul@dayflow.local">
              </div>
                <div class="form-group">
                  <label class="form-label">Date of Joining <span class="required">*</span></label>
                  <input type="date" class="form-control" name="date_of_joining" required value="${dateOffset(0)}">
                </div>
            </div>

            <div class="form-row" style="margin-top: 12px;">
              <div class="form-group">
                <label class="form-label">Cell Phone</label>
                <input type="tel" class="form-control" name="cell_phone" placeholder="+91 98765 00000">
              </div>
              <div class="form-group">
                <label class="form-label">Initial Shift</label>
                <select class="form-control" name="shift">
                  <option>General Shift</option>
                  <option>Morning Shift</option>
                  <option>Evening Shift</option>
                </select>
              </div>
            </div>
          </div>

          <div class="card-footer" style="display: flex; justify-content: flex-end; gap: 10px;">
            <a href="#employees" class="btn btn-secondary">Cancel</a>
            <button type="submit" class="btn btn-primary">Onboard & Create Employee</button>
          </div>
        </form>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // HR ATTENDANCE VIEW (#attendance - Real-Time Live Connected Attendance)
  // -------------------------------------------------------------------------
  let hrAttendanceFilter = 'All'; // 'All' | 'Present' | 'Checked Out' | 'On Leave' | 'Absent'
  let hrAttendanceSearch = '';

  function renderHRAttendanceView() {
    const todayStr = new Date().toISOString().split('T')[0];
    const todayDisplay = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
    const employees = store.data.employees;

    // Calculate real-time stats for each employee for today (live map from backend;
    // durations recomputed fresh on every render/tick from punch records)
    const employeeLiveStatuses = employees.map(emp => {
      const live = getLiveAttendance(emp.name);
      const punches = todaysPunchList(emp.name);

      const totalMinutes = liveWorkingMinutes(emp.name);
      const durationStr = punches.length > 0 ? fmtDuration(totalMinutes) : '—';

      return {
        emp,
        status: live.status,
        isCurrentlyIn: live.currently_in,
        firstIn: live.last_in || live.first_in, // latest check-in (current session start)
        lastOut: live.last_out,
        durationStr,
        punches,
        leave: live.leave_type ? { leave_type: live.leave_type } : null
      };
    });

    // Counts
    const countPresent = employeeLiveStatuses.filter(s => s.status === 'Present').length;
    const countCheckedOut = employeeLiveStatuses.filter(s => s.status === 'Checked Out').length;
    const countOnLeave = employeeLiveStatuses.filter(s => s.status === 'On Leave').length;
    const countAbsent = employeeLiveStatuses.filter(s => s.status === 'Absent').length;

    // Filter
    let filteredList = employeeLiveStatuses;
    if (hrAttendanceFilter !== 'All') {
      filteredList = filteredList.filter(s => s.status === hrAttendanceFilter);
    }
    if (hrAttendanceSearch) {
      const q = hrAttendanceSearch.toLowerCase();
      filteredList = filteredList.filter(s => 
        s.emp.employee_name.toLowerCase().includes(q) || 
        (s.emp.login_id || '').toLowerCase().includes(q) || 
        (s.emp.department || '').toLowerCase().includes(q)
      );
    }

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Workforce Attendance & Real-Time Presence</h1>
          <p>Live synchronized attendance bar connected to central database for today, <strong>${todayDisplay}</strong>.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary btn-sm" onclick="window.liveSyncNow()">
            <span>&#x21bb;</span> Live Sync Now
          </button>
        </div>
      </div>

      <!-- REAL-TIME KPI ATTENDANCE CARDS -->
      <div class="stats-grid" style="grid-template-columns: repeat(4, 1fr);">
        <div class="stat-card success" style="cursor: pointer;" onclick="window.setHRAttendanceFilter('Present')">
          <div class="stat-card-header">
            <span class="stat-card-title">Currently Present</span>
            <span class="stat-card-icon" style="background: var(--success-pale); color: var(--success);">${ICONS.check}</span>
          </div>
          <div class="stat-card-value">${countPresent}</div>
          <div class="stat-card-footer">
            <span>Active & Logged In Now</span>
          </div>
        </div>

        <div class="stat-card primary" style="cursor: pointer;" onclick="window.setHRAttendanceFilter('Checked Out')">
          <div class="stat-card-header">
            <span class="stat-card-title">Checked Out</span>
            <span class="stat-card-icon" style="background: var(--primary-pale); color: var(--primary);">${ICONS.clock}</span>
          </div>
          <div class="stat-card-value">${countCheckedOut}</div>
          <div class="stat-card-footer">
            <span>Shift Completed Today</span>
          </div>
        </div>

        <div class="stat-card warning" style="cursor: pointer;" onclick="window.setHRAttendanceFilter('On Leave')">
          <div class="stat-card-header">
            <span class="stat-card-title">On Approved Leave</span>
            <span class="stat-card-icon" style="background: var(--warning-pale); color: var(--warning);">${ICONS.plane}</span>
          </div>
          <div class="stat-card-value">${countOnLeave}</div>
          <div class="stat-card-footer">
            <span>Scheduled Time Off</span>
          </div>
        </div>

        <div class="stat-card danger" style="cursor: pointer;" onclick="window.setHRAttendanceFilter('Absent')">
          <div class="stat-card-header">
            <span class="stat-card-title">Not Checked In</span>
            <span class="stat-card-icon" style="background: var(--danger-pale); color: var(--danger);">${ICONS.x}</span>
          </div>
          <div class="stat-card-value">${countAbsent}</div>
          <div class="stat-card-footer">
            <span>Pending Check-in / Absent</span>
          </div>
        </div>
      </div>

      <!-- FILTER & SEARCH BAR -->
      <div class="card" style="margin-top: 20px;">
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div class="tabs-nav" style="border-bottom: none; margin-bottom: 0;">
            ${['All', 'Present', 'Checked Out', 'On Leave', 'Absent'].map(filter => `
              <button class="tab-btn ${hrAttendanceFilter === filter ? 'active' : ''}" onclick="window.setHRAttendanceFilter('${filter}')">
                ${filter}
                <span class="tab-pill">${filter === 'All' ? employeeLiveStatuses.length : employeeLiveStatuses.filter(s => s.status === filter).length}</span>
              </button>
            `).join('')}
          </div>

          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="search-box" style="width: 240px;">
              <span class="icon">${ICONS.search}</span>
              <input type="text" placeholder="Filter employee..." value="${escapeHtml(hrAttendanceSearch)}" oninput="window.setHRAttendanceSearch(this.value)">
            </div>
          </div>
        </div>

        <!-- REAL-TIME ATTENDANCE TABLE -->
        <div class="table-container" style="border: none; border-radius: 0; border-top: 1px solid var(--border-color);">
          <table class="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Login ID</th>
                <th>Live Status</th>
                <th>Check-In Time</th>
                <th>Check-Out Time</th>
                <th style="text-align: center;">Active Work Duration</th>
                <th>Shift Type</th>
                <th style="text-align: right;">Punch Timeline</th>
              </tr>
            </thead>
            <tbody>
              ${filteredList.length === 0 ? `
                <tr><td colspan="8" style="text-align: center; padding: 28px; color: var(--text-muted);">No employees found in this attendance status filter.</td></tr>
              ` : filteredList.map(item => `
                <tr>
                  <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <div class="user-avatar-sm" style="background: ${nameToColor(item.emp.employee_name)}22; color: ${nameToColor(item.emp.employee_name)}; font-weight: 700;">
                        ${getInitials(item.emp.employee_name)}
                      </div>
                      <div>
                        <div style="font-weight: 600; color: var(--text-primary);">${escapeHtml(item.emp.employee_name)}</div>
                        <div style="font-size: 11px; color: var(--text-muted);">${escapeHtml(item.emp.designation || '')} &middot; ${escapeHtml(item.emp.department || '')}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <code style="font-family: var(--font-mono); font-size: 11.5px; background: var(--bg-subtle); padding: 2px 6px; border-radius: 4px; font-weight: 600;">
                      ${escapeHtml(item.emp.login_id || item.emp.name)}
                    </code>
                  </td>
                  <td>
                    ${item.status === 'Present' ? `
                      <span class="badge badge-success" style="display: inline-flex; align-items: center; gap: 6px;">
                        <span class="card-status-dot dot-green" style="animation: pulse 1.5s infinite;"></span>
                        <strong>Present (Active)</strong>
                      </span>
                    ` : item.status === 'Checked Out' ? `
                      <span class="badge badge-info" style="display: inline-flex; align-items: center; gap: 6px;">
                        <span class="card-status-dot dot-blue"></span>
                        Checked Out
                      </span>
                    ` : item.status === 'On Leave' ? `
                      <span class="badge badge-warning" style="display: inline-flex; align-items: center; gap: 6px;">
                        ${ICONS.plane}
                        On Leave (${escapeHtml(item.leave?.leave_type || 'Approved')})
                      </span>
                    ` : `
                      <span class="badge badge-neutral" style="display: inline-flex; align-items: center; gap: 6px;">
                        <span class="card-status-dot dot-red"></span>
                        Not Checked In
                      </span>
                    `}
                  </td>
                  <td>
                    ${item.firstIn ? `
                      <strong style="color: var(--success); font-family: var(--font-mono);">${item.firstIn}</strong>
                    ` : '<span style="color: var(--text-light);">—</span>'}
                  </td>
                  <td>
                    ${item.lastOut ? `
                      <strong style="color: var(--primary); font-family: var(--font-mono);">${item.lastOut}</strong>
                    ` : (item.isCurrentlyIn ? '<span class="badge badge-success" style="font-size: 10px;">In Progress</span>' : '<span style="color: var(--text-light);">—</span>')}
                  </td>
                  <td style="text-align: center;" data-duration-for="${item.emp.name}">
                    <strong style="font-size: 13px; color: var(--text-primary);">${item.durationStr}</strong>
                  </td>
                  <td>
                    <span style="font-size: 11.5px; color: var(--text-secondary);">${escapeHtml(item.emp.shift || 'General Shift')}</span>
                  </td>
                  <td style="text-align: right;">
                    ${item.punches.length > 0 ? `
                      <button class="btn btn-sm btn-ghost" onclick="window.viewEmployeePunchLog('${item.emp.name}')" title="View detailed timestamps">
                        ${item.punches.length} Punch${item.punches.length > 1 ? 'es' : ''} &rarr;
                      </button>
                    ` : `
                      <span style="font-size: 11px; color: var(--text-muted);">No Punches</span>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.setHRAttendanceFilter = function (f) {
    hrAttendanceFilter = f;
    renderApp();
  };

  window.liveSyncNow = async function () {
    const ok = await store.reload();
    if (ok) {
      showToast('success', 'Attendance synced with the central database.');
    } else {
      showToast('danger', 'Cannot reach the HRMS server right now.');
    }
    renderApp();
  };

  window.setHRAttendanceSearch = function (s) {
    hrAttendanceSearch = s;
    renderApp();
  };

  window.viewEmployeePunchLog = function (empId) {
    const emp = store.data.employees.find(e => e.name === empId);
    if (!emp) return;

    const t = new Date().toISOString().split('T')[0];

    openModal(() => {
      const fresh = store.data.checkins
        .filter(c => c.employee === empId && String(c.time).startsWith(t))
        .sort((a, b) => (a.time < b.time ? 1 : -1));
      return `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Live Punch Log &middot; ${escapeHtml(emp.employee_name)}</div>
            <button class="icon-btn" onclick="window.closeModal()">&times;</button>
          </div>
          <div class="modal-body" style="padding: 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
              <div>
                <strong>${escapeHtml(emp.employee_name)}</strong> &middot; <code>${escapeHtml(emp.login_id || emp.name)}</code>
              </div>
              <span class="badge badge-purple">${escapeHtml(emp.department || 'HQ')}</span>
            </div>

            <div class="table-container" style="border: 1px solid var(--border-color); max-height: 280px; overflow-y: auto;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Exact Time</th>
                    <th>Coordinates Verification</th>
                  </tr>
                </thead>
                <tbody>
                  ${fresh.length === 0 ? `
                    <tr><td colspan="3" style="text-align: center; padding: 20px; color: var(--text-muted);">No punch records found.</td></tr>
                  ` : fresh.map(p => `
                    <tr>
                      <td>
                        <span class="badge ${p.log_type === 'IN' ? 'badge-success' : 'badge-danger'}">
                          Check ${p.log_type}
                        </span>
                      </td>
                      <td><strong style="font-family: var(--font-mono);">${p.time}</strong></td>
                      <td style="font-size: 11px; color: var(--text-muted);">12.9716° N, 77.5946° E</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" onclick="window.closeModal()">Close</button>
          </div>
        </div>
      </div>
    `;
    }, 'punch-log');
  };


  // -------------------------------------------------------------------------
  // HR RECRUITMENT MODULES (Openings, Applicants Kanban, Interviews)
  // -------------------------------------------------------------------------
  function renderRecruitmentOpeningsView() {
    const openings = store.data.job_openings;

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Job Openings & Requisitions</h1>
          <p>Create job descriptions, manage target headcount, and view applicant pipelines.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="window.openCreateJobOpeningModal()">+ Create Job Opening</button>
          <a href="#recruitment-applicants" class="btn btn-secondary">Applicant Kanban</a>
        </div>
      </div>

      <div class="card">
        <div class="table-container" style="border: none;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Department</th>
                <th style="text-align: center;">Open Vacancies</th>
                <th>Posted Date</th>
                <th>Status</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${openings.map(j => `
                <tr>
                  <td><strong>${escapeHtml(j.job_title)}</strong></td>
                  <td>${escapeHtml(j.department)}</td>
                  <td style="text-align: center;"><strong>${j.vacancies}</strong></td>
                  <td>${formatDate(j.posted_date)}</td>
                  <td><span class="badge ${j.status === 'Open' ? 'badge-success' : 'badge-neutral'}">${escapeHtml(j.status)}</span></td>
                  <td style="text-align: right;">
                    <a href="#recruitment-applicants" class="btn btn-sm btn-secondary">View Applicants</a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // APPLICANTS KANBAN BOARD
  function renderRecruitmentApplicantsView() {
    const applicants = store.data.job_applicants;
    const stages = ['Open', 'Replied', 'Accepted', 'Rejected', 'Hold'];

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Applicant Tracking Pipeline</h1>
          <p>Kanban pipeline view to track candidate evaluations, screening rounds, and offers.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="window.openAddApplicantModal()">+ Add Applicant</button>
          <a href="#recruitment-interviews" class="btn btn-secondary">Interviews Schedule</a>
        </div>
      </div>

      <!-- KANBAN COLUMNS -->
      <div class="kanban-board">
        ${stages.map(stage => {
          const list = applicants.filter(a => a.status === stage);
          return `
            <div class="kanban-column">
              <div class="kanban-column-header">
                <div class="kanban-column-title">
                  <span class="badge-dot" style="background: ${stage === 'Accepted' ? 'var(--success)' : stage === 'Rejected' ? 'var(--danger)' : stage === 'Replied' ? 'var(--primary)' : 'var(--warning)'};"></span>
                  <span>${escapeHtml(stage)}</span>
                </div>
                <span class="badge badge-neutral">${list.length}</span>
              </div>
              <div class="kanban-cards-list">
                ${list.map(a => `
                  <div class="kanban-card" onclick="window.openApplicantDetailsModal('${a.name}')">
                    <div class="kanban-card-title">${escapeHtml(a.applicant_name)}</div>
                    <div class="kanban-card-sub">${escapeHtml(a.job_title)}</div>
                    <div class="kanban-card-meta">
                      <span>${escapeHtml(a.source || 'Direct')}</span>
                      <span>${a.rating || 0} / 5</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // INTERVIEWS MANAGEMENT
  function renderRecruitmentInterviewsView() {
    const list = store.data.interviews;

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Interview Schedules & Candidate Ratings</h1>
          <p>Coordinate panel interview time slots, record technical evaluations, and track outcomes.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="window.openScheduleInterviewModal()">+ Schedule Interview</button>
        </div>
      </div>

      <div class="card">
        <div class="table-container" style="border: none;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Job Title</th>
                <th>Interview Date & Time</th>
                <th>Assigned Panelist</th>
                <th>Rating</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${list.map(i => `
                <tr>
                  <td><strong>${escapeHtml(i.applicant_name)}</strong></td>
                  <td>${escapeHtml(i.job_title)}</td>
                  <td><strong>${formatDate(i.scheduled_date)}</strong> &middot; ${escapeHtml(i.from_time)} - ${escapeHtml(i.to_time)}</td>
                  <td>${escapeHtml(i.interviewer)}</td>
                  <td>${i.rating || 0} / 5</td>
                  <td><span class="badge ${i.status === 'Cleared' ? 'badge-success' : i.status === 'Scheduled' ? 'badge-warning' : 'badge-danger'}">${escapeHtml(i.status)}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // HR ONBOARDING MANAGEMENT VIEW
  // -------------------------------------------------------------------------
  function renderOnboardingView() {
    const records = store.data.onboarding_records;

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Employee Onboarding & Induction</h1>
          <p>Track new hire verification checklists, IT allocations, and 30-day milestones.</p>
        </div>
      </div>

      <div class="card">
        <div class="table-container" style="border: none;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Induction Status</th>
                <th style="width: 240px;">Activity Progress</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${records.map(r => {
                const total = (r.activities || []).length;
                const done = (r.activities || []).filter(a => a.completed).length;
                const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                return `
                  <tr>
                    <td><strong>${escapeHtml(r.employee_name)}</strong> <small>(${r.employee})</small></td>
                    <td>${escapeHtml(r.department)}</td>
                    <td>${escapeHtml(r.designation)}</td>
                    <td><span class="badge ${r.boarding_status === 'Completed' ? 'badge-success' : 'badge-warning'}">${escapeHtml(r.boarding_status)}</span></td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="flex: 1; height: 6px; background: var(--bg-muted); border-radius: 3px; overflow: hidden;">
                          <div style="width: ${pct}%; height: 100%; background: ${pct === 100 ? 'var(--success)' : 'var(--primary)'};"></div>
                        </div>
                        <span style="font-size: 11px; font-weight: 600;">${done}/${total}</span>
                      </div>
                    </td>
                    <td style="text-align: right;">
                      <button class="btn btn-sm btn-secondary" onclick="window.openOnboardingChecklistModal('${r.name}')">Checklist →</button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // HR REPORTS & ANALYTICS VIEW (6 Reports)
  // -------------------------------------------------------------------------
  function renderReportsView() {
    const nowD = new Date();
    const curYear = nowD.getFullYear();
    const monthPrefix = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const curPrefix = monthPrefix(nowD);
    const prevD = new Date(curYear, nowD.getMonth() - 1, 1);
    const prevPrefix = monthPrefix(prevD);

    // 1. Headcount by department
    const deptCounts = {};
    for (const e of store.data.employees) {
      deptCounts[e.department || 'Unassigned'] = (deptCounts[e.department || 'Unassigned'] || 0) + 1;
    }
    const totalHeadcount = store.data.employees.length || 1;

    // 2. Recruitment funnel
    const applicants = store.data.job_applicants;
    const appliedCount = applicants.length;
    const screenedCount = applicants.filter(a => a.status !== 'Open').length;
    const interviewedCount = new Set(store.data.interviews.map(i => i.applicant)).size;
    const hiredCount = applicants.filter(a => a.status === 'Accepted').length;
    const pctOf = (n) => appliedCount ? Math.round((n / appliedCount) * 100) : 0;

    // 3. Leave utilization
    const leaveTypesSet = new Set();
    for (const allocs of Object.values(store.data.leave_allocations || {})) {
      Object.keys(allocs).forEach(t => leaveTypesSet.add(t));
    }
    const leaveRows = [...leaveTypesSet].map(type => {
      let allocated = 0, consumed = 0;
      const balAll = store.data.leave_balances || {};
      for (const [, empBals] of Object.entries(balAll)) {
        if (empBals[type]) { allocated += empBals[type].allocated; consumed += empBals[type].consumed; }
      }
      if (!Object.keys(balAll).length) {
        for (const allocs of Object.values(store.data.leave_allocations || {})) allocated += allocs[type] || 0;
        consumed = store.data.leave_applications
          .filter(l => l.status === 'Approved' && l.leave_type === type)
          .reduce((s, l) => s + (Number(l.total_leave_days) || 0), 0);
      }
      return { type, allocated, consumed, remaining: Math.max(0, allocated - consumed) };
    }).filter(r => r.allocated > 0);

    // 4. Payroll disbursement history (aggregated from salary slips by month)
    const slipMonths = {};
    for (const s of store.data.salary_slips) {
      const key = String(s.start_date || '').substring(0, 7);
      if (!key) continue;
      slipMonths[key] = slipMonths[key] || { gross: 0, ded: 0, net: 0, count: 0 };
      slipMonths[key].gross += Number(s.gross_pay) || 0;
      slipMonths[key].ded += Number(s.total_deduction) || 0;
      slipMonths[key].net += Number(s.net_pay) || 0;
      slipMonths[key].count += 1;
    }
    const payrollHistory = Object.entries(slipMonths)
      .sort((a, b) => (a[0] < b[0] ? 1 : -1))
      .slice(0, 6);

    // 5. Monthly attendance summary (current + previous month)
    const monthStats = (prefix) => {
      const recs = store.data.attendance.filter(a => String(a.attendance_date || '').startsWith(prefix));
      const n = recs.length || 1;
      const present = recs.filter(r => r.status === 'Present').length;
      const wfh = recs.filter(r => r.status === 'Work From Home').length;
      const late = recs.filter(r => r.late_entry).length;
      return { label: prefix, presentPct: Math.round(present / n * 100), wfhPct: Math.round(wfh / n * 100), latePct: Math.round(late / n * 100) };
    };
    const curStats = monthStats(curPrefix);
    const prevStats = monthStats(prevPrefix);
    const fmtMonthLabel = (prefix) => {
      const [y, m] = prefix.split('-');
      return `${new Date(Number(y), Number(m) - 1, 1).toLocaleDateString('en-US', { month: 'long' })} ${y}`;
    };

    // 6. Turnover & retention
    const joinedThisYear = store.data.employees.filter(e => String(e.date_of_joining || '').startsWith(String(curYear))).length;
    const leftCount = store.data.employees.filter(e => e.status === 'Left').length;
    const retention = totalHeadcount ? Math.round((1 - leftCount / totalHeadcount) * 100) : 100;
    const maxJoinLeave = Math.max(joinedThisYear, leftCount, 1);

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Reports & HR Intelligence</h1>
          <p>Comprehensive organizational analytics across headcount, attendance, leaves, payroll, recruitment, and turnover.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <!-- REPORT 1: HEADCOUNT BY DEPARTMENT -->
        <div class="card">
          <div class="card-header"><span class="card-title">1. Headcount by Department (${totalHeadcount} Total)</span></div>
          <div class="card-body">
            ${Object.entries(deptCounts).sort((a, b) => b[1] - a[1]).map(([dept, count]) => `
              <div class="report-bar-row">
                <span class="report-bar-label">${escapeHtml(dept)}</span>
                <div class="report-bar-track"><div class="report-bar-fill" style="width: ${Math.round(count / totalHeadcount * 100)}%;"></div></div>
                <span class="report-bar-value">${count} (${Math.round(count / totalHeadcount * 100)}%)</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- REPORT 2: RECRUITMENT FUNNEL CONVERSION -->
        <div class="card">
          <div class="card-header"><span class="card-title">2. Recruitment Pipeline Funnel</span></div>
          <div class="card-body">
            <div class="report-bar-row">
              <span class="report-bar-label">Applied</span>
              <div class="report-bar-track"><div class="report-bar-fill" style="width: 100%; background: #64748b;"></div></div>
              <span class="report-bar-value">${appliedCount} (100%)</span>
            </div>
            <div class="report-bar-row">
              <span class="report-bar-label">Screened</span>
              <div class="report-bar-track"><div class="report-bar-fill" style="width: ${pctOf(screenedCount)}%; background: #3b82f6;"></div></div>
              <span class="report-bar-value">${screenedCount} (${pctOf(screenedCount)}%)</span>
            </div>
            <div class="report-bar-row">
              <span class="report-bar-label">Interviewed</span>
              <div class="report-bar-track"><div class="report-bar-fill" style="width: ${pctOf(interviewedCount)}%; background: #8b5cf6;"></div></div>
              <span class="report-bar-value">${interviewedCount} (${pctOf(interviewedCount)}%)</span>
            </div>
            <div class="report-bar-row">
              <span class="report-bar-label">Hired & Accepted</span>
              <div class="report-bar-track"><div class="report-bar-fill" style="width: ${pctOf(hiredCount)}%; background: #10b981;"></div></div>
              <span class="report-bar-value">${hiredCount} (${pctOf(hiredCount)}%)</span>
            </div>
          </div>
        </div>

        <!-- REPORT 3: LEAVE UTILIZATION -->
        <div class="card">
          <div class="card-header"><span class="card-title">3. Leave Type Quota Utilization</span></div>
          <div class="card-body">
            <div class="table-container" style="border: none;">
              <table class="data-table">
                <thead>
                  <tr><th>Leave Type</th><th>Allocated</th><th>Consumed</th><th>Available</th></tr>
                </thead>
                <tbody>
                  ${leaveRows.length === 0 ? `<tr><td colspan="4" style="text-align:center;color:var(--text-muted);">No leave allocations configured.</td></tr>` : leaveRows.map(r => `
                    <tr><td>${escapeHtml(r.type)}</td><td>${r.allocated} Days</td><td>${r.consumed} Days</td><td><strong>${r.remaining} Days</strong></td></tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- REPORT 4: PAYROLL DISBURSEMENTS HISTORY -->
        <div class="card">
          <div class="card-header"><span class="card-title">4. Monthly Payroll Expense Trajectory</span></div>
          <div class="card-body">
            <div class="table-container" style="border: none;">
              <table class="data-table">
                <thead>
                  <tr><th>Month</th><th>Slips</th><th>Gross Pay</th><th>Total Deductions</th><th>Net Disbursed</th></tr>
                </thead>
                <tbody>
                  ${payrollHistory.length === 0 ? `<tr><td colspan="5" style="text-align:center;color:var(--text-muted);">No payroll processed yet.</td></tr>` : payrollHistory.map(([key, v]) => `
                    <tr><td>${escapeHtml(fmtMonthLabel(key))}</td><td>${v.count}</td><td>${formatCurrency(v.gross)}</td><td style="color: var(--danger);">${formatCurrency(v.ded)}</td><td><strong>${formatCurrency(v.net)}</strong></td></tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- REPORT 5: MONTHLY ATTENDANCE SUMMARY -->
        <div class="card">
          <div class="card-header"><span class="card-title">5. Monthly Presence & Punctuality</span></div>
          <div class="card-body">
            <div class="table-container" style="border: none;">
              <table class="data-table">
                <thead>
                  <tr><th>Month</th><th>Present %</th><th>WFH %</th><th>Late Rate</th></tr>
                </thead>
                <tbody>
                  <tr><td>${escapeHtml(fmtMonthLabel(curStats.label))}</td><td>${curStats.presentPct}%</td><td>${curStats.wfhPct}%</td><td>${curStats.latePct}%</td></tr>
                  <tr><td>${escapeHtml(fmtMonthLabel(prevStats.label))}</td><td>${prevStats.presentPct}%</td><td>${prevStats.wfhPct}%</td><td>${prevStats.latePct}%</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- REPORT 6: EMPLOYEE TURNOVER & RETENTION -->
        <div class="card">
          <div class="card-header"><span class="card-title">6. Annual Turnover & Growth (${curYear})</span></div>
          <div class="card-body">
            <div class="report-bar-row">
              <span class="report-bar-label">Joined This Year</span>
              <div class="report-bar-track"><div class="report-bar-fill" style="width: ${Math.round(joinedThisYear / maxJoinLeave * 100)}%; background: var(--success);"></div></div>
              <span class="report-bar-value">+${joinedThisYear} Hire${joinedThisYear === 1 ? '' : 's'}</span>
            </div>
            <div class="report-bar-row">
              <span class="report-bar-label">Departures / Attrition</span>
              <div class="report-bar-track"><div class="report-bar-fill" style="width: ${Math.round(leftCount / maxJoinLeave * 100)}%; background: var(--danger);"></div></div>
              <span class="report-bar-value">${leftCount} (${totalHeadcount ? Math.round(leftCount / totalHeadcount * 100) : 0}%)</span>
            </div>
            <div style="margin-top: 14px; font-size: 11.5px; color: var(--text-muted);">
              Retention rate: <strong>${retention}%</strong> across technical and operations units.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // NOTIFICATIONS CENTER
  // -------------------------------------------------------------------------
  function renderNotificationsView() {
    const emp = getActiveEmployee();
    const list = store.data.notifications.filter(n => n.user === emp.name || session.role === 'HR / Admin');

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Notifications Center</h1>
          <p>Recent activity triggers, leave decision notices, and payroll publication alerts.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="window.markAllNotificationsRead()">Mark All as Read</button>
        </div>
      </div>

      <div class="card" style="max-width: 800px;">
        <div class="card-body" style="padding: 0;">
          <div class="table-container" style="border: none;">
            <table class="data-table">
              <tbody>
                ${list.length === 0 ? `
                  <tr><td style="text-align: center; padding: 32px; color: var(--text-muted);">No new notifications.</td></tr>
                ` : list.map(n => `
                  <tr style="${!n.read ? 'background: var(--primary-pale);' : ''}">
                    <td style="width: 36px; text-align: center;">
                      <span style="font-size: 16px;">${n.type === 'leave' ? ICONS.sun : n.type === 'expense' ? ICONS.receipt : ICONS.card}</span>
                    </td>
                    <td>
                      <div style="font-weight: ${!n.read ? '600' : 'normal'}; color: var(--text-primary);">${escapeHtml(n.text)}</div>
                      <div style="font-size: 10.5px; color: var(--text-light); margin-top: 2px;">${n.creation}</div>
                    </td>
                    <td style="text-align: right;">
                      ${!n.read ? '<span class="badge badge-primary">New</span>' : '<span style="font-size: 11px; color: var(--text-muted);">Read</span>'}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // SETTINGS & SYSTEM VIEW
  // -------------------------------------------------------------------------
  function renderSettingsView() {
    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Workspace Preferences & System State</h1>
          <p>Configure role permissions, review Frappe engine status, and manage preview data.</p>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 720px;">
        <div class="card">
          <div class="card-header"><span class="card-title">Organization Setup</span></div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; font-size: 12.5px;">
            <div><span style="color: var(--text-muted);">Organization:</span> <strong>Dayflow Technologies Pvt Ltd</strong></div>
            <div><span style="color: var(--text-muted);">ERPNext Engine:</span> <strong>v15.2 (Frappe HR Core Synced)</strong></div>
            <div><span style="color: var(--text-muted);">Currency:</span> <strong>INR (₹)</strong></div>
            <div><span style="color: var(--text-muted);">Current Active Role:</span> <span class="badge badge-purple">${escapeHtml(session.role)}</span></div>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><span class="card-title">Data Management</span></div>
          <div class="card-body">
            <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 14px;">
              Reset all in-memory and persistent storage to the pristine initial state with complete pre-seeded employees, attendance records, leaves, payroll slips, and job openings.
            </p>
            <button class="btn btn-danger" onclick="window.resetDataStore()">Reset Database to Initial Seed State</button>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // AUTH VIEW (Sign In & Sign Up for HR and Employee Separately)
  // -------------------------------------------------------------------------
  let authMode = 'signin'; // 'signin' | 'signup'
  let authRole = 'hr'; // 'hr' | 'employee'
  let showPassword = false;
  let showConfirmPassword = false;
  let companyLogoPreview = null;

  function renderAuthView() {
    const isSignUp = authMode === 'signup';
    const isHR = authRole === 'hr';

    return `
      <div class="glass-auth-container">
        <!-- BACKGROUND ATMOSPHERE ACCENTS -->
        <div class="auth-cloud-glow"></div>

        <div class="glass-auth-card">
          <!-- CARD HEADER WITH LOGO & TOP-RIGHT SWITCHER -->
          <div class="glass-card-header">
            <div class="auth-brand-badge">
              ${companyLogoPreview ? `
                <img src="${companyLogoPreview}" alt="Logo" class="auth-custom-logo" />
              ` : `
                <div class="brand-logo" style="background: linear-gradient(135deg, #c084fc, #9333ea); box-shadow: 0 4px 14px rgba(147, 51, 234, 0.4);">D</div>
              `}
              <span class="auth-brand-name">${escapeHtml(store.data.company_name || 'Dayflow')}</span>
            </div>

            <div class="auth-top-switch">
              ${!isSignUp ? `
                ${isHR ? `
                  <button type="button" class="glass-text-btn" onclick="window.setAuthMode('signup')">Sign Up</button>
                ` : `
                  <button type="button" class="glass-text-btn" onclick="window.setAuthRole('hr'); window.setAuthMode('signup');">HR Sign Up</button>
                `}
              ` : `
                <button type="button" class="glass-text-btn" onclick="window.setAuthMode('signin')">Sign In</button>
              `}
            </div>
          </div>

          <!-- ROLE SELECTOR TABS (HR / ADMIN vs EMPLOYEE) -->
          ${!isSignUp ? `
            <div class="auth-role-tabs">
              <button type="button" class="auth-role-tab ${isHR ? 'active' : ''}" onclick="window.setAuthRole('hr')">
                <span>HR / Admin Login</span>
              </button>
              <button type="button" class="auth-role-tab ${!isHR ? 'active' : ''}" onclick="window.setAuthRole('employee')">
                <span>Employee Login</span>
              </button>
            </div>
          ` : ''}

          <!-- TITLES & INTRO -->
          <div class="glass-title-area">
            <h1 class="glass-title">
              ${isSignUp ? 'Sign Up Page' : (isHR ? 'Login to your account' : 'Login to your account')}
            </h1>
            <p class="glass-subtitle">
              ${isSignUp 
                ? 'Register your organization and initialize HR Admin profile' 
                : (isHR 
                  ? 'Enter your Login ID or Work Email below to login to your account' 
                  : 'Enter your Login ID or Work Email below to login to your account')}
            </p>
          </div>

          <!-- FORM BODY -->
          ${!isSignUp ? `
            <!-- ================= SIGN IN FORM ================= -->
            <form class="glass-form" onsubmit="window.handleAuthSubmit(event)">
              <input type="hidden" name="auth_mode" value="signin" />
              <input type="hidden" name="role_scope" value="${isHR ? 'HR / Admin' : 'Employee'}" />

              <div class="glass-form-group">
                <label class="glass-label">
                  <span>Login Id/Email :-</span>
                </label>
                <div class="glass-input-wrap">
                  <input 
                    type="text" 
                    class="glass-input" 
                    name="identifier" 
                    id="auth-identifier-input" 
                    required 
                    placeholder="${isHR ? 'DTADSH20220001 or hr@dayflow.local' : 'DTNIVE20230002 or nisha@dayflow.local'}"
                    value="${isHR ? 'DTADSH20220001' : 'DTNIVE20230002'}"
                  />
                </div>
              </div>

              <div class="glass-form-group">
                <div class="glass-label-row">
                  <label class="glass-label" for="auth-password-input">Password :-</label>
                  <a href="javascript:void(0)" class="glass-link" onclick="window.openForgotPasswordModal()">Forgot your password?</a>
                </div>
                <div class="glass-input-wrap">
                  <input 
                    type="${showPassword ? 'text' : 'password'}" 
                    class="glass-input" 
                    name="password" 
                    id="auth-password-input" 
                    required 
                    value="Dayflow@123"
                  />
                  <button type="button" class="glass-eye-btn" onclick="window.togglePasswordVisibility('main')" title="${showPassword ? 'Hide password' : 'Show password'}">
                    ${showPassword ? ICONS.eyeOff : ICONS.eye}
                  </button>
                </div>
              </div>

              <button type="submit" class="glass-btn-primary ${isHR ? 'purple-glow' : 'blue-glow'}">
                SIGN IN
              </button>

              <button type="button" class="glass-btn-google" onclick="window.handleGoogleLogin()">
                ${ICONS.google}
                <span>Login with Google</span>
              </button>
            </form>

            <!-- 1-CLICK DUMMY CREDENTIALS HELPER -->
            <div class="glass-demo-box">
              <div class="glass-demo-header">
                <span>Demo Credentials (${isHR ? 'HR Admin' : 'Employee'})</span>
                <span class="badge ${isHR ? 'badge-purple' : 'badge-info'}">1-Click Login</span>
              </div>
              <div class="glass-demo-content">
                ${isHR ? `
                  <div class="glass-demo-row">
                    <div>
                      <div><strong>Login ID:</strong> <code>DTADSH20220001</code></div>
                      <div><strong>Email:</strong> <code>hr@dayflow.local</code></div>
                      <div><strong>Password:</strong> <code>Dayflow@123</code></div>
                    </div>
                    <button type="button" class="btn btn-sm btn-primary" onclick="window.fillDemoCredentials('hr')">Auto-Fill</button>
                  </div>
                ` : `
                  <div class="glass-demo-row">
                    <div>
                      <div><strong>Login ID:</strong> <code>DTNIVE20230002</code> (Nisha)</div>
                      <div><strong>Email:</strong> <code>nisha@dayflow.local</code></div>
                      <div><strong>Password:</strong> <code>Dayflow@123</code></div>
                    </div>
                    <button type="button" class="btn btn-sm btn-primary" onclick="window.fillDemoCredentials('employee')">Auto-Fill</button>
                  </div>
                `}
              </div>
            </div>

            <!-- FOOTER NOTICE -->
            <div class="glass-auth-footer">
              ${isHR ? `
                <p>Don't have an Account? <a href="javascript:void(0)" onclick="window.setAuthMode('signup')" class="glass-link-bold">Sign Up</a></p>
              ` : `
                <div class="glass-employee-note">
                  <span class="note-icon">${ICONS.info}</span>
                  <span><strong>Note:</strong> Normal employees cannot self-register. Your Login ID (e.g. <code>OIJODO20230001</code>) and initial password are generated by HR.</span>
                </div>
                <p style="margin-top: 10px;">Are you an Organization Admin? <a href="javascript:void(0)" onclick="window.setAuthRole('hr'); window.setAuthMode('signup');" class="glass-link-bold">Register Company</a></p>
              `}
            </div>
          ` : `
            <!-- ================= HR SIGN UP FORM ================= -->
            <form class="glass-form" onsubmit="window.handleAuthSubmit(event)">
              <input type="hidden" name="auth_mode" value="signup" />

              <div class="glass-form-group">
                <div class="glass-label-row">
                  <label class="glass-label">Company Name :-</label>
                  <label class="upload-logo-pill" for="company-logo-file-input">
                    ${ICONS.upload}
                    <span>Upload Logo</span>
                  </label>
                  <input type="file" id="company-logo-file-input" style="display: none;" accept="image/*" onchange="window.handleLogoUpload(event)" />
                </div>
                <div class="glass-input-wrap">
                  <input type="text" class="glass-input" name="company_name" required placeholder="e.g. Odoo India" value="Odoo India" />
                </div>
              </div>

              <div class="glass-form-group">
                <label class="glass-label">Name :-</label>
                <div class="glass-input-wrap">
                  <input type="text" class="glass-input" name="name" required placeholder="e.g. John Doe" value="John Doe" />
                </div>
              </div>

              <div class="glass-form-group">
                <label class="glass-label">Email :-</label>
                <div class="glass-input-wrap">
                  <input type="email" class="glass-input" name="email" required placeholder="e.g. john.doe@odoo.local" value="john.doe@odoo.local" />
                </div>
              </div>

              <div class="glass-form-group">
                <label class="glass-label">Phone :-</label>
                <div class="glass-input-wrap">
                  <input type="tel" class="glass-input" name="phone" placeholder="+91 98765 43210" value="+91 98765 43210" />
                </div>
              </div>

              <div class="glass-form-group">
                <label class="glass-label">Password :-</label>
                <div class="glass-input-wrap">
                  <input 
                    type="${showPassword ? 'text' : 'password'}" 
                    class="glass-input" 
                    name="password" 
                    required 
                    placeholder="Enter password"
                    value="Dayflow@123"
                  />
                  <button type="button" class="glass-eye-btn" onclick="window.togglePasswordVisibility('main')">
                    ${showPassword ? ICONS.eyeOff : ICONS.eye}
                  </button>
                </div>
              </div>

              <div class="glass-form-group">
                <label class="glass-label">Confirm Password :-</label>
                <div class="glass-input-wrap">
                  <input 
                    type="${showConfirmPassword ? 'text' : 'password'}" 
                    class="glass-input" 
                    name="confirm_password" 
                    required 
                    placeholder="Confirm password"
                    value="Dayflow@123"
                  />
                  <button type="button" class="glass-eye-btn" onclick="window.togglePasswordVisibility('confirm')">
                    ${showConfirmPassword ? ICONS.eyeOff : ICONS.eye}
                  </button>
                </div>
              </div>

              <div class="glass-id-preview-tip">
                ${ICONS.info}
                <span>Your HR Login ID will be auto-generated in format: <strong>[OI][JODO][2026][0001]</strong> &rarr; <code>OIJODO20260001</code></span>
              </div>

              <button type="submit" class="glass-btn-primary purple-glow" style="margin-top: 8px;">
                Sign Up
              </button>
            </form>

            <div class="glass-auth-footer">
              <p>Already have an account? <a href="javascript:void(0)" onclick="window.setAuthMode('signin')" class="glass-link-bold">Sign In</a></p>
            </div>
          `}
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 11. GLOBAL AUTH EVENT HANDLERS & ACTIONS
  // =========================================================================

  window.setAuthMode = function (mode) {
    authMode = mode;
    renderApp();
  };

  window.setAuthRole = function (role) {
    authRole = role;
    renderApp();
  };

  window.togglePasswordVisibility = function (type) {
    if (type === 'main') {
      showPassword = !showPassword;
    } else {
      showConfirmPassword = !showConfirmPassword;
    }
    renderApp();
  };

  window.handleLogoUpload = function (e) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (ev) {
        companyLogoPreview = ev.target.result;
        showToast('success', 'Company logo uploaded.');
        renderApp();
      };
      reader.readAsDataURL(file);
    }
  };

  window.fillDemoCredentials = function (preset) {
    const idEl = document.getElementById('auth-identifier-input');
    const pwdEl = document.getElementById('auth-password-input');
    if (preset === 'hr') {
      authRole = 'hr';
      if (idEl) idEl.value = 'DTADSH20220001';
      if (pwdEl) pwdEl.value = 'Dayflow@123';
    } else {
      authRole = 'employee';
      if (idEl) idEl.value = 'DTNIVE20230002';
      if (pwdEl) pwdEl.value = 'Dayflow@123';
    }
  };

  window.handleGoogleLogin = function () {
    if (authRole === 'hr') {
      window.fillDemoCredentials('hr');
      const form = document.querySelector('.glass-form');
      if (form) form.requestSubmit ? form.requestSubmit() : form.submit();
    } else {
      window.fillDemoCredentials('employee');
      const form = document.querySelector('.glass-form');
      if (form) form.requestSubmit ? form.requestSubmit() : form.submit();
    }
  };

  window.handleAuthSubmit = async function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const mode = fd.get('auth_mode') || 'signin';

    if (mode === 'signup') {
      // HR Company Registration
      const companyName = (fd.get('company_name') || 'Odoo India').trim();
      const fullName = (fd.get('name') || 'Admin').trim();
      const email = (fd.get('email') || 'admin@odoo.local').trim();
      const phone = fd.get('phone') || '+91 98000 00000';
      const password = fd.get('password');
      const confirmPassword = fd.get('confirm_password');

      if (password !== confirmPassword) {
        showToast('danger', 'Password and Confirm Password do not match.');
        return;
      }

      let result = null;
      try {
        result = await API.post('/api/auth/signup', {
          company_name: companyName,
          name: fullName,
          email,
          phone,
          password
        });
        await store.reload();
      } catch (err) {
        if (!err.isNetwork) {
          showToast('danger', err.message);
          return;
        }
        // Offline fallback: create the admin record locally
        const nameParts = fullName.split(/\s+/);
        const firstName = nameParts[0] || 'Admin';
        const lastName = nameParts.slice(1).join(' ') || 'User';
        const joinYear = new Date().getFullYear();
        let serial = store.data.employees.length + 1;
        while (store.data.employees.some(x => x.name === `EMP-${String(serial).padStart(3, '0')}`)) serial += 1;
        const empId = `EMP-${String(serial).padStart(3, '0')}`;
        const loginId = generateLoginId(companyName, firstName, lastName, joinYear, serial);

        const newAdmin = {
          name: empId,
          login_id: loginId,
          password: password || 'Dayflow@123',
          employee_name: fullName,
          first_name: firstName,
          last_name: lastName,
          gender: 'Other',
          date_of_birth: '1990-01-01',
          date_of_joining: `${joinYear}-01-01`,
          status: 'Active',
          user_role: 'HR',
          base_salary: 100000,
          department: 'Human Resources',
          designation: 'HR Admin / Director',
          company: companyName,
          company_email: email,
          personal_email: email,
          cell_phone: phone,
          reports_to: '',
          leave_approver: empId,
          expense_approver: empId,
          shift: 'General Shift',
          current_address: 'HQ Campus',
          permanent_address: 'HQ Campus',
          emergency_phone_number: phone,
          person_to_be_contacted: 'Management',
          relation: 'Self',
          bank_name: 'HDFC Bank',
          bank_ac_no: '501009999999',
          image: companyLogoPreview || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&auto=format&fit=crop&q=80'
        };

        store.data.company_name = companyName;
        store.data.employees.unshift(newAdmin);
        store.data.leave_allocations[empId] = { 'Casual Leave': 15, 'Sick Leave': 12, 'Earned Leave': 18 };
        store.save();
        result = { employee: newAdmin, role: 'HR / Admin', login_id: loginId };
      }

      const generatedLoginId = result.login_id || result.employee.login_id;
      const empId = result.employee.name;

      saveSession({
        authenticated: true,
        role: 'HR / Admin',
        employeeId: empId,
        email: email,
        name: fullName,
        login_id: generatedLoginId
      });

      showToast('success', `Welcome to ${companyName}! Generated Login ID: ${generatedLoginId}`);
      window.location.hash = '#employees';
      renderApp();

      // Show welcome onboarding modal with Login ID
      openModal(() => `
        <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
          <div class="modal-dialog">
            <div class="modal-header">
              <div class="modal-title">Company Workspace Initialized</div>
              <button class="icon-btn" onclick="window.closeModal()">&times;</button>
            </div>
            <div class="modal-body" style="text-align: center; padding: 24px;">
              <div style="font-size: 38px; color: var(--success); font-weight: 800;">&#10003;</div>
              <h2 style="font-size: 18px; font-weight: 700; margin-top: 10px;">${escapeHtml(companyName)} Registered!</h2>
              <p style="font-size: 13px; color: var(--text-muted); margin-top: 6px;">
                Your HR Administrator account is ready. Save your official system Login ID:
              </p>
              <div style="background: var(--bg-subtle); border: 2px dashed var(--primary); border-radius: var(--radius-lg); padding: 14px; margin: 18px auto; max-width: 320px;">
                <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">System Generated Login ID</div>
                <div style="font-size: 22px; font-weight: 800; color: var(--primary); font-family: var(--font-mono); letter-spacing: 1px; margin-top: 4px;">
                  ${generatedLoginId}
                </div>
              </div>
              <p style="font-size: 12px; color: var(--text-secondary);">
                You can use this Login ID or your email (<code>${escapeHtml(email)}</code>) to sign in anytime.
              </p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" onclick="window.closeModal()">Enter HR Workspace &rarr;</button>
            </div>
          </div>
        </div>
      `);
      return;
    }

    // SIGN IN PROCESS — verified against the backend
    const identifier = (fd.get('identifier') || '').trim();
    const password = fd.get('password') || '';

    let matchedEmp = null;
    let assignedRole = null;
    try {
      const r = await API.post('/api/login', { identifier, password });
      matchedEmp = r.employee;
      assignedRole = r.role;
    } catch (err) {
      if (!err.isNetwork) {
        showToast('danger', err.message);
        return;
      }
      // Offline fallback: match locally; password only known for seed data
      const qLower = identifier.toLowerCase();
      matchedEmp = store.data.employees.find(e =>
        (e.login_id && e.login_id.toLowerCase() === qLower) ||
        (e.company_email && e.company_email.toLowerCase() === qLower) ||
        (e.personal_email && e.personal_email.toLowerCase() === qLower) ||
        (e.name && e.name.toLowerCase() === qLower)
      );
      if (!matchedEmp) {
        showToast('danger', `No account found matching "${identifier}". Please check your Login ID or Email.`);
        return;
      }
      if (typeof matchedEmp.password === 'string') {
        if (matchedEmp.password !== password) {
          showToast('danger', 'Incorrect password. Please try again.');
          return;
        }
      } else {
        showToast('danger', 'Sign-in requires the HRMS server to be running (npm run dev).');
        return;
      }
      assignedRole = (matchedEmp.user_role === 'HR' ||
        (matchedEmp.department || '').toLowerCase().includes('human resources'))
        ? 'HR / Admin' : 'Employee';
    }

    saveSession({
      authenticated: true,
      role: assignedRole,
      employeeId: matchedEmp.name,
      email: matchedEmp.company_email,
      name: matchedEmp.employee_name,
      login_id: matchedEmp.login_id || matchedEmp.name
    });

    showToast('success', `Welcome back, ${matchedEmp.employee_name}!`);
    window.location.hash = assignedRole === 'HR / Admin' ? '#employees' : '#attendance';
    renderApp();
  };

  window.openForgotPasswordModal = function () {
    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Password Recovery & Reset</div>
            <button class="icon-btn" onclick="window.closeModal()">&times;</button>
          </div>
          <form onsubmit="window.submitForgotPassword(event)">
            <div class="modal-body">
              <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">
                Enter your Login ID (e.g. <code>DTADSH20220001</code>) or Work Email to reset your password.
              </p>
              <div class="form-group">
                <label class="form-label">Login ID / Work Email <span class="required">*</span></label>
                <input type="text" class="form-control" name="recovery_id" required placeholder="e.g. DTNIVE20230002 or hr@dayflow.local" />
              </div>
              <div class="form-group" style="margin-top: 14px;">
                <label class="form-label">New Password <span class="required">*</span></label>
                <input type="password" class="form-control" name="new_password" required placeholder="Enter new password" value="Dayflow@123" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">Update Password</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  window.submitForgotPassword = async function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const idQ = (fd.get('recovery_id') || '').trim();
    const newPwd = fd.get('new_password');

    try {
      await API.post('/api/auth/forgot-password', { identifier: idQ, new_password: newPwd });
      closeModal();
      showToast('success', 'Password updated successfully. Please sign in with your new password.');
      renderApp();
      return;
    } catch (err) {
      if (!err.isNetwork) {
        showToast('danger', err.message);
        return;
      }
    }

    // Offline fallback
    const qLower = idQ.toLowerCase();
    const emp = store.data.employees.find(e =>
      (e.login_id && e.login_id.toLowerCase() === qLower) ||
      (e.company_email && e.company_email.toLowerCase() === qLower) ||
      (e.name && e.name.toLowerCase() === qLower)
    );
    if (!emp) {
      showToast('danger', 'No account found with the provided identifier.');
      return;
    }
    emp.password = newPwd;
    store.save();
    closeModal();
    showToast('success', `Password updated successfully for ${emp.employee_name}. Please sign in.`);
    renderApp();
  };


  window.logout = function () {
    saveSession(null);
    window.location.hash = '';
    showToast('success', 'You have been signed out successfully.');
    renderApp();
  };

  window.toggleRole = function () {
    if (!session) return;
    const newRole = session.role === 'HR / Admin' ? 'Employee' : 'HR / Admin';
    session.role = newRole;
    session.employeeId = newRole === 'HR / Admin' ? 'EMP-001' : 'EMP-002';
    const emp = store.data.employees.find(e => e.name === session.employeeId);
    if (emp) {
      session.name = emp.employee_name;
      session.email = emp.company_email;
      session.login_id = emp.login_id || emp.name;
    }
    saveSession(session);
    showToast('success', `Switched mode to ${newRole}`);
    window.location.hash = newRole === 'HR / Admin' ? '#employees' : '#attendance';
    renderApp();
  };

    window.toggleMobileSidebar = function () {
    mobileSidebarOpen = !mobileSidebarOpen;
    renderApp();
  };

  window.toggleUserMenu = function () {
    const el = document.getElementById('user-menu-dropdown');
    if (el) {
      el.style.display = el.style.display === 'none' ? 'flex' : 'none';
    }
  };

  window.handlePunch = async function (action) {
    const emp = getActiveEmployee();
    if (!emp) return;

    try {
      await API.post('/api/punch', { employee: emp.name, log_type: action });
      await store.reload();
      const timeFormatted = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      showToast('success', `[${emp.employee_name}] Checked ${action === 'IN' ? 'IN' : 'OUT'} at ${timeFormatted}. Time synced to HR.`);
    } catch (err) {
      if (err.isNetwork) {
        // Offline fallback: validate IN/OUT alternation and record locally
        const t = new Date().toISOString().split('T')[0];
        const punches = store.data.checkins
          .filter(c => c.employee === emp.name && String(c.time).startsWith(t))
          .sort((a, b) => (a.time < b.time ? -1 : 1));
        const last = punches[punches.length - 1];
        if (last && last.log_type === action) {
          showToast('danger', action === 'IN'
            ? 'Already checked in today. Please check out first.'
            : 'You are not currently checked in.');
          return;
        }
        store.data.checkins.unshift({
          name: `CHK-${Date.now()}`,
          employee: emp.name,
          employee_name: emp.employee_name,
          log_type: action,
          time: new Date().toISOString().replace('T', ' ').substring(0, 19),
          latitude: 12.9716,
          longitude: 77.5946
        });
        store.save();
        showToast('success', `Checked ${action} recorded locally (offline mode).`);
      } else {
        showToast('danger', err.message);
      }
    }
    renderApp();
  };

  window.setAttendanceView = function (mode) {
    attendanceViewMode = mode;
    renderApp();
  };

  window.shiftAttendanceMonth = function (offset) {
    currentMonthOffset += offset;
    renderApp();
  };

  window.setLeaveTab = function (tab) {
    activeLeaveFilterTab = tab;
    renderApp();
  };

  window.setHRLeaveTab = function (tab) {
    hrLeaveFilterTab = tab;
    renderApp();
  };

  window.setWizardStep = function (step) {
    if (step >= 2) {
      // Capture the Step-1 configuration before moving on
      const m = document.getElementById('wiz-month');
      const y = document.getElementById('wiz-year');
      const d = document.getElementById('wiz-dept');
      if (m) wizardConfig.month = m.value;
      if (y) wizardConfig.year = y.value;
      if (d) wizardConfig.dept = d.value === 'All Departments' ? 'All' : d.value;
    }
    wizardStep = step;
    renderApp();
  };

  window.finalizePayroll = async function () {
    const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    try {
      const r = await API.post('/api/payroll/run', {
        month: wizardConfig.month,
        year: Number(wizardConfig.year),
        department: wizardConfig.dept
      });
      await store.reload();
      lastPayrollResult = r;
      showToast('success', `${r.month} ${r.year} payroll published — ${r.slips_created} salary slip(s) generated.`);
      wizardStep = 3;
    } catch (err) {
      if (err.isNetwork) {
        // Offline fallback: create the payroll entry locally
        const year = Number(wizardConfig.year);
        const monthIdx = MONTH_NAMES.indexOf(wizardConfig.month);
        const start = `${year}-${String(monthIdx + 1).padStart(2, '0')}-01`;
        const lastDay = new Date(year, monthIdx + 1, 0).getDate();
        const end = `${year}-${String(monthIdx + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
        if (!store.data.payroll_entries.some(p => p.start_date === start && p.end_date === end)) {
          const emps = store.data.employees.filter(e => e.status === 'Active');
          store.data.payroll_entries.unshift({
            name: `PAY-${year}-${String(monthIdx + 1).padStart(2, '0')}`,
            posting_date: new Date().toISOString().split('T')[0],
            start_date: start,
            end_date: end,
            payroll_frequency: 'Monthly',
            company: store.data.company_name || 'Dayflow Technologies',
            number_of_employees: emps.length,
            status: 'Submitted',
            total_amount: Math.round(emps.reduce((s, e) => s + (Number(e.base_salary) || 100000), 0) * 0.82)
          });
          store.save();
        }
        lastPayrollResult = null;
        wizardStep = 3;
      } else {
        showToast('danger', err.message);
        return;
      }
    }
    renderApp();
  };

  window.toggleExpandSlip = function (name) {
    expandedSlipId = expandedSlipId === name ? null : name;
    renderApp();
  };

  window.downloadPayslipPDF = function (slipId) {
    showToast('success', `Exporting official PDF for ${slipId}...`);
    window.print();
  };

  window.setDirectorySearch = function (q) {
    directorySearch = q;
    renderApp();
  };

  window.setDirectoryDept = function (d) {
    directoryDept = d;
    renderApp();
  };

  window.setEmployeeSearch = function (q) {
    employeeSearch = q;
    renderApp();
  };

  window.setEmployeeDept = function (d) {
    employeeFilterDept = d;
    renderApp();
  };

  window.setEmpDocTab = function (tab) {
    activeEmpTab = tab;
    renderApp();
  };

  window.quickApproveLeave = async function (id) {
    await runAction(
      () => API.post(`/api/leaves/${encodeURIComponent(id)}/approve`),
      () => {
        const item = store.data.leave_applications.find(l => l.name === id);
        if (!item || item.status !== 'Open') return false;
        item.status = 'Approved';
        store.data.attendance.forEach(a => {
          if (a.employee === item.employee &&
              a.attendance_date >= item.from_date && a.attendance_date <= item.to_date &&
              a.status !== 'Present') a.status = 'On Leave';
        });
        return true;
      },
      'Leave approved — balance deducted and attendance updated.'
    );
  };

  window.quickRejectLeave = async function (id) {
    await runAction(
      () => API.post(`/api/leaves/${encodeURIComponent(id)}/reject`),
      () => {
        const item = store.data.leave_applications.find(l => l.name === id);
        if (!item || item.status !== 'Open') return false;
        item.status = 'Rejected';
        return true;
      },
      'Leave request rejected and employee notified.'
    );
  };

  window.quickApproveExpense = async function (id) {
    await runAction(
      () => API.post(`/api/expenses/${encodeURIComponent(id)}/approve`),
      () => {
        const item = store.data.expense_claims.find(e => e.name === id);
        if (!item || item.approval_status !== 'Draft') return false;
        item.approval_status = 'Approved';
        item.total_sanctioned_amount = item.total_claimed_amount;
        return true;
      },
      `Expense claim ${id} approved and employee notified.`
    );
  };

  window.quickRejectExpense = async function (id) {
    await runAction(
      () => API.post(`/api/expenses/${encodeURIComponent(id)}/reject`),
      () => {
        const item = store.data.expense_claims.find(e => e.name === id);
        if (!item || item.approval_status !== 'Draft') return false;
        item.approval_status = 'Rejected';
        return true;
      },
      `Expense claim ${id} rejected.`
    );
  };

  window.quickApproveShift = async function (id) {
    await runAction(
      () => API.post(`/api/shift-requests/${encodeURIComponent(id)}/approve`),
      () => {
        const item = store.data.shift_requests.find(s => s.name === id);
        if (!item || item.status !== 'Draft') return false;
        item.status = 'Approved';
        const emp = store.data.employees.find(e => e.name === item.employee);
        if (emp) emp.shift = item.shift_type;
        return true;
      },
      'Shift request approved — employee shift updated.'
    );
  };

  window.quickRejectShift = async function (id) {
    await runAction(
      () => API.post(`/api/shift-requests/${encodeURIComponent(id)}/reject`),
      () => {
        const item = store.data.shift_requests.find(s => s.name === id);
        if (!item || item.status !== 'Draft') return false;
        item.status = 'Rejected';
        return true;
      },
      'Shift request rejected.'
    );
  };

  window.markAllNotificationsRead = async function () {
    await runAction(
      () => API.post('/api/notifications/read-all', { user: session.employeeId, role: session.role }),
      () => {
        const emp = getActiveEmployee();
        store.data.notifications.forEach(n => {
          if (!emp || n.user === emp.name || session.role === 'HR / Admin') n.read = 1;
        });
        return true;
      },
      'All notifications marked as read.'
    );
  };

  window.resetDataStore = async function () {
    await store.reset();
    showToast('success', 'Database reset to fresh demo state.');
    renderApp();
  };

  window.handleCreateEmployee = async function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const firstName = fd.get('first_name');
    const lastName = fd.get('last_name');
    const fullName = `${firstName} ${lastName}`.trim();

    const payload = {
      first_name: firstName,
      last_name: lastName,
      gender: fd.get('gender') || 'Male',
      date_of_birth: fd.get('date_of_birth') || '1996-01-01',
      date_of_joining: fd.get('date_of_joining') || new Date().toISOString().split('T')[0],
      department: fd.get('department'),
      designation: fd.get('designation'),
      company_email: fd.get('company_email'),
      cell_phone: fd.get('cell_phone') || '+91 98000 00000',
      shift: fd.get('shift') || 'General Shift'
    };

    let newEmp = null;
    let generatedLoginId = '';
    let autoPassword = '';
    try {
      const r = await API.post('/api/employees', payload);
      await store.reload();
      newEmp = r.employee;
      generatedLoginId = r.login_id || newEmp.login_id;
      autoPassword = r.password || newEmp.password;
    } catch (err) {
      if (!err.isNetwork) {
        showToast('danger', err.message);
        return;
      }
      // Offline fallback: create locally with generated credentials
      let count = store.data.employees.length + 1;
      let newId = `EMP-${String(count).padStart(3, '0')}`;
      while (store.data.employees.some(x => x.name === newId)) {
        count += 1;
        newId = `EMP-${String(count).padStart(3, '0')}`;
      }
      const compName = store.data.company_name || 'Odoo India';
      generatedLoginId = generateLoginId(compName, firstName, lastName, payload.date_of_joining, count);
      autoPassword = `Welcome@${new Date(payload.date_of_joining).getFullYear() || new Date().getFullYear()}`;
      newEmp = {
        name: newId,
        login_id: generatedLoginId,
        password: autoPassword,
        employee_name: fullName,
        user_role: 'Employee',
        base_salary: 100000,
        status: 'Active',
        reports_to: 'EMP-001',
        leave_approver: 'EMP-001',
        ...payload
      };
      store.data.employees.push(newEmp);
      store.data.leave_allocations[newId] = { 'Casual Leave': 12, 'Sick Leave': 10, 'Earned Leave': 15, 'Compensatory Off': 0 };
      store.save();
    }

    const newId = newEmp.name;
    showToast('success', `Employee ${fullName} created! Login ID: ${generatedLoginId}`);
    window.location.hash = `#employee/${newId}`;

    // Show credential modal for HR to copy & deliver to employee
    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Employee Credentials Created</div>
            <button class="icon-btn" onclick="window.closeModal()">&times;</button>
          </div>
          <div class="modal-body" style="padding: 24px;">
            <div style="text-align: center;">
              <div style="font-size: 32px; color: var(--success);">&#10003;</div>
              <h3 style="font-size: 16px; font-weight: 700; margin-top: 8px;">${escapeHtml(fullName)} (${newId})</h3>
              <p style="font-size: 12px; color: var(--text-muted);">Share these system-generated login credentials with the employee:</p>
            </div>

            <div style="background: var(--bg-subtle); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 16px; margin: 16px 0; display: flex; flex-direction: column; gap: 10px; font-size: 13px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: var(--text-muted);">Official Login ID:</span>
                <code style="font-size: 15px; font-weight: 700; color: var(--primary);">${generatedLoginId}</code>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: var(--text-muted);">Company Email:</span>
                <strong>${escapeHtml(newEmp.company_email)}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: var(--text-muted);">Initial Temporary Password:</span>
                <code style="font-size: 14px; font-weight: 600; color: var(--success);">${autoPassword}</code>
              </div>
            </div>

            <p style="font-size: 11.5px; color: var(--text-secondary); line-height: 1.5;">
              The employee can use this Login ID or Email to sign in, and can update their password on first login.
            </p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" onclick="window.closeModal()">Done</button>
          </div>
        </div>
      </div>
    `);
  };


  // =========================================================================
  // 12. MODAL FORM DIALOGS
  // =========================================================================

  window.openApplyLeaveModal = function () {
    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Apply for Leave</div>
            <button class="icon-btn" onclick="window.closeModal()">&times;</button>
          </div>
          <form onsubmit="window.submitApplyLeave(event)">
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">Leave Type <span class="required">*</span></label>
                <select class="form-control" name="leave_type" required>
                  <option>Casual Leave</option>
                  <option>Sick Leave</option>
                  <option>Earned Leave</option>
                  <option>Compensatory Off</option>
                  <option>Leave Without Pay</option>
                </select>
              </div>
              <div class="form-row" style="margin-top: 14px;">
                <div class="form-group">
                  <label class="form-label">From Date <span class="required">*</span></label>
                  <input type="date" class="form-control" name="from_date" required min="${dateOffset(0)}" value="${dateOffset(3)}">
                </div>
                <div class="form-group">
                  <label class="form-label">To Date <span class="required">*</span></label>
                  <input type="date" class="form-control" name="to_date" required min="${dateOffset(0)}" value="${dateOffset(4)}">
                </div>
              </div>
              <div class="form-group" style="margin-top: 14px;">
                <label class="form-label">Reason / Notes</label>
                <textarea class="form-control" name="description" placeholder="Briefly describe the reason for taking leave..."></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">Submit Application</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  window.submitApplyLeave = async function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const emp = getActiveEmployee();
    const from = fd.get('from_date');
    const to = fd.get('to_date');
    const payload = {
      employee: emp.name,
      leave_type: fd.get('leave_type'),
      from_date: from,
      to_date: to,
      description: fd.get('description')
    };

    const ok = await runAction(
      () => API.post('/api/leaves', payload),
      () => {
        const d1 = new Date(from);
        const d2 = new Date(to);
        const days = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)) + 1);
        store.data.leave_applications.unshift({
          name: `LEAVE-${Date.now()}`,
          employee: emp.name,
          employee_name: emp.employee_name,
          leave_type: payload.leave_type,
          from_date: from,
          to_date: to,
          total_leave_days: days,
          status: 'Open',
          description: payload.description,
          posting_date: new Date().toISOString().split('T')[0],
          leave_approver: emp.leave_approver || 'EMP-001'
        });
        return true;
      },
      'Leave application submitted to HR for approval.'
    );
    if (ok) closeModal();
  };

  window.openNewExpenseModal = function () {
    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">New Expense Reimbursement Claim</div>
            <button class="icon-btn" onclick="window.closeModal()">&times;</button>
          </div>
          <form onsubmit="window.submitExpenseClaim(event)">
            <div class="modal-body">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Expense Type <span class="required">*</span></label>
                  <select class="form-control" name="expense_type" required>
                    <option>Travel</option>
                    <option>Food and Beverage</option>
                    <option>Calls & Internet</option>
                    <option>Medical</option>
                    <option>Transportation</option>
                    <option>Equipment</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Amount (INR) <span class="required">*</span></label>
                  <input type="number" class="form-control" name="amount" required placeholder="e.g. 1500" min="1">
                </div>
              </div>
              <div class="form-group" style="margin-top: 14px;">
                <label class="form-label">Expense Date <span class="required">*</span></label>
                <input type="date" class="form-control" name="date" required value="${dateOffset(0)}">
              </div>
              <div class="form-group" style="margin-top: 14px;">
                <label class="form-label">Description & Justification</label>
                <textarea class="form-control" name="description" placeholder="Client meeting travel expenses, broadband receipt, etc."></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">Submit Claim</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  window.submitExpenseClaim = async function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const emp = getActiveEmployee();
    const amt = parseFloat(fd.get('amount') || 0);
    const payload = {
      employee: emp.name,
      expense_type: fd.get('expense_type'),
      amount: amt,
      date: fd.get('date'),
      description: fd.get('description')
    };

    const ok = await runAction(
      () => API.post('/api/expenses', payload),
      () => {
        store.data.expense_claims.unshift({
          name: `EXP-${Date.now()}`,
          employee: emp.name,
          employee_name: emp.employee_name,
          expense_type: payload.expense_type,
          total_claimed_amount: amt,
          total_sanctioned_amount: 0,
          status: 'Draft',
          approval_status: 'Draft',
          posting_date: payload.date,
          description: payload.description,
          expense_approver: emp.expense_approver || 'EMP-001'
        });
        return true;
      },
      `Expense claim of ${formatCurrency(amt)} submitted for HR review.`
    );
    if (ok) closeModal();
  };

  window.openRequestShiftModal = function () {
    const n = new Date();
    const nextFrom = new Date(n.getFullYear(), n.getMonth() + 1, 1).toISOString().split('T')[0];
    const nextTo = new Date(n.getFullYear(), n.getMonth() + 2, 0).toISOString().split('T')[0];
    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Request Shift Change</div>
            <button class="icon-btn" onclick="window.closeModal()">&times;</button>
          </div>
          <form onsubmit="window.submitShiftRequest(event)">
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">Target Shift <span class="required">*</span></label>
                <select class="form-control" name="shift_type" required>
                  ${store.data.shift_types.map(st => `<option value="${escapeHtml(st.name)}">${escapeHtml(st.name)} (${st.start_time} - ${st.end_time})</option>`).join('')}
                </select>
              </div>
              <div class="form-row" style="margin-top: 14px;">
                <div class="form-group">
                  <label class="form-label">From Date <span class="required">*</span></label>
                  <input type="date" class="form-control" name="from_date" required value="${nextFrom}">
                </div>
                <div class="form-group">
                  <label class="form-label">To Date <span class="required">*</span></label>
                  <input type="date" class="form-control" name="to_date" required value="${nextTo}">
                </div>
              </div>
              <div class="form-group" style="margin-top: 14px;">
                <label class="form-label">Reason</label>
                <textarea class="form-control" name="reason" placeholder="Explain the scheduling requirement..."></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">Submit Shift Request</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  window.submitShiftRequest = async function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const emp = getActiveEmployee();
    const payload = {
      employee: emp.name,
      shift_type: fd.get('shift_type'),
      from_date: fd.get('from_date'),
      to_date: fd.get('to_date'),
      reason: fd.get('reason')
    };

    const ok = await runAction(
      () => API.post('/api/shift-requests', payload),
      () => {
        store.data.shift_requests.unshift({
          name: `SR-${Date.now()}`,
          employee: emp.name,
          employee_name: emp.employee_name,
          shift_type: payload.shift_type,
          from_date: payload.from_date,
          to_date: payload.to_date,
          status: 'Draft',
          reason: payload.reason
        });
        return true;
      },
      'Shift schedule request submitted to HR.'
    );
    if (ok) closeModal();
  };

  window.openCreateJobOpeningModal = function () {
    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Create Job Opening Requisition</div>
            <button class="icon-btn" onclick="window.closeModal()">&times;</button>
          </div>
          <form onsubmit="window.submitCreateJobOpening(event)">
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">Job Title <span class="required">*</span></label>
                <input type="text" class="form-control" name="job_title" required placeholder="e.g. Lead Cloud Architect">
              </div>
              <div class="form-row" style="margin-top: 14px;">
                <div class="form-group">
                  <label class="form-label">Department <span class="required">*</span></label>
                  <select class="form-control" name="department" required>
                    ${store.data.departments.map(d => `<option>${escapeHtml(d)}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Vacancies <span class="required">*</span></label>
                  <input type="number" class="form-control" name="vacancies" required value="1" min="1">
                </div>
              </div>
              <div class="form-group" style="margin-top: 14px;">
                <label class="form-label">Job Description & Qualifications</label>
                <textarea class="form-control" name="description" placeholder="Requirements, responsibilities, and experience guidelines..."></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">Publish Opening</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  window.submitCreateJobOpening = async function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = {
      job_title: fd.get('job_title'),
      department: fd.get('department'),
      vacancies: parseInt(fd.get('vacancies') || '1', 10),
      description: fd.get('description')
    };

    const ok = await runAction(
      () => API.post('/api/job-openings', payload),
      () => {
        store.data.job_openings.unshift({
          name: `JOB-${Date.now()}`,
          job_title: payload.job_title,
          department: payload.department,
          vacancies: payload.vacancies,
          status: 'Open',
          posted_date: new Date().toISOString().split('T')[0],
          description: payload.description
        });
        return true;
      },
      'Job opening published to career board.'
    );
    if (ok) closeModal();
  };

  window.openAddApplicantModal = function () {
    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Add Job Candidate / Applicant</div>
            <button class="icon-btn" onclick="window.closeModal()">&times;</button>
          </div>
          <form onsubmit="window.submitAddApplicant(event)">
            <div class="modal-body">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Candidate Name <span class="required">*</span></label>
                  <input type="text" class="form-control" name="applicant_name" required placeholder="e.g. Maya Iyer">
                </div>
                <div class="form-group">
                  <label class="form-label">Candidate Email <span class="required">*</span></label>
                  <input type="email" class="form-control" name="email" required placeholder="e.g. maya@example.com">
                </div>
              </div>
              <div class="form-group" style="margin-top: 14px;">
                <label class="form-label">Target Job Opening <span class="required">*</span></label>
                <select class="form-control" name="job_opening" required>
                  ${store.data.job_openings.map(j => `<option value="${escapeHtml(j.name)}">${escapeHtml(j.job_title)} (${j.department})</option>`).join('')}
                </select>
              </div>
              <div class="form-row" style="margin-top: 14px;">
                <div class="form-group">
                  <label class="form-label">Initial Rating</label>
                  <select class="form-control" name="rating">
                    <option value="5">5 / 5 - Exceptional</option>
                    <option value="4" selected>4 / 5 - Strong Hire</option>
                    <option value="3">3 / 5 - Qualified</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Source</label>
                  <input type="text" class="form-control" name="source" placeholder="LinkedIn, Referral, etc.">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">Add to Pipeline</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  window.submitAddApplicant = async function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = {
      applicant_name: fd.get('applicant_name'),
      email: fd.get('email'),
      job_opening: fd.get('job_opening'),
      source: fd.get('source'),
      rating: parseInt(fd.get('rating') || '4', 10)
    };

    const ok = await runAction(
      () => API.post('/api/applicants', payload),
      () => {
        const jobObj = store.data.job_openings.find(j => j.name === payload.job_opening);
        store.data.job_applicants.unshift({
          name: `APP-${Date.now()}`,
          applicant_name: payload.applicant_name,
          email: payload.email,
          phone: '+91 98000 11111',
          job_title: jobObj?.job_title || 'Software Engineer',
          job_opening: payload.job_opening,
          status: 'Open',
          application_date: new Date().toISOString().split('T')[0],
          source: payload.source || 'Direct',
          rating: payload.rating,
          notes: 'Initial profile candidate created in pipeline.'
        });
        return true;
      },
      'Candidate added to Open column.'
    );
    if (ok) closeModal();
  };

  window.openApplicantDetailsModal = function (appId) {
    const app = store.data.job_applicants.find(a => a.name === appId);
    if (!app) return;

    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">${escapeHtml(app.applicant_name)}</div>
            <button class="icon-btn" onclick="window.closeModal()">&times;</button>
          </div>
          <div class="modal-body" style="font-size: 13px; display: flex; flex-direction: column; gap: 12px;">
            <div><span style="color: var(--text-muted);">Applied Role:</span> <strong>${escapeHtml(app.job_title)}</strong></div>
            <div><span style="color: var(--text-muted);">Email:</span> <strong>${escapeHtml(app.email)}</strong></div>
            <div><span style="color: var(--text-muted);">Source & Date:</span> <strong>${escapeHtml(app.source)} &middot; ${formatDate(app.application_date)}</strong></div>
            <div><span style="color: var(--text-muted);">Rating:</span> <strong>${app.rating || 0} / 5</strong></div>
            
            <div class="form-group" style="margin-top: 10px;">
              <label class="form-label">Move Stage</label>
              <select class="form-control" onchange="window.updateApplicantStage('${app.name}', this.value)">
                ${['Open', 'Replied', 'Accepted', 'Rejected', 'Hold'].map(s => `<option ${app.status === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>

            <div style="margin-top: 8px;">
              <span style="color: var(--text-muted);">Interviewer Feedback & Notes:</span>
              <div style="background: var(--bg-subtle); padding: 10px; border-radius: var(--radius-md); margin-top: 4px;">
                ${escapeHtml(app.notes || 'No detailed feedback notes recorded yet.')}
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Close</button>
          </div>
        </div>
      </div>
    `);
  };

  window.updateApplicantStage = async function (appId, newStage) {
    const ok = await runAction(
      () => API.put(`/api/applicants/${encodeURIComponent(appId)}`, { status: newStage }),
      () => {
        const app = store.data.job_applicants.find(a => a.name === appId);
        if (!app) return false;
        app.status = newStage;
        return true;
      },
      `Candidate moved to ${newStage}.`
    );
    if (ok) closeModal();
  };

  window.openScheduleInterviewModal = function () {
    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Schedule Candidate Interview</div>
            <button class="icon-btn" onclick="window.closeModal()">&times;</button>
          </div>
          <form onsubmit="window.submitScheduleInterview(event)">
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">Applicant <span class="required">*</span></label>
                <select class="form-control" name="applicant" required>
                  ${store.data.job_applicants.map(a => `<option value="${escapeHtml(a.name)}">${escapeHtml(a.applicant_name)} (${a.job_title})</option>`).join('')}
                </select>
              </div>
              <div class="form-row" style="margin-top: 14px;">
                <div class="form-group">
                  <label class="form-label">Date <span class="required">*</span></label>
                  <input type="date" class="form-control" name="scheduled_date" required value="${dateOffset(3)}">
                </div>
                <div class="form-group">
                  <label class="form-label">Time Window</label>
                  <input type="text" class="form-control" name="time_window" value="15:00 - 16:00">
                </div>
              </div>
              <div class="form-group" style="margin-top: 14px;">
                <label class="form-label">Lead Interviewer</label>
                <select class="form-control" name="interviewer">
                  ${store.data.employees.map(e => `<option>${escapeHtml(e.employee_name)} (${e.designation})</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">Schedule Interview</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  window.submitScheduleInterview = async function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = {
      applicant: fd.get('applicant'),
      scheduled_date: fd.get('scheduled_date'),
      time_window: fd.get('time_window'),
      interviewer: fd.get('interviewer')
    };

    const ok = await runAction(
      () => API.post('/api/interviews', payload),
      () => {
        const appObj = store.data.job_applicants.find(a => a.name === payload.applicant);
        const m = String(payload.time_window || '').match(/(\d{1,2}:\d{2})\s*(?:-|–|to)\s*(\d{1,2}:\d{2})/);
        store.data.interviews.unshift({
          name: `INT-${Date.now()}`,
          applicant: payload.applicant,
          applicant_name: appObj?.applicant_name || 'Candidate',
          job_opening: appObj?.job_opening,
          job_title: appObj?.job_title || 'Role',
          scheduled_date: payload.scheduled_date,
          from_time: m ? m[1] : '15:00',
          to_time: m ? m[2] : '16:00',
          interviewer: payload.interviewer,
          status: 'Scheduled',
          rating: 0,
          notes: 'Technical evaluation round.'
        });
        return true;
      },
      'Interview scheduled and calendar invite dispatched.'
    );
    if (ok) closeModal();
  };

  window.openOnboardingChecklistModal = function (onbId) {
    const onb = store.data.onboarding_records.find(o => o.name === onbId);
    if (!onb) return;

    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Onboarding Induction Checklist &middot; ${escapeHtml(onb.employee_name)}</div>
            <button class="icon-btn" onclick="window.closeModal()">&times;</button>
          </div>
          <div class="modal-body">
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${(onb.activities || []).map((act, i) => `
                <label style="display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: var(--radius-md); background: var(--bg-subtle); cursor: pointer;">
                  <input type="checkbox" ${act.completed ? 'checked' : ''} onchange="window.toggleOnboardingActivity('${onb.name}', ${i})">
                  <span style="font-size: 13px; ${act.completed ? 'text-decoration: line-through; color: var(--text-muted);' : 'font-weight: 500;'}">${escapeHtml(act.name)}</span>
                </label>
              `).join('')}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Close</button>
          </div>
        </div>
      </div>
    `);
  };

  window.toggleOnboardingActivity = async function (onbId, index) {
    const ok = await runAction(
      () => API.put(`/api/onboarding/${encodeURIComponent(onbId)}`, { activity_index: index }),
      () => {
        const onb = store.data.onboarding_records.find(o => o.name === onbId);
        if (!onb || !onb.activities || !onb.activities[index]) return false;
        onb.activities[index].completed = onb.activities[index].completed ? 0 : 1;
        onb.boarding_status = onb.activities.every(a => a.completed) ? 'Completed' : 'In Progress';
        return true;
      }
    );
    if (ok) {
      renderModal();
    }
  };

  window.openPostAnnouncementModal = function () {
    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Post Company Announcement</div>
            <button class="icon-btn" onclick="window.closeModal()">&times;</button>
          </div>
          <form onsubmit="window.submitPostAnnouncement(event)">
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">Announcement Subject <span class="required">*</span></label>
                <input type="text" class="form-control" name="subject" required placeholder="e.g. All-Hands Meeting or Holiday Notice">
              </div>
              <div class="form-group" style="margin-top: 14px;">
                <label class="form-label">Announcement Message <span class="required">*</span></label>
                <textarea class="form-control" name="description" required rows="4" placeholder="Detailed update message for all team members..."></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">Publish Announcement</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  window.submitPostAnnouncement = async function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const emp = getActiveEmployee();

    const ok = await runAction(
      () => API.post('/api/announcements', { subject: fd.get('subject'), description: fd.get('description'), posted_by: emp.name }),
      () => {
        store.data.announcements.unshift({
          name: `ANN-${Date.now()}`,
          subject: fd.get('subject'),
          description: fd.get('description'),
          posted_by: `${emp.employee_name} (HR)`,
          creation: new Date().toISOString().replace('T', ' ').substring(0, 19)
        });
        return true;
      },
      'Announcement published to entire organization feed.'
    );
    if (ok) closeModal();
  };

  window.openEditProfileModal = function () {
    const emp = getActiveEmployee();
    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Update Contact & Residential Info</div>
            <button class="icon-btn" onclick="window.closeModal()">&times;</button>
          </div>
          <form onsubmit="window.submitEditProfile(event)">
            <div class="modal-body">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Personal Email</label>
                  <input type="email" class="form-control" name="personal_email" value="${escapeHtml(emp.personal_email || '')}">
                </div>
                <div class="form-group">
                  <label class="form-label">Cell Phone</label>
                  <input type="tel" class="form-control" name="cell_phone" value="${escapeHtml(emp.cell_phone || '')}">
                </div>
              </div>
              <div class="form-group" style="margin-top: 14px;">
                <label class="form-label">Current Address</label>
                <textarea class="form-control" name="current_address">${escapeHtml(emp.current_address || '')}</textarea>
              </div>
              <div class="form-row" style="margin-top: 14px;">
                <div class="form-group">
                  <label class="form-label">Emergency Contact Name</label>
                  <input type="text" class="form-control" name="person_to_be_contacted" value="${escapeHtml(emp.person_to_be_contacted || '')}">
                </div>
                <div class="form-group">
                  <label class="form-label">Emergency Phone</label>
                  <input type="tel" class="form-control" name="emergency_phone_number" value="${escapeHtml(emp.emergency_phone_number || '')}">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  window.submitEditProfile = async function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const emp = getActiveEmployee();
    const payload = {
      employee: emp.name,
      personal_email: fd.get('personal_email'),
      cell_phone: fd.get('cell_phone'),
      current_address: fd.get('current_address'),
      person_to_be_contacted: fd.get('person_to_be_contacted'),
      emergency_phone_number: fd.get('emergency_phone_number')
    };

    const ok = await runAction(
      () => API.put('/api/profile', payload),
      () => {
        Object.assign(emp, {
          personal_email: payload.personal_email,
          cell_phone: payload.cell_phone,
          current_address: payload.current_address,
          person_to_be_contacted: payload.person_to_be_contacted,
          emergency_phone_number: payload.emergency_phone_number
        });
        return true;
      },
      'Profile contact details updated successfully.'
    );
    if (ok) closeModal();
  };

  window.openEditEmployeeModal = function (empId) {
    const emp = store.data.employees.find(e => e.name === empId);
    if (!emp) return;

    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Edit Employee &middot; ${escapeHtml(emp.name)}</div>
            <button class="icon-btn" onclick="window.closeModal()">&times;</button>
          </div>
          <form onsubmit="window.submitEditEmployee(event, '${emp.name}')">
            <div class="modal-body">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Full Name <span class="required">*</span></label>
                  <input type="text" class="form-control" name="employee_name" required value="${escapeHtml(emp.employee_name)}">
                </div>
                <div class="form-group">
                  <label class="form-label">Status</label>
                  <select class="form-control" name="status">
                    <option ${emp.status === 'Active' ? 'selected' : ''}>Active</option>
                    <option ${emp.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
                    <option ${emp.status === 'On Leave' ? 'selected' : ''}>On Leave</option>
                    <option ${emp.status === 'Left' ? 'selected' : ''}>Left</option>
                  </select>
                </div>
              </div>
              <div class="form-row" style="margin-top: 14px;">
                <div class="form-group">
                  <label class="form-label">Department <span class="required">*</span></label>
                  <select class="form-control" name="department" required>
                    ${store.data.departments.map(d => `<option ${emp.department === d ? 'selected' : ''}>${escapeHtml(d)}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Designation <span class="required">*</span></label>
                  <select class="form-control" name="designation" required>
                    ${store.data.designations.map(d => `<option ${emp.designation === d ? 'selected' : ''}>${escapeHtml(d)}</option>`).join('')}
                  </select>
                </div>
              </div>
              <div class="form-row" style="margin-top: 14px;">
                <div class="form-group">
                  <label class="form-label">Cell Phone</label>
                  <input type="tel" class="form-control" name="cell_phone" value="${escapeHtml(emp.cell_phone || '')}">
                </div>
                <div class="form-group">
                  <label class="form-label">Shift</label>
                  <select class="form-control" name="shift">
                    ${store.data.shift_types.map(st => `<option ${emp.shift === st.name ? 'selected' : ''}>${escapeHtml(st.name)}</option>`).join('')}
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">Update Record</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  window.submitEditEmployee = async function (e, empId) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = {
      employee_name: fd.get('employee_name'),
      status: fd.get('status'),
      department: fd.get('department'),
      designation: fd.get('designation'),
      cell_phone: fd.get('cell_phone'),
      shift: fd.get('shift')
    };

    const ok = await runAction(
      () => API.put(`/api/employees/${encodeURIComponent(empId)}`, payload),
      () => {
        const emp = store.data.employees.find(x => x.name === empId);
        if (!emp) return false;
        Object.assign(emp, payload);
        return true;
      },
      `Employee ${empId} updated successfully.`
    );
    if (ok) closeModal();
  };

  // =========================================================================
  // 13. BOOTSTRAP INITIALIZATION
  // =========================================================================

  function bindPageEvents() {
    document.onkeydown = function (e) {
      if (e.key === 'Escape' && activeModal) {
        closeModal();
      }
    };

    document.onclick = function (e) {
      const dropdown = document.getElementById('user-menu-dropdown');
      const avatarBtn = document.querySelector('.profile-avatar-btn');
      if (dropdown && dropdown.style.display !== 'none') {
        if (!dropdown.contains(e.target) && !avatarBtn?.contains(e.target)) {
          dropdown.style.display = 'none';
        }
      }
    };
  }

  function bindAuthEvents() {
    // Specific auth bindings
  }

  // Subscribe to store updates for reactive re-render
  store.subscribe(() => {
    // Reactive sync
  });

  // Initial startup
  parseHash();
  renderApp();

  // Expose test API handle
  window.Dayflow = {
    store,
    erpnext,
    session,
    renderApp
  };

})();
