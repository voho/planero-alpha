import {CustomContext} from "../../react-app/globals";
import {getAuth} from "@hono/clerk-auth";

export const getLoggedUserIdOrFail = (c: CustomContext) => {
    const auth = getAuth(c)
    if (auth && auth.isAuthenticated) {
        return auth.userId
    }
    throw new Error("Not authenticated")
}