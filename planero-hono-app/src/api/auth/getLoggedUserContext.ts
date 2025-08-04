import {CustomContext, getDb} from "../../react-app/globals";
import {matchOrCreateNewUser} from "../users/matchOrCreateNewUser";
import {getUserContext} from "../users/getUserContext";
import {getLoggedClerkUserIdOrFail} from "./getLoggedUserClerkIdOrFail";

type Params = {
    context: CustomContext;
}

export const getLoggedUserContext = async ({context}: Params) => {
    const clerkUserId = getLoggedClerkUserIdOrFail(context)
    const db = getDb(context)

    const user = await db.selectFrom("user")
        .select(["id"])
        .where("clerk_id", "=", clerkUserId)
        .executeTakeFirst()

    if (!user) {
        return matchOrCreateNewUser({context, clerkUserId})
    }

    return getUserContext({context, userId: user.id})
}