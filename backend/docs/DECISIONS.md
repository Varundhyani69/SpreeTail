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
