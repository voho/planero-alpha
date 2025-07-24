import {Hono} from "hono";
import {assertAuthenticated} from "../assert";
import {getTipOfDay} from "./getTipOfDay";
import {getWeeklyFoodPlan} from "./getWeeklyFoodPlan";

export const app = new Hono<{ Bindings: Env }>()
    .get('/tip', async (context) => {
        assertAuthenticated(context)
        const result = await getTipOfDay({context})
        return context.json(result);
    })
    .get('/food/weekly-food-plan', async (context) => {
        assertAuthenticated(context)
        const result = await getWeeklyFoodPlan({context})
        return context.json(result);
    })

export default app;