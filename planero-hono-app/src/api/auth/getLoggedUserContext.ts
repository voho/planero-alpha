import {CustomContext, getDb} from "../../react-app/globals";
import {getAuth} from "@hono/clerk-auth";
import {getFamily} from "../families/getFamily";

type Params = {
    context: CustomContext;
}

export const getLoggedUserContext = async ({context}: Params) => {
    const auth = getAuth(context)

    if (!(auth && auth.isAuthenticated)) {
        throw new Error("Not authenticated")
    }

    const db = getDb(context)

    const user = await db.selectFrom("user")
        .select(["name", "id"])
        .where("id", "=", auth.userId)
        .executeTakeFirstOrThrow()

    const memberships = await db.selectFrom("user_to_family")
        .select(["role", "family_id"])
        .where("user_id", "=", auth.userId)
        .execute()

    if (memberships.length === 0) {
        throw new Error("User does not belong to any family")
    }

    if (memberships.length > 1) {
        throw new Error("User belongs to multiple families")
    }

    const membership = memberships[0]
    const family = await getFamily({context, id: membership.family_id})

    return {
        user: {
            id: user.id,
            name: user.name ?? undefined,
        },
        role: membership.role,
        family
    }
}