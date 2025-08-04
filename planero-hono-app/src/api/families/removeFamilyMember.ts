import {CustomContext, getDb} from "../../react-app/globals";
import {getLoggedUserIdOrFail} from "../auth/getLoggedUserIdOrFail";
import {assertLoggedUserCanManageFamily} from "../auth/assertLoggedUserCanManageFamily";

type Params = {
    context: CustomContext;
    familyId: string;
    userId: string;
}

export const removeFamilyMember = async ({context, familyId, userId}: Params) => {
    await assertLoggedUserCanManageFamily({context, familyId});

    const db = getDb(context);
    const loggedUserId = await getLoggedUserIdOrFail(context);

    if (loggedUserId === userId) {
        throw new Error("Cannot remove yourself from the family");
    }

    await db.deleteFrom("user_to_family")
        .where("user_id", "=", userId)
        .where("family_id", "=", familyId)
        .execute();
};
