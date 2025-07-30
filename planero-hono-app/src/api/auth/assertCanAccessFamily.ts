import {getDb, CustomContext} from "../../react-app/globals";
import {getLoggedUserIdOrFail} from "./getLoggedUserIdOrFail";

type Params = {
    context: CustomContext;
    familyId: string;
}

export const assertCanAccessFamily = async ({context, familyId}: Params) => {
    const db = getDb(context)
    const userId = getLoggedUserIdOrFail(context)

    const membership = await db.selectFrom("user_to_family")
        .select("id")
        .where("user_id", "=", userId)
        .where("family_id", "=", familyId)
        .executeTakeFirst()

    if (!membership) {
        throw new Error(`User does not belong to family: ${familyId}`)
    }
};
