import {CustomContext, getDb} from "../../react-app/globals";
import {getLoggedUserIdOrFail} from "../auth/getLoggedUserIdOrFail";
import {assertLoggedUserCanManageFamily} from "../auth/assertLoggedUserCanManageFamily";
import {randomId} from "../../utils/random";

type Params = {
    context: CustomContext;
    familyId: string;
    name: string;
    email?: string;
    gender: "m" | "f" | "x";
    bornAt?: string;
    role: "adult" | "child";
}

export const addFamilyMember = async ({context, familyId, name, email, gender, bornAt, role}: Params) => {
    await assertLoggedUserCanManageFamily({context, familyId});

    const loggedUserId = await getLoggedUserIdOrFail(context);
    const now = new Date().toISOString()
    const db = getDb(context);

    const newUserId = randomId("u")

    // Handle empty email by generating placeholder (same pattern as updateBasicUserInfo)
    const userEmail = email && email.trim() !== ""
        ? email
        : `${newUserId}@placeholder.local`;

    await db.insertInto("user")
        .values({
            id: newUserId,
            name,
            email: userEmail,
            gender,
            born_at: bornAt || null,
            created_by: loggedUserId,
            updated_by: loggedUserId,
            created_at: now,
            updated_at: now
        })
        .onConflict(oc => oc.doNothing())
        .execute()

    await db.insertInto("user_to_family")
        .values({
            id: randomId("utf"),
            user_id: newUserId,
            family_id: familyId,
            role,
            created_by: loggedUserId,
            updated_by: loggedUserId,
            created_at: now,
            updated_at: now
        })
        .onConflict(oc => oc.doNothing())
        .execute();

    return {newUserId}
};
