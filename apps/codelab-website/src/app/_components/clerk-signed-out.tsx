'use client';

import {Button} from '@0n0/ui/button';
import {Label} from '@0n0/ui/label';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@0n0/ui/card';
import {
  Popover, PopoverContent, PopoverTrigger,
} from '@0n0/ui/popover';
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from '@0n0/ui/tooltip';
import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import * as SignUp from '@clerk/elements/sign-up';
import {UserIcon} from 'lucide-react';
import Link from 'next/link';

const SignedOutButton = () => (
  <TooltipProvider>
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
            <SignIn.Step name='start' className='flex flex-col gap-2'>
              {/* Email field */}
              <Clerk.Field name='emailAddress' className='flex flex-col gap-1'>
                <Label htmlFor='email'>Email</Label>
                <Clerk.Input type='email' placeholder='user@example.com' className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50' />
                <Clerk.FieldState>
                  {({state, message}) => state === 'success' ? undefined : <div className='text-[0.8rem] font-medium text-destructive'>{message}</div>}
                </Clerk.FieldState>
              </Clerk.Field>
              {/* Password field */}
              <Clerk.Field name='password' className='flex flex-col gap-1'>
                <Label htmlFor='password'>Password</Label>
                <Clerk.Input type='password' validatePassword autoComplete='webauthn' placeholder='myP@ssword123' className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50' />
                <Clerk.FieldState>
                  {({state, message}) => state === 'success' ? undefined : <div className='text-[0.8rem] font-medium text-destructive'>{message}</div>}
                </Clerk.FieldState>
              </Clerk.Field>
              {/* Submit login button */}
              <Button type='submit' className='w-full'>
                Login
              </Button>
              {/* Social login section */}
              <section className='flex justify-between items-center'>
                {/* Google */}
                <Clerk.Connection name='google'>
                  <Button variant='outline' size='icon'>
                    <svg className='w-6 h-6' xmlns='http://www.w3.org/2000/svg' width='0.98em' height='1em' viewBox='0 0 256 262'><path fill='#4285F4' d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'></path><path fill='#34A853' d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'></path><path fill='#FBBC05' d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z'></path><path fill='#EB4335' d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'></path></svg>
                  </Button>
                </Clerk.Connection>
                {/* Discord */}
                <Clerk.Connection name='discord'>
                  <Button variant='outline' size='icon'>
                    <svg className='w-6 h-6' xmlns='http://www.w3.org/2000/svg' width='41.17' height='32' viewBox='0 0 256 199'><path fill='#5865F2' d='M216.856 16.597A208.5 208.5 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046q-29.538-4.442-58.533 0c-1.832-4.4-4.55-9.933-6.846-14.046a207.8 207.8 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161 161 0 0 0 79.735 175.3a136.4 136.4 0 0 1-21.846-10.632a109 109 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a132 132 0 0 0 5.355 4.237a136 136 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848c21.142-6.58 42.646-16.637 64.815-33.213c5.316-56.288-9.08-105.09-38.056-148.36M85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2s23.236 11.804 23.015 26.2c.02 14.375-10.148 26.18-23.015 26.18m85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2c0 14.375-10.148 26.18-23.015 26.18'/></svg>
                  </Button>
                </Clerk.Connection>
                <Button variant='outline' size='icon'>
                  <svg className='w-6 h-6' xmlns='http://www.w3.org/2000/svg' width='1.24em' height='1em' viewBox='0 0 256 208'><path fill='#FFF' d='M100.43 115.195c.931-16.606 9.062-31.235 21.33-41.606c12.03-10.186 28.222-16.412 45.89-16.412c17.65 0 33.843 6.226 45.882 16.412c12.258 10.37 20.39 25 21.33 41.588c.93 17.062-5.928 32.912-17.958 44.661c-12.267 11.951-29.716 19.45-49.254 19.45s-37.021-7.499-49.28-19.45c-12.039-11.75-18.88-27.6-17.94-44.643'></path><path fill='#265787' d='M133.168 116.676c.477-8.52 4.65-16.027 10.944-21.348c6.173-5.226 14.481-8.421 23.547-8.421c9.056 0 17.365 3.195 23.542 8.421c6.29 5.321 10.462 12.828 10.944 21.34c.478 8.754-3.04 16.887-9.214 22.915c-6.294 6.132-15.247 9.98-25.272 9.98s-18.996-3.848-25.286-9.98c-6.177-6.028-9.687-14.161-9.205-22.907'></path><path fill='#EA7600' d='M78.41 134.18c.06 3.34 1.125 9.834 2.724 14.904c3.359 10.733 9.057 20.663 16.986 29.413c8.137 8.995 18.156 16.22 29.73 21.349c12.164 5.387 25.344 8.132 39.034 8.11c13.668-.019 26.849-2.818 39.013-8.246c11.573-5.179 21.583-12.435 29.707-21.434c7.924-8.787 13.613-18.734 16.982-29.467c1.693-5.423 2.763-10.927 3.192-16.45a75 75 0 0 0-.528-16.336c-1.508-10.611-5.18-20.567-10.833-29.643c-5.17-8.34-11.834-15.641-19.759-21.787l.018-.013l-79.97-61.405c-.073-.054-.132-.112-.209-.162c-5.246-4.028-14.07-4.014-19.84.022c-5.834 4.082-6.502 10.833-1.31 15.09l-.022.023l33.355 27.124l-101.663.108h-.136c-8.403.01-16.48 5.523-18.08 12.49c-1.643 7.098 4.065 12.986 12.802 13.018l-.014.031l51.53-.1L9.167 141.4c-.117.086-.244.176-.352.262c-8.674 6.642-11.478 17.687-6.015 24.676c5.545 7.108 17.335 7.121 26.099.041l50.184-41.071s-.732 5.544-.673 8.872m128.955 18.566c-10.34 10.535-24.817 16.508-40.48 16.54c-15.687.027-30.163-5.893-40.503-16.409c-5.053-5.125-8.764-11.022-11.054-17.303a44.9 44.9 0 0 1-2.537-19.334c.546-6.462 2.47-12.625 5.54-18.202c3.016-5.481 7.17-10.435 12.3-14.625c10.05-8.19 22.847-12.625 36.23-12.643c13.398-.018 26.185 4.376 36.246 12.54c5.12 4.171 9.27 9.107 12.286 14.58a45.7 45.7 0 0 1 5.563 18.192a45 45 0 0 1-2.547 19.32c-2.294 6.3-5.992 12.197-11.044 17.344'></path></svg>
                </Button>
                <Button variant='outline' size='icon'>
                  <svg className='w-6 h-6' xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 256 256'><defs><linearGradient id='logosJetbrainsSpaceIcon0' x1='45.082%' x2='55.522%' y1='-1.343%' y2='97.61%'><stop offset='0%' stopColor='#FCF84A'></stop><stop offset='32%' stopColor='#ABE682'></stop><stop offset='79%' stopColor='#36CDD2'></stop><stop offset='100%' stopColor='#07C3F2'></stop></linearGradient><linearGradient id='logosJetbrainsSpaceIcon1' x1='-2.942%' x2='100.445%' y1='38.992%' y2='62.105%'><stop offset='0%' stopColor='#3BEA62'></stop><stop offset='100%' stopColor='#087CFA'></stop></linearGradient><linearGradient id='logosJetbrainsSpaceIcon2' x1='-3.308%' x2='111.745%' y1='71.807%' y2='15.462%'><stop offset='0%' stopColor='#009AE5'></stop><stop offset='18%' stopColor='#0490DD'></stop><stop offset='49%' stopColor='#1073C6'></stop><stop offset='89%' stopColor='#2346A1'></stop><stop offset='100%' stopColor='#293896'></stop></linearGradient></defs><path fill='url(#logosJetbrainsSpaceIcon0)' d='M46.36 255.991c91.075-7.978 170.982-63.92 209.64-146.768C208.12 40.799 129.873.033 46.36 0Q35.2 0 23.936.99c-38.612 82.903-30.064 180.109 22.424 255'></path><path fill='url(#logosJetbrainsSpaceIcon1)' d='M24.209 1.024a301.4 301.4 0 0 1 134.685 108.199H256C208.263 40.76 130.062-.03 46.6 0Q35.437 0 24.208 1.024'></path><path fill='url(#logosJetbrainsSpaceIcon2)' d='M158.894 109.223C147.187 186.6 46.258 255.99 46.258 255.99c91.781-8.67 172.23-63.622 209.742-146.768z'></path></svg>
                </Button>
                <Button variant='outline' size='icon'>
                  <svg className='w-6 h-6' xmlns='http://www.w3.org/2000/svg' width='0.62em' height='1em' viewBox='0 0 256 417'><path fill='#D33833' d='M250.741 169.278c0 69.457-55.07 125.817-123.039 125.817S4.664 238.735 4.664 169.278c0-69.458 55.07-125.818 123.038-125.818c67.97 0 123.04 56.36 123.04 125.818'></path><path fill='#EF3D3A' d='M9.724 200.434S.794 69.26 121.749 65.488l-8.434-14.09l-65.588 22.028l-18.753 21.532l-16.372 31.355l-9.328 36.515l2.779 24.41'></path><path fill='#231F20' d='M43.46 83.448c-21.531 22.127-34.927 52.59-34.927 86.326s13.396 64.198 34.927 86.325c21.631 22.127 51.3 35.721 84.242 35.721s62.611-13.594 84.242-35.72c21.532-22.128 34.927-52.59 34.927-86.326c0-33.737-13.395-64.199-34.927-86.326c-21.63-22.028-51.299-35.72-84.242-35.72c-32.843 0-62.61 13.593-84.242 35.72m-5.457 177.91C15.083 237.941.893 205.495.893 169.774s14.19-68.168 37.11-91.684c22.921-23.417 54.673-38.003 89.7-38.003s66.778 14.586 89.699 38.003s37.11 55.863 37.11 91.684c0 35.72-14.19 68.167-37.11 91.584c-22.921 23.516-54.673 38.003-89.7 38.003s-66.778-14.487-89.699-38.003'></path><path fill='#F0D6B7' d='m179.498 169.972l-18.754 2.778l-25.302 2.878l-16.372.397l-15.975-.496l-12.205-3.77l-10.816-11.71l-8.434-23.913l-1.885-5.16l-11.212-3.77l-6.55-10.815l-4.663-15.48l5.16-13.593l12.205-4.267l9.823 4.664l4.663 10.32l5.656-.894l1.885-2.381l-1.885-10.816l-.496-13.594l2.778-18.753l-.099-10.716l8.533-13.693l14.983-10.816L136.732 5.16l29.073 4.266l25.302 18.258l11.709 18.753l7.54 13.594l1.886 33.736l-5.656 29.073l-10.32 25.799l-9.723 13.792'></path><path fill='#335061' d='m163.622 251.039l-66.977 2.778v11.212l5.656 39.393l-2.779 3.274l-46.834-15.975l-3.274-5.656l-4.664-52.986l-11.014-31.752l-2.381-7.541l37.507-25.798l11.709-4.664l10.319 12.7l8.93 7.939l10.32 3.274l4.663 1.39l5.656 24.409l4.267 5.16l10.815-3.771L128 229.01l40.682 19.25z'></path><path fill='#6D6B6D' d='m52.49 87.516l12.205-4.266l9.823 4.663l4.663 10.32l5.656-.893l1.39-5.656l-2.779-10.816l2.778-25.798l-2.381-14.09l8.434-9.823l18.257-14.487l-5.16-7.045l-25.798 12.7l-10.815 8.435l-6.053 13.097l-9.327 12.701l-2.778 14.983z'></path><path fill='#DCD9D8' d='M71.74 43.46s7.044-17.364 35.125-25.798c28.08-8.434 1.39-6.053 1.39-6.053L77.791 23.318L66.084 35.026l-5.16 9.327zM57.65 84.242s-9.824-32.844 27.683-37.507l-1.389-5.656l-25.798 6.053l-7.541 24.41l1.885 15.974z'></path><path fill='#F7E4CD' d='m72.633 127.802l6.151-5.954s2.779.298 3.275 3.572s1.885 32.844 22.028 48.72c1.885 1.488-14.983-2.382-14.983-2.382L74.12 148.341m84.739-29.47s1.091-14.189 4.961-13.097c3.87 1.091 3.87 4.96 3.87 4.96s-9.327 5.954-8.831 8.137m38.896-51.993s-7.74 1.587-8.434 8.434c-.695 6.846 8.434 1.389 9.823.893m-58.046-8.831s-10.32 1.389-10.32 7.938s11.709 6.052 14.983 3.274m-68.366 19.25S59.635 87.02 57.75 97.34s-6.053 17.76 2.778 28.576l-6.053-1.885l-5.655-14.487l-1.886-14.09L57.75 84.242l12.204.893l7.045 5.656zm8.435-29.569s7.937-41.278 48.223-49.216c33.14-6.549 50.604 1.39 57.153 8.93c0 0-29.569-35.125-57.65-24.409c-28.08 10.816-48.719 30.462-48.223 43.064c.794 21.63.496 21.63.496 21.63M194.48 32.645s-13.593-.496-14.09 11.708c0 0 0 1.886.894 3.771c0 0 10.815-12.205 17.364-5.656'></path><path fill='#F7E4CD' d='M135.045 49.414s-2.381-18.654-18.257-7.839c-10.32 7.045-9.328 16.868-7.541 18.754c1.885 1.885 1.389 5.655 2.778 3.076s.992-11.014 6.152-13.396c5.06-2.381 13.594-4.96 16.868-.595'></path><path fill='#49728B' d='M90.99 176.025L46.932 195.67s18.258 72.633 8.93 95.157l-6.548-2.381l-.496-27.684l-12.205-52.39l-5.16-14.488l45.941-30.958zm4.464 40.185l6.251 7.641v28.08h-7.441s-.893-19.646-.893-22.027s.893-10.816.893-10.816m1.389 37.11l-21.135.893l6.053 4.267l14.982 2.382'></path><path fill='#335061' d='m167.79 251.535l17.363-.496l4.267 43.063l-17.761 2.382z'></path><path fill='#335061' d='m172.453 251.535l26.195-1.39s10.816-27.187 10.816-28.576c0-1.39 9.327-39.392 9.327-39.392l-21.135-22.028l-4.267-3.77l-11.212 11.212v43.56z'></path><path fill='#49728B' d='m184.161 248.26l-16.372 3.275l2.382 13.098c6.052 2.778 16.372-4.664 16.372-4.664m-1.886-93.767l32.844 24.409l.893-11.213l-24.806-22.92z'></path><path fill='#FFF' d='m111.926 343.814l-9.724-39.392l-4.862-29.073l-.794-21.532l43.956-2.381h27.287l-2.48 49.215l4.266 38.003l-.496 7.045l-35.622 2.779z'></path><path fill='#DCD9D8' d='M161.736 251.039s-2.381 48.72 4.664 83.448c0 0-14.09 8.93-34.63 11.212l39.393-1.389l4.663-2.778l-5.655-76.8l-1.489-16.472'></path><path fill='#FFF' d='m190.115 290.431l18.257-5.16l34.63-1.885l5.16-15.975l-9.328-27.684l-10.815-1.389l-14.983 4.664l-14.289 7.045l-7.64-1.39l-5.954 2.382'></path><path fill='#DCD9D8' d='M189.817 281.005s12.205-5.656 14.09-5.16l-5.16-25.798l6.053-2.382s4.267 24.41 4.267 27.188c0 0 26.195 1.389 28.576 1.389c0 0 5.656-10.816 4.267-22.028l5.16 14.983l.496 8.434l-7.541 11.212l-8.434 1.886l-14.09-.496l-4.664-6.053l-16.372 2.381l-5.16 1.886'></path><path fill='#FFF' d='m171.361 247.764l-10.32-26.195l-10.815-15.48s2.382-6.548 5.656-6.548h10.816l10.32 3.77l-.894 17.365z'></path><path fill='#DCD9D8' d='M173.445 238.834s-13.098-25.302-13.098-29.073c0 0 2.382-5.656 5.656-4.266c3.275 1.389 10.32 5.16 10.32 5.16v-8.931l-15.976-3.274l-10.815 1.389l18.257 43.262l3.77.496'></path><path fill='#FFF' d='m116.093 177.017l-12.998-1.39l-12.205-3.77v4.267l5.953 6.549l18.754 8.434'></path><path fill='#DCD9D8' d='M95.157 178.406s14.486 6.053 19.25 4.664l.495 5.656l-13.097-2.779l-7.938-5.656z'></path><path fill='#D33833' d='M190.115 201.129c-7.938-.199-15.182-1.191-21.433-2.977c.397-2.58-.397-5.06.298-6.946c1.786-1.29 4.663-1.29 7.342-1.587c-2.282-1.092-5.556-1.588-8.136-.893c-.1-1.786-.893-2.878-1.39-4.267c4.466-1.588 14.984-12.006 20.937-8.633c2.878 1.687 4.069 11.014 4.267 15.678c.198 3.77-.397 7.541-1.885 9.625'></path><path stroke='#D33833' stroke-width='2' d='M190.115 201.129c-7.938-.199-15.182-1.191-21.433-2.977c.397-2.58-.397-5.06.298-6.946c1.786-1.29 4.663-1.29 7.342-1.587c-2.282-1.092-5.556-1.588-8.136-.893c-.1-1.786-.893-2.878-1.39-4.267c4.466-1.588 14.984-12.006 20.937-8.633c2.878 1.687 4.069 11.014 4.267 15.678c.198 3.77-.397 7.541-1.885 9.625Z'></path><path fill='#D33833' d='M152.112 188.13c0 .596 0 1.19-.1 1.786c-2.48 1.588-6.45 1.588-9.228 2.977c3.97.198 7.145 1.19 9.923 2.48c-.1 1.489-.1 3.077-.198 4.565c-4.565 3.076-8.732 7.74-14.09 10.716c-2.58 1.39-11.411 4.962-14.09 4.267c-1.489-.397-1.687-2.282-2.282-4.068c-1.29-3.77-4.267-9.923-4.565-15.678c-.298-7.243-1.091-19.448 6.747-17.96c6.35 1.191 13.693 4.069 18.555 6.748c3.076 1.786 4.763 3.77 9.328 4.167'></path><path stroke='#D33833' stroke-width='2' d='M152.112 188.13c0 .596 0 1.19-.1 1.786c-2.48 1.588-6.45 1.588-9.228 2.977c3.97.198 7.145 1.19 9.923 2.48c-.1 1.489-.1 3.077-.198 4.565c-4.565 3.076-8.732 7.74-14.09 10.716c-2.58 1.39-11.411 4.962-14.09 4.267c-1.489-.397-1.687-2.282-2.282-4.068c-1.29-3.77-4.267-9.923-4.565-15.678c-.298-7.243-1.091-19.448 6.747-17.96c6.35 1.191 13.693 4.069 18.555 6.748c3.076 1.786 4.763 3.77 9.328 4.167Z'></path><path fill='#D33833' d='M156.577 196.763c-.695-3.97-1.489-5.06-1.191-8.534c10.617-7.045 12.502 12.106 1.19 8.534'></path><path stroke='#D33833' stroke-width='2' d='M156.577 196.763c-.695-3.97-1.489-5.06-1.191-8.534c10.617-7.045 12.502 12.106 1.19 8.534Z'></path><path fill='#EF3D3A' d='M171.857 199.938s-3.274-4.664-.893-6.053s4.664 0 6.053-2.381c1.39-2.382 0-3.77.496-6.549c.496-2.778 2.778-3.274 5.16-3.77c2.381-.497 8.93-1.39 9.823.893l-2.778-8.435l-5.656-1.885l-17.761 10.32l-.893 5.16v10.319m-42.766 17.86c-.595-7.343-1.19-14.586-1.786-21.929c-.992-10.914 2.58-9.03 12.105-9.03c1.489 0 8.93 1.688 9.427 2.78c2.58 5.258-4.267 4.067 2.976 8.036c6.053 3.275 16.869-1.984 14.388-9.426c-1.39-1.687-7.144-.496-9.228-1.588l-11.014-5.655c-4.663-2.382-15.38-5.954-20.341-2.58c-12.602 8.533.794 29.966 5.259 38.896'></path><path fill='#231F20' d='M135.045 49.414c-12.8-2.977-19.15 5.358-23.02 13.99c-3.473-.793-2.084-5.556-1.19-7.937c2.281-6.251 11.51-14.686 19.05-13.495c3.175.397 7.541 3.374 5.16 7.442M197.259 63.9h.595c2.878 5.954 5.358 12.305 9.03 17.663c-2.48 5.755-18.456 10.716-18.258.595c3.473-1.488 9.427-.298 12.503-2.282c-1.786-4.862-4.267-9.03-3.87-15.975m-55.764.199c2.778 5.06 3.67 10.319 7.54 14.09c1.787 1.686 5.16 3.77 3.474 8.532c-.397 1.092-3.275 3.573-4.962 4.069c-6.052 1.786-20.242.397-15.479-7.244c5.06.199 11.808 3.275 15.579-.397c-2.878-4.564-8.038-13.693-6.152-19.05m53.482 51c-9.129 5.855-19.35 12.305-34.431 10.816c-3.175-2.778-4.465-9.03-1.29-13.097c1.587 2.778.595 7.938 5.16 8.731c8.533 1.489 18.455-5.259 24.607-7.54c3.77-6.45-.297-8.732-3.77-12.9c-7.045-8.434-16.372-18.952-16.075-31.553c2.878-2.084 3.076 3.175 3.473 4.068c3.671 8.533 12.9 19.547 19.547 26.89c1.687 1.786 4.366 3.572 4.664 4.763c.893 3.373-2.282 7.54-1.885 9.823M74.12 108.949c-2.877-1.687-3.571-8.831-6.945-9.03c-4.862-.297-3.969 9.328-3.969 14.983c-3.274-2.976-3.87-12.304-1.488-17.066c-2.778-1.39-3.97 1.488-5.557 2.48c2.084-14.387 21.135-6.648 17.96 8.633m126.611 12.204c-4.267 8.137-10.32 17.067-22.822 17.365c-.298-2.58-.496-6.648 0-8.236c9.625-.992 15.578-5.854 22.822-9.129m-59.932 5.259c7.938 4.168 22.623 4.664 33.538 4.366c.595 2.382.595 5.358.595 8.236c-13.99.595-30.462-2.878-34.133-12.602m-1.488 7.74c5.556 13.891 24.508 12.304 40.483 11.907c-.694 1.786-2.183 3.969-4.167 4.663c-5.16 2.084-19.25 3.672-26.394-.099c-4.465-2.381-7.442-7.839-9.922-11.014c-1.092-1.488-7.045-5.358 0-5.457'></path><path fill='#81B0C4' d='M194.282 210.654c-6.45 11.113-12.7 22.524-20.34 32.248c3.174-9.426 4.563-25.302 5.06-37.407c6.747-3.176 12.502.694 15.28 5.16'></path><path fill='#231F20' d='M229.11 250.543c-7.243 1.488-12.304 8.533-19.448 8.037c3.969-5.458 10.716-7.839 19.448-8.037m3.175 11.311c-5.953.596-12.899 1.588-18.852 1.092c2.877-4.366 13.792-2.779 18.852-1.092m2.084 9.824c-6.648.099-14.884 0-21.234-.497c3.77-4.068 16.967-1.488 21.234.497'></path><path fill='#DCD9D8' d='M181.78 298.468c.992 8.335 4.267 16.77 3.87 25.898c-3.672 1.19-5.755 2.282-10.717 2.282c-.297-7.74-1.389-19.646-1.091-27.088c2.381.198 5.953-1.687 7.938-1.092'></path><path fill='#F0D6B7' d='M171.064 175.43c-3.374 2.182-6.152 4.861-9.427 7.243c-7.144.397-11.014-.496-16.173-4.564c.099-.298.595-.199.595-.596c7.64 3.374 17.364-1.389 25.005-2.084'></path><path fill='#81B0C4' d='M131.175 227.324c2.084-9.03 10.32-13.792 17.761-18.753c7.64 9.724 12.304 22.226 17.464 34.331c-12.205-3.671-24.608-9.525-35.225-15.578'></path><path fill='#231F20' d='M173.842 299.659c-.298 7.442.694 19.25 1.091 27.088c4.962 0 7.045-1.091 10.717-2.282c.397-9.129-2.878-17.563-3.87-25.898c-1.985-.694-5.557 1.191-7.938 1.092M97.24 257.588c3.275 29.866 7.938 54.87 16.57 81.364c19.151 5.854 42.171 6.35 59.139 1.091c-3.076-14.883-1.786-33.041-3.572-49.017c-1.39-12.006-.695-24.012-2.58-36.217c-20.54-4.266-49.513-.992-69.557 2.779m74.419-2.58c-.199 12.8.595 25.5 1.588 38.3c4.96-.694 8.235-1.19 12.8-2.282c-1.489-12.304-1.29-26.294-4.366-37.209c-3.473.1-6.55 0-10.022 1.19m24.905-2.084c-2.381-.496-5.06 0-7.243 0c1.091 10.419 3.572 21.929 4.465 32.943c3.473.099 5.358-1.588 8.236-2.084c.198-9.625-.794-22.921-5.458-30.859m37.805 34.53c7.343-1.786 11.907-10.716 9.823-19.944c-1.389-6.152-3.77-17.86-6.45-21.83c-1.885-2.877-7.144-6.747-11.41-4.068c-6.847 4.366-18.853 5.656-23.814 10.915c2.48 8.335 3.274 19.647 4.266 30.164c8.534.497 18.952-2.38 26.097.695c-4.962 1.588-11.312 1.588-15.579 3.969c3.572 1.687 11.709 1.39 17.067.1m-68.068-44.552c-5.16-12.105-9.823-24.607-17.464-34.331c-7.442 4.96-15.578 9.724-17.761 18.753c10.716 6.053 23.12 11.907 35.225 15.578m12.7-37.407c-.496 12.105-1.885 27.981-5.06 37.407c7.64-9.823 13.892-21.135 20.341-32.248c-2.778-4.465-8.533-8.335-15.28-5.16m-14.387-5.06c-2.878-.299-5.358 3.373-9.129 1.785c-.893.992-1.687 1.985-2.58 2.977c8.335 10.12 12.205 24.41 18.655 36.217c3.473-11.41 3.076-23.814 3.87-36.217c-4.763.198-7.442-4.465-10.816-4.763m-9.228-12.206c-.298 3.473.496 4.565 1.19 8.534c11.312 3.572 9.427-15.579-1.19-8.534m-12.602-4.167c-4.862-2.68-12.204-5.557-18.555-6.747c-7.838-1.489-7.045 10.716-6.747 17.96c.298 5.754 3.275 11.807 4.565 15.677c.595 1.786.793 3.671 2.282 4.068c2.679.596 11.609-2.877 14.09-4.267c5.358-2.877 9.525-7.54 14.09-10.716c.099-1.488.099-3.076.198-4.564c-2.778-1.39-5.854-2.282-9.923-2.48c2.68-1.39 6.748-1.39 9.228-2.977c0-.596 0-1.191.1-1.787c-4.565-.496-6.252-2.48-9.328-4.167m-46.635-8.434c-4.068 4.167 11.41 9.724 16.273 10.022c0-2.58 1.488-5.06 1.19-6.946c-5.854-.992-13.494-.298-17.463-3.076m50.01 1.885c0 .397-.497.298-.596.596c5.259 4.068 9.128 4.96 16.173 4.564c3.176-2.282 6.053-5.06 9.427-7.244c-7.74.695-17.464 5.458-25.005 2.084M192 191.405c-.198-4.565-1.39-13.991-4.267-15.678c-5.953-3.473-16.471 7.045-20.936 8.633c.496 1.389 1.29 2.48 1.389 4.266c2.68-.694 5.854-.198 8.136.893c-2.679.298-5.556.298-7.342 1.588c-.596 1.885.198 4.366-.298 6.946c6.251 1.786 13.495 2.679 21.433 2.976c1.488-1.984 2.083-5.755 1.885-9.624M89.302 179.597c-1.29-.893-9.922-12.106-11.113-11.61c-15.578 6.153-30.164 16.77-43.163 26.89c12.403 26.692 17.464 59.337 18.357 90.791c14.19 6.648 26.691 16.273 46.04 17.265c-2.282-15.776-4.266-29.966-5.556-44.85c-4.862-2.083-11.808.1-16.372-.595c0-5.457 6.945-2.381 7.54-6.052c.398-2.779-3.87-2.977-2.48-7.343c3.572 1.29 5.457 4.167 9.228 5.259c3.473-7.541 0-20.936.496-27.287c.1-1.19.595-6.549 3.274-5.656c2.382.794-.099 14.388.1 20.341c.198 5.557-.695 10.816 1.587 14.289c18.655-2.58 37.607-4.168 57.848-4.763c-4.465-1.885-9.724-3.671-15.479-6.946c-3.175-1.786-12.998-5.457-13.891-8.434c-1.489-4.763 3.77-7.243 4.663-11.312c-9.426 5.16-11.212-4.96-13.494-12.006c-1.985-6.45-3.175-11.311-3.671-14.983c-8.236-4.167-16.968-8.037-23.914-12.998m94.462-10.32c12.999-6.25 15.38 23.517 10.22 33.142c.794 2.877 3.473 3.969 4.565 6.548c-7.244 12.999-15.28 25.104-22.723 37.904c5.458-3.473 13.396-.595 19.845-3.175c2.382-.893 4.069-6.35 5.855-10.716c4.96-11.907 10.12-26.99 12.403-38.3c.496-2.58 1.984-8.237 1.587-10.519c-.595-4.167-6.152-7.243-9.03-9.724c-5.258-4.763-8.533-8.83-14.09-13.296c-2.083 3.275-6.846 5.457-8.632 8.137m-124.13-115.2c-6.152 6.847-4.862 19.548-4.167 28.676c11.212-7.044 25.997.596 25.897 12.503c5.358-.1 1.985-6.648.993-10.915c-3.176-13.792 5.358-28.676.396-41.277c-9.624.793-17.463 4.663-23.119 11.014m44.254-39.59c-13.99 3.969-31.95 14.189-37.705 26.79c4.465-.694 7.541-2.877 11.907-3.175c1.687-.099 3.87.695 5.755.199c3.77-.992 7.045-9.526 9.922-12.701c2.779-3.076 6.152-4.465 8.435-7.243c1.488-.695 3.67-.695 3.77-2.878c-.595-.695-1.29-1.19-2.084-.992m72.93 3.77c-14.585-8.235-39.193-14.387-54.672-6.648c-12.503 6.251-29.37 16.57-35.126 29.57c5.358 12.6-1.587 24.11-2.084 36.91c-.198 6.847 3.176 12.702 3.473 20.144c-1.885 3.076-7.442 3.373-11.311 3.175c-1.29-6.55-3.572-13.892-10.32-14.686c-9.525-1.091-16.57 6.847-16.967 15.083c-.496 9.724 7.442 25.798 18.753 24.707c4.366-.397 5.458-4.763 10.22-4.763c2.58 5.16-3.968 6.747-4.663 10.418c-.199.993.496 4.664.992 6.45c2.084 8.434 6.648 19.448 11.113 25.898c5.755 8.235 16.968 9.426 29.073 10.22c2.183-4.664 10.121-4.267 15.28-3.076c-6.25-2.48-12.005-8.434-16.768-13.693c-5.458-6.053-11.014-12.502-11.312-20.44c10.419 14.387 18.952 26.989 37.805 33.34c14.288 4.762 30.958-2.184 41.972-9.923c4.564-3.176 7.243-8.335 10.518-12.9c12.105-17.463 17.761-42.27 16.57-66.381c-.496-9.922-.496-19.845-3.87-26.493c-3.472-6.946-15.28-13.296-22.226-6.946c-1.29-6.846 5.755-11.014 13.99-8.533c-5.853-7.64-12.005-16.67-20.44-21.433m27.188 224.348c11.411-5.656 32.645-15.182 39.69 0c2.68 5.655 5.755 15.082 7.045 20.936c1.885 8.137-2.084 25.402-10.518 28.08c-7.442 2.382-16.074 2.283-25.004.497c-1.092-.893-2.183-2.382-3.076-3.97c-6.35-.198-12.403.299-17.365 2.978c.496 4.762-2.679 5.457-5.755 6.45c-2.183 8.83 4.465 20.34 2.878 28.278c-1.092 5.755-8.137 6.648-13.296 7.64c-.199 3.176.198 5.855.595 8.534c-1.19 4.366-6.45 6.846-11.51 7.442c-16.57 1.984-41.674 2.877-57.55-2.878c-4.466-10.914-7.938-24.111-11.61-36.514c-15.479 1.686-28.08-6.649-39.888-12.205c-4.068-1.885-9.724-2.977-11.312-6.251c-1.488-3.175-.893-9.228-1.29-14.884c-.893-14.586-1.786-28.676-5.556-43.56c-1.687-6.747-4.763-12.601-6.847-19.05c-1.984-5.954-5.358-13.396-6.251-19.35c-1.29-8.83 7.045-9.327 12.304-13.197c8.236-5.953 14.685-9.228 23.615-14.586c2.68-1.587 10.617-5.556 11.51-7.442c1.787-3.67-3.075-8.83-4.365-11.708c-2.084-4.564-3.176-8.434-3.473-12.9c-7.442-1.19-13.197-5.655-16.57-10.616c-5.657-8.335-9.626-23.715-4.664-35.324c.397-.893 2.282-2.779 2.58-4.168c.595-2.778-1.092-6.45-1.191-9.426c-.496-15.182 2.58-28.28 12.8-32.844c4.167-16.57 19.05-22.027 33.042-30.263c5.259-3.076 11.014-5.06 16.967-7.244c21.333-7.838 54.177-6.35 71.938 7.045c7.541 5.656 19.547 17.662 23.814 26.394c11.41 22.921 10.518 61.321 2.58 89.303c-1.092 3.77-2.58 9.227-4.763 13.792c-1.488 3.175-6.152 9.426-5.656 12.204c.596 2.878 10.717 10.518 12.9 12.602c3.87 3.77 11.311 8.732 11.906 13.495c.695 5.06-2.182 12.006-3.67 16.868c-4.764 16.273-9.526 31.256-14.984 45.842'></path><path fill='#F7E4CD' d='M128.1 129.885c.595-.794 3.968-2.083 8.731.199c0 0-5.656.893-5.16 10.32l-2.381-.497c.1.1-2.381-8.434-1.19-10.022'></path><path fill='#1D1919' d='M169.178 210.456c0 1.389-1.19 2.58-2.58 2.58c-1.389 0-2.58-1.191-2.58-2.58s1.191-2.58 2.58-2.58c1.489 0 2.58 1.19 2.58 2.58m2.58 12.006c0 1.39-1.19 2.58-2.58 2.58c-1.389 0-2.58-1.19-2.58-2.58s1.191-2.58 2.58-2.58c1.489 0 2.58 1.092 2.58 2.58'></path><path fill='#231F20' d='M36.614 374.276q-1.191.15-2.084.298c-.595.1-1.19.198-1.985.397c-.893.198-1.389.595-1.587 1.19c-.199.596-.397 1.191-.397 1.985v24.21a14.3 14.3 0 0 1-1.39 6.153c-.892 1.885-2.083 3.373-3.67 4.663c-1.588 1.191-3.374 2.183-5.359 2.779c-1.984.595-4.068.992-6.25.992c-3.87 0-6.947-.893-9.328-2.778s-3.572-4.366-3.572-7.64c0-1.886.496-3.474 1.588-4.764c1.091-1.29 2.58-1.885 4.465-1.885c1.786 0 3.175.496 4.266 1.588c1.092 1.091 1.588 2.381 1.588 3.87c0 1.29-.496 2.58-1.39 3.67c-.892 1.092-1.984 2.184-3.174 3.077v.397c.198.397.595.794 1.19 1.091c.596.298 1.29.397 1.886.397c2.48 0 4.465-.893 5.854-2.679q2.084-2.679 2.084-8.037v-24.806c0-.695-.1-1.39-.298-1.886c-.199-.496-.794-.893-1.687-1.29c-.595-.297-1.39-.496-2.282-.694c-.893-.199-1.588-.298-2.183-.397v-2.381h23.417v2.48zm36.713 34.134c-.695 1.19-1.588 2.282-2.58 3.373s-2.183 1.885-3.473 2.68q-2.084 1.19-4.167 1.785c-1.39.397-3.076.596-4.862.596c-3.076 0-5.656-.397-7.938-1.29c-2.183-.893-4.068-1.985-5.458-3.473c-1.488-1.489-2.48-3.175-3.274-5.16a19.6 19.6 0 0 1-1.092-6.45c0-2.083.397-4.167 1.191-6.052s1.885-3.671 3.275-5.16q2.084-2.232 5.358-3.572a18.7 18.7 0 0 1 7.144-1.39c2.877 0 5.259.398 7.144 1.092s3.374 1.687 4.564 2.878c1.191 1.19 1.985 2.58 2.58 4.167c.496 1.588.794 3.275.794 5.06v1.985H51.597c0 4.267.793 7.442 2.48 9.625c1.588 2.183 4.267 3.275 7.74 3.275c1.984 0 3.671-.497 5.259-1.588a14.1 14.1 0 0 0 3.969-4.068zm-11.808-11.808c0-1.19-.1-2.48-.198-3.77c-.1-1.29-.298-2.382-.695-3.176c-.397-.992-.794-1.687-1.488-2.183c-.596-.496-1.39-.694-2.282-.694c-1.588 0-2.878.793-3.771 2.38c-.992 1.589-1.488 4.168-1.588 7.641zm55.566 19.15H98.431v-2.282c.397 0 .893-.1 1.389-.198c.595-.1.992-.199 1.29-.298c.397-.199.694-.595.893-.992c.198-.397.298-1.092.298-1.886V395.61q0-3.126-1.191-4.763c-.794-1.092-1.885-1.588-3.473-1.588c-.794 0-1.588.1-2.282.397c-.695.198-1.39.595-2.084 1.092c-.595.396-1.091.793-1.488 1.29q-.596.594-.893 1.19v16.57q0 1.042.297 1.787c.199.496.596.893.993 1.091a3.3 3.3 0 0 0 1.19.496l1.489.298v2.282H76.006v-2.282c.496 0 .992-.1 1.588-.198c.496-.1.992-.199 1.389-.298c.694-.199 1.091-.595 1.389-1.092c.198-.496.397-1.091.397-1.885v-18.059c0-.595-.199-1.29-.496-1.885c-.298-.595-.794-1.092-1.29-1.488c-.397-.199-.794-.497-1.39-.596a5.8 5.8 0 0 0-1.885-.297v-2.283l14.785-.793l.496.496v4.465h.1a30 30 0 0 0 2.083-1.885a29 29 0 0 1 2.282-1.787c.794-.496 1.786-.893 2.977-1.29c1.19-.396 2.58-.496 3.969-.496c3.373 0 5.854.993 7.54 2.878c1.688 1.885 2.481 4.465 2.481 7.64V409.8q0 1.19.298 1.786c.199.496.695.794 1.29 1.091c.298.1.695.298 1.19.397c.497.1.993.199 1.688.298v2.381zm42.667 0h-14.586a110 110 0 0 0-4.962-8.037c-1.488-2.183-2.877-4.267-4.167-6.053l-1.786 1.588v6.747c0 .695.1 1.39.298 1.786c.198.496.595.794 1.29 1.092c.396.198.793.297 1.29.397c.496.099.992.198 1.488.198v2.282h-19.25v-2.282c.496 0 .992-.1 1.588-.198c.496-.1.992-.199 1.389-.298c.695-.199 1.091-.595 1.39-1.092c.198-.496.396-1.091.396-1.885v-34.53c0-.695-.198-1.39-.496-2.084s-.695-1.29-1.29-1.687c-.397-.198-.992-.496-1.786-.595c-.794-.198-1.488-.298-2.183-.298v-2.282l15.38-.794l.496.496v31.95c1.488-1.388 3.274-2.976 5.16-4.762c1.885-1.786 3.472-3.274 4.564-4.465c.695-.695 1.091-1.19 1.091-1.588c.1-.397.1-.595.1-.694c0-.397-.298-.695-.993-.893c-.694-.199-1.587-.496-2.976-.695v-2.183h15.677v2.183c-2.084.596-3.671 1.092-4.763 1.588c-1.091.496-2.282 1.19-3.572 1.984a54 54 0 0 0-2.48 1.786c-.794.596-1.687 1.39-2.779 2.282c1.985 2.977 3.87 5.656 5.557 8.137c1.687 2.48 3.473 5.16 5.358 7.938c.595.992 1.39 1.588 2.381 1.984c.993.298 1.886.497 2.878.596v2.381zm19.845 0h-19.548v-2.282c.496 0 1.092-.1 1.588-.198c.496-.1.992-.199 1.29-.298c.694-.199 1.091-.595 1.389-1.092c.298-.496.397-1.091.397-1.885v-18.059c0-.694-.199-1.389-.496-1.885a3 3 0 0 0-1.19-1.29c-.398-.198-.894-.496-1.688-.695s-1.488-.396-2.083-.396v-2.283l15.181-.793l.496.496v24.607c0 .695.199 1.29.496 1.886c.298.496.794.893 1.29 1.091a5.7 5.7 0 0 0 1.39.496c.495.1.992.199 1.587.298v2.282zm-4.465-42.17c0 1.587-.596 2.877-1.787 3.969c-1.19 1.091-2.679 1.686-4.266 1.686c-1.687 0-3.076-.595-4.366-1.686c-1.19-1.092-1.786-2.481-1.786-3.97c0-1.587.595-2.877 1.786-4.068c1.19-1.091 2.679-1.686 4.366-1.686s3.076.595 4.266 1.686c1.191 1.092 1.787 2.481 1.787 4.069m48.223 42.17H204.7v-2.282c.396 0 .893-.1 1.389-.198c.595-.1.992-.199 1.29-.298c.396-.199.694-.595.893-.992c.198-.397.297-1.092.297-1.886V395.61q0-3.126-1.19-4.763c-.794-1.092-1.886-1.588-3.473-1.588c-.794 0-1.588.1-2.282.397c-.695.298-1.39.595-2.084 1.092c-.596.396-1.092.793-1.489 1.29q-.594.594-.893 1.19v16.57q0 1.042.298 1.787c.199.496.595.893.992 1.091c.298.199.695.397 1.191.496l1.488.298v2.282h-18.852v-2.282c.496 0 .992-.1 1.587-.198c.496-.1.993-.199 1.39-.298c.694-.199 1.09-.595 1.389-1.092c.198-.496.397-1.091.397-1.885v-18.059c0-.595-.199-1.29-.497-1.885c-.297-.595-.793-1.092-1.29-1.488c-.396-.199-.793-.497-1.389-.596a5.8 5.8 0 0 0-1.885-.297v-2.283l14.785-.793l.496.496v4.465h.099a30 30 0 0 0 2.084-1.885a29 29 0 0 1 2.282-1.787c.794-.496 1.786-.893 2.977-1.29c1.19-.396 2.58-.496 3.969-.496c3.373 0 5.854.993 7.54 2.878c1.687 1.885 2.481 4.465 2.481 7.64V409.8q0 1.19.298 1.786c.198.496.694.794 1.29 1.091c.297.1.694.298 1.19.397c.497.1.993.199 1.687.298v2.381zm17.165 1.092c-1.984 0-3.968-.298-5.854-.893c-1.885-.596-3.373-1.191-4.465-1.886l-.893 2.084h-2.381l-.397-11.51h2.282c.298.893.794 1.984 1.588 3.175c.694 1.19 1.587 2.183 2.48 3.175a17 17 0 0 0 3.374 2.382c1.29.595 2.58.992 3.969.992c1.885 0 3.274-.397 4.167-1.091c.893-.695 1.39-1.886 1.39-3.374q0-1.19-.596-2.084c-.397-.496-.992-.992-1.687-1.389c-.793-.397-1.686-.794-2.679-1.091c-.992-.298-2.183-.596-3.572-1.092c-1.389-.397-2.58-.794-3.572-1.29c-.992-.397-2.084-1.091-3.076-1.984c-.893-.794-1.687-1.786-2.183-2.878c-.595-1.091-.794-2.48-.794-4.068c0-2.878 1.191-5.259 3.672-7.045s5.656-2.68 9.625-2.68c1.885 0 3.572.2 5.16.596c1.587.397 2.877.794 3.968 1.29l.695-1.786h2.381l.496 10.518h-2.183c-.694-2.183-1.984-3.969-3.67-5.557q-2.68-2.38-5.657-2.381c-1.587 0-2.877.298-3.77.992c-.893.695-1.39 1.588-1.39 2.779c0 1.587.695 2.679 1.985 3.373s3.175 1.39 5.557 1.985c3.671.992 6.35 2.282 8.136 3.87c1.687 1.686 2.58 3.77 2.58 6.25c0 3.374-1.29 6.053-3.969 7.84c-2.977 1.785-6.45 2.778-10.716 2.778'></path></svg>
                </Button>
              </section>
              {/* <Clerk.Input name='button' type='button' className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50' /> */}
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
  </TooltipProvider>
);
SignedOutButton.displayName = 'SignedInButton';

export {SignedOutButton};
