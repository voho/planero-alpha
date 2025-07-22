import {Hono} from "hono";
import families from "../api/families";
import {clerkMiddleware} from '@hono/clerk-auth';
import { timeout } from 'hono/timeout'
import { secureHeaders } from 'hono/secure-headers'
import users from "../api/users";

const app = new Hono<{ Bindings: Env }>()
    .use(secureHeaders())
    .use('/api/*', timeout(10000))
    .use('/api/*', async (c, next) => {
    const middleware = clerkMiddleware({
        secretKey: c.env.LOCAL_CLERK_SECRET_KEY ?? await c.env.CLERK_SECRET_KEY.get(),
        publishableKey: c.env.LOCAL_CLERK_PUBLISHABLE_KEY ?? await c.env.CLERK_PUBLISHABLE_KEY.get()
    })
    return middleware(c, next)
})
    .route("/api/users", users)
    .route("/api/families", families)

export type AppType = typeof app

export default app;
