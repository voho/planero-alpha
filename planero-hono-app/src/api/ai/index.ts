import {Hono} from "hono";

export const app = new Hono<{ Bindings: Env }>()

export default app;