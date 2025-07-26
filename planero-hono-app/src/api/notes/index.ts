import {Hono} from "hono";
import {zValidator} from "@hono/zod-validator";
import {z} from "zod";
import {assertAuthenticated} from "../assert";
import {getNotes} from "./getNotes";
import {addNote} from "./addNote";
import {updateNote} from "./updateNote";
import {deleteNote} from "./deleteNote";

// Zod schemas for validation
const addNoteSchema = z.object({
    content: z.string().min(1, "Content is required").max(10000, "Content too long"),
    parentId: z.string().uuid().optional()
});

const updateNoteSchema = z.object({
    content: z.string().min(1, "Content is required").max(10000, "Content too long")
});

const noteIdSchema = z.object({
    id: z.string().uuid("Invalid note ID format")
});

export const app = new Hono<{ Bindings: Env }>()
    .get('/', async (context) => {
        assertAuthenticated(context)

        return context.json(await getNotes({context}))
    })
    .post('/', zValidator('json', addNoteSchema), async (context) => {
        assertAuthenticated(context)

        const {content, parentId} = context.req.valid('json')

        return context.json(await addNote({
            context,
            content,
            parentId
        }))
    })
    .put('/:id', zValidator('param', noteIdSchema), zValidator('json', updateNoteSchema), async (context) => {
        assertAuthenticated(context)

        const {id} = context.req.valid('param')
        const {content} = context.req.valid('json')

        return context.json(await updateNote({
            context,
            noteId: id,
            content
        }))
    })
    .delete('/:id', zValidator('param', noteIdSchema), async (context) => {
        assertAuthenticated(context)

        const {id} = context.req.valid('param')

        return context.json(await deleteNote({
            context,
            noteId: id
        }))
    })

export default app;