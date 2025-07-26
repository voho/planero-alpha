import {getDb, CustomContext} from "../../react-app/globals";
import {getLoggedUserFamilyIdOrFail} from "../assert";

type Params = {
    context: CustomContext
}

export const getNotes = async ({context}: Params) => {
    const db = getDb(context)
    const familyId = await getLoggedUserFamilyIdOrFail(context)

    // Get all notes for the family
    const notes = await db.selectFrom("note as n")
        .innerJoin("user as u", "u.id", "n.author_id")
        .select([
            "n.id",
            "n.parent_id",
            "n.content",
            "n.family_id",
            "n.author_id",
            "n.created_at",
            "n.updated_at",
            "n.deleted_at",
            "u.name as author_name"
        ])
        .where("n.family_id", "=", familyId)
        .where("n.deleted_at", "is", null)
        .orderBy("n.created_at", "desc")
        .execute()

    return notes.map(note => ({
        id: note.id,
        parentId: note.parent_id,
        content: note.content,
        familyId: note.family_id,
        authorId: note.author_id,
        authorName: note.author_name,
        createdAt: note.created_at,
        updatedAt: note.updated_at
    }))
};
