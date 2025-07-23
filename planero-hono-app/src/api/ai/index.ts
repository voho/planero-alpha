import {Hono} from "hono";
import {assertAuthenticated} from "../assert";
import {getTipOfDay} from "./getTipOfDay";
import {getWeeklyFoodPlan} from "./getWeeklyFoodPlan";

export const app = new Hono<{ Bindings: Env }>()
    .get('/tip', async (c) => {
        assertAuthenticated(c)
        const result = await getTipOfDay({c})
        return c.json(result);
    })
    .get('/food/weekly-food-plan', async (c) => {
        assertAuthenticated(c)
        const result = await getWeeklyFoodPlan({c})
        return c.json(result);
    })

export default app;