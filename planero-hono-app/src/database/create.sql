DROP TABLE IF EXISTS user_to_family;
DROP TABLE IF EXISTS note;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS family;

CREATE TABLE IF NOT EXISTS family
(
    id
    TEXT
    PRIMARY
    KEY,
    name
    TEXT
    NOT
    NULL,
    created_at
    DATETIME
    NOT
    NULL
    DEFAULT
    CURRENT_TIMESTAMP,
    updated_at
    DATETIME
    NOT
    NULL
    DEFAULT
    CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user
(
    id
    TEXT
    PRIMARY
    KEY,
    name
    TEXT
    NOT
    NULL,
    email
    TEXT
    NOT
    NULL,
    gender
    TEXT
    NOT
    NULL
    CHECK (
    gender
    IN
(
    'm',
    'f',
    'x'
)),
    born_at DATETIME,
    note TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS user_to_family
(
    id
    TEXT
    PRIMARY
    KEY,
    user_id
    TEXT
    NOT
    NULL,
    family_id
    TEXT
    NOT
    NULL,
    role
    TEXT
    NOT
    NULL
    CHECK (
    role
    IN
(
    'adult',
    'child'
)),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY
(
    user_id
) REFERENCES user
(
    id
) ON DELETE CASCADE,
    FOREIGN KEY
(
    family_id
) REFERENCES family
(
    id
)
  ON DELETE CASCADE,
    UNIQUE
(
    user_id,
    family_id
)
    );

CREATE TABLE IF NOT EXISTS note
(
    id
    TEXT
    PRIMARY
    KEY,
    parent_id
    TEXT,
    content
    TEXT,
    family_id
    TEXT
    NOT
    NULL,
    author_id
    TEXT
    NOT
    NULL,
    created_at
    DATETIME
    NOT
    NULL
    DEFAULT
    CURRENT_TIMESTAMP,
    updated_at
    DATETIME
    NOT
    NULL
    DEFAULT
    CURRENT_TIMESTAMP,
    deleted_at
    DATETIME,
    FOREIGN
    KEY
(
    parent_id
) REFERENCES note
(
    id
) ON DELETE SET NULL,
    FOREIGN KEY
(
    family_id
) REFERENCES family
(
    id
)
  ON DELETE CASCADE,
    FOREIGN KEY
(
    author_id
) REFERENCES user
(
    id
)
  ON DELETE CASCADE
    );

CREATE INDEX IF NOT EXISTS idx_user_email ON user (email);
CREATE INDEX IF NOT EXISTS idx_user_to_family_user_id ON user_to_family (user_id);
CREATE INDEX IF NOT EXISTS idx_user_to_family_family_id ON user_to_family (family_id);
CREATE INDEX IF NOT EXISTS idx_note_family_id ON note (family_id);
CREATE INDEX IF NOT EXISTS idx_note_author_id ON note (author_id);
CREATE INDEX IF NOT EXISTS idx_note_parent_id ON note (parent_id);

CREATE TRIGGER IF NOT EXISTS update_family_updated_at
AFTER
UPDATE ON family
    FOR EACH ROW
    WHEN NEW.updated_at = OLD.updated_at
BEGIN
UPDATE family
SET updated_at = CURRENT_TIMESTAMP
WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_user_updated_at
AFTER
UPDATE ON user
    FOR EACH ROW
    WHEN NEW.updated_at = OLD.updated_at
BEGIN
UPDATE user
SET updated_at = CURRENT_TIMESTAMP
WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_user_to_family_updated_at
AFTER
UPDATE ON user_to_family
    FOR EACH ROW
    WHEN NEW.updated_at = OLD.updated_at
BEGIN
UPDATE user_to_family
SET updated_at = CURRENT_TIMESTAMP
WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_note_updated_at
AFTER
UPDATE ON note
    FOR EACH ROW
    WHEN NEW.updated_at = OLD.updated_at
BEGIN
UPDATE note
SET updated_at = CURRENT_TIMESTAMP
WHERE id = NEW.id;
END;
