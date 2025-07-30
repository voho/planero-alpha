-- Migration number: 0002 	 2025-07-30T18:35:33.392Z

ALTER TABLE user
ADD COLUMN updated_by TEXT references user (id);

ALTER TABLE user
ADD COLUMN created_by TEXT references user (id);

ALTER TABLE family
ADD COLUMN updated_by TEXT references user (id);

ALTER TABLE family
ADD COLUMN created_by TEXT references user (id);

ALTER TABLE user_to_family
ADD COLUMN updated_by TEXT references user (id);

ALTER TABLE user_to_family
ADD COLUMN created_by TEXT references user (id);