ALTER TABLE import_anomalies
ADD COLUMN action_taken VARCHAR(50);

ALTER TABLE import_anomalies
ADD COLUMN resolved_at TIMESTAMP;