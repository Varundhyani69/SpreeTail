CREATE TABLE group_memberships (

    id UUID PRIMARY KEY,
    group_id UUID NOT NULL,
    user_id UUID NOT NULL,
    joined_at DATE NOT NULL,
    left_at DATE,

    CONSTRAINT fk_group
      FOREIGN KEY(group_id)
      REFERENCES groups(id),

    CONSTRAINT fk_user
      FOREIGN KEY(user_id)
      REFERENCES users(id),

    UNIQUE(group_id, user_id)
);