# Dayflow / HRMitra frontend

HRMitra is a standalone frontend-only Dayflow prototype. The `hrms` directory is a visual and interaction reference only; this project imports no code, data, assets, or backend from it.

## Run

Open `index.html` directly in a browser, or run:

```powershell
cd HRMitra
npm run check
npm run build
npm run dev
```

Then visit `http://localhost:4173`.

## Preview credentials

```text
Email: hr@dayflow.local
Password: Dayflow@123
```

These credentials open the HR view. Local sign-up, employee records, leave requests, profile edits, filters, and notifications run completely in browser memory. Refreshing the page resets the preview changes.
