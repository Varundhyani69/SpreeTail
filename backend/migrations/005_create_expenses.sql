CREATE TABLE expenses (

    id UUID PRIMARY KEY,
    group_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    paid_by UUID NOT NULL,
    expense_date DATE NOT NULL,
    split_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT fk_expense_group
        FOREIGN KEY(group_id)
        REFERENCES groups(id),

    CONSTRAINT fk_expense_payer
        FOREIGN KEY(paid_by)
        REFERENCES users(id)
);