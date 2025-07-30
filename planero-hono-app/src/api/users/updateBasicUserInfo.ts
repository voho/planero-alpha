import {getDb, CustomContext} from "../../react-app/globals";
import {getLoggedUserIdOrFail} from "../auth/getLoggedUserIdOrFail";
import {assertCanManageFamily} from "../auth/assertCanManageFamily";

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
    const loggedUserId = getLoggedUserIdOrFail(context)

    await assertCanManageFamily({context, familyId});

    await db.updateTable("user")
        .set({
            name: updates.name,
            email: updates.email,
            gender: updates.gender,
            born_at: updates.bornAt,
            updated_at: new Date().toISOString(),
            updated_by: loggedUserId
        })
        .where("id", "=", userId)
        .execute();
};
