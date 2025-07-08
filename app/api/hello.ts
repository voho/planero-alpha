import { Hono } from 'hono';
import { getAuth } from '@hono/clerk-auth';

const router = new Hono();

export const helloRoute = router.get('/', c => {
  const { name } = c.req.query();
  return c.json({
    message: `Hello! ${name} User: ` + JSON.stringify(getAuth(c)),
  });
});
