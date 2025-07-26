import {getDb, CustomContext} from "../../react-app/globals";
import {getLoggedUserFamilyIdOrFail} from "../assert";

type Params = {
    context: CustomContext;
    noteId: string;
}

export const deleteNote = async ({context, noteId}: Params) => {
    const db = getDb(context)
    const familyId = await getLoggedUserFamilyIdOrFail(context)

    // First verify the note exists and belongs to the user's family
    const existingNote = await db.selectFrom("note")
        .select("id")
        .where("id", "=", noteId)
        .where("family_id", "=", familyId)
        .where("deleted_at", "is", null)
        .executeTakeFirst()

    if (!existingNote) {
        throw new Error("Note not found or access denied")
    }

    // Soft delete by setting deleted_at timestamp
    await db.updateTable("note")
        .set({
            deleted_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        })
        .where("id", "=", noteId)
        .execute()

    return {
        id: noteId,
        success: true
    }
};
