import {Hono} from "hono";
import {getAuth} from '@hono/clerk-auth';

export const app = new Hono<{ Bindings: Env }>()
    .get('/', (c) => {
        const auth = getAuth(c)
        return c.text('Hello Cloudflare Workers: ' + auth);
    })

export default app;