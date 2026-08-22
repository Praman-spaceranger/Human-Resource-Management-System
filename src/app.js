/**
 * Dayflow / HRMitra - Complete Enterprise HRMS Application
 * Integrated with all hrms-portal functionality and Frappe HR UI/UX
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. INITIAL MOCK DATABASE & DATA STORE
  // =========================================================================

  const INITIAL_DATA = {
    employees: [
      {
        name: 'EMP-001',
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
        image: null
      },
      {
        name: 'EMP-002',
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
        image: null
      },
      {
        name: 'EMP-003',
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
        image: null
      },
      {
        name: 'EMP-004',
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
        image: null
      },
      {
        name: 'EMP-005',
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
        image: null
      }
    ],

    departments: ['Human Resources', 'Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Finance'],
    designations: ['HR Manager', 'HR Executive', 'Senior Frontend Engineer', 'Backend Developer', 'Full Stack Engineer', 'Product Manager', 'UI/UX Designer', 'DevOps Specialist'],

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
      'EMP-005': { 'Casual Leave': 8, 'Sick Leave': 8, 'Earned Leave': 10, 'Compensatory Off': 0 }
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
        leave_type: 'Sick Leave',
        from_date: '2026-08-14',
        to_date: '2026-08-14',
        total_leave_days: 1,
        status: 'Approved',
        description: 'Viral fever rest day.',
        posting_date: '2026-08-14',
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
      { name: 'CHK-003', employee: 'EMP-003', log_type: 'IN', time: '2026-08-22 08:05:22', latitude: 12.9716, longitude: 77.5946 },
      { name: 'CHK-004', employee: 'EMP-004', log_type: 'IN', time: '2026-08-22 09:40:11', latitude: 12.9716, longitude: 77.5946 }
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

  const STORAGE_KEY = 'dayflow_hrms_data_v2';
  const SESSION_KEY = 'dayflow_hrms_session_v2';

  class Store {
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

  const store = new Store();

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
    // Default to HR Manager for rich exploration
    return {
      authenticated: true,
      role: 'HR / Admin',
      employeeId: 'EMP-001',
      email: 'hr@dayflow.local',
      name: 'Aditi Sharma'
    };
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
    return store.data.employees.find(e => e.name === session.employeeId) || store.data.employees[0];
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

  function openModal(templateFn) {
    activeModal = templateFn;
    renderModal();
  }

  function closeModal() {
    activeModal = null;
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

  // =========================================================================
  // 8. ROUTING & CONTROLLER
  // =========================================================================

  let currentRoute = '#dashboard';
  let routeParams = {};
  let mobileSidebarOpen = false;

  function parseHash() {
    const hash = window.location.hash || '#dashboard';
    const parts = hash.split('/');
    currentRoute = parts[0];
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

    const emp = getActiveEmployee();
    const isHR = session.role === 'HR / Admin';

    root.innerHTML = `
      <div class="app-layout">
        ${mobileSidebarOpen ? '<div class="sidebar-backdrop" onclick="window.toggleMobileSidebar()"></div>' : ''}
        
        <!-- SIDEBAR -->
        <aside class="sidebar ${mobileSidebarOpen ? 'open' : ''}">
          <div class="sidebar-header">
            <div class="sidebar-brand">
              <div class="brand-logo">D</div>
              <span>Dayflow</span>
              <small>${isHR ? 'HR Core' : 'Portal'}</small>
            </div>
          </div>

          <div class="sidebar-content">
            <!-- MAIN SECTION -->
            <div>
              <div class="nav-group-title">Main</div>
              <ul class="nav-list">
                <li class="nav-item ${currentRoute === '#dashboard' ? 'active' : ''}">
                  <button onclick="window.location.hash='#dashboard'">
                    <span class="nav-icon">📊</span>
                    <span>Dashboard</span>
                  </button>
                </li>
                ${!isHR ? `
                  <li class="nav-item ${currentRoute === '#checkin' ? 'active' : ''}">
                    <button onclick="window.location.hash='#checkin'">
                      <span class="nav-icon">⏱️</span>
                      <span>Check In / Out</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#attendance' ? 'active' : ''}">
                    <button onclick="window.location.hash='#attendance'">
                      <span class="nav-icon">📅</span>
                      <span>My Attendance</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#leave' ? 'active' : ''}">
                    <button onclick="window.location.hash='#leave'">
                      <span class="nav-icon">🌴</span>
                      <span>My Leaves</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#payslip' ? 'active' : ''}">
                    <button onclick="window.location.hash='#payslip'">
                      <span class="nav-icon">💳</span>
                      <span>My Payslips</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#expenses' ? 'active' : ''}">
                    <button onclick="window.location.hash='#expenses'">
                      <span class="nav-icon">🧾</span>
                      <span>Expense Claims</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#shifts' ? 'active' : ''}">
                    <button onclick="window.location.hash='#shifts'">
                      <span class="nav-icon">🔄</span>
                      <span>Shift Requests</span>
                    </button>
                  </li>
                ` : ''}
              </ul>
            </div>

            <!-- HR / ADMIN OPERATIONS -->
            ${isHR ? `
              <div>
                <div class="nav-group-title">People & Attendance</div>
                <ul class="nav-list">
                  <li class="nav-item ${currentRoute === '#employees' || currentRoute === '#employee' || currentRoute === '#employee-new' ? 'active' : ''}">
                    <button onclick="window.location.hash='#employees'">
                      <span class="nav-icon">👥</span>
                      <span>Employees</span>
                      <span class="nav-badge">${store.data.employees.length}</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#attendance' ? 'active' : ''}">
                    <button onclick="window.location.hash='#attendance'">
                      <span class="nav-icon">🗓️</span>
                      <span>Attendance</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#leave-approvals' ? 'active' : ''}">
                    <button onclick="window.location.hash='#leave-approvals'">
                      <span class="nav-icon">✅</span>
                      <span>Leave Approvals</span>
                      <span class="nav-badge">${store.data.leave_applications.filter(l => l.status === 'Open').length}</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#onboarding' ? 'active' : ''}">
                    <button onclick="window.location.hash='#onboarding'">
                      <span class="nav-icon">🚀</span>
                      <span>Onboarding</span>
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <div class="nav-group-title">Recruitment & Hiring</div>
                <ul class="nav-list">
                  <li class="nav-item ${currentRoute === '#recruitment' ? 'active' : ''}">
                    <button onclick="window.location.hash='#recruitment'">
                      <span class="nav-icon">💼</span>
                      <span>Job Openings</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#recruitment-applicants' ? 'active' : ''}">
                    <button onclick="window.location.hash='#recruitment-applicants'">
                      <span class="nav-icon">🎯</span>
                      <span>Applicants Board</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#recruitment-interviews' ? 'active' : ''}">
                    <button onclick="window.location.hash='#recruitment-interviews'">
                      <span class="nav-icon">🎤</span>
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
                      <span class="nav-icon">💰</span>
                      <span>Payroll Overview</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#payroll-run' ? 'active' : ''}">
                    <button onclick="window.location.hash='#payroll-run'">
                      <span class="nav-icon">⚡</span>
                      <span>Run Payroll</span>
                    </button>
                  </li>
                  <li class="nav-item ${currentRoute === '#payroll-slips' ? 'active' : ''}">
                    <button onclick="window.location.hash='#payroll-slips'">
                      <span class="nav-icon">📜</span>
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
                      <span class="nav-icon">📈</span>
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
                    <span class="nav-icon">🏢</span>
                    <span>Team Directory</span>
                  </button>
                </li>
                <li class="nav-item ${currentRoute === '#announcements' ? 'active' : ''}">
                  <button onclick="window.location.hash='#announcements'">
                    <span class="nav-icon">📢</span>
                    <span>Announcements</span>
                  </button>
                </li>
                <li class="nav-item ${currentRoute === '#profile' ? 'active' : ''}">
                  <button onclick="window.location.hash='#profile'">
                    <span class="nav-icon">👤</span>
                    <span>My Profile</span>
                  </button>
                </li>
                <li class="nav-item ${currentRoute === '#settings' ? 'active' : ''}">
                  <button onclick="window.location.hash='#settings'">
                    <span class="nav-icon">⚙️</span>
                    <span>Workspace Settings</span>
                  </button>
                </li>
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
          <!-- TOPBAR -->
          <header class="topbar">
            <div class="topbar-left">
              <button class="mobile-menu-toggle" onclick="window.toggleMobileSidebar()">
                ☰
              </button>
              <div class="breadcrumbs">
                <a href="#dashboard">Dayflow</a>
                <span class="separator">/</span>
                <span class="current">${getRouteTitle()}</span>
              </div>
            </div>

            <div class="topbar-right">
              <div class="badge ${isHR ? 'badge-purple' : 'badge-info'}">
                <span class="badge-dot"></span>
                <span>${escapeHtml(session.role)}</span>
              </div>

              <button class="icon-btn" onclick="window.location.hash='#notifications'" title="Notifications">
                🔔
                ${getUnreadCount() > 0 ? `<span class="notification-count">${getUnreadCount()}</span>` : ''}
              </button>

              <div class="profile-dropdown-container">
                <button class="profile-trigger-btn" onclick="window.toggleUserMenu()">
                  <div class="user-avatar-sm" style="background: ${nameToColor(emp?.employee_name)}; color: #fff; width: 28px; height: 28px; font-size: 11px;">
                    ${getInitials(emp?.employee_name)}
                  </div>
                  <span style="font-size: 11px; color: var(--text-muted);">▾</span>
                </button>
                
                <div id="user-menu-dropdown" class="dropdown-menu" style="display: none;">
                  <div style="padding: 6px 10px; font-size: 11px; font-weight: 600; color: var(--text-primary); border-bottom: 1px solid var(--border-subtle);">
                    ${escapeHtml(emp?.employee_name)}
                    <div style="font-size: 10px; font-weight: normal; color: var(--text-muted);">${escapeHtml(emp?.company_email)}</div>
                  </div>
                  <button class="dropdown-item" onclick="window.location.hash='#profile'; window.toggleUserMenu();">👤 My Profile</button>
                  <button class="dropdown-item" onclick="window.toggleRole(); window.toggleUserMenu();">⇄ Switch Mode</button>
                  <button class="dropdown-item" onclick="window.location.hash='#settings'; window.toggleUserMenu();">⚙️ System Settings</button>
                  <div class="dropdown-divider"></div>
                  <button class="dropdown-item" style="color: var(--danger);" onclick="window.logout()">🚪 Sign Out</button>
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
        return isHR ? renderHRDashboard() : renderEmployeeDashboard();
      case '#checkin':
        return renderCheckinView();
      case '#attendance':
        return isHR ? renderHRAttendanceView() : renderEmployeeAttendanceView();
      case '#leave':
        return renderEmployeeLeaveView();
      case '#leave-approvals':
        return renderHRLeaveApprovalsView();
      case '#payslip':
        return renderEmployeePayslipView();
      case '#payroll':
        return renderHRPayrollOverview();
      case '#payroll-run':
        return renderRunPayrollWizard();
      case '#payroll-slips':
        return renderHRSalarySlipsView();
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
        return renderEmployeesListView();
      case '#employee':
        return renderEmployeeDetailView(routeParams.id);
      case '#employee-new':
        return renderAddEmployeeView();
      case '#recruitment':
        return renderRecruitmentOpeningsView();
      case '#recruitment-applicants':
        return renderRecruitmentApplicantsView();
      case '#recruitment-interviews':
        return renderRecruitmentInterviewsView();
      case '#onboarding':
        return renderOnboardingView();
      case '#reports':
        return renderReportsView();
      case '#notifications':
        return renderNotificationsView();
      case '#settings':
        return renderSettingsView();
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
    
    // Calculate leave balance
    const allocs = store.data.leave_allocations[emp.name] || {};
    const totalLeavesAlloc = Object.values(allocs).reduce((a, b) => a + b, 0);
    const myLeaves = store.data.leave_applications.filter(l => l.employee === emp.name);
    const pendingCount = myLeaves.filter(l => l.status === 'Open').length;
    
    // Attendance count this month
    const myAttThisMonth = store.data.attendance.filter(a => a.employee === emp.name && (a.status === 'Present' || a.status === 'Work From Home')).length;
    
    // Upcoming Holidays
    const holidays = store.data.holidays.slice(0, 3);
    
    // Team on leave today
    const teamLeaves = store.data.leave_applications.filter(l => l.status === 'Approved' && l.employee !== emp.name);

    return `
      <!-- GREETING & QUICK ACTIONS -->
      <div class="page-header">
        <div class="page-title-group">
          <h1>${greeting}, ${escapeHtml(emp.employee_name.split(' ')[0])} 👋</h1>
          <p>Here is your personal attendance, leave, and compensation summary.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="window.location.hash='#checkin'">⏱️ Punch Attendance</button>
          <button class="btn btn-secondary" onclick="window.openApplyLeaveModal()">🌴 Apply Leave</button>
          <button class="btn btn-secondary" onclick="window.location.hash='#payslip'">💳 View Payslip</button>
        </div>
      </div>

      <!-- KPI STAT CARDS -->
      <div class="stats-grid">
        <div class="stat-card primary">
          <div class="stat-card-header">
            <span class="stat-card-title">Available Leave Balance</span>
            <span class="stat-card-icon" style="background: var(--primary-pale); color: var(--primary);">🌴</span>
          </div>
          <div class="stat-card-value">${totalLeavesAlloc} Days</div>
          <div class="stat-card-footer">
            <span>Casual: ${allocs['Casual Leave'] || 0} | Sick: ${allocs['Sick Leave'] || 0} | Earned: ${allocs['Earned Leave'] || 0}</span>
          </div>
        </div>

        <div class="stat-card success">
          <div class="stat-card-header">
            <span class="stat-card-title">Attendance This Month</span>
            <span class="stat-card-icon" style="background: var(--success-pale); color: var(--success);">🗓️</span>
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
            <span class="stat-card-icon" style="background: var(--warning-pale); color: var(--warning);">⏳</span>
          </div>
          <div class="stat-card-value">${pendingCount}</div>
          <div class="stat-card-footer">
            <span>Awaiting HR approval</span>
          </div>
        </div>

        <div class="stat-card purple">
          <div class="stat-card-header">
            <span class="stat-card-title">Assigned Shift</span>
            <span class="stat-card-icon" style="background: var(--purple-pale); color: var(--purple);">🔄</span>
          </div>
          <div class="stat-card-value" style="font-size: 18px;">${escapeHtml(emp.shift || 'General Shift')}</div>
          <div class="stat-card-footer">
            <span>09:30 AM — 06:30 PM</span>
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
              <span class="card-title">🎉 Upcoming Holidays</span>
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
              <span class="card-title">👥 Team on Leave</span>
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

    // Attendance breakdown today
    const presentToday = 4;
    const absentToday = 0;
    const onLeaveToday = 1;
    const attendanceRate = Math.round((presentToday / totalEmployees) * 100);

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Workforce & Operations Dashboard</h1>
          <p>Real-time organizational headcount, attendance metrics, recruitment funnel, and pending approval queues.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="window.location.hash='#employee-new'">+ Onboard Employee</button>
          <button class="btn btn-secondary" onclick="window.location.hash='#payroll-run'">⚡ Run Payroll</button>
          <button class="btn btn-secondary" onclick="window.location.hash='#reports'">📈 Full Analytics</button>
        </div>
      </div>

      <!-- 6 KPI STAT CARDS -->
      <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
        <div class="stat-card primary">
          <div class="stat-card-header">
            <span class="stat-card-title">Total Headcount</span>
            <span class="stat-card-icon" style="background: var(--primary-pale); color: var(--primary);">👥</span>
          </div>
          <div class="stat-card-value">${totalEmployees}</div>
          <div class="stat-card-footer">
            <span class="badge badge-success">${activeEmployees} Active</span>
            <span>0 On Notice</span>
          </div>
        </div>

        <div class="stat-card success">
          <div class="stat-card-header">
            <span class="stat-card-title">Attendance Rate</span>
            <span class="stat-card-icon" style="background: var(--success-pale); color: var(--success);">📊</span>
          </div>
          <div class="stat-card-value">${attendanceRate}%</div>
          <div class="stat-card-footer">
            <span>${presentToday} Present | ${onLeaveToday} On Leave</span>
          </div>
        </div>

        <div class="stat-card warning">
          <div class="stat-card-header">
            <span class="stat-card-title">Pending Approvals</span>
            <span class="stat-card-icon" style="background: var(--warning-pale); color: var(--warning);">⏳</span>
          </div>
          <div class="stat-card-value">${totalPendingApprovals}</div>
          <div class="stat-card-footer">
            <span>${pendingLeaves.length} Leaves &middot; ${pendingExpenses.length} Expenses &middot; ${pendingShifts.length} Shifts</span>
          </div>
        </div>

        <div class="stat-card info">
          <div class="stat-card-header">
            <span class="stat-card-title">Open Positions</span>
            <span class="stat-card-icon" style="background: var(--info-pale); color: var(--info);">💼</span>
          </div>
          <div class="stat-card-value">${openPositions}</div>
          <div class="stat-card-footer">
            <span>${store.data.job_applicants.length} Total Applicants</span>
          </div>
        </div>

        <div class="stat-card purple">
          <div class="stat-card-header">
            <span class="stat-card-title">Onboarding Pipeline</span>
            <span class="stat-card-icon" style="background: var(--purple-pale); color: var(--purple);">🚀</span>
          </div>
          <div class="stat-card-value">${store.data.onboarding_records.filter(o => o.boarding_status === 'In Progress').length}</div>
          <div class="stat-card-footer">
            <span>New Hires in induction</span>
          </div>
        </div>

        <div class="stat-card danger">
          <div class="stat-card-header">
            <span class="stat-card-title">Next Payroll Run</span>
            <span class="stat-card-icon" style="background: var(--danger-pale); color: var(--danger);">💳</span>
          </div>
          <div class="stat-card-value" style="font-size: 18px;">Aug 31</div>
          <div class="stat-card-footer">
            <span>5 Slips Pending Run</span>
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
                  <tr><td colspan="5" style="text-align: center; padding: 24px; color: var(--text-muted);">All approval queues are completely cleared! 🎉</td></tr>
                ` : `
                  ${pendingLeaves.map(l => `
                    <tr>
                      <td><span class="badge badge-info">Leave</span></td>
                      <td><strong>${escapeHtml(l.employee_name)}</strong></td>
                      <td>${escapeHtml(l.leave_type)} (${l.total_leave_days}d: ${l.from_date} to ${l.to_date})</td>
                      <td>${formatDate(l.posting_date)}</td>
                      <td style="text-align: right;">
                        <button class="btn btn-sm btn-success" onclick="window.quickApproveLeave('${l.name}')">✓ Approve</button>
                        <button class="btn btn-sm btn-danger" onclick="window.quickRejectLeave('${l.name}')">✕ Reject</button>
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
                        <button class="btn btn-sm btn-success" onclick="window.quickApproveExpense('${e.name}')">✓ Approve</button>
                        <button class="btn btn-sm btn-danger" onclick="window.quickRejectExpense('${e.name}')">✕ Reject</button>
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
                        <button class="btn btn-sm btn-success" onclick="window.quickApproveShift('${s.name}')">✓ Approve</button>
                        <button class="btn btn-sm btn-danger" onclick="window.quickRejectShift('${s.name}')">✕ Reject</button>
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
              <span class="card-title">🎯 Recruitment Pipeline</span>
              <a href="#recruitment-applicants" class="btn btn-ghost btn-sm">Kanban →</a>
            </div>
            <div class="card-body" style="padding: 16px;">
              <div class="report-bar-row">
                <span class="report-bar-label">Open / Sourced</span>
                <div class="report-bar-track"><div class="report-bar-fill" style="width: 20%; background: #94a3b8;"></div></div>
                <span class="report-bar-value">1</span>
              </div>
              <div class="report-bar-row">
                <span class="report-bar-label">Replied / Screened</span>
                <div class="report-bar-track"><div class="report-bar-fill" style="width: 20%; background: #3b82f6;"></div></div>
                <span class="report-bar-value">1</span>
              </div>
              <div class="report-bar-row">
                <span class="report-bar-label">Interview Stage</span>
                <div class="report-bar-track"><div class="report-bar-fill" style="width: 40%; background: #8b5cf6;"></div></div>
                <span class="report-bar-value">2</span>
              </div>
              <div class="report-bar-row">
                <span class="report-bar-label">Offer Accepted</span>
                <div class="report-bar-track"><div class="report-bar-fill" style="width: 20%; background: #10b981;"></div></div>
                <span class="report-bar-value">1</span>
              </div>
            </div>
          </div>

          <!-- RECENT AUDIT LOGS -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">⚡ Operational Feed</span>
            </div>
            <div class="card-body" style="padding: 10px 14px; font-size: 12px;">
              <div style="padding: 8px 0; border-bottom: 1px solid var(--border-subtle);">
                <strong>Aditi Sharma</strong> published company all-hands announcement.
                <div style="font-size: 10.5px; color: var(--text-light);">2 days ago</div>
              </div>
              <div style="padding: 8px 0; border-bottom: 1px solid var(--border-subtle);">
                <strong>Varun Grover</strong> accepted Staff Full Stack Engineer offer.
                <div style="font-size: 10.5px; color: var(--text-light);">3 days ago</div>
              </div>
              <div style="padding: 8px 0;">
                <strong>July 2026 Payroll</strong> finalized and locked (5 slips).
                <div style="font-size: 10.5px; color: var(--text-light);">July 31, 2026</div>
              </div>
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
    const myLogs = store.data.checkins.filter(c => c.employee === emp.name);
    const lastCheckin = myLogs[0];
    const isCheckedIn = lastCheckin?.log_type === 'IN';
    const nextAction = isCheckedIn ? 'OUT' : 'IN';

    // Calculate working hours today
    let workingMinutes = 0;
    if (isCheckedIn && lastCheckin) {
      const startMs = new Date(lastCheckin.time).getTime();
      const nowMs = Date.now();
      workingMinutes = Math.max(0, Math.round((nowMs - startMs) / 60000));
    }
    const hrs = Math.floor(workingMinutes / 60);
    const mins = workingMinutes % 60;

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
          <span style="font-size: 26px;">${nextAction === 'IN' ? '👉' : '🚪'}</span>
          <span>Check ${nextAction === 'IN' ? 'In' : 'Out'}</span>
        </button>

        <div class="location-badge">
          <span>📍</span>
          <span>Coordinates captured: 12.9716° N, 77.5946° E (Bengaluru Core HQ)</span>
        </div>

        <div style="display: flex; justify-content: center; gap: 32px; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
          <div>
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Shift Hours Today</div>
            <div style="font-size: 20px; font-weight: 700; color: var(--text-primary); margin-top: 2px;">
              ${isCheckedIn ? `${hrs}h ${mins}m` : '0h 0m'}
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
    const now = new Date(2026, 7 + currentMonthOffset, 1);
    const year = now.getFullYear();
    const month = now.getMonth();
    const monthName = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const records = store.data.attendance.filter(a => a.employee === emp.name);
    const presentCount = records.filter(r => r.status === 'Present' || r.status === 'Work From Home').length;
    const leaveCount = records.filter(r => r.status === 'On Leave').length;
    const halfDayCount = records.filter(r => r.status === 'Half Day').length;

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
            <button class="btn btn-sm ${attendanceViewMode === 'calendar' ? 'btn-primary' : 'btn-ghost'}" onclick="window.setAttendanceView('calendar')">📅 Calendar</button>
            <button class="btn btn-sm ${attendanceViewMode === 'list' ? 'btn-primary' : 'btn-ghost'}" onclick="window.setAttendanceView('list')">📋 List</button>
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
          <div class="stat-card-value">8.4 hrs</div>
        </div>
      </div>

      <!-- MONTH SELECTOR -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="btn btn-secondary btn-sm" onclick="window.shiftAttendanceMonth(-1)">◀ Prev Month</button>
          <h2 style="font-size: 16px; font-weight: 700; min-width: 180px; text-align: center;">${monthName}</h2>
          <button class="btn btn-secondary btn-sm" onclick="window.shiftAttendanceMonth(1)">Next Month ▶</button>
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
              const isToday = dateStr === '2026-08-22';

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
    const allocs = store.data.leave_allocations[emp.name] || {};
    const applications = store.data.leave_applications.filter(l => l.employee === emp.name);

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
        ${Object.entries(allocs).map(([lt, bal]) => `
          <div class="stat-card primary">
            <div class="stat-card-header">
              <span class="stat-card-title">${escapeHtml(lt)}</span>
              <span class="stat-card-icon" style="background: var(--primary-pale); color: var(--primary);">🌴</span>
            </div>
            <div class="stat-card-value">${bal} Days</div>
            <div class="stat-card-footer">
              <div style="width: 100%; height: 5px; background: var(--bg-muted); border-radius: 3px; overflow: hidden; margin-top: 6px;">
                <div style="width: 75%; height: 100%; background: var(--primary);"></div>
              </div>
            </div>
          </div>
        `).join('')}
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
                      <button class="btn btn-sm btn-success" onclick="window.quickApproveLeave('${a.name}')">✓ Approve</button>
                      <button class="btn btn-sm btn-danger" onclick="window.quickRejectLeave('${a.name}')">✕ Reject</button>
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
    const slips = store.data.salary_slips.filter(s => s.employee === emp.name);
    const activeSlip = slips[0]; // Latest

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>My Salary Slips & Compensation</h1>
          <p>View breakdown of earnings, statutory tax deductions, and download official payslips.</p>
        </div>
        <div class="page-actions">
          ${activeSlip ? `<button class="btn btn-primary" onclick="window.downloadPayslipPDF('${activeSlip.name}')">📥 Download PDF</button>` : ''}
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
              <span class="card-title" style="color: var(--success-text);">💰 Earnings Breakdown</span>
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
              <span class="card-title" style="color: var(--danger-text);">📉 Deductions Breakdown</span>
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
            <span class="card-title">📜 Historical Salary Records</span>
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
                    <td><span class="badge badge-success">Disbursed</span></td>
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
    const entries = store.data.payroll_entries;
    const slips = store.data.salary_slips;

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Payroll Management Overview</h1>
          <p>Manage monthly compensation cycles, run payroll calculation wizard, and inspect salary slips.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="window.location.hash='#payroll-run'">⚡ Run Monthly Payroll Wizard</button>
          <button class="btn btn-secondary" onclick="window.location.hash='#payroll-slips'">📜 Browse All Salary Slips</button>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card primary">
          <span class="stat-card-title">Total Processed Payroll</span>
          <div class="stat-card-value">${formatCurrency(585000)}</div>
          <div class="stat-card-footer"><span>Last Cycle Disbursed</span></div>
        </div>
        <div class="stat-card success">
          <span class="stat-card-title">Salaries Generated</span>
          <div class="stat-card-value">${slips.length}</div>
          <div class="stat-card-footer"><span>Active Employee Records</span></div>
        </div>
        <div class="stat-card info">
          <span class="stat-card-title">Average Net CTC</span>
          <div class="stat-card-value">${formatCurrency(117000)}</div>
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
  let wizardConfig = { month: 'August', year: '2026', dept: 'All' };

  function renderRunPayrollWizard() {
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
                  <option selected>August</option>
                  <option>September</option>
                  <option>October</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Year</label>
                <select class="form-control" id="wiz-year">
                  <option selected>2026</option>
                  <option>2025</option>
                </select>
              </div>
            </div>
            <div class="form-group" style="margin-top: 14px;">
              <label class="form-label">Department Scope</label>
              <select class="form-control" id="wiz-dept">
                <option selected>All Departments</option>
                ${store.data.departments.map(d => `<option>${escapeHtml(d)}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="card-footer" style="display: flex; justify-content: flex-end;">
            <button class="btn btn-primary" onclick="window.setWizardStep(2)">Proceed to Preview →</button>
          </div>
        ` : wizardStep === 2 ? `
          <div class="card-header"><span class="card-title">Step 2: Employee Payroll Calculation Preview</span></div>
          <div class="card-body" style="padding: 0;">
            <div class="table-container" style="border: none;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Gross Pay</th>
                    <th>PF & TDS</th>
                    <th>Net Disbursable</th>
                  </tr>
                </thead>
                <tbody>
                  ${store.data.employees.map(e => `
                    <tr>
                      <td><strong>${escapeHtml(e.employee_name)}</strong> <small>(${e.department})</small></td>
                      <td>₹1,25,000</td>
                      <td style="color: var(--danger);">₹12,500</td>
                      <td><strong style="color: var(--success);">₹1,12,500</strong></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-footer" style="display: flex; justify-content: space-between;">
            <button class="btn btn-secondary" onclick="window.setWizardStep(1)">← Back</button>
            <button class="btn btn-success" onclick="window.finalizePayroll()">✓ Generate & Publish Payroll</button>
          </div>
        ` : `
          <div class="card-body" style="text-align: center; padding: 40px;">
            <div style="font-size: 48px;">🎉</div>
            <h2 style="font-size: 20px; font-weight: 700; margin-top: 12px;">Payroll Cycle Successfully Published!</h2>
            <p style="color: var(--text-muted); margin-top: 6px; font-size: 13px;">
              5 salary slips have been generated and notifications dispatched to all employee self-service portals.
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
                    <span style="font-size: 11px; color: var(--primary);">${expandedSlipId === s.name ? '▲ Collapse' : '▼ Breakdown'}</span>
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
      <div class="card" style="margin-bottom: 20px;">
        <div class="card-header"><span class="card-title">🔄 Currently Active Assigned Shift</span></div>
        <div class="card-body" style="display: flex; align-items: center; justify-content: space-between;">
          <div>
            <h2 style="font-size: 18px; font-weight: 700; color: var(--primary);">${escapeHtml(emp.shift || 'General Shift')}</h2>
            <p style="color: var(--text-muted); font-size: 12px; margin-top: 4px;">Standard timings: 09:30 AM to 06:30 PM (Monday through Friday)</p>
          </div>
          <span class="badge badge-success">Assigned & Active</span>
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
            <span class="icon">🔍</span>
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
              <div>📧 ${escapeHtml(emp.company_email)}</div>
              <div>📞 ${escapeHtml(emp.cell_phone || '—')}</div>
              <div>🏢 ${escapeHtml(emp.company || 'Dayflow')}</div>
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
          <button class="btn btn-secondary" onclick="window.openEditProfileModal()">✏️ Edit Contact Info</button>
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
          <div class="card-header"><span class="card-title">👤 Personal Information</span></div>
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
          <div class="card-header"><span class="card-title">🏢 Employment Details</span></div>
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
          <div class="card-header"><span class="card-title">🚨 Emergency Contact</span></div>
          <div class="card-body" style="font-size: 12.5px; display: flex; flex-direction: column; gap: 10px;">
            <div><span style="color: var(--text-muted);">Contact Name:</span> <strong>${escapeHtml(emp.person_to_be_contacted || '—')}</strong></div>
            <div><span style="color: var(--text-muted);">Relationship:</span> <strong>${escapeHtml(emp.relation || '—')}</strong></div>
            <div><span style="color: var(--text-muted);">Emergency Phone:</span> <strong>${escapeHtml(emp.emergency_phone_number || '—')}</strong></div>
          </div>
        </div>

        <!-- BANK DETAILS -->
        <div class="card">
          <div class="card-header"><span class="card-title">💳 Direct Deposit Banking</span></div>
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
  // HR EMPLOYEES ROSTER LIST VIEW
  // -------------------------------------------------------------------------
  let employeeSearch = '';
  let employeeFilterDept = 'All';

  function renderEmployeesListView() {
    let list = store.data.employees;
    if (employeeSearch) {
      const q = employeeSearch.toLowerCase();
      list = list.filter(e => e.employee_name.toLowerCase().includes(q) || e.name.toLowerCase().includes(q) || (e.department || '').toLowerCase().includes(q));
    }
    if (employeeFilterDept !== 'All') {
      list = list.filter(e => e.department === employeeFilterDept);
    }

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Employee Management Directory</h1>
          <p>Official workforce master roster, onboarding records, and employee credentials.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="window.location.hash='#employee-new'">+ Onboard Employee</button>
        </div>
      </div>

      <!-- FILTER TOOLBAR -->
      <div class="filter-toolbar">
        <div class="filter-group-left">
          <div class="search-box">
            <span class="icon">🔍</span>
            <input type="text" placeholder="Search by name or employee ID..." value="${escapeHtml(employeeSearch)}" oninput="window.setEmployeeSearch(this.value)">
          </div>
          <select class="filter-select" onchange="window.setEmployeeDept(this.value)">
            <option ${employeeFilterDept === 'All' ? 'selected' : ''}>All Departments</option>
            ${store.data.departments.map(d => `<option ${employeeFilterDept === d ? 'selected' : ''}>${escapeHtml(d)}</option>`).join('')}
          </select>
        </div>
        <div class="filter-group-right">
          <span style="font-size: 12px; color: var(--text-muted);">${list.length} Total Records</span>
        </div>
      </div>

      <!-- EMPLOYEES TABLE -->
      <div class="card">
        <div class="table-container" style="border: none;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Full Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Date of Joining</th>
                <th>Status</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${list.map(e => `
                <tr onclick="window.location.hash='#employee/${e.name}'" style="cursor: pointer;">
                  <td><strong>${escapeHtml(e.name)}</strong></td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <div class="user-avatar-sm" style="width: 26px; height: 26px; font-size: 10px; background: ${nameToColor(e.employee_name)}22; color: ${nameToColor(e.employee_name)};">
                        ${getInitials(e.employee_name)}
                      </div>
                      <strong>${escapeHtml(e.employee_name)}</strong>
                    </div>
                  </td>
                  <td>${escapeHtml(e.department)}</td>
                  <td>${escapeHtml(e.designation)}</td>
                  <td>${formatDate(e.date_of_joining)}</td>
                  <td><span class="badge badge-success">${escapeHtml(e.status)}</span></td>
                  <td style="text-align: right;">
                    <a href="#employee/${e.name}" class="btn btn-sm btn-secondary">View Document →</a>
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
  // HR EMPLOYEE DOCUMENT DETAIL VIEW (#employee/:id)
  // -------------------------------------------------------------------------
  let activeEmpTab = 'personal';

  function renderEmployeeDetailView(empId) {
    const emp = store.data.employees.find(e => e.name === empId) || store.data.employees[0];

    return `
      <div class="page-header">
        <div class="page-title-group">
          <div class="breadcrumbs" style="margin-bottom: 6px;">
            <a href="#employees">Employees</a>
            <span class="separator">/</span>
            <span class="current">${escapeHtml(emp.name)}</span>
          </div>
          <h1>${escapeHtml(emp.employee_name)}</h1>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="window.openEditEmployeeModal('${emp.name}')">✏️ Edit Record</button>
          <a href="#employees" class="btn btn-ghost">Back to List</a>
        </div>
      </div>

      <!-- TABS -->
      <div class="card">
        <div class="card-header" style="border-bottom: none; padding-bottom: 0;">
          <div class="tabs-nav" style="border-bottom: none; margin-bottom: 0;">
            <button class="tab-btn ${activeEmpTab === 'personal' ? 'active' : ''}" onclick="window.setEmpDocTab('personal')">Personal Info</button>
            <button class="tab-btn ${activeEmpTab === 'job' ? 'active' : ''}" onclick="window.setEmpDocTab('job')">Job & Organization</button>
            <button class="tab-btn ${activeEmpTab === 'salary' ? 'active' : ''}" onclick="window.setEmpDocTab('salary')">Salary & Structure</button>
            <button class="tab-btn ${activeEmpTab === 'emergency' ? 'active' : ''}" onclick="window.setEmpDocTab('emergency')">Emergency & Bank</button>
          </div>
        </div>

        <div class="card-body" style="border-top: 1px solid var(--border-color); font-size: 13px;">
          ${activeEmpTab === 'personal' ? `
            <div class="form-row">
              <div><span style="color: var(--text-muted);">Employee Name:</span> <strong>${escapeHtml(emp.employee_name)}</strong></div>
              <div><span style="color: var(--text-muted);">Gender:</span> <strong>${escapeHtml(emp.gender || '—')}</strong></div>
            </div>
            <div class="form-row" style="margin-top: 14px;">
              <div><span style="color: var(--text-muted);">Company Email:</span> <strong>${escapeHtml(emp.company_email)}</strong></div>
              <div><span style="color: var(--text-muted);">Personal Email:</span> <strong>${escapeHtml(emp.personal_email || '—')}</strong></div>
            </div>
            <div class="form-row" style="margin-top: 14px;">
              <div><span style="color: var(--text-muted);">Cell Phone:</span> <strong>${escapeHtml(emp.cell_phone)}</strong></div>
              <div><span style="color: var(--text-muted);">Date of Birth:</span> <strong>${formatDate(emp.date_of_birth)}</strong></div>
            </div>
            <div style="margin-top: 14px;"><span style="color: var(--text-muted);">Residential Address:</span> <div>${escapeHtml(emp.current_address || '—')}</div></div>
          ` : activeEmpTab === 'job' ? `
            <div class="form-row">
              <div><span style="color: var(--text-muted);">Department:</span> <strong>${escapeHtml(emp.department)}</strong></div>
              <div><span style="color: var(--text-muted);">Designation:</span> <strong>${escapeHtml(emp.designation)}</strong></div>
            </div>
            <div class="form-row" style="margin-top: 14px;">
              <div><span style="color: var(--text-muted);">Date of Joining:</span> <strong>${formatDate(emp.date_of_joining)}</strong></div>
              <div><span style="color: var(--text-muted);">Reports To:</span> <strong>${escapeHtml(emp.reports_to || 'Management')}</strong></div>
            </div>
            <div class="form-row" style="margin-top: 14px;">
              <div><span style="color: var(--text-muted);">Shift Roster:</span> <strong>${escapeHtml(emp.shift || 'General Shift')}</strong></div>
              <div><span style="color: var(--text-muted);">Status:</span> <span class="badge badge-success">${escapeHtml(emp.status)}</span></div>
            </div>
          ` : activeEmpTab === 'salary' ? `
            <div class="form-row">
              <div><span style="color: var(--text-muted);">Monthly CTC:</span> <strong>₹1,25,000</strong></div>
              <div><span style="color: var(--text-muted);">Basic Pay:</span> <strong>₹62,500</strong></div>
            </div>
            <div class="form-row" style="margin-top: 14px;">
              <div><span style="color: var(--text-muted);">HRA:</span> <strong>₹25,000</strong></div>
              <div><span style="color: var(--text-muted);">Special Allowance:</span> <strong>₹37,500</strong></div>
            </div>
          ` : `
            <div class="form-row">
              <div><span style="color: var(--text-muted);">Contact Person:</span> <strong>${escapeHtml(emp.person_to_be_contacted || '—')}</strong></div>
              <div><span style="color: var(--text-muted);">Relationship:</span> <strong>${escapeHtml(emp.relation || '—')}</strong></div>
            </div>
            <div class="form-row" style="margin-top: 14px;">
              <div><span style="color: var(--text-muted);">Emergency Phone:</span> <strong>${escapeHtml(emp.emergency_phone_number || '—')}</strong></div>
              <div><span style="color: var(--text-muted);">Bank Account:</span> <strong>•••• ${escapeHtml((emp.bank_ac_no || '0000').slice(-4))}</strong></div>
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
                <input type="date" class="form-control" name="date_of_joining" required value="2026-09-01">
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
            <button type="submit" class="btn btn-primary">✓ Onboard & Create Employee</button>
          </div>
        </form>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
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
  }

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
          <a href="#recruitment-applicants" class="btn btn-secondary">🎯 Applicant Kanban</a>
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
          <a href="#recruitment-interviews" class="btn btn-secondary">🎤 Interviews Schedule</a>
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
                      <span>⭐ ${a.rating || 0}/5</span>
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
                  <td>⭐ ${i.rating || 0}/5</td>
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
          <div class="card-header"><span class="card-title">1. Headcount by Department</span></div>
          <div class="card-body">
            <div class="report-bar-row">
              <span class="report-bar-label">Engineering</span>
              <div class="report-bar-track"><div class="report-bar-fill" style="width: 40%;"></div></div>
              <span class="report-bar-value">2 (40%)</span>
            </div>
            <div class="report-bar-row">
              <span class="report-bar-label">Human Resources</span>
              <div class="report-bar-track"><div class="report-bar-fill" style="width: 20%;"></div></div>
              <span class="report-bar-value">1 (20%)</span>
            </div>
            <div class="report-bar-row">
              <span class="report-bar-label">Product</span>
              <div class="report-bar-track"><div class="report-bar-fill" style="width: 20%;"></div></div>
              <span class="report-bar-value">1 (20%)</span>
            </div>
            <div class="report-bar-row">
              <span class="report-bar-label">Design</span>
              <div class="report-bar-track"><div class="report-bar-fill" style="width: 20%;"></div></div>
              <span class="report-bar-value">1 (20%)</span>
            </div>
          </div>
        </div>

        <!-- REPORT 2: RECRUITMENT FUNNEL CONVERSION -->
        <div class="card">
          <div class="card-header"><span class="card-title">2. Recruitment Pipeline Funnel</span></div>
          <div class="card-body">
            <div class="report-bar-row">
              <span class="report-bar-label">Applied</span>
              <div class="report-bar-track"><div class="report-bar-fill" style="width: 100%; background: #64748b;"></div></div>
              <span class="report-bar-value">5 (100%)</span>
            </div>
            <div class="report-bar-row">
              <span class="report-bar-label">Screened</span>
              <div class="report-bar-track"><div class="report-bar-fill" style="width: 80%; background: #3b82f6;"></div></div>
              <span class="report-bar-value">4 (80%)</span>
            </div>
            <div class="report-bar-row">
              <span class="report-bar-label">Interviewed</span>
              <div class="report-bar-track"><div class="report-bar-fill" style="width: 40%; background: #8b5cf6;"></div></div>
              <span class="report-bar-value">2 (40%)</span>
            </div>
            <div class="report-bar-row">
              <span class="report-bar-label">Hired & Accepted</span>
              <div class="report-bar-track"><div class="report-bar-fill" style="width: 20%; background: #10b981;"></div></div>
              <span class="report-bar-value">1 (20%)</span>
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
                  <tr><td>Casual Leave</td><td>54 Days</td><td>8 Days</td><td><strong>46 Days</strong></td></tr>
                  <tr><td>Sick Leave</td><td>48 Days</td><td>3 Days</td><td><strong>45 Days</strong></td></tr>
                  <tr><td>Earned Leave</td><td>66 Days</td><td>6 Days</td><td><strong>60 Days</strong></td></tr>
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
                  <tr><th>Month</th><th>Gross Pay</th><th>Total Deductions</th><th>Net Disbursed</th></tr>
                </thead>
                <tbody>
                  <tr><td>July 2026</td><td>₹5,85,000</td><td>₹58,500</td><td><strong>₹5,26,500</strong></td></tr>
                  <tr><td>June 2026</td><td>₹5,85,000</td><td>₹58,500</td><td><strong>₹5,26,500</strong></td></tr>
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
                  <tr><td>August 2026</td><td>92.4%</td><td>5.2%</td><td>2.1%</td></tr>
                  <tr><td>July 2026</td><td>94.8%</td><td>3.8%</td><td>1.4%</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- REPORT 6: EMPLOYEE TURNOVER & RETENTION -->
        <div class="card">
          <div class="card-header"><span class="card-title">6. Annual Turnover & Growth</span></div>
          <div class="card-body">
            <div class="report-bar-row">
              <span class="report-bar-label">Joined This Year</span>
              <div class="report-bar-track"><div class="report-bar-fill" style="width: 100%; background: var(--success);"></div></div>
              <span class="report-bar-value">+3 Hires</span>
            </div>
            <div class="report-bar-row">
              <span class="report-bar-label">Departures / Attrition</span>
              <div class="report-bar-track"><div class="report-bar-fill" style="width: 0%; background: var(--danger);"></div></div>
              <span class="report-bar-value">0 (0%)</span>
            </div>
            <div style="margin-top: 14px; font-size: 11.5px; color: var(--text-muted);">
              Retention rate: <strong>100%</strong> across technical and operations units.
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
          <button class="btn btn-secondary" onclick="window.markAllNotificationsRead()">✓ Mark All as Read</button>
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
                      <span style="font-size: 18px;">${n.type === 'leave' ? '🌴' : n.type === 'expense' ? '🧾' : '💳'}</span>
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
          <div class="card-header"><span class="card-title">🏢 Organization Setup</span></div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; font-size: 12.5px;">
            <div><span style="color: var(--text-muted);">Organization:</span> <strong>Dayflow Technologies Pvt Ltd</strong></div>
            <div><span style="color: var(--text-muted);">ERPNext Engine:</span> <strong>v15.2 (Frappe HR Core Synced)</strong></div>
            <div><span style="color: var(--text-muted);">Currency:</span> <strong>INR (₹)</strong></div>
            <div><span style="color: var(--text-muted);">Current Active Role:</span> <span class="badge badge-purple">${escapeHtml(session.role)}</span></div>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><span class="card-title">⚠️ Data Management</span></div>
          <div class="card-body">
            <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 14px;">
              Reset all in-memory and persistent storage to the pristine initial state with complete pre-seeded employees, attendance records, leaves, payroll slips, and job openings.
            </p>
            <button class="btn btn-danger" onclick="window.resetDataStore()">🔄 Reset Database to Initial Seed State</button>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // AUTH VIEW (Sign In & Sign Up)
  // -------------------------------------------------------------------------
  let authMode = 'signin'; // 'signin' | 'signup'

  function renderAuthView() {
    return `
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <div class="brand-badge">
              <div class="brand-logo">D</div>
              <span>Dayflow</span>
            </div>
            <div class="auth-title">${authMode === 'signin' ? 'Sign in to your workplace' : 'Create an employee account'}</div>
            <div class="auth-subtitle">Every workday, perfectly aligned.</div>
          </div>

          <form class="auth-form" onsubmit="window.handleAuthSubmit(event)">
            ${authMode === 'signup' ? `
              <div class="form-group">
                <label class="form-label">Employee Full Name <span class="required">*</span></label>
                <input type="text" class="form-control" name="name" required placeholder="e.g. Rahul Sen">
              </div>
              <div class="form-group">
                <label class="form-label">Role</label>
                <select class="form-control" name="role">
                  <option value="Employee">Employee (Self-Service)</option>
                  <option value="HR / Admin">HR / Admin Manager</option>
                </select>
              </div>
            ` : ''}

            <div class="form-group">
              <label class="form-label">Work Email <span class="required">*</span></label>
              <input type="email" class="form-control" name="email" id="auth-email-input" required placeholder="hr@dayflow.local or nisha@dayflow.local" value="hr@dayflow.local">
            </div>

            <div class="form-group">
              <label class="form-label">Password <span class="required">*</span></label>
              <input type="password" class="form-control" name="password" id="auth-password-input" required value="Dayflow@123">
              ${authMode === 'signup' ? '<span class="form-hint">At least 8 characters with 1 number and 1 capital letter.</span>' : ''}
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-lg" style="margin-top: 8px;">
              ${authMode === 'signin' ? 'Sign In →' : 'Create Account'}
            </button>
          </form>

          <!-- DEMO PRESETS -->
          <div class="demo-credentials-box">
            <div class="title">
              <span>Quick Demo Accounts</span>
              <span class="badge badge-neutral">1-Click</span>
            </div>
            <div class="demo-btn-group">
              <button class="demo-btn" type="button" onclick="window.fillDemoCredentials('hr')">
                👑 HR Manager
              </button>
              <button class="demo-btn" type="button" onclick="window.fillDemoCredentials('employee')">
                👩‍💻 Nisha (Engineer)
              </button>
            </div>
          </div>

          <div class="auth-footer">
            ${authMode === 'signin' ? `
              Don't have an account? <a href="javascript:void(0)" onclick="window.setAuthMode('signup')">Sign up</a>
            ` : `
              Already have an account? <a href="javascript:void(0)" onclick="window.setAuthMode('signin')">Sign in</a>
            `}
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 11. GLOBAL EVENT HANDLERS & ACTIONS
  // =========================================================================

  window.setAuthMode = function (mode) {
    authMode = mode;
    renderApp();
  };

  window.fillDemoCredentials = function (preset) {
    const emailEl = document.getElementById('auth-email-input');
    const pwdEl = document.getElementById('auth-password-input');
    if (preset === 'hr') {
      if (emailEl) emailEl.value = 'hr@dayflow.local';
      if (pwdEl) pwdEl.value = 'Dayflow@123';
    } else {
      if (emailEl) emailEl.value = 'nisha@dayflow.local';
      if (pwdEl) pwdEl.value = 'Dayflow@123';
    }
  };

  window.handleAuthSubmit = function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const email = fd.get('email');
    const role = fd.get('role') || (email.includes('hr') ? 'HR / Admin' : 'Employee');
    const name = fd.get('name') || (email.includes('hr') ? 'Aditi Sharma' : 'Nisha Verma');
    const employeeId = email.includes('hr') ? 'EMP-001' : 'EMP-002';

    saveSession({
      authenticated: true,
      role,
      employeeId,
      email,
      name
    });

    showToast('success', `Welcome back, ${name}!`);
    renderApp();
  };

  window.logout = function () {
    saveSession(null);
    showToast('success', 'You have been signed out.');
    renderApp();
  };

  window.toggleRole = function () {
    if (!session) return;
    const newRole = session.role === 'HR / Admin' ? 'Employee' : 'HR / Admin';
    session.role = newRole;
    session.employeeId = newRole === 'HR / Admin' ? 'EMP-001' : 'EMP-002';
    saveSession(session);
    showToast('success', `Switched mode to ${newRole}`);
    window.location.hash = '#dashboard';
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
    wizardStep = step;
    renderApp();
  };

  window.finalizePayroll = function () {
    store.data.payroll_entries.unshift({
      name: `PAY-2026-08`,
      posting_date: '2026-08-31',
      start_date: '2026-08-01',
      end_date: '2026-08-31',
      payroll_frequency: 'Monthly',
      company: 'Dayflow Technologies',
      number_of_employees: 5,
      status: 'Submitted',
      total_amount: 585000
    });
    store.save();
    showToast('success', 'August 2026 Payroll Entry generated and published!');
    wizardStep = 3;
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

  window.quickApproveLeave = function (id) {
    const item = store.data.leave_applications.find(l => l.name === id);
    if (item) {
      item.status = 'Approved';
      store.save();
      showToast('success', `Approved leave request for ${item.employee_name}`);
      renderApp();
    }
  };

  window.quickRejectLeave = function (id) {
    const item = store.data.leave_applications.find(l => l.name === id);
    if (item) {
      item.status = 'Rejected';
      store.save();
      showToast('danger', `Rejected leave request for ${item.employee_name}`);
      renderApp();
    }
  };

  window.quickApproveExpense = function (id) {
    const item = store.data.expense_claims.find(e => e.name === id);
    if (item) {
      item.approval_status = 'Approved';
      item.total_sanctioned_amount = item.total_claimed_amount;
      store.save();
      showToast('success', `Approved expense claim ${id}`);
      renderApp();
    }
  };

  window.quickRejectExpense = function (id) {
    const item = store.data.expense_claims.find(e => e.name === id);
    if (item) {
      item.approval_status = 'Rejected';
      store.save();
      showToast('danger', `Rejected expense claim ${id}`);
      renderApp();
    }
  };

  window.quickApproveShift = function (id) {
    const item = store.data.shift_requests.find(s => s.name === id);
    if (item) {
      item.status = 'Approved';
      // Update employee shift
      const emp = store.data.employees.find(e => e.name === item.employee);
      if (emp) emp.shift = item.shift_type;
      store.save();
      showToast('success', `Approved shift request for ${item.employee_name}`);
      renderApp();
    }
  };

  window.quickRejectShift = function (id) {
    const item = store.data.shift_requests.find(s => s.name === id);
    if (item) {
      item.status = 'Rejected';
      store.save();
      showToast('danger', `Rejected shift request for ${item.employee_name}`);
      renderApp();
    }
  };

  window.markAllNotificationsRead = function () {
    const emp = getActiveEmployee();
    store.data.notifications.forEach(n => {
      if (n.user === emp.name || session.role === 'HR / Admin') n.read = 1;
    });
    store.save();
    showToast('success', 'All notifications marked as read.');
    renderApp();
  };

  window.resetDataStore = function () {
    store.reset();
    showToast('success', 'Database reset to default pre-seeded state.');
    renderApp();
  };

  window.handleCreateEmployee = function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const firstName = fd.get('first_name');
    const lastName = fd.get('last_name');
    const fullName = `${firstName} ${lastName}`.trim();
    const count = store.data.employees.length + 1;
    const newId = `EMP-${String(count).padStart(3, '0')}`;

    const newEmp = {
      name: newId,
      employee_name: fullName,
      first_name: firstName,
      last_name: lastName,
      gender: fd.get('gender') || 'Male',
      date_of_birth: fd.get('date_of_birth') || '1996-01-01',
      date_of_joining: fd.get('date_of_joining') || '2026-09-01',
      status: 'Active',
      department: fd.get('department'),
      designation: fd.get('designation'),
      company: 'Dayflow Technologies',
      company_email: fd.get('company_email'),
      cell_phone: fd.get('cell_phone') || '+91 98000 00000',
      reports_to: 'EMP-001',
      leave_approver: 'EMP-001',
      shift: fd.get('shift') || 'General Shift'
    };

    store.data.employees.push(newEmp);
    store.data.leave_allocations[newId] = { 'Casual Leave': 12, 'Sick Leave': 10, 'Earned Leave': 15 };
    store.save();

    showToast('success', `Employee ${fullName} (${newId}) onboarded successfully!`);
    window.location.hash = `#employee/${newId}`;
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
            <button class="icon-btn" onclick="window.closeModal()">✕</button>
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
                  <input type="date" class="form-control" name="from_date" required value="2026-08-25">
                </div>
                <div class="form-group">
                  <label class="form-label">To Date <span class="required">*</span></label>
                  <input type="date" class="form-control" name="to_date" required value="2026-08-26">
                </div>
              </div>
              <div class="form-group" style="margin-top: 14px;">
                <label class="form-label">Reason / Notes</label>
                <textarea class="form-control" name="description" placeholder="Briefly describe the reason for taking leave..."></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">✓ Submit Application</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  window.submitApplyLeave = function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const emp = getActiveEmployee();
    const from = fd.get('from_date');
    const to = fd.get('to_date');
    const d1 = new Date(from);
    const d2 = new Date(to);
    const days = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)) + 1);

    store.data.leave_applications.unshift({
      name: `LEAVE-${Date.now()}`,
      employee: emp.name,
      employee_name: emp.employee_name,
      leave_type: fd.get('leave_type'),
      from_date: from,
      to_date: to,
      total_leave_days: days,
      status: 'Open',
      description: fd.get('description'),
      posting_date: new Date().toISOString().split('T')[0],
      leave_approver: 'EMP-001'
    });
    store.save();
    closeModal();
    showToast('success', `Leave application for ${days} days submitted to HR for approval.`);
    renderApp();
  };

  window.openNewExpenseModal = function () {
    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">New Expense Reimbursement Claim</div>
            <button class="icon-btn" onclick="window.closeModal()">✕</button>
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
                <input type="date" class="form-control" name="date" required value="2026-08-22">
              </div>
              <div class="form-group" style="margin-top: 14px;">
                <label class="form-label">Description & Justification</label>
                <textarea class="form-control" name="description" placeholder="Client meeting travel expenses, broadband receipt, etc."></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">✓ Submit Claim</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  window.submitExpenseClaim = function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const emp = getActiveEmployee();
    const amt = parseFloat(fd.get('amount') || 0);

    store.data.expense_claims.unshift({
      name: `EXP-${Date.now()}`,
      employee: emp.name,
      employee_name: emp.employee_name,
      expense_type: fd.get('expense_type'),
      total_claimed_amount: amt,
      total_sanctioned_amount: 0,
      status: 'Draft',
      approval_status: 'Draft',
      posting_date: fd.get('date'),
      description: fd.get('description'),
      expense_approver: 'EMP-001'
    });
    store.save();
    closeModal();
    showToast('success', `Expense claim of ${formatCurrency(amt)} submitted for HR review.`);
    renderApp();
  };

  window.openRequestShiftModal = function () {
    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Request Shift Change</div>
            <button class="icon-btn" onclick="window.closeModal()">✕</button>
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
                  <input type="date" class="form-control" name="from_date" required value="2026-09-01">
                </div>
                <div class="form-group">
                  <label class="form-label">To Date <span class="required">*</span></label>
                  <input type="date" class="form-control" name="to_date" required value="2026-09-30">
                </div>
              </div>
              <div class="form-group" style="margin-top: 14px;">
                <label class="form-label">Reason</label>
                <textarea class="form-control" name="reason" placeholder="Explain the scheduling requirement..."></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">✓ Submit Shift Request</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  window.submitShiftRequest = function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const emp = getActiveEmployee();

    store.data.shift_requests.unshift({
      name: `SR-${Date.now()}`,
      employee: emp.name,
      employee_name: emp.employee_name,
      shift_type: fd.get('shift_type'),
      from_date: fd.get('from_date'),
      to_date: fd.get('to_date'),
      status: 'Draft',
      reason: fd.get('reason')
    });
    store.save();
    closeModal();
    showToast('success', 'Shift schedule request submitted to HR.');
    renderApp();
  };

  window.openCreateJobOpeningModal = function () {
    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Create Job Opening Requisition</div>
            <button class="icon-btn" onclick="window.closeModal()">✕</button>
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
              <button type="submit" class="btn btn-primary">✓ Publish Opening</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  window.submitCreateJobOpening = function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    store.data.job_openings.unshift({
      name: `JOB-${Date.now()}`,
      job_title: fd.get('job_title'),
      department: fd.get('department'),
      vacancies: parseInt(fd.get('vacancies') || '1', 10),
      status: 'Open',
      posted_date: new Date().toISOString().split('T')[0],
      description: fd.get('description')
    });
    store.save();
    closeModal();
    showToast('success', 'Job opening published to career board.');
    renderApp();
  };

  window.openAddApplicantModal = function () {
    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Add Job Candidate / Applicant</div>
            <button class="icon-btn" onclick="window.closeModal()">✕</button>
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
                    <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value="4" selected>⭐⭐⭐⭐ (4/5)</option>
                    <option value="3">⭐⭐⭐ (3/5)</option>
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
              <button type="submit" class="btn btn-primary">✓ Add to Pipeline</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  window.submitAddApplicant = function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const jobKey = fd.get('job_opening');
    const jobObj = store.data.job_openings.find(j => j.name === jobKey);

    store.data.job_applicants.unshift({
      name: `APP-${Date.now()}`,
      applicant_name: fd.get('applicant_name'),
      email: fd.get('email'),
      phone: '+91 98000 11111',
      job_title: jobObj?.job_title || 'Software Engineer',
      job_opening: jobKey,
      status: 'Open',
      application_date: new Date().toISOString().split('T')[0],
      source: fd.get('source') || 'Direct',
      rating: parseInt(fd.get('rating') || '4', 10),
      notes: 'Initial profile candidate created in pipeline.'
    });
    store.save();
    closeModal();
    showToast('success', 'Candidate added to Open column.');
    renderApp();
  };

  window.openApplicantDetailsModal = function (appId) {
    const app = store.data.job_applicants.find(a => a.name === appId);
    if (!app) return;

    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">${escapeHtml(app.applicant_name)}</div>
            <button class="icon-btn" onclick="window.closeModal()">✕</button>
          </div>
          <div class="modal-body" style="font-size: 13px; display: flex; flex-direction: column; gap: 12px;">
            <div><span style="color: var(--text-muted);">Applied Role:</span> <strong>${escapeHtml(app.job_title)}</strong></div>
            <div><span style="color: var(--text-muted);">Email:</span> <strong>${escapeHtml(app.email)}</strong></div>
            <div><span style="color: var(--text-muted);">Source & Date:</span> <strong>${escapeHtml(app.source)} &middot; ${formatDate(app.application_date)}</strong></div>
            <div><span style="color: var(--text-muted);">Rating:</span> <strong>⭐ ${app.rating || 0}/5</strong></div>
            
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

  window.updateApplicantStage = function (appId, newStage) {
    const app = store.data.job_applicants.find(a => a.name === appId);
    if (app) {
      app.status = newStage;
      store.save();
      showToast('success', `Moved ${app.applicant_name} to ${newStage}`);
      closeModal();
      renderApp();
    }
  };

  window.openScheduleInterviewModal = function () {
    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Schedule Candidate Interview</div>
            <button class="icon-btn" onclick="window.closeModal()">✕</button>
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
                  <input type="date" class="form-control" name="scheduled_date" required value="2026-08-26">
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
              <button type="submit" class="btn btn-primary">✓ Schedule Interview</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  window.submitScheduleInterview = function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const appKey = fd.get('applicant');
    const appObj = store.data.job_applicants.find(a => a.name === appKey);

    store.data.interviews.unshift({
      name: `INT-${Date.now()}`,
      applicant: appKey,
      applicant_name: appObj?.applicant_name || 'Candidate',
      job_title: appObj?.job_title || 'Role',
      scheduled_date: fd.get('scheduled_date'),
      from_time: '15:00',
      to_time: '16:00',
      interviewer: fd.get('interviewer'),
      status: 'Scheduled',
      rating: 0,
      notes: 'Technical evaluation round.'
    });
    store.save();
    closeModal();
    showToast('success', 'Interview scheduled and calendar invite dispatched.');
    renderApp();
  };

  window.openOnboardingChecklistModal = function (onbId) {
    const onb = store.data.onboarding_records.find(o => o.name === onbId);
    if (!onb) return;

    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Onboarding Induction Checklist &middot; ${escapeHtml(onb.employee_name)}</div>
            <button class="icon-btn" onclick="window.closeModal()">✕</button>
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

  window.toggleOnboardingActivity = function (onbId, index) {
    const onb = store.data.onboarding_records.find(o => o.name === onbId);
    if (onb && onb.activities && onb.activities[index]) {
      onb.activities[index].completed = onb.activities[index].completed ? 0 : 1;
      const allDone = onb.activities.every(a => a.completed);
      onb.boarding_status = allDone ? 'Completed' : 'In Progress';
      store.save();
      renderModal();
      renderApp();
    }
  };

  window.openPostAnnouncementModal = function () {
    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Post Company Announcement</div>
            <button class="icon-btn" onclick="window.closeModal()">✕</button>
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
              <button type="submit" class="btn btn-primary">✓ Publish Announcement</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  window.submitPostAnnouncement = function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const emp = getActiveEmployee();

    store.data.announcements.unshift({
      name: `ANN-${Date.now()}`,
      subject: fd.get('subject'),
      description: fd.get('description'),
      posted_by: `${emp.employee_name} (HR)`,
      creation: new Date().toISOString().replace('T', ' ').substring(0, 19)
    });
    store.save();
    closeModal();
    showToast('success', 'Announcement published to entire organization feed.');
    renderApp();
  };

  window.openEditProfileModal = function () {
    const emp = getActiveEmployee();
    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Update Contact & Residential Info</div>
            <button class="icon-btn" onclick="window.closeModal()">✕</button>
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
              <button type="submit" class="btn btn-primary">✓ Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  window.submitEditProfile = function (e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const emp = getActiveEmployee();
    emp.personal_email = fd.get('personal_email');
    emp.cell_phone = fd.get('cell_phone');
    emp.current_address = fd.get('current_address');
    emp.person_to_be_contacted = fd.get('person_to_be_contacted');
    emp.emergency_phone_number = fd.get('emergency_phone_number');
    store.save();
    closeModal();
    showToast('success', 'Profile contact details updated successfully.');
    renderApp();
  };

  window.openEditEmployeeModal = function (empId) {
    const emp = store.data.employees.find(e => e.name === empId);
    if (!emp) return;

    openModal(() => `
      <div class="modal-overlay" onclick="if(event.target===this) window.closeModal()">
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">Edit Employee &middot; ${escapeHtml(emp.name)}</div>
            <button class="icon-btn" onclick="window.closeModal()">✕</button>
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
              <button type="submit" class="btn btn-primary">✓ Update Record</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  window.submitEditEmployee = function (e, empId) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const emp = store.data.employees.find(e => e.name === empId);
    if (emp) {
      emp.employee_name = fd.get('employee_name');
      emp.status = fd.get('status');
      emp.department = fd.get('department');
      emp.designation = fd.get('designation');
      emp.cell_phone = fd.get('cell_phone');
      emp.shift = fd.get('shift');
      store.save();
      closeModal();
      showToast('success', `Employee ${emp.name} updated successfully.`);
      renderApp();
    }
  };

  // =========================================================================
  // 13. BOOTSTRAP INITIALIZATION
  // =========================================================================

  function bindPageEvents() {
    // Re-bind modal close on escape key
    document.onkeydown = function (e) {
      if (e.key === 'Escape' && activeModal) {
        closeModal();
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
