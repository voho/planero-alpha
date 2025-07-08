import { ClerkProvider, SignedOut, SignInButton, SignedIn, UserButton, useAuth, useUser } from '@clerk/clerk-react';
import { Meta, Links, ScrollRestoration, Scripts, Outlet } from 'react-router';
import logo from '/logo.png';

export default function InnerLayout() {
    const { userId } = useAuth();
    const { isSignedIn, user, isLoaded } = useUser();
  return (
    <div class="min-h-full">
      <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="shrink-0">
                <img
                  class="w-[150px]"
                  src={logo}
                  alt="Planero"
                />
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <a href="/" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">
                    Přehled
                  </a>
                  <a href="/setup" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    Nastavení
                  </a>
                </div>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <div class="relative ml-3">
                  <div>
                    <button
                      type="button"
                      class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                       <SignedIn>
              <div class="ml-3">
              <UserButton  />
                <div class="text-base/5 font-medium text-white">{user?.firstName} {user?.lastName}</div>
                <div class="text-sm font-medium text-gray-400">{user?.emailAddresses?.[0].emailAddress}</div>
              </div>
              </SignedIn>
              <SignedOut>
              <SignInButton>
                    <button class="text-white font-bold cursor-pointer">Přihlásit se</button>
                    </SignInButton>
              </SignedOut>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="md:hidden" id="mobile-menu">
          <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            <a href="#" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">
              Dashboard
            </a>
            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Team
            </a>
            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Projects
            </a>
            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Calendar
            </a>
            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Reports
            </a>
          </div>
          <div class="border-t border-gray-700 pt-4 pb-3">
            <div class="flex items-center px-5">
            <SignedIn>
              <div class="shrink-0">
                      <UserButton />
              </div>
              <div class="ml-3">
                <div class="text-base/5 font-medium text-white">{user?.firstName} {user?.lastName}</div>
                <div class="text-sm font-medium text-gray-400">{user?.emailAddresses[0].emailAddress}</div>
              </div>
              </SignedIn>
              <SignedOut>
                <SignInButton>
                <button class="text-white font-bold cursor-pointer">Přihlásit se</button>
                    </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </nav>

      <header class="bg-white shadow-sm">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
