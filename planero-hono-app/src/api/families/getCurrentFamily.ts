import {getDb, CustomContext} from "../../react-app/globals";
import {getLoggedUserIdOrFail} from "../assert";

type Params = {
    context: CustomContext
}

export const getCurrentFamily = async ({context}: Params) => {
    const db = getDb(context)
    const userId = getLoggedUserIdOrFail(context)

    const families = await db.selectFrom("user_to_family")
        .select("family_id")
        .distinct()
        .where("user_id", "=", userId)
        .execute()

    if (families.length !== 1) {
        throw new Error("Invalid family count:" + families.length)
    }

    const familyId = families[0].family_id

    const family = await db.selectFrom("family")
        .select(["id", "name"])
        .where("id", "=", familyId)
        .executeTakeFirstOrThrow()

    const members = await db.selectFrom("user as u")
        .innerJoin("user_to_family as utf", "utf.user_id", "u.id")
        .select(["u.id", "u.name", "utf.role", "u.born_at", "u.gender"])
        .where("utf.family_id", "=", familyId)
        .orderBy("u.born_at")
        .orderBy("u.name")
        .execute()

    return {
        id: family.id,
        name: family.name,
        members: members.map(it => ({
            id: it.id,
            name: it.name,
            gender: it.gender,
            bornAt: it.born_at ?? undefined,
            role: it.role
        }))
    }
};