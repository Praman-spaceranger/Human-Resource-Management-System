import re

app_js_path = 'HRMitra/src/app.js'
with open(app_js_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add generateLoginId helper and eye/eyeOff icons into ICONS
eye_icons = """    eye: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    eyeOff: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`,
    upload: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
    google: `<svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>`,
    info: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
"""

code = code.replace("    download: `<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"7 10 12 15 17 10\"/><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"3\"/></svg>`\n  };", "    download: `<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"7 10 12 15 17 10\"/><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"3\"/></svg>`,\n" + eye_icons + "  };")

# Add Login ID helper generator
helper_code = """
  // =========================================================================
  // LOGIN ID & CREDENTIAL GENERATOR (OI + FN2 + LN2 + YEAR + SERIAL)
  // =========================================================================
  function generateLoginId(companyName, firstName, lastName, dateOfJoining, serialNumber) {
    const compWords = (companyName || 'Odoo India').trim().split(/\\s+/);
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
"""

code = code.replace("  // =========================================================================\n  // 1. INITIAL MOCK DATABASE & DATA STORE", helper_code + "\n  // =========================================================================\n  // 1. INITIAL MOCK DATABASE & DATA STORE")

# Add login_id and password to mock employees
mock_patch = [
  ("name: 'EMP-001',\n        employee_name: 'Aditi Sharma',\n        first_name: 'Aditi',\n        last_name: 'Sharma',", "name: 'EMP-001',\n        login_id: 'OIADSH20220001',\n        password: 'Dayflow@123',\n        employee_name: 'Aditi Sharma',\n        first_name: 'Aditi',\n        last_name: 'Sharma',"),
  ("name: 'EMP-002',\n        employee_name: 'Nisha Verma',\n        first_name: 'Nisha',\n        last_name: 'Verma',", "name: 'EMP-002',\n        login_id: 'OINIVE20230002',\n        password: 'Dayflow@123',\n        employee_name: 'Nisha Verma',\n        first_name: 'Nisha',\n        last_name: 'Verma',"),
  ("name: 'EMP-003',\n        employee_name: 'Kabir Mehta',\n        first_name: 'Kabir',\n        last_name: 'Mehta',", "name: 'EMP-003',\n        login_id: 'OIKAME20230003',\n        password: 'Dayflow@123',\n        employee_name: 'Kabir Mehta',\n        first_name: 'Kabir',\n        last_name: 'Mehta',"),
  ("name: 'EMP-004',\n        employee_name: 'Rohan Deshmukh',\n        first_name: 'Rohan',\n        last_name: 'Deshmukh',", "name: 'EMP-004',\n        login_id: 'OIRODE20230004',\n        password: 'Dayflow@123',\n        employee_name: 'Rohan Deshmukh',\n        first_name: 'Rohan',\n        last_name: 'Deshmukh',"),
  ("name: 'EMP-005',\n        employee_name: 'Pooja Nair',\n        first_name: 'Pooja',\n        last_name: 'Nair',", "name: 'EMP-005',\n        login_id: 'OIPONA20240005',\n        password: 'Dayflow@123',\n        employee_name: 'Pooja Nair',\n        first_name: 'Pooja',\n        last_name: 'Nair',")
]

for p_old, p_new in mock_patch:
  code = code.replace(p_old, p_new)

with open(app_js_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Added helper and employee login_id fields")
