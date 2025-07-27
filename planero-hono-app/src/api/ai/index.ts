import {Hono} from "hono";
import {assertAuthenticated} from "../assert";
import {getTipOfDay} from "./getTipOfDay";
import {getWeeklyFoodPlan} from "./getWeeklyFoodPlan";
import {getSmartOperations} from "./getSmartOperations";
import {executeSmartOperation} from "./executeSmartOperation";
import {SmartOperation} from "./smartOperations";

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
    .get('/smart-operations', async (context) => {
        assertAuthenticated(context)
        const result = await getSmartOperations({context})
        return context.json(result);
    })
    .post('/smart-operations/:operation', async (context) => {
        assertAuthenticated(context)
        const operation = context.req.param('operation') as SmartOperation;
        
        if (!Object.values(SmartOperation).includes(operation)) {
            return context.json({error: 'Invalid operation'}, 400);
        }
        
        const body = await context.req.json().catch(() => ({}));
        const selectedMemberIds = body.selectedMemberIds as string[] | undefined;
        
        const result = await executeSmartOperation({context, operation, selectedMemberIds})
        return context.json(result);
    })

export default app;