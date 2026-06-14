# Decision Log

## D001 - PostgreSQL

### Alternatives

* MySQL
* SQLite
* PostgreSQL

### Decision

PostgreSQL

### Reason

Strong relational support and well suited for complex joins required for balances, memberships, settlements, and import processing.


## D002 - Membership Timeline Tracking

### Problem

Group membership changes over time.

### Decision

Store joined_at and left_at dates.

### Reason

A user should only participate in expenses that occur during their membership period.

### Example

Meera leaves in March.

Expenses from April onward should not affect her balance.

## D003 - JWT Authentication

### Alternatives

1. Session Authentication
2. JWT Authentication

### Decision

JWT Authentication

### Reason

Simple implementation suitable for SPA frontend and REST API architecture.

### Tradeoff

Requires token management on client side.

## D004 - Membership Records Are Never Deleted

### Alternatives

1. Delete membership rows
2. Preserve membership history

### Decision

Preserve membership history.

### Reason

Historical expense calculations require knowledge of who belonged to the group at a specific date.


## D005 - Ledger Based Balance Calculation

### Alternatives

1. Store running balances
2. Recalculate balances from transactions

### Decision

Recalculate from transactions.

### Reason

Balances remain consistent and auditable.

Every balance can be traced back to underlying expenses.

## D006 - Debt Simplification

### Problem

Raw balances are difficult for users to interpret.

### Decision

Convert balances into a minimal set of settlement recommendations.

### Example

Instead of:

Aisha +3000
Rohan -1000
Priya -2000

Show:

Rohan → Aisha ₹1000

Priya → Aisha ₹2000

### Benefit

Provides a simple actionable settlement plan.

## D007 - Import Anomalies Are Stored

Options Considered:

1. Generate report in memory only
2. Persist anomalies in database

Decision:
Persist anomalies in database.

Reason:
Supports auditability, approval workflow, and interview traceability.

---

## D008 - Duplicates Require Approval

Options Considered:

1. Automatically remove duplicates
2. Require approval

Decision:
Require approval.

Reason:
Matches Meera's requirement that changes must be reviewed.

---

## D009 - Settlement Rows Are Converted

Options Considered:

1. Import as expenses
2. Convert to settlements

Decision:
Convert to settlements.

Reason:
Settlement payments should not affect expense totals.

---

## D0010 - Date Normalization

Options Considered:

1. Reject non-standard dates
2. Normalize dates

Decision:
Normalize dates.

Reason:
Preserves historical data while maintaining consistency.

---

## D0011 - Name Normalization

Options Considered:

1. Reject inconsistent names
2. Normalize casing

Decision:
Normalize casing.

Reason:
Common user-entry issue that can be safely corrected.

---

## D0012 - Unknown User Aliases

Options Considered:

1. Automatically merge aliases
2. Manual review

Decision:
Manual review.

Reason:
Avoids accidental merging of different users.

---

## D0013 - Refund Handling

Options Considered:

1. Reject negative amounts
2. Treat as refunds

Decision:
Treat as refunds.

Reason:
Negative amounts appear to represent legitimate refunds in the source data.

---

## D0014 - Currency Handling

Options Considered:

1. Reject USD expenses
2. Convert USD to INR

Decision:
Convert during import.

Reason:
CSV contains legitimate trip expenses recorded in USD.

## D0015 - Raw CSV Rows Are Stored

Options Considered:

1. Parse and discard CSV
2. Store original rows

Decision:

Store original rows in import_rows.

Reason:

Allows reprocessing, debugging, auditing, and anomaly review without requiring another upload.

---

## D016 - JSONB Used For Raw Rows

Options Considered:

1. Store each CSV column separately
2. Store raw row as JSONB

Decision:

Store as JSONB.

Reason:

CSV structure may evolve and JSONB preserves the original source format.

---

## D017 - Normalization Before Import

Options Considered:

1. Normalize during upload
2. Normalize during execution

Decision:

Normalize during execution.

Reason:

Preserves original source data and allows import rules to evolve without requiring re-upload.

---

## D018 - Alias Mapping

Options Considered:

1. Treat aliases as separate users
2. Normalize known aliases

Decision:

Normalize known aliases.

Example:

Priya S → Priya

Reason:

Evidence suggests the alias refers to the same person.

---

## D019 - ISO Date Standardization

Options Considered:

1. Preserve original date formats
2. Convert all dates to ISO

Decision:

Convert to ISO format.

Reason:

Ensures consistent querying and database storage.

---

## D020 - Import Execution Is Re-runnable

Options Considered:

1. Depend on uploaded CSV file
2. Depend on stored import_rows

Decision:

Depend on import_rows.

Reason:

Allows execution even if uploaded files are removed from disk.

## D021 - Membership Validation

Decision:
Participants are included only if they were active members on the expense date.

Reason:
Prevents charging users for expenses before they joined or after they left the group.