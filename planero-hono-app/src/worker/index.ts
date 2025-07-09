import { Hono } from "hono";
import users from "../api/users";
import { clerkMiddleware } from '@hono/clerk-auth';
const app = new Hono<{ Bindings: Env }>();

app.use('/api/*',  async (c,next) => {
  const middleware = clerkMiddleware({secretKey: c.env.LOCAL_CLERK_SECRET_KEY ?? await c.env.CLERK_SECRET_KEY.get(), publishableKey: c.env.LOCAL_CLERK_PUBLISHABLE_KEY?? await c.env.CLERK_PUBLISHABLE_KEY.get()})
  return middleware(c, next)
})

app.route("/api/users", users)

export default app;
