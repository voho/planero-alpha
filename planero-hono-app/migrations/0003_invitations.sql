-- Migration number: 0003 	 2025-08-03T20:05:10.478Z

ALTER TABLE user
ADD COLUMN clerk_id TEXT;

CREATE UNIQUE INDEX idx_user_clerk_id_unique
    ON user (clerk_id) WHERE clerk_id IS NOT NULL;
