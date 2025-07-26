// Kysely Database types for Planero D1 schema
// Generated from src/database/create.sql

import {Generated} from 'kysely';

// Table interfaces
export interface UserTable {
    id: string;
    name: string;
    email: string;
    gender: 'm' | 'f' | 'x';
    born_at: string | null;
    note: string | null;
    created_at: Generated<string>;
    updated_at: Generated<string>;
}

export interface FamilyTable {
    id: string;
    name: string;
    created_at: Generated<string>;
    updated_at: Generated<string>;
}

export interface UserToFamilyTable {
    id: string;
    user_id: string;
    family_id: string;
    role: 'adult' | 'child';
    created_at: Generated<string>;
    updated_at: Generated<string>;
}

export interface NoteTable {
    id: string;
    parent_id: string | null;
    content: string | null;
    family_id: string;
    author_id: string;
    created_at: Generated<string>;
    updated_at: Generated<string>;
    deleted_at: string | null;
}

// Database interface for Kysely
export interface Database {
    user: UserTable;
    family: FamilyTable;
    user_to_family: UserToFamilyTable;
    note: NoteTable;
}
