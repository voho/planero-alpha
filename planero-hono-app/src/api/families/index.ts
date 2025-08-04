import {Hono} from "hono";
import {zValidator} from '@hono/zod-validator';
import {z} from 'zod';
import {createFamilyWithLoggedUserAsAdult} from './createFamilyWithLoggedUserAsAdult';
import {addFamilyMember} from './addFamilyMember';
import {removeFamilyMember} from './removeFamilyMember';

const CreateFamilySchema = z.object({
    name: z.string().min(1, "Family name is required"),
});

const AddMemberSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Valid email is required").optional().or(z.literal("")),
    gender: z.enum(["m", "f", "x"], {required_error: "Gender is required"}),
    bornAt: z.string().optional(),
    role: z.enum(["adult", "child"]),
});

const FamilyParamsSchema = z.object({
    familyId: z.string(),
});

const RemoveMemberParamsSchema = z.object({
    familyId: z.string(),
    userId: z.string(),
});

export const app = new Hono<{ Bindings: Env }>()
    .post('/',
        zValidator('json', CreateFamilySchema),
        async (context) => {
            const {name} = context.req.valid('json');

            const family = await createFamilyWithLoggedUserAsAdult({
                context,
                familyName: name
            });

            return context.json(family);
        }
    )
    .post('/:familyId/members',
        zValidator('param', FamilyParamsSchema),
        zValidator('json', AddMemberSchema),
        async (context) => {
            const {familyId} = context.req.valid('param');
            const {name, email, gender, bornAt, role} = context.req.valid('json');

            const result = await addFamilyMember({
                context,
                familyId,
                name,
                email,
                gender,
                bornAt,
                role
            });

            return context.json(result);
        }
    )
    .delete('/:familyId/members/:userId',
        zValidator('param', RemoveMemberParamsSchema),
        async (context) => {
            const {familyId, userId} = context.req.valid('param');

            await removeFamilyMember({
                context,
                familyId,
                userId
            });

            return context.json({success: true});
        }
    );

export default app;
