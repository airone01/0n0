import {ModeToggle} from '@0n0/ui/mode-toggle';
import {
  SignInButton, SignUpButton, SignedIn, SignedOut,
} from '@clerk/nextjs';
import {SignedOutButton} from './clerk-signed-out';

export default function Header() {
  return (
    <header className='flex items-center justify-between w-full py-1 px-1 bg-background'>
      <section id='header-left'>
        <SignedIn>
          Signed in!
        </SignedIn>
        <SignedOut>
          <SignedOutButton />
        </SignedOut>
      </section>
      <section id='header-center' />
      <section id='header-right'>
        <ModeToggle />
      </section>
    </header>
  );
}
