import {getDb, CustomContext} from "../../react-app/globals";
import {getLoggedUserIdOrFail} from "../auth/getLoggedUserIdOrFail";
import {assertLoggedUserCanManageFamily} from "../auth/assertLoggedUserCanManageFamily";

type BasicUserInfo = {
    name?: string;
    email?: string;
    gender?: string;
    bornAt?: string;
}

type Params = {
    context: CustomContext;
    familyId: string;
    userId: string;
    updates: BasicUserInfo;
}

export const updateBasicUserInfo = async ({context, familyId, userId, updates}: Params) => {
    const db = getDb(context);
    const loggedUserId = await getLoggedUserIdOrFail(context)

    await assertLoggedUserCanManageFamily({context, familyId});

    // Handle empty email by generating placeholder
    const userEmail = updates.email && updates.email.trim() !== ""
        ? updates.email
        : `${userId}@placeholder.local`;

    await db.updateTable("user")
        .set({
            name: updates.name,
            email: userEmail,
            gender: updates.gender,
            born_at: updates.bornAt,
            updated_at: new Date().toISOString(),
            updated_by: loggedUserId
        })
        .where("id", "=", userId)
        .execute();
};
