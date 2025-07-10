import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/clerk-react';

export const LoginStatus = () => {
  return (
    <div>
    <SignedOut>
      <SignInButton />
    </SignedOut>
  <SignedIn>
    <UserButton />
  </SignedIn>
    </div>
  )
}