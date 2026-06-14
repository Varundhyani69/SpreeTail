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
