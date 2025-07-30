import {CustomContext, getDb} from "../../react-app/globals";

type Params = {
    context: CustomContext;
    id: string;
}

export const getFamily = async ({context, id}: Params) => {
    const db = getDb(context)

    const family = await db.selectFrom("family")
        .select(["id", "name"])
        .where("id", "=", id)
        .executeTakeFirstOrThrow()

    const members = await db.selectFrom("user as u")
        .innerJoin("user_to_family as utf", "utf.user_id", "u.id")
        .select(["u.id", "u.name", "u.email", "u.gender", "u.born_at", "u.body", "u.culture", "u.food", "u.interests", "u.note", "u.personality", "u.created_at", "u.updated_at", "utf.role"])
        .where("utf.family_id", "=", id)
        .orderBy("u.born_at")
        .orderBy("u.name")
        .execute()

    return {
        id: family.id, name: family.name, members: members.map(it => ({
            id: it.id,
            name: it.name,
            email: it.email,
            gender: it.gender,
            bornAt: it.born_at ?? undefined,
            body: it.body ?? undefined,
            culture: it.culture ?? undefined,
            food: it.food ?? undefined,
            interests: it.interests ?? undefined,
            note: it.note ?? undefined,
            personality: it.personality ?? undefined,
            createdAt: it.created_at,
            updatedAt: it.updated_at,
            role: it.role
        }))
    }
};