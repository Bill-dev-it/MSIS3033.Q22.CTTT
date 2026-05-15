# Student Internship Management System (SIMS)

This is a demo web application for managing student internships, built for students, companies, lecturers, and system administrators.

## Overview

The application includes the following core features:

- Students:
  - View a personal dashboard
  - Browse internship listings
  - View job posting details
  - Manage submitted applications
- Companies:
  - View a company dashboard
  - Post internship opportunities
  - Manage applicant submissions
- Lecturers:
  - View a lecturer dashboard
  - Manage student and internship-related information
- Administrators:
  - Manage system users
  - View all internship postings

The app currently uses mock data and routes are structured based on user roles.

## Installation & Running

1. Open a terminal in the project folder:

```powershell
cd "c:\UIT\Nam 2\Quản lý dự án\Demo web"
```

2. Install dependencies:

```powershell
npm install
```

3. Run the development server:

```powershell
npm run dev
```

4. Open your browser and visit:

```text
http://localhost:5173
```

## Build

```powershell
npm run build
```

## Testing / Linting

If you add these commands to `package.json`, you can run:

```powershell
npm run lint
npm run test
```

## Project Structure

- `src/components` - shared UI components like `Layout`, `Navbar`, and `Sidebar`
- `src/pages` - pages organized by role: `Student`, `Company`, `Lecturer`, `Admin`, `Shared`
- `src/routes` - route definitions and access control
- `src/context` - global state management for authentication and data
- `src/data` - mock data used by the application

## Notes

This project currently uses mock data, so you can extend it later with a backend/API for real data persistence.
