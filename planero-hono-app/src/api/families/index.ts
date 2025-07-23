import {Hono} from "hono";
import {assertAuthenticated} from "../assert";
import {getCurrentFamily} from "./getCurrentFamily";
import {getCurrentFamilyFoodDetails} from "./getCurrentFamilyFoodDetails";

export const app = new Hono<{ Bindings: Env }>()
    .get('/current', async (c) => {
        assertAuthenticated(c)

        return c.json(await getCurrentFamily())
    })
    .get('/current/food', async (c) => {
        assertAuthenticated(c)

        return c.json(await getCurrentFamilyFoodDetails())
    })

export default app;