import {getClerkClient, CustomContext} from "../../react-app/globals";

export const getClerkUserDetail = async (context: CustomContext, userId: string) => {
    const clerk = await getClerkClient(context)
    const clerkUser = await clerk.users.getUser(userId)
    if (!clerkUser) {
        throw new Error(`User not found in Clerk: ${userId}`)
    }
    return {
        id: clerkUser.id,
        name: clerkUser.fullName ?? undefined,
        email: clerkUser.primaryEmailAddress?.emailAddress,
    }
}