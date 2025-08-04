import {Hono} from "hono";
import {zValidator} from '@hono/zod-validator';
import {z} from 'zod';
import {updateBasicUserInfo} from './updateBasicUserInfo';
import {updateExtendedUserInfo} from './updateExtendedUserInfo';
import {getCurrentUser} from './getCurrentUser';

const BasicUserInfoSchema = z.object({
    name: z.string().optional(),
    email: z.string().email("Valid email is required").optional().or(z.literal("")),
    gender: z.enum(["m", "f", "x"]).optional(),
    bornAt: z.string().optional(),
});

const ExtendedUserInfoSchema = z.object({
    body: z.string().optional(),
    culture: z.string().optional(),
    food: z.string().optional(),
    interests: z.string().optional(),
    note: z.string().optional(),
    personality: z.string().optional(),
});

const UpdateUserParamsSchema = z.object({
    familyId: z.string(),
    userId: z.string(),
});

export const app = new Hono<{ Bindings: Env }>()
    .put('/:familyId/:userId/basic',
        zValidator('param', UpdateUserParamsSchema),
        zValidator('json', BasicUserInfoSchema),
        async (context) => {
            const {familyId, userId} = context.req.valid('param');
            const updates = context.req.valid('json');

            await updateBasicUserInfo({
                context,
                familyId,
                userId,
                updates
            });

            return context.json({})
        }
    )
    .put('/:familyId/:userId/extended',
        zValidator('param', UpdateUserParamsSchema),
        zValidator('json', ExtendedUserInfoSchema),
        async (context) => {
            const {familyId, userId} = context.req.valid('param');
            const updates = context.req.valid('json');

            await updateExtendedUserInfo({
                context,
                familyId,
                userId,
                updates
            });

            return context.json({})
        }
    )
    .get('/current', async (context) => {
        const user = await getCurrentUser(context);
        return context.json(user);
    })

export default app;