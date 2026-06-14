CREATE TABLE expense_participants (

    id UUID PRIMARY KEY,

    expense_id UUID NOT NULL,

    user_id UUID NOT NULL,

    share_amount NUMERIC(12,2),

    share_percentage NUMERIC(5,2),

    share_units NUMERIC(10,2),

    CONSTRAINT fk_expense
        FOREIGN KEY(expense_id)
        REFERENCES expenses(id),

    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
);