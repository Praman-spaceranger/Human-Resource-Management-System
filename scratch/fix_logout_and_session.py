import sys

app_js_path = 'HRMitra/src/app.js'
with open(app_js_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Fix default session initialization so logging out stays logged out
old_session_init = """  let session = (function () {
    try {
      const s = localStorage.getItem(SESSION_KEY);
      if (s) return JSON.parse(s);
    } catch (e) {
      console.warn('Session parse error:', e);
    }
    // Default to HR Manager for rich exploration
    return {
      authenticated: true,
      role: 'HR / Admin',
      employeeId: 'EMP-001',
      email: 'hr@dayflow.local',
      name: 'Aditi Sharma'
    };
  })();"""

new_session_init = """  let session = (function () {
    try {
      const s = localStorage.getItem(SESSION_KEY);
      if (s) return JSON.parse(s);
    } catch (e) {
      console.warn('Session parse error:', e);
    }
    return null;
  })();"""

code = code.replace(old_session_init, new_session_init)

# 2. Add window.logout and window.toggleRole and outside click dismiss for dropdown
auth_methods = """  window.logout = function () {
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
"""

target_marker = "  window.toggleMobileSidebar = function () {"
code = code.replace(target_marker, auth_methods + "\n  " + target_marker)

# 3. Add document click listener to close user menu dropdown when clicking outside
bind_events_old = """  function bindPageEvents() {
    // Re-bind modal close on escape key
    document.onkeydown = function (e) {
      if (e.key === 'Escape' && activeModal) {
        closeModal();
      }
    };
  }"""

bind_events_new = """  function bindPageEvents() {
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
  }"""

code = code.replace(bind_events_old, bind_events_new)

with open(app_js_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Logout and session handling fixed successfully!")
