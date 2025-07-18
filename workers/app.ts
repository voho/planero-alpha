import { createRequestHandler } from 'react-router';
import { app } from '~/api/app';

app.get('*', c => {
  const requestHandler = createRequestHandler(() => import('virtual:react-router/server-build'), import.meta.env.MODE);

  return requestHandler(c.req.raw, {
    cloudflare: { env: c.env, ctx: c.executionCtx },
  });
});

export default app;
