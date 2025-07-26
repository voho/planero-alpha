import {getDb, CustomContext} from "../../react-app/globals";
import {getLoggedUserIdOrFail, getLoggedUserFamilyIdOrFail} from "../assert";
import {v4 as uuidv4} from 'uuid';

type Params = {
    context: CustomContext;
    content: string;
    parentId?: string;
}

export const addNote = async ({context, content, parentId}: Params) => {
    const db = getDb(context)
    const userId = getLoggedUserIdOrFail(context)
    const familyId = await getLoggedUserFamilyIdOrFail(context)

    // Create the new note
    const noteId = uuidv4()

    await db.insertInto("note")
        .values({
            id: noteId,
            parent_id: parentId || null,
            content: content,
            family_id: familyId,
            author_id: userId
        })
        .execute()

    return {
        id: noteId
    }
};
