import {Hono} from "hono";
import {assertAuthenticated} from "../assert";
import {getCurrentFamily} from "./getCurrentFamily";

export const app = new Hono<{ Bindings: Env }>()
    .get('/current', async (c) => {
        assertAuthenticated(c)

        return c.json(await getCurrentFamily())
    })

export default app;