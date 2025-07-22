import {getAuth} from "@hono/clerk-auth";
import {Context} from "hono";

export const assertAuthenticated = (c: Context) => {
    const auth = getAuth(c)
    return !!auth && auth.isAuthenticated
}