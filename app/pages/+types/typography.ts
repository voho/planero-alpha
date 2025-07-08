import type * as React from 'react';
import type { LoaderFunctionArgs } from 'react-router';

export namespace Route {
  export type LoaderArgs = LoaderFunctionArgs<{
    cloudflare: {
      env: Env;
    };
  }>;

  export type ErrorBoundaryProps = {
    error: unknown;
  };
}
