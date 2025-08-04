import {CustomContext, getDb} from "../../react-app/globals";
import {getClerkUserDetail} from "./getClerkUserDetail";
import {randomId} from "../../utils/random";
import {getUserContext} from "./getUserContext";

type Params = {
    context: CustomContext
    clerkUserId: string;
}

export const matchOrCreateNewUser = async ({context, clerkUserId}: Params) => {
    const db = getDb(context)

    // user is logged but not present in our system yet

    const clerkUser = await getClerkUserDetail(context, clerkUserId)

    // scenario 1: user is matched by e-mail (invitation)

    const userMatchedByEmail = clerkUser.email
        ? await db.selectFrom("user")
            .select("id")
            .where("email", "=", clerkUser.email)
            .executeTakeFirst()
        : undefined

    if (userMatchedByEmail && userMatchedByEmail.id) {
        await db.updateTable("user")
            .set({clerk_id: clerkUserId})
            .where("id", "=", userMatchedByEmail.id)
            .execute()

        return await getUserContext({context, userId: userMatchedByEmail.id})
    }

    // scenario 2: user is brand new

    const newUserId = randomId("u")

    if (!clerkUser.name) {
        throw new Error("User has no name in Clerk")
    }

    if (!clerkUser.email) {
        throw new Error("User has no email address in Clerk")
    }

    await db.insertInto("user")
        .values({
            id: newUserId,
            clerk_id: clerkUserId,
            name: clerkUser.name,
            email: clerkUser.email,
            gender: "x"
        })
        .execute()

    return await getUserContext({context, userId: newUserId})
}