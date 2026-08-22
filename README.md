# Dayflow HRMS — Human Resource Management System

A complete, self-contained Human Resource Management System for small and mid-sized organizations. Dayflow provides two separated portals — an **HR / Admin workspace** and an **Employee self-service portal** — backed by a real REST API server with server-side business logic, a JSON document database, and automatic cross-portal synchronization.

The project is intentionally dependency-free: the backend is built on the Node.js core `http` module and the frontend is a single-page application written in vanilla JavaScript. No frameworks, no external services, no database server required.

---

## Table of Contents

1. [Overview](#overview)
2. [Feature Matrix](#feature-matrix)
3. [Architecture](#architecture)
4. [Real-Time Synchronization Model](#real-time-synchronization-model)
5. [Domain Model](#domain-model)
6. [Core Workflows](#core-workflows)
   - [Authentication and Roles](#authentication-and-roles)
   - [Attendance and Punch Lifecycle](#attendance-and-punch-lifecycle)
   - [Leave Management](#leave-management)
   - [Payroll Engine](#payroll-engine)
   - [Expenses, Shift Requests, and Team Directory](#expenses-shift-requests-and-team-directory)
   - [Reports and Analytics](#reports-and-analytics)
   - [Email Employee Data](#email-employee-data)
   - [Employee Profile](#employee-profile)
7. [REST API Reference](#rest-api-reference)
8. [Business Rules Summary](#business-rules-summary)
9. [How to Run the Project](#how-to-run-the-project)
10. [Project Structure](#project-structure)
11. [Security Model](#security-model)
12. [Production Considerations](#production-considerations)

---

## Overview

Dayflow models the day-to-day HR operations of a company:

- **HR / Admin portal** — workforce roster with live attendance indicators, real-time attendance board, leave approvals, expense claim approvals, shift request approvals, employee creation with auto-generated credentials and photo upload, payroll overview with a guided run wizard, salary slip browser, reports and analytics, company announcements, and settings.
- **Employee portal** — personal attendance calendar and check-in/out punching, leave balances and applications, payslips, expense claims, shift change requests, team directory, announcements, notifications, and a personal profile with photo upload.

Every action in either portal is persisted through the backend, which is the **single source of truth**. All derived values — attendance summaries, leave balances, payroll amounts, dashboard statistics, reports — are computed from the database of record, never hard-coded.

The system ships with realistic demo data (nine employees, attendance history, leaves, payroll history) that is **anchored to the current date** on seed, so the demo always looks alive whenever it is started.

---

## Feature Matrix

| Capability | HR / Admin Portal | Employee Portal |
| --- | --- | --- |
| Sign in / sign up / password reset | Company workspace signup, password-verified sign in | Password-verified sign in, password reset |
| Employee roster with live status | Card grid with Present / Checked Out / On Leave / Absent indicators, search and department filters | Team directory |
| Attendance | Real-time board (check-in, check-out, live work duration, punch timeline), monthly records | Monthly calendar and list view, punch page with live clock and worked-hours ticker |
| Check in / check out | Via topbar systray | Via topbar systray or punch page |
| Leave management | Approval queue, approve / reject with side effects, balances per employee | Balance cards (remaining vs. consumed), apply with validation, application history |
| Expense claims | Approve / reject, sanctioned amounts, totals | Submit claims, track status |
| Shift requests | Approve (applies new shift to employee) / reject | Submit shift change requests |
| Payroll | Overview with computed totals, 3-step run wizard, salary slip browser with breakdowns | Personal payslip breakdown and history |
| Reports and analytics | Headcount by department, leave utilization, payroll trajectory, monthly attendance, turnover | — |
| Email employee data | Send any employee's data (selected sections) to any recipient | Send own data; HR automatically receives a copy |
| Announcements | Publish (notifies all employees) | Read |
| Notifications | Actionable feed with unread badge | Personal feed with unread badge |
| Profile | View-only employee documents, edit employee details, photo upload | Edit contact info, upload photo, email own data |
| Data reset | Reset workspace to fresh demo state | — |

Recruitment and onboarding entities (job openings, applicants, interviews, onboarding checklists) also exist at the API and data level for extension purposes, but their dedicated UI section is outside the current product scope.

---

## Architecture

Dayflow uses a thin-client, fat-server split: all business rules, validations, and derived computations live in the backend; the frontend renders state and calls the API.

```mermaid
flowchart LR
    subgraph Browser["Browser (per user session)"]
        UI["Single-Page App<br/>src/app.js — vanilla JS"]
        Cache["localStorage snapshot cache<br/>(offline fallback)"]
        UI <---> Cache
        Poll["Revision poller<br/>every 3 seconds"]
        Ticker["Live duration ticker<br/>every 15 seconds"]
        UI <---> Poll
        UI <---> Ticker
    end

    subgraph Server["Node.js Backend — scripts/server.mjs"]
        Static["Static file server<br/>(no-store caching)"]
        API["REST API<br/>28 endpoints"]
        Logic["Business logic layer<br/>validation, side effects,<br/>payroll engine, notifications"]
        Seed["Dynamic seeder<br/>(date-anchored demo data)"]
        API --> Logic
    end

    subgraph Storage["Storage"]
        DB[("data/db.json<br/>JSON document database<br/>atomic writes, revision counter")]
    end

    Browser -- "fetch /api/*" --> API
    Browser -- "GET / and /src/*" --> Static
    Logic <--> DB
    Seed --> DB
```

Key properties:

- **Single source of truth.** Clients never push the whole database. Every mutation goes through a dedicated endpoint that validates input, applies side effects, and persists atomically (write to a temp file, then rename).
- **Revision-based sync.** Every mutation increments a `rev` counter. Clients poll `GET /api/data` and swap their snapshot only when the revision changed, so concurrent HR and Employee sessions converge without clobbering each other.
- **Computed snapshot.** Every `GET /api/data` response includes derived data computed server-side: `live_attendance` (per-employee real-time status) and `leave_balances` (allocated, consumed, remaining). Both portals render identical, consistent numbers.
- **Offline fallback.** If the server is unreachable, the app keeps working against the cached snapshot with local mutations, and re-syncs when the server returns.

---

## Real-Time Synchronization Model

The diagram below shows how an action taken in the Employee portal appears in an open HR session within seconds, without any manual refresh:

```mermaid
sequenceDiagram
    actor E as Employee (browser session A)
    actor H as HR Admin (browser session B)
    participant S as Backend API
    participant D as data/db.json

    E->>S: POST /api/punch (IN)
    S->>S: Validate IN/OUT alternation
    S->>D: Append punch, derive attendance record,<br/>bump revision, notify HR
    S-->>E: 201 Created
    E->>S: GET /api/data (refresh)
    S-->>E: Snapshot with new live_attendance

    Note over H: Poller runs every 3 seconds
    H->>S: GET /api/data
    S-->>H: Snapshot (revision changed)
    Note over H: UI re-renders automatically:<br/>status, check-in time, duration
```

Elapsed-time displays (active work duration, "Since" labels) are recomputed client-side every 15 seconds from the punch records the client already holds, so they tick continuously between server updates.

---

## Domain Model

The database is a single JSON document with named collections. The core entity is the employee; every operational record references one:

- **employees** — the master record. Key fields: `name` (primary key, `EMP-###` style), `login_id` (system-generated credential), `user_role` (HR or Employee), `base_salary` (monthly gross, drives payroll), `department`, `shift`, `status` (Active, Inactive, Left).
- **checkins** — raw punches with `log_type` (IN or OUT, strictly alternating per day) and a server-issued timestamp.
- **attendance** — one derived record per employee per day: status (Present, On Leave, Half Day, Absent), working hours computed from punch pairs, and late-entry / early-exit flags compared against the employee's shift times.
- **leave_applications** — type, date range, `total_leave_days` counted in working days, and status (Open, Approved, Rejected). Each approved application consumes from the employee's **leave_allocations** (granted quota per type).
- **expense_claims** — claimed amount, status, and the sanctioned amount set at approval.
- **shift_requests** — requested shift change; approval writes the new shift onto the employee.
- **salary_slips** — one slip per employee per period with the full earnings and deductions breakdown, gross, total deduction, and net pay.
- **emails** — assembled data emails: recipient, subject, selected sections, and a flag marking automatic HR copies.
- **notifications** — per-recipient messages generated by submissions, decisions, announcements, payroll runs, and email sends.

Supporting collections: `shift_types` (named shifts with start and end times), `holidays` (company holiday calendar), `announcements`, `payroll_entries` (one summary per run), plus extension-level `job_openings`, `job_applicants`, `interviews`, `onboarding_records`, and lookup lists for `departments` and `designations`.

---

## Core Workflows

### Authentication and Roles

- Sign-in accepts a **Login ID, company email, personal email, or employee ID**, plus a password that is verified against the server database. Passwords are never included in any API response.
- The role (`HR / Admin` or `Employee`) is derived from the employee record's `user_role` field and determines the portal, navigation, and route access. Employee sessions are blocked from HR-only routes.
- New employees receive a **system-generated Login ID** with the format `[CompanyPrefix][FN2][LN2][JoiningYear][Serial]` (for example `DTNIVE20230002`) and a temporary password, shown to HR in a credentials dialog at creation time.
- HR company signup creates the first administrator account for a new workspace.

![Dayflow sign-in page with the employee and HR portal tabs](docs/screenshots/login.png)

*The sign-in page is the single entry point for both portals; the backend resolves the role from the employee record after password verification.*

### Attendance and Punch Lifecycle

Punching enforces a strict alternation between IN and OUT per employee per day: a punch IN is rejected while already checked in, and a punch OUT is rejected before any check-in. Every punch automatically creates or updates that day's attendance record, computing working hours from all IN/OUT pairs and flagging late entry or early exit against the employee's assigned shift times.

![HR real-time attendance board showing live status per employee](docs/screenshots/hr-attendance-board.png)

*The HR real-time board shows, per employee: live status (Present, Checked Out, On Leave, Not Checked In), the latest check-in time (updates on every check-in), the latest check-out time, active work duration, shift type, and a punch timeline dialog.*

![Employee attendance view with monthly calendar and summary](docs/screenshots/attendance-calendar.png)

*The employee attendance view summarizes the month — present days, half days, leaves taken, average working hours — over a color-coded daily calendar.*

### Leave Management

Leave handling enforces quota and overlap rules server-side:

- Applications are rejected if the date range is invalid, contains no working days, overlaps the employee's own open or approved leave, or exceeds the remaining balance (leave without pay is exempt).
- Valid applications are stored as Open and HR is notified.
- On approval the balance is re-validated at decision time, attendance is marked On Leave for every working day in the range, and the employee is notified; on rejection only the notification is sent.

Leave day counts consider **working days only** — weekends and company holidays are excluded from both requested days and approved consumption. Balances shown everywhere are remaining balances: allocation minus approved leaves.

### Payroll Engine

The guided wizard (configure period, preview salaries, confirm and disburse) drives a server-side computation engine:

1. A run is rejected if a payroll entry for the same period already exists.
2. Active employees in the selected scope are priced individually from `base_salary`: Basic 50 percent, HRA 20 percent, Special Allowance the remainder.
3. Statutory deductions: PF at 12 percent of Basic, Professional Tax 200, TDS at 10 percent of gross.
4. Loss-of-pay days are pro-rated from explicit Absent records and unpaid leave.
5. One salary slip per employee per period is generated, a payroll entry with department totals is stored, and every employee is notified.

The same engine generated the seeded payroll history, so historical slips and newly generated slips are always numerically consistent.

![Employee payslip view with salary breakdown and slip history](docs/screenshots/payslips.png)

*The employee payslip view lists every slip with its full earnings and deductions breakdown.*

### Expenses, Shift Requests, and Team Directory

Employees submit expense claims and shift change requests; each submission notifies HR. Approving an expense records the sanctioned amount; approving a shift request writes the new shift onto the employee's record. Every decision notifies the employee.

![Expense claims view with totals and claim list](docs/screenshots/expense-claims.png)

*Expense claims tracking: totals claimed, sanctioned, and pending approval over the full claim list.*

![Team directory with search and department filter](docs/screenshots/team-directory.png)

*The team directory gives every employee a searchable, filterable view of colleagues.*

### Reports and Analytics

HR reports are computed from the database of record on every request: headcount by department, leave type quota utilization, monthly payroll expense trajectory, monthly presence and punctuality, and turnover.

![Reports and analytics view with charts and tables](docs/screenshots/reports.png)

*Reports and analytics: headcount, leave utilization, payroll trajectory, and presence trends.*

### Email Employee Data

Both portals can package an employee's data into a tracked email record. The modal lets the sender choose which sections to include (profile, attendance records, leave history, payslips), with live record counts and an auto-generated message that updates as sections are toggled.

- The backend assembles the selected data from the database and stores the sent email as an auditable record.
- Employees may only email their own data; when an employee sends, HR automatically receives a copy record and a notification.
- When HR sends an employee's data, that employee is notified.

### Employee Profile

The profile combines personal, job, and emergency details with self-service actions: contact updates, photo upload, and emailing own data.

![Employee profile page with details and status](docs/screenshots/employee-profile.png)

*The employee profile aggregates personal details, job information, and live attendance status.*

---

## REST API Reference

All endpoints exchange JSON. Mutating endpoints validate input server-side and return structured errors (`{ "error": "message" }`) with appropriate HTTP status codes.

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/login` | Password-verified sign in; returns employee and role |
| POST | `/api/auth/signup` | HR company registration; creates the admin account |
| POST | `/api/auth/forgot-password` | Reset password by identifier |

### Data and System

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/data` | Full snapshot with computed `live_attendance`, `leave_balances`, and `rev`; passwords stripped |
| POST | `/api/reset` | Reseed the workspace with fresh date-anchored demo data |

### Employees and Profile

| Method | Endpoint | Description |
| --- | --- | --- |
| GET / POST | `/api/employees` | List employees / create employee (auto Login ID, password, leave allocation) |
| PUT | `/api/employees/:id` | Update employee record (details, status, photo, salary) |
| PUT | `/api/profile` | Self-service contact and emergency info update |

### Attendance

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/punch` | Check in or out with alternation validation; derives the attendance record; returns live status |

### Leave

| Method | Endpoint | Description |
| --- | --- | --- |
| GET / POST | `/api/leaves` | List / apply with balance, overlap, and working-day validation |
| POST | `/api/leaves/:id/approve` | Approve with re-validation; marks attendance; notifies the employee |
| POST | `/api/leaves/:id/reject` | Reject and notify |

### Expenses and Shifts

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/expenses` | Submit claim; notifies the approver |
| POST | `/api/expenses/:id/approve` and `/reject` | Approve (sanctions the amount) or reject; notifies the employee |
| POST | `/api/shift-requests` | Submit a shift change request |
| POST | `/api/shift-requests/:id/approve` and `/reject` | Approve (applies the shift to the employee) or reject; notifies |

### Payroll and Notifications

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/payroll/run` | Run payroll for a month, year, and department scope; duplicate runs blocked |
| POST | `/api/notifications/read-all` | Mark the caller's notifications as read |

### Communication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/announcements` | Publish an announcement; notifies all active employees |
| POST | `/api/email/send` | Send an employee data email (section selection, HR copy for employee senders, stored records) |

### Extension-Level (no dedicated UI section)

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/job-openings` | Create a job opening |
| POST | `/api/applicants`, PUT `/api/applicants/:id` | Add applicant / move pipeline stage |
| POST | `/api/interviews` | Schedule an interview (parses the time window) |
| PUT | `/api/onboarding/:id` | Toggle an onboarding checklist activity |

---

## Business Rules Summary

- **Punching**: IN and OUT must strictly alternate per day; punches are timestamped by the server; each punch updates the day's attendance record with working hours and late-entry and early-exit flags relative to the employee's shift.
- **Leave days**: counted as working days (weekends and holidays excluded); balances are allocation minus approved consumption; overlapping applications are rejected; approval re-validates the balance at decision time.
- **Approvals**: approving a shift request updates the employee's assigned shift; approving a leave marks attendance; every decision generates a notification to the affected employee.
- **Payroll**: earnings and statutory deductions are derived from `base_salary`; loss of pay is pro-rated from explicit Absent records and unpaid leave; one slip per employee per period; a period cannot be run twice.
- **Email data**: employees may only email their own data; HR receives an automatic copy of employee-initiated sends; all sends are stored as auditable records.
- **Notifications**: generated by submissions, decisions, announcements, payroll runs, and email sends — never static.
- **Identifiers**: employee IDs (`EMP-###`) and document names (`LEAVE-YYYY-###`, `EXP-YYYY-###`, `SLIP-YYYY-MM-###`, `EML-YYYY-###`) are generated server-side without collisions.

---

## How to Run the Project

### Prerequisites

Node.js 18 or newer. No npm packages need to be installed — the project has zero runtime dependencies.

### Run in development

```bash
npm run dev
```

Starts the backend and static server at `http://localhost:4173`. Open it in a browser; the sign-in page loads with demo credentials pre-filled.

### Demo accounts

| Portal | Login ID | Email | Password |
| --- | --- | --- | --- |
| HR / Admin | `DTADSH20220001` | `hr@dayflow.local` | `Dayflow@123` |
| Employee | `DTNIVE20230002` | `nisha@dayflow.local` | `Dayflow@123` |

Employees can also sign in with their company email or employee ID (for example `EMP-002`).

### Other commands

```bash
npm run check                              # Syntax-check the frontend
npm run build                              # Copy the app into dist/ for static hosting
node scripts/server.mjs --reseed           # Start with fresh demo data
node scripts/server.mjs --reseed --reseed-only   # Reseed the database and exit
```

The in-app Settings page exposes the same reset via `POST /api/reset`. Seeded demo data (nine employees, a month of attendance history, today's punches, leave applications, and two months of payroll with computed slips) is generated relative to the current date, so every fresh seed looks like a live company on the day you start it.

### Two-session demo

Open two browser windows side by side, sign in as HR in one and as an employee in the other, then punch or apply for leave — the opposite session updates itself within about three seconds.

---

## Project Structure

```
Human-Resource-Management-System/
├── index.html                 App shell, loads src/app.js
├── package.json               Scripts only (dev, build, check) — zero dependencies
├── scripts/
│   ├── server.mjs             Backend: HTTP server, REST API, business logic, seeder
│   └── build.mjs              Production copy into dist/
├── src/
│   ├── app.js                 Single-page application (views, modals, API client, sync)
│   └── app.css                Complete design system and component styles
├── docs/
│   └── screenshots/           Product screenshots referenced by this README
├── data/
│   └── db.json                JSON document database (created and seeded on first run)
└── dist/                      Production bundle output
```

Inside `src/app.js`, the frontend is organized into numbered sections: seed data, the store engine with the API client and revision poller, the session store, toasts, modals, utilities (live attendance calculation, date and formatting helpers), the router, view templates for every route, action handlers (API-first with offline fallback), modal dialogs, and bootstrap initialization.

---

## Security Model

This project is a demo and internal-grade application; within that scope it implements a meaningful baseline:

- **Passwords are verified server-side** and are stripped from every API response; sign-in without the backend is refused rather than silently allowed.
- **The database file is not web-readable**: requests under `/data/` return `403 Forbidden`, so `db.json` is never served to browsers.
- **Authorization rules**: employees can only mutate their own records and can only email their own data; HR operations are separate endpoints; route guards keep employees out of HR screens.
- **Static assets are served with `Cache-Control: no-store`** so code and content updates always reach the browser.
- **Writes are atomic** (temporary file plus rename) to reduce corruption risk on crashes.

---

## Production Considerations

If you take this beyond a demo or internal tool, plan for the following:

- **Transport security**: terminate HTTPS in front of the Node server.
- **Real authentication**: replace the demo credential store with hashed passwords (bcrypt or argon2) and session tokens; the current login flow is intentionally simple.
- **Database**: swap `data/db.json` for a real database (SQLite or PostgreSQL); the storage layer is isolated behind the server module and all mutations are serialized.
- **Email delivery**: `POST /api/email/send` currently records fully assembled emails in the database; connect an SMTP provider to deliver them for real.
- **Multi-process safety**: the server is single-process by design; run one instance per database.
- **CORS**: currently open for local development; restrict allowed origins in production.

---

## License

Provided as-is for learning and internal use. All demo employee data, names, and photographs are fictional.
