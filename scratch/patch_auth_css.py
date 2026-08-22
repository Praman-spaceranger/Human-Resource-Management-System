import sys

css_path = 'HRMitra/src/app.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

glass_styles = """
/* ==========================================================================
   GLASSMORPHIC AUTHENTICATION (DAYFLOW SIGN IN & SIGN UP)
   ========================================================================== */
.glass-auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  background: linear-gradient(180deg, rgba(30, 58, 138, 0.45) 0%, rgba(14, 116, 144, 0.35) 100%), 
              url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1600&auto=format&fit=crop&q=80') center/cover no-repeat fixed;
  position: relative;
  overflow: hidden;
}

.auth-cloud-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1;
}

.glass-auth-card {
  width: 100%;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(28px) saturate(190%);
  -webkit-backdrop-filter: blur(28px) saturate(190%);
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 26px;
  box-shadow: 0 28px 60px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  padding: 38px 34px;
  color: #ffffff;
  position: relative;
  z-index: 2;
  animation: scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.glass-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}

.auth-brand-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.auth-custom-logo {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  object-fit: cover;
  border: 1.5px solid #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.auth-brand-name {
  font-size: 19px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.4px;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}

.glass-text-btn {
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 20px;
  padding: 6px 15px;
  transition: all 0.18s ease;
  cursor: pointer;
}

.glass-text-btn:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
}

.auth-role-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  background: rgba(0, 0, 0, 0.2);
  padding: 5px;
  border-radius: 12px;
  margin-bottom: 22px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.auth-role-tab {
  padding: 8px 12px;
  border-radius: 9px;
  font-size: 12.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  transition: all 0.2s ease;
  background: transparent;
  cursor: pointer;
}

.auth-role-tab:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

.auth-role-tab.active {
  background: #ffffff;
  color: #0f172a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-weight: 700;
}

.glass-title-area {
  margin-bottom: 20px;
}

.glass-title {
  font-size: 23px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.4px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  line-height: 1.25;
}

.glass-subtitle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 5px;
  line-height: 1.45;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.glass-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.glass-form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.glass-label {
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.glass-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.glass-input-wrap {
  position: relative;
  width: 100%;
}

.glass-input {
  width: 100%;
  height: 44px;
  padding: 0 14px;
  background: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  font-size: 13.5px;
  color: #0f172a;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  outline: none;
  transition: all 0.18s ease;
}

.glass-input:focus {
  border-color: #9333ea;
  box-shadow: 0 0 0 3px rgba(192, 132, 252, 0.4);
}

.glass-eye-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}

.glass-eye-btn:hover {
  color: #0f172a;
  background: rgba(0, 0, 0, 0.05);
}

.glass-btn-primary {
  width: 100%;
  height: 44px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  letter-spacing: 0.5px;
  margin-top: 4px;
}

.glass-btn-primary.purple-glow {
  background: linear-gradient(135deg, #c084fc, #9333ea);
  box-shadow: 0 6px 18px rgba(147, 51, 234, 0.4);
}

.glass-btn-primary.purple-glow:hover {
  background: linear-gradient(135deg, #d8b4fe, #7e22ce);
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(147, 51, 234, 0.5);
}

.glass-btn-primary.blue-glow {
  background: #0f172a;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.glass-btn-primary.blue-glow:hover {
  background: #1e293b;
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.5);
}

.glass-btn-google {
  width: 100%;
  height: 42px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.18s ease;
  backdrop-filter: blur(8px);
}

.glass-btn-google:hover {
  background: rgba(255, 255, 255, 0.28);
  transform: translateY(-1px);
}

.glass-link {
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}

.glass-link:hover {
  color: #ffffff;
  text-decoration: underline;
}

.glass-link-bold {
  color: #ffffff;
  font-weight: 700;
  text-decoration: underline;
}

.upload-logo-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 11.5px;
  font-weight: 600;
  color: #ffffff;
  background: #2563eb;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
}

.upload-logo-pill:hover {
  background: #1d4ed8;
}

.glass-demo-box {
  background: rgba(0, 0, 0, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 12px 14px;
  margin-top: 16px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.92);
}

.glass-demo-header {
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.glass-demo-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  line-height: 1.6;
}

.glass-demo-row code {
  background: rgba(255, 255, 255, 0.2);
  padding: 1px 5px;
  border-radius: 4px;
  font-family: var(--font-mono);
  color: #ffffff;
}

.glass-auth-footer {
  margin-top: 20px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 12.5px;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
}

.glass-employee-note {
  background: rgba(14, 165, 233, 0.2);
  border: 1px solid rgba(56, 189, 248, 0.4);
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 11.5px;
  line-height: 1.45;
  color: #ffffff;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 6px;
  text-align: left;
}

.glass-employee-note code {
  background: rgba(0, 0, 0, 0.25);
  padding: 1px 4px;
  border-radius: 3px;
  font-family: var(--font-mono);
}

.glass-id-preview-tip {
  background: rgba(147, 51, 234, 0.22);
  border: 1px solid rgba(192, 132, 252, 0.4);
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 11.5px;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.glass-id-preview-tip code {
  background: rgba(0, 0, 0, 0.25);
  padding: 1px 4px;
  border-radius: 3px;
  font-family: var(--font-mono);
}
"""

if "/* GLASSMORPHIC AUTHENTICATION" not in css:
    css = css + "\n" + glass_styles
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(css)
    print("Glassmorphism styles added to app.css")
else:
    print("Glassmorphism styles already in app.css")
