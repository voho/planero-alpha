import {CustomContext, getDb} from "../../react-app/globals";
import {getLoggedUserIdOrFail} from "../auth/getLoggedUserIdOrFail";
import {randomId} from "../../utils/random";

type Params = {
    context: CustomContext;
    familyName: string;
}

export const createFamilyWithLoggedUserAsAdult = async ({context, familyName}: Params) => {
    const db = getDb(context);
    const loggedUserId = await getLoggedUserIdOrFail(context);

    const familyId = randomId("f");
    const now = new Date().toISOString();

    await db.insertInto("family")
        .values({
            id: familyId,
            name: familyName,
            created_by: loggedUserId,
            updated_by: loggedUserId,
            created_at: now,
            updated_at: now
        })
        .execute();

    await db.insertInto("user_to_family")
        .values({
            id: randomId("utf"),
            user_id: loggedUserId,
            family_id: familyId,
            role: "adult",
            created_by: loggedUserId,
            updated_by: loggedUserId,
            created_at: now,
            updated_at: now
        })
        .execute();

    return {
        id: familyId,
        name: familyName
    };
};
