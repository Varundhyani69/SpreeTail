ALTER TABLE groups
ADD CONSTRAINT fk_group_creator
FOREIGN KEY (created_by)
REFERENCES users(id);