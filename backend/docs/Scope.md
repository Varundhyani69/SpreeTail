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
