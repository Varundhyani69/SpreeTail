# Database Schema

## users

Purpose:
Stores registered users.

Columns:

* id
* name
* email
* password_hash
* created_at

## groups

Purpose:
Stores expense groups.

Columns:

* id
* name
* created_by
* created_at

## group_memberships

Purpose:
Tracks membership history.

Columns:
- group_id
- user_id
- joined_at
- left_at

Reason:
Allows historical expense calculations when members join or leave.

## users

Authentication enabled.

Responsibilities:

* User identity
* Login
* Authorization
* Group ownership

## Relationship Constraints

groups.created_by -> users.id

group_memberships.group_id -> groups.id

group_memberships.user_id -> users.id

Purpose:
Prevent orphan records and maintain referential integrity.

## group_memberships

Purpose:
Tracks when a user joins and leaves a group.

Key Business Rule:

Users should only be affected by expenses that occur during their membership period.

Examples:

Meera leaves on March 31.

Expenses after March 31 should not affect her balance.

Sam joins on April 15.

Expenses before April 15 should not affect his balance.

## expenses

Stores all shared expenses.

Fields:
- title
- amount
- currency
- paid_by
- expense_date
- split_type

## expense_participants

Stores each participant's share.

Supports:
- Equal Split
- Percentage Split
- Exact Amount Split
- Shares Split

## Balance Engine

Balances are calculated using a ledger approach.

For each expense:

1. Payer receives full credit.
2. Participants receive debt equal to their share.
3. Net balance is computed as:

balance = credits - obligations

## settlements

Stores payments made between members.

Purpose:

Reduce outstanding balances without altering historical expenses.

## CSV Import Analysis

### Implemented Features

* CSV upload endpoint
* CSV parsing using csv-parser
* Import tracking system
* Import anomaly tracking system
* Import report generation
* Anomaly approval workflow

### Import Workflow

1. User uploads CSV file
2. CSV rows are parsed
3. Anomaly detection engine runs
4. Import record is created
5. Anomalies are stored
6. Import report is generated
7. User reviews anomalies
8. User approves anomaly resolutions

### Anomalies Detected

#### DUPLICATE_EXPENSE

Policy:

* Flag for manual approval
* Do not automatically delete

Example:

* Dinner at Marina Bites
* dinner - marina bites

#### MISSING_PAYER

Policy:

* Flag for manual review
* Row cannot be imported automatically

Example:

* House cleaning supplies

#### NAME_INCONSISTENCY

Policy:

* Normalize casing during import

Examples:

* priya → Priya
* rohan → Rohan

#### UNKNOWN_OR_ALIAS_USER

Policy:

* Manual review required

Example:

* Priya S

#### SETTLEMENT_ROW

Policy:

* Convert to settlement transaction
* Do not import as expense

Example:

* Rohan paid Aisha back

#### MISSING_SPLIT_TYPE

Policy:

* Manual review required

#### INVALID_PERCENTAGE_TOTAL

Policy:

* Flag for review
* Percentages must total 100%

Example:

* 110%

#### USD_EXPENSE

Policy:

* Convert to INR during import
* Use documented conversion rate

#### AMOUNT_FORMAT

Policy:

* Remove commas and normalize

Example:

* 1,200 → 1200

#### PRECISION_ROUNDING

Policy:

* Round to two decimal places

Example:

* 899.995 → 900.00

#### NON_STANDARD_DATE

Policy:

* Normalize to ISO format

Example:

* 01/03/2026 → 2026-03-01

#### NEGATIVE_AMOUNT

Policy:

* Treat as refund transaction

Example:

* Parasailing refund

## Import Execution Pipeline

### Implemented Features

* Raw CSV row persistence
* Import execution service
* Import execution endpoint
* Data normalization layer
* Import processing workflow

### Import Execution Workflow

1. CSV uploaded
2. Rows parsed
3. Rows stored in import_rows
4. Anomalies detected
5. Anomalies stored
6. User reviews anomalies
7. User approves anomaly resolutions
8. Import execution begins
9. Rows normalized
10. Rows prepared for database import

### Raw Data Storage

CSV rows are stored in the import_rows table using JSONB.

Reason:

* Preserves original source data
* Supports auditing
* Allows reprocessing without requiring CSV re-upload

### Normalization Rules

#### Amount Normalization

Examples:

* "1,200" → 1200
* "899.995" → 899.995

Purpose:
Remove formatting artifacts before import.

---

#### Date Normalization

Examples:

* 01/03/2026 → 2026-03-01
* 03/03/2026 → 2026-03-03

Purpose:
Standardize all dates to ISO format.

---

#### User Normalization

Examples:

* priya → Priya
* rohan → Rohan

Purpose:
Prevent duplicate user identities caused by inconsistent casing.

---

#### Alias Resolution

Examples:

* Priya S → Priya

Purpose:
Normalize known aliases during import preparation.

### Current Import Scope

Currently supported during execution:

* Equal split rows
* Date normalization
* User normalization
* Amount normalization

Planned:

* Expense creation
* Participant creation
* Settlement conversion
* Currency conversion
* Membership validation
