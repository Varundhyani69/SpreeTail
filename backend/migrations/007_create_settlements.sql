CREATE TABLE settlements (

    id UUID PRIMARY KEY,

    group_id UUID NOT NULL,

    payer_id UUID NOT NULL,

    receiver_id UUID NOT NULL,

    amount NUMERIC(12,2) NOT NULL,

    settlement_date DATE NOT NULL,

    notes TEXT,

    created_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_group
      FOREIGN KEY(group_id)
      REFERENCES groups(id),

    CONSTRAINT fk_payer
      FOREIGN KEY(payer_id)
      REFERENCES users(id),

    CONSTRAINT fk_receiver
      FOREIGN KEY(receiver_id)
      REFERENCES users(id)
);