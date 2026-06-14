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