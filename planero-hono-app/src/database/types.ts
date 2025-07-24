// Kysely Database types for Planero D1 schema
// Generated from src/database/create.sql

import {Generated, Insertable, Selectable, Updateable} from 'kysely';

// Table interfaces
export interface UserTable {
    id: string;
    name: string;
    email: string;
    gender: 'M' | 'F' | 'X';
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
    role: string;
    created_at: Generated<string>;
    updated_at: Generated<string>;
}

// Database interface for Kysely
export interface Database {
    user: UserTable;
    family: FamilyTable;
    user_to_family: UserToFamilyTable;
}

// Helper types for CRUD operations
export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export type Family = Selectable<FamilyTable>;
export type NewFamily = Insertable<FamilyTable>;
export type FamilyUpdate = Updateable<FamilyTable>;

export type UserToFamily = Selectable<UserToFamilyTable>;
export type NewUserToFamily = Insertable<UserToFamilyTable>;
export type UserToFamilyUpdate = Updateable<UserToFamilyTable>;