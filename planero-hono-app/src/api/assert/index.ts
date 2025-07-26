import {getAuth} from "@hono/clerk-auth";
import {CustomContext, getDb} from "../../react-app/globals";

export const assertAuthenticated = (c: CustomContext) => {
    const auth = getAuth(c)
    return !!auth && auth.isAuthenticated
}

export const getLoggedUserIdOrFail = (c: CustomContext) => {
    const auth = getAuth(c)
    if (auth && auth.isAuthenticated) {
        return auth.userId
    }
    throw new Error("Not authenticated")
}

export const getLoggedUserFamilyIdOrFail = async (c: CustomContext) => {
    const db = getDb(c)
    const userId = getLoggedUserIdOrFail(c)

    const families = await db.selectFrom("user_to_family")
        .select("family_id")
        .distinct()
        .where("user_id", "=", userId)
        .execute()

    if (families.length !== 1) {
        throw new Error("User does not belong to a single family")
    }

    return families[0].family_id
}