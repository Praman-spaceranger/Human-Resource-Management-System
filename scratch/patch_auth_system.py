import re

app_js_path = 'HRMitra/src/app.js'
with open(app_js_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Auth system code block
auth_code = """  // -------------------------------------------------------------------------
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
                    placeholder="${isHR ? 'OIADSH20220001 or hr@dayflow.local' : 'OINIVE20230002 or nisha@dayflow.local'}"
                    value="${isHR ? 'OIADSH20220001' : 'OINIVE20230002'}"
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
                      <div><strong>Login ID:</strong> <code>OIADSH20220001</code></div>
                      <div><strong>Email:</strong> <code>hr@dayflow.local</code></div>
                      <div><strong>Password:</strong> <code>Dayflow@123</code></div>
                    </div>
                    <button type="button" class="btn btn-sm btn-primary" onclick="window.fillDemoCredentials('hr')">Auto-Fill</button>
                  </div>
                ` : `
                  <div class="glass-demo-row">
                    <div>
                      <div><strong>Login ID:</strong> <code>OINIVE20230002</code> (Nisha)</div>
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
      if (idEl) idEl.value = 'OIADSH20220001';
      if (pwdEl) pwdEl.value = 'Dayflow@123';
    } else {
      authRole = 'employee';
      if (idEl) idEl.value = 'OINIVE20230002';
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

  window.handleAuthSubmit = function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const mode = fd.get('auth_mode') || 'signin';

    if (mode === 'signup') {
      // HR Company Registration
      const companyName = fd.get('company_name') || 'Odoo India';
      const fullName = (fd.get('name') || 'Admin').trim();
      const email = (fd.get('email') || 'admin@odoo.local').trim();
      const phone = fd.get('phone') || '+91 98000 00000';
      const password = fd.get('password');
      const confirmPassword = fd.get('confirm_password');

      if (password !== confirmPassword) {
        showToast('danger', 'Password and Confirm Password do not match.');
        return;
      }

      const nameParts = fullName.split(/\\s+/);
      const firstName = nameParts[0] || 'Admin';
      const lastName = nameParts.slice(1).join(' ') || 'User';
      const joinYear = new Date().getFullYear();
      const serial = store.data.employees.length + 1;
      const generatedLoginId = generateLoginId(companyName, firstName, lastName, joinYear, serial);
      const empId = `EMP-${String(serial).padStart(3, '0')}`;

      // Create Admin Employee Record
      const newAdmin = {
        name: empId,
        login_id: generatedLoginId,
        password: password || 'Dayflow@123',
        employee_name: fullName,
        first_name: firstName,
        last_name: lastName,
        gender: 'Other',
        date_of_birth: '1990-01-01',
        date_of_joining: `${joinYear}-01-01`,
        status: 'Active',
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

    // SIGN IN PROCESS
    const identifier = (fd.get('identifier') || '').trim();
    const password = fd.get('password') || '';
    const scope = fd.get('role_scope') || 'HR / Admin';

    // Find employee by login_id, company_email, personal_email, or name ID
    const qLower = identifier.toLowerCase();
    const matchedEmp = store.data.employees.find(e => 
      (e.login_id && e.login_id.toLowerCase() === qLower) ||
      (e.company_email && e.company_email.toLowerCase() === qLower) ||
      (e.personal_email && e.personal_email.toLowerCase() === qLower) ||
      (e.name && e.name.toLowerCase() === qLower)
    );

    if (!matchedEmp) {
      showToast('danger', `No account found matching "${identifier}". Please check your Login ID or Email.`);
      return;
    }

    const isHrAccount = matchedEmp.name === 'EMP-001' || (matchedEmp.designation || '').toLowerCase().includes('hr') || (matchedEmp.department || '').toLowerCase().includes('hr');
    const assignedRole = isHrAccount ? 'HR / Admin' : 'Employee';

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
                Enter your Login ID (e.g. <code>OIADSH20220001</code>) or Work Email to reset your password.
              </p>
              <div class="form-group">
                <label class="form-label">Login ID / Work Email <span class="required">*</span></label>
                <input type="text" class="form-control" name="recovery_id" required placeholder="e.g. OINIVE20230002 or hr@dayflow.local" />
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

  window.submitForgotPassword = function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const idQ = (fd.get('recovery_id') || '').trim().toLowerCase();
    const newPwd = fd.get('new_password');

    const emp = store.data.employees.find(e => 
      (e.login_id && e.login_id.toLowerCase() === idQ) ||
      (e.company_email && e.company_email.toLowerCase() === idQ) ||
      (e.name && e.name.toLowerCase() === idQ)
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
"""

# Let's also update handleCreateEmployee to generate the exact Login ID and show it in modal!
onboard_code = """  window.handleCreateEmployee = function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const firstName = fd.get('first_name');
    const lastName = fd.get('last_name');
    const fullName = `${firstName} ${lastName}`.trim();
    const count = store.data.employees.length + 1;
    const newId = `EMP-${String(count).padStart(3, '0')}`;
    const dateOfJoining = fd.get('date_of_joining') || '2026-09-01';
    const compName = store.data.company_name || 'Odoo India';

    // Auto-generate Login ID via formula: [CompanyPrefix][FN2][LN2][Year][Serial]
    const generatedLoginId = generateLoginId(compName, firstName, lastName, dateOfJoining, count);
    const autoPassword = `Welcome@${new Date(dateOfJoining).getFullYear() || 2026}`;

    const newEmp = {
      name: newId,
      login_id: generatedLoginId,
      password: autoPassword,
      employee_name: fullName,
      first_name: firstName,
      last_name: lastName,
      gender: fd.get('gender') || 'Male',
      date_of_birth: fd.get('date_of_birth') || '1996-01-01',
      date_of_joining: dateOfJoining,
      status: 'Active',
      department: fd.get('department'),
      designation: fd.get('designation'),
      company: compName,
      company_email: fd.get('company_email'),
      cell_phone: fd.get('cell_phone') || '+91 98000 00000',
      reports_to: 'EMP-001',
      leave_approver: 'EMP-001',
      shift: fd.get('shift') || 'General Shift'
    };

    store.data.employees.push(newEmp);
    store.data.leave_allocations[newId] = { 'Casual Leave': 12, 'Sick Leave': 10, 'Earned Leave': 15 };
    store.save();

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
"""

# Replace old auth block
start_marker = "  // -------------------------------------------------------------------------\n  // AUTH VIEW (Sign In & Sign Up)"
end_marker = "  window.toggleMobileSidebar = function () {"

if start_marker in code and end_marker in code:
  p1 = code.split(start_marker)[0]
  p2 = code.split(end_marker)[1]
  code = p1 + auth_code + "\n\n  window.toggleMobileSidebar = function () {" + p2
else:
  print("Marker not found!")

# Replace handleCreateEmployee
old_onboard_start = "  window.handleCreateEmployee = function (e) {"
old_onboard_end = "  // =========================================================================\n  // 12. MODAL FORM DIALOGS"
if old_onboard_start in code and old_onboard_end in code:
  p1 = code.split(old_onboard_start)[0]
  p2 = code.split(old_onboard_end)[1]
  code = p1 + onboard_code + "\n\n  // =========================================================================\n  // 12. MODAL FORM DIALOGS" + p2

with open(app_js_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Auth and onboard update complete in src/app.js")
