import { Hono } from 'hono';
import { clerkMiddleware } from '@hono/clerk-auth';
import { helloRoute } from '~/api/hello';
import { logger } from 'hono/logger';

export const app = new Hono().use(logger()).use('/api/*', clerkMiddleware()).route('/api/hello', helloRoute);

export type AppType = typeof app;
