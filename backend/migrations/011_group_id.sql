ALTER TABLE imports
ADD COLUMN group_id UUID
REFERENCES groups(id);