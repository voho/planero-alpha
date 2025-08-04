-- Migration number: 0004 	 2025-08-04T14:17:35.747Z

-- DROP ALL TABLES (včetně note, ale bez jejího obnovení)
DROP TABLE IF EXISTS user_to_family;
DROP TABLE IF EXISTS note;
DROP TABLE IF EXISTS family;
DROP TABLE IF EXISTS user;

-- CREATE user table
CREATE TABLE user
(
    id TEXT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE, -- nullable + unique
    gender TEXT NOT NULL CHECK (gender IN ('m', 'f', 'x')),
    born_at DATETIME,
    note TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    interests TEXT,
    personality TEXT,
    body TEXT,
    food TEXT,
    culture TEXT,
    updated_by TEXT REFERENCES user (id),
    created_by TEXT REFERENCES user (id),
    clerk_id TEXT
);

-- Indexy na user
CREATE UNIQUE INDEX idx_user_email_unique ON user (email) WHERE email IS NOT NULL;

CREATE UNIQUE INDEX idx_user_clerk_id_unique ON user (clerk_id) WHERE clerk_id IS NOT NULL;

-- CREATE family table
CREATE TABLE family
(
    id TEXT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by TEXT REFERENCES user (id),
    created_by TEXT REFERENCES user (id)
);

-- CREATE user_to_family table
CREATE TABLE user_to_family
(
    id TEXT NOT NULL PRIMARY KEY,
    user_id TEXT NOT NULL,
    family_id TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('adult', 'child')),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by TEXT REFERENCES user (id),
    created_by TEXT REFERENCES user (id),
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
    FOREIGN KEY (family_id) REFERENCES family (id) ON DELETE CASCADE,
    UNIQUE (user_id, family_id, role)
);

-- Indexy na user_to_family
CREATE INDEX idx_user_to_family_user_id ON user_to_family (user_id);
CREATE INDEX idx_user_to_family_family_id ON user_to_family (family_id);
