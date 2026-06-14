CREATE TABLE imports (
    id UUID PRIMARY KEY,
    filename TEXT NOT NULL,
    uploaded_by UUID NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);