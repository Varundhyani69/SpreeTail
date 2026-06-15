# SpreeTail – Shared Expense Tracker

## Overview

SpreeTail is a full-stack shared expense management application inspired by Splitwise. It allows users to create groups, manage expenses, calculate balances, record settlements, and import historical transactions through CSV files with anomaly detection and validation.

The application was developed as part of the Shared Expense Tracker assignment.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### Group Management

* Create Groups
* View User Groups
* Add Members to Groups
* View Group Members
* Leave Group

### Expense Management

* Add Expenses
* Equal Split
* Percentage Split
* Exact Split
* Shares Split
* Expense History

### Balance Calculation

* Net Balance Calculation
* Settlement Summary Generation
* Debt Simplification

### Settlement Tracking

* Record Settlements
* Email-based User Lookup
* Settlement History

### CSV Import System

* Upload CSV Files
* Parse Historical Expenses
* Detect Data Anomalies
* Review Import Report
* Approve / Skip / Reject Anomalies
* Execute Import
* Download Import Report

### Import Validation

* Invalid Member Detection
* Invalid Split Validation
* Percentage Validation
* Unequal Split Validation
* Currency Normalization
* Date Normalization

---

## Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* PostgreSQL
* JWT
* Multer
* CSV Parser

### Database

* PostgreSQL (Neon / Local PostgreSQL)

---

## Project Structure

backend/

* src/

  * controllers/
  * routes/
  * services/
  * middleware/
  * config/
  * migrations/

frontend/

* src/

  * pages/
  * components/
  * api/

---

## Environment Variables

### Backend (.env)

```env
PORT=5000

DATABASE_URL=postgresql://username:password@host/database

JWT_SECRET=your_secret_key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

Production:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd SpreeTail
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create .env file.

Run migrations.

```bash
node src/server.js
```

Backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## CSV Import Workflow

1. Select a Group
2. Upload CSV File
3. System Parses CSV
4. Detects Anomalies
5. Generates Import Report
6. Review Anomalies
7. Approve / Skip / Reject Issues
8. Execute Import
9. Expenses and Settlements are created
10. Download Final Report

---

## Import Report

The generated report includes:

* Import Status
* Total Rows Processed
* Imported Expenses
* Imported Settlements
* Skipped Rows
* Detected Anomalies
* Action Taken
* Resolution Status

Reports can be downloaded as JSON files.

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Groups

```http
GET    /api/groups
POST   /api/groups
POST   /api/groups/:groupId/members
GET    /api/groups/:groupId/members
PATCH  /api/groups/:groupId/members/:userId/leave
```

### Expenses

```http
GET    /api/groups/:groupId/expenses
POST   /api/groups/:groupId/expenses
```

### Balances

```http
GET /api/groups/:groupId/balances
GET /api/groups/:groupId/balances/summary
```

### Settlements

```http
POST /api/groups/:groupId/settlements
```

### Imports

```http
POST  /api/groups/:groupId/imports
GET   /api/groups/:groupId/imports/:importId/report
PATCH /api/groups/:groupId/imports/anomalies/:id
POST  /api/groups/:groupId/imports/:importId/execute
```

---

## AI Assistance Used

The following AI tools were used during development:

### ChatGPT (OpenAI)

Used for:

* Architecture planning
* Database schema design
* PostgreSQL query optimization
* React component development
* Express route implementation
* CSV import workflow design
* Debugging and troubleshooting
* Code reviews
* Deployment guidance

AI-generated suggestions were reviewed, modified, tested, and integrated by the developer before use.

---

## Future Enhancements

* Expense Editing
* Expense Deletion
* Settlement History UI
* Email Notifications
* PDF Report Export
* Advanced Analytics Dashboard
* Real-Time Updates

---

## Author

Varun Dhyani

B.Tech Computer Science Engineering

Shared Expense Tracker Assignment Submission
