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
