import {getAuth} from "@hono/clerk-auth";
import {CustomContext} from "../../react-app/globals";

export const assertAuthenticated = (c: CustomContext) => {
    const auth = getAuth(c)
    return !!auth && auth.isAuthenticated
}