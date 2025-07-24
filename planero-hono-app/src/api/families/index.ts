import {Hono} from "hono";
import {assertAuthenticated} from "../assert";
import {getCurrentFamily} from "./getCurrentFamily";
import {getCurrentFamilyFoodDetails} from "./getCurrentFamilyFoodDetails";

export const app = new Hono<{ Bindings: Env }>()
    .get('/current', async (context) => {
        assertAuthenticated(context)

        return context.json(await getCurrentFamily({context}))
    })
    .get('/current/food', async (context) => {
        assertAuthenticated(context)

        return context.json(await getCurrentFamilyFoodDetails({context}))
    })

export default app;