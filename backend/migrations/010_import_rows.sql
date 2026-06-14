CREATE TABLE import_rows (
  id UUID PRIMARY KEY,

  import_id UUID NOT NULL,

  row_number INTEGER NOT NULL,

  raw_data JSONB NOT NULL,

  processed BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT NOW(),

  FOREIGN KEY(import_id)
  REFERENCES imports(id)
);