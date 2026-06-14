CREATE TABLE import_anomalies (
    id UUID PRIMARY KEY,
    import_id UUID NOT NULL,
    row_number INTEGER,
    anomaly_type VARCHAR(100),
    description TEXT,
    suggested_action TEXT,
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),

    FOREIGN KEY(import_id)
    REFERENCES imports(id)
);