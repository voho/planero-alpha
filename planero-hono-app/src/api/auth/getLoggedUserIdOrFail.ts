import {CustomContext, getDb} from "../../react-app/globals";
import {getLoggedClerkUserIdOrFail} from "./getLoggedUserClerkIdOrFail";

export const getLoggedUserIdOrFail = async (context: CustomContext) => {
    const clerkUserId = getLoggedClerkUserIdOrFail(context)
    const db = getDb(context)

    const user = await db.selectFrom("user")
        .select("id")
        .where("clerk_id", "=", clerkUserId)
        .executeTakeFirstOrThrow()

    return user.id
}