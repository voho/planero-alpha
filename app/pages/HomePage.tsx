import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { hc } from 'hono/client';
import type { AppType } from '~/api/app';

const client = hc<AppType>('/');

export default function HomePage() {
  const { userId, sessionId, getToken, isLoaded, isSignedIn } = useAuth();

  const query = useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      const res = await client.api.hello.$get({ query: { name: 'VOHO' } });
      return await res.json();
    },
  });

  return (
    <div>hello</div>
  );
}
