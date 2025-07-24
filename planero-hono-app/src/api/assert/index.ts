import {getAuth} from "@hono/clerk-auth";
import {CustomContext} from "../../react-app/globals";

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