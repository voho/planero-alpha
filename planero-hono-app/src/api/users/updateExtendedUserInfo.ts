import {getDb, CustomContext} from "../../react-app/globals";
import {getLoggedUserIdOrFail} from "../auth/getLoggedUserIdOrFail";
import {assertLoggedUserCanManageFamily} from "../auth/assertLoggedUserCanManageFamily";

type ExtendedUserInfo = {
    body?: string;
    culture?: string;
    food?: string;
    interests?: string;
    note?: string;
    personality?: string;
}

type Params = {
    context: CustomContext;
    familyId: string;
    userId: string;
    updates: ExtendedUserInfo;
}

export const updateExtendedUserInfo = async ({context, familyId, userId, updates}: Params) => {
    const db = getDb(context);
    const loggedUserId = await getLoggedUserIdOrFail(context)

    await assertLoggedUserCanManageFamily({context, familyId});

    await db.updateTable("user")
        .set({
            body: updates.body ?? null,
            culture: updates.culture ?? null,
            food: updates.food ?? null,
            interests: updates.interests ?? null,
            note: updates.note ?? null,
            personality: updates.personality ?? null,
            updated_at: new Date().toISOString(),
            updated_by: loggedUserId
        })
        .where("id", "=", userId)
        .execute();
};
