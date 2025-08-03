import {CustomContext, getDb} from "../../react-app/globals";
import {getFamily} from "../families/getFamily";

type Params = {
    context: CustomContext;
    userId: string;
}

export const getUserContext = async ({context, userId}: Params) => {
    const db = getDb(context)

    const user = await db.selectFrom("user")
        .select(["name", "id"])
        .where("id", "=", userId)
        .executeTakeFirstOrThrow()

    const memberships = await db.selectFrom("user_to_family")
        .select(["role", "family_id"])
        .where("user_id", "=", userId)
        .execute()

    if (memberships.length > 1) {
        throw new Error("User belongs to multiple families")
    }

    const membership = memberships.length > 0
        ? memberships[0]
        : undefined

    const family = membership
        ? await getFamily({context, id: membership.family_id})
        : undefined

    return {
        user: {
            id: user.id,
            name: user.name ?? undefined,
        },
        role: membership?.role,
        family
    }
}