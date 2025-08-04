import {CustomContext, getDb} from "../../react-app/globals";
import {getLoggedClerkUserIdOrFail} from "./getLoggedUserClerkIdOrFail";

export const getLoggedUserMemberships = async (context: CustomContext) => {
    const clerkUserId = getLoggedClerkUserIdOrFail(context)
    const db = getDb(context)

    const memberships = await db.selectFrom("user_to_family as utf")
        .innerJoin("user as u", "u.id", "utf.user_id")
        .select(["utf.family_id", "utf.role"])
        .where("u.clerk_id", "=", clerkUserId)
        .execute()

    return memberships.map(it => ({
        familyId: it.family_id,
        role: it.role
    }))
}