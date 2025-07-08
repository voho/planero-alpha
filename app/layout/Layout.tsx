import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-react';
import { Meta, Links, ScrollRestoration, Scripts, Outlet } from 'react-router';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './app.css';
import InnerLayout from './InnerLayout';
import { csCZ } from '@clerk/localizations'

const queryClient = new QueryClient();

export const loader = ({ context }: { context: { cloudflare: { env: Env } } }) => {
  return { clerkPublishableKey: context.cloudflare.env.CLERK_PUBLISHABLE_KEY };
};

export default function Layout({ loaderData }: { loaderData: { clerkPublishableKey: string } }) {
  return (
    <html lang="en" className="h-full bg-theme-background">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <ScrollRestoration />
        <Scripts />
        <QueryClientProvider client={queryClient}>
          <ClerkProvider publishableKey={loaderData.clerkPublishableKey ?? ''} localization={csCZ}>
          <ClerkLoaded>
            <InnerLayout />
          </ClerkLoaded>
          </ClerkProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
