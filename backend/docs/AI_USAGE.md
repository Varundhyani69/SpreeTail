# AI Usage

## Tool Used

* ChatGPT

## Major AI-Assisted Tasks

* Database schema design
* Expense splitting logic
* Balance calculation logic
* CSV import architecture
* Anomaly detection design

## AI Mistakes and Corrections

### Case 1 - addMember Controller Design

AI Suggestion:
Implemented addMember as a database function inside the controller.

Problem:
Mixed controller and service responsibilities.

Correction:
Moved database logic into group.service.js and kept controller focused on request handling.

---

### Case 2 - Duplicate Detection

AI Suggestion:
Used raw description comparison.

Problem:
Failed to detect:

* Dinner at Marina Bites
* dinner - marina bites

Correction:
Added normalization by removing punctuation and common filler words.

---

### Case 3 - Balance Logic Structure

AI Suggestion:
Mixed service and controller responsibilities.

Problem:
Difficult to maintain and test.

Correction:
Separated business logic into balance.service.js and kept controllers thin.

## Verification Process

All generated code was manually reviewed, tested using Postman, and adjusted where necessary before being committed.

## Additional AI Review Cases

### Case 4 - Import Execution Design

AI Suggestion:

Perform CSV parsing and importing in a single workflow.

Problem:

Difficult to debug and impossible to re-run without the original file.

Correction:

Introduced import_rows table and separated upload from execution.

Result:

Imports became auditable and re-runnable.

---

### Case 5 - Data Normalization Timing

AI Suggestion:

Normalize data immediately during upload.

Problem:

Original source data would be lost.

Correction:

Store original rows and perform normalization during execution.

Result:

Import behavior became traceable and reversible.

---

### Case 6 - Import Architecture

AI Suggestion:

Create expenses immediately after anomaly detection.

Problem:

Violated approval workflow requirements.

Correction:

Separated workflow into:

Upload
→ Detect
→ Review
→ Approve
→ Execute

Result:

Matches assignment requirements and user approval expectations.
