'use client';

import {Button} from '@0n0/ui/button';
import {Label} from '@0n0/ui/label';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@0n0/ui/card';
import {
  Popover, PopoverContent, PopoverTrigger,
} from '@0n0/ui/popover';
import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import * as SignUp from '@clerk/elements/sign-up';
import {UserIcon} from 'lucide-react';
import Link from 'next/link';

const SignedOutButton = () => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant='outline' size='icon'><UserIcon /></Button>
    </PopoverTrigger>
    <PopoverContent className='mx-auto max-w-sm p-0'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignIn.Root>
          <SignIn.Step name='start'>
            <Clerk.Field name='password' className='flex flex-col gap-4'>
              <Label htmlFor='email'>Email</Label>
              <Clerk.Input type='password' validatePassword autoComplete='webauthn' placeholder='Password' className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50' />
              <Clerk.FieldState>
                {({state, message}) => state === 'success' ? undefined : <div className='text-[0.8rem] font-medium text-destructive'>{message}</div>}
              </Clerk.FieldState>
            </Clerk.Field>
            <Clerk.Field name='password' className='flex flex-col gap-4'>
              <Label htmlFor='email'>Email</Label>
              <Clerk.Input type='password' validatePassword autoComplete='webauthn' placeholder='Password' className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50' />
              <Clerk.FieldState>
                {({state, message}) => state === 'success' ? undefined : <div className='text-[0.8rem] font-medium text-destructive'>{message}</div>}
              </Clerk.FieldState>
            </Clerk.Field>
          </SignIn.Step>
        </SignIn.Root>
        <div className='mt-4 text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link href='/register' className='underline'>
            Sign up
          </Link>
        </div>
      </CardContent>
    </PopoverContent>
  </Popover>
);
SignedOutButton.displayName = 'SignedInButton';

export function LoginForm() {
  return (
    <Card className='mx-auto max-w-sm'>
      <CardContent>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='m@example.com'
              required
            />
          </div>
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password'>Password</Label>
              <Link href='#' className='ml-auto inline-block text-sm underline'>
                Forgot your password?
              </Link>
            </div>
            <Input id='password' type='password' required />
          </div>
          <Button type='submit' className='w-full'>
            Login
          </Button>
          <Button variant='outline' className='w-full'>
            Login with Google
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export {SignedOutButton};
