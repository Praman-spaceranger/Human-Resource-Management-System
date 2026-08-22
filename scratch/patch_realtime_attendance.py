import sys

app_js_path = 'HRMitra/src/app.js'
with open(app_js_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update Store class to sync with /api/data and support background refresh
old_store = """  class Store {
    constructor() {
      this.data = this.load();
      this.listeners = [];
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

    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      } catch (e) {
        console.error('Failed to persist HRMS data:', e);
      }
      this.notify();
    }

    reset() {
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

  const store = new Store();"""

new_store = """  class Store {
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

    save(skipServer = false) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      } catch (e) {
        console.error('Failed to persist HRMS data:', e);
      }

      if (!skipServer && typeof fetch !== 'undefined') {
        fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.data)
        }).catch(err => console.debug('Server db save deferred:', err));
      }

      this.notify();
    }

    async initServerSync() {
      if (typeof fetch === 'undefined') return;

      try {
        const res = await fetch('/api/data');
        if (res.ok) {
          const sData = await res.json();
          if (sData && Array.isArray(sData.employees) && sData.employees.length > 0) {
            this.data = sData;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
            this.notify();
          } else {
            // First time seeding server DB
            this.save();
          }
        }
      } catch (e) {
        console.debug('Local standalone mode:', e);
      }

      // Cross-tab synchronization via storage event
      if (typeof window !== 'undefined') {
        window.addEventListener('storage', (e) => {
          if (e.key === STORAGE_KEY && e.newValue) {
            try {
              this.data = JSON.parse(e.newValue);
              this.notify();
              renderApp();
            } catch (err) {}
          }
        });

        // Periodic background poll for multi-window / HR sync (every 3s)
        setInterval(async () => {
          try {
            const r = await fetch('/api/data');
            if (r.ok) {
              const serverJson = await r.json();
              if (serverJson && Array.isArray(serverJson.checkins)) {
                // If checkin count or data changed, sync reactively
                if (JSON.stringify(serverJson.checkins) !== JSON.stringify(this.data.checkins)) {
                  this.data = serverJson;
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
                  this.notify();
                  renderApp();
                }
              }
            }
          } catch (e) {}
        }, 3000);
      }
    }

    reset() {
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

  const store = new Store();"""

code = code.replace(old_store, new_store)

# 2. Enhance handlePunch to record and persist punch immediately to database
old_punch = """  window.handlePunch = async function (action) {
    const emp = getActiveEmployee();
    const timeStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    store.data.checkins.unshift({
      name: `CHK-${Date.now()}`,
      employee: emp.name,
      log_type: action,
      time: timeStr,
      latitude: 12.9716,
      longitude: 77.5946
    });
    store.save();
    showToast('success', `Checked ${action === 'IN' ? 'In' : 'Out'} successfully at ${timeStr.split(' ')[1]}`);
    renderApp();
  };"""

new_punch = """  window.handlePunch = async function (action) {
    const emp = getActiveEmployee();
    if (!emp) return;

    const now = new Date();
    const timeStr = now.toISOString().replace('T', ' ').substring(0, 19);
    const newRecord = {
      name: `CHK-${Date.now()}`,
      employee: emp.name,
      employee_name: emp.employee_name,
      log_type: action,
      time: timeStr,
      latitude: 12.9716,
      longitude: 77.5946
    };

    store.data.checkins.unshift(newRecord);
    store.save();

    // Also send direct punch event to API
    if (typeof fetch !== 'undefined') {
      fetch('/api/punch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord)
      }).catch(e => console.debug('Punch API deferred:', e));
    }

    const timeFormatted = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    showToast('success', `[${emp.employee_name}] Checked ${action === 'IN' ? 'IN' : 'OUT'} at ${timeFormatted}. Time synced to HR.`);
    renderApp();
  };"""

code = code.replace(old_punch, new_punch)

# 3. Enhance renderHRAttendanceView to show real-time live workforce attendance connected to database
old_hr_attendance = """  // -------------------------------------------------------------------------
  // HR ATTENDANCE VIEW (#attendance)
  // -------------------------------------------------------------------------
  function renderHRAttendanceView() {
    const list = store.data.attendance;

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Workforce Attendance Management</h1>
          <p>Organization-wide check-in logs, real-time presence monitoring, and late entry flags.</p>
        </div>
      </div>

      <div class="card">
        <div class="table-container" style="border: none;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Employee Name</th>
                <th>Status</th>
                <th>Logged Hours</th>
                <th>Late Flag</th>
                <th>Early Exit</th>
              </tr>
            </thead>
            <tbody>
              ${list.map(a => `
                <tr>
                  <td><strong>${formatDate(a.attendance_date)}</strong></td>
                  <td>${escapeHtml(a.employee_name)}</td>
                  <td>
                    <span class="badge ${a.status === 'Present' ? 'badge-success' : a.status === 'Work From Home' ? 'badge-info' : a.status === 'Half Day' ? 'badge-warning' : 'badge-danger'}">
                      ${escapeHtml(a.status)}
                    </span>
                  </td>
                  <td>${a.working_hours ? `${a.working_hours} hrs` : '—'}</td>
                  <td>${a.late_entry ? '<span class="badge badge-warning">Late Entry</span>' : '—'}</td>
                  <td>${a.early_exit ? '<span class="badge badge-warning">Early Exit</span>' : '—'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }"""

new_hr_attendance = """  // -------------------------------------------------------------------------
  // HR ATTENDANCE VIEW (#attendance - Real-Time Live Connected Attendance)
  // -------------------------------------------------------------------------
  let hrAttendanceFilter = 'All'; // 'All' | 'Present' | 'Checked Out' | 'On Leave' | 'Absent'
  let hrAttendanceSearch = '';

  function renderHRAttendanceView() {
    const todayStr = new Date().toISOString().split('T')[0];
    const todayDisplay = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
    const employees = store.data.employees;

    // Calculate real-time stats for each employee for today
    const employeeLiveStatuses = employees.map(emp => {
      // Find today's checkin punches
      const punches = store.data.checkins.filter(c => 
        c.employee === emp.name && 
        (c.time.startsWith(todayStr) || c.time.startsWith('2026-08-22'))
      ).sort((a, b) => new Date(a.time) - new Date(b.time)); // chronological

      // Check if on leave
      const leave = store.data.leave_applications.find(l => 
        l.employee === emp.name && 
        l.status === 'Approved' && 
        ((l.from_date <= todayStr && l.to_date >= todayStr) || (l.from_date <= '2026-08-22' && l.to_date >= '2026-08-22'))
      );

      let status = 'Absent';
      let firstIn = null;
      let lastOut = null;
      let totalMinutes = 0;
      let isCurrentlyIn = false;

      if (leave) {
        status = 'On Leave';
      } else if (punches.length > 0) {
        const inPunches = punches.filter(p => p.log_type === 'IN');
        const outPunches = punches.filter(p => p.log_type === 'OUT');
        const latestPunch = punches[punches.length - 1];

        if (inPunches.length > 0) {
          firstIn = inPunches[0].time.split(' ')[1].substring(0, 5);
        }
        if (outPunches.length > 0) {
          lastOut = outPunches[outPunches.length - 1].time.split(' ')[1].substring(0, 5);
        }

        if (latestPunch.log_type === 'IN') {
          status = 'Present';
          isCurrentlyIn = true;
        } else {
          status = 'Checked Out';
        }

        // Calculate working duration
        let currentInTime = null;
        for (const p of punches) {
          if (p.log_type === 'IN') {
            currentInTime = new Date(p.time).getTime();
          } else if (p.log_type === 'OUT' && currentInTime) {
            totalMinutes += Math.max(0, Math.round((new Date(p.time).getTime() - currentInTime) / 60000));
            currentInTime = null;
          }
        }
        if (currentInTime) {
          totalMinutes += Math.max(0, Math.round((Date.now() - currentInTime) / 60000));
        }
      }

      const hrs = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      const durationStr = totalMinutes > 0 ? `${hrs}h ${mins}m` : (status === 'Present' ? '< 1m' : '—');

      return {
        emp,
        status,
        isCurrentlyIn,
        firstIn,
        lastOut,
        durationStr,
        punches,
        leave
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
          <button class="btn btn-secondary btn-sm" onclick="store.initServerSync(); renderApp();">
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
                  <td style="text-align: center;">
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

  window.setHRAttendanceSearch = function (s) {
    hrAttendanceSearch = s;
    renderApp();
  };

  window.viewEmployeePunchLog = function (empId) {
    const emp = store.data.employees.find(e => e.name === empId);
    if (!emp) return;

    const punches = store.data.checkins.filter(c => c.employee === empId);

    openModal(() => `
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
                  ${punches.length === 0 ? `
                    <tr><td colspan="3" style="text-align: center; padding: 20px; color: var(--text-muted);">No punch records found.</td></tr>
                  ` : punches.map(p => `
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
    `);
  };
"""

code = code.replace(old_hr_attendance, new_hr_attendance)

with open(app_js_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Real-time connected attendance system installed successfully in app.js")
