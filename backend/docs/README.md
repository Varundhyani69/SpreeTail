# Shared Expenses App

## Tech Stack

Frontend

* React
* TailwindCSS

Backend

* Node.js
* Express.js

Database

* PostgreSQL

## Progress

### Phase 1

* Backend project initialized
* Express server configured

### Database

- PostgreSQL database configured
- Connection verified

## Authentication

Implemented Features

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Authentication
* Protected API Routes

Endpoints

POST /api/auth/register

POST /api/auth/login

## Group Management

Implemented Features

* Create Groups
* List Groups
* Add Members
* View Members
* Member Join Dates
* Member Leave Dates

Membership history is preserved to support historical balance calculations.

## Expense Management

Implemented Features

* Create Expenses
* Equal Split Support
* Percentage Split Support
* Unequal Split Support
* Expense Participants Tracking

Supported Split Types

* Equal
* Percentage
* Unequal

---

## Balance Engine

Implemented Features

* Group Balance Calculation
* User Breakdown View
* Debt Simplification
* Settlement Recommendations

Endpoints

GET /api/groups/:groupId/balances

GET /api/groups/:groupId/balances/breakdown

GET /api/groups/:groupId/balances/summary

---

## CSV Import System

Implemented Features

* CSV Upload
* Import Tracking
* Import Reports
* Anomaly Detection
* Approval Workflow
* Import Execution
* Settlement Conversion
* Membership Validation
* Currency Conversion
* Import Statistics

Endpoints

POST /api/imports/upload

GET /api/imports/:importId

PATCH /api/import-anomalies/:id

POST /api/imports/:importId/execute

---

## Import Execution Results

Execution returns:

* Processed Rows
* Imported Expenses
* Imported Settlements
* Skipped Rows
* Total Anomalies

This allows users to verify import quality before using imported data.
