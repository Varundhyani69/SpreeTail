ALTER TABLE imports
ADD COLUMN processed_rows INT DEFAULT 0;

ALTER TABLE imports
ADD COLUMN imported_expenses INT DEFAULT 0;

ALTER TABLE imports
ADD COLUMN imported_settlements INT DEFAULT 0;

ALTER TABLE imports
ADD COLUMN skipped_rows INT DEFAULT 0;