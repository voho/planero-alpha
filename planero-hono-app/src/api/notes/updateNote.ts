import {getDb, CustomContext} from "../../react-app/globals";
import {getLoggedUserFamilyIdOrFail} from "../assert";

type Params = {
    context: CustomContext;
    noteId: string;
    content: string;
}

export const updateNote = async ({context, noteId, content}: Params) => {
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

    // Update the note content
    await db.updateTable("note")
        .set({
            content: content,
            updated_at: new Date().toISOString()
        })
        .where("id", "=", noteId)
        .execute()

    return {
        id: noteId,
        success: true
    }
};
