'use client';

import * as React from 'react';
import {MoonIcon, SunIcon} from 'lucide-react';
import {useTheme} from 'next-themes';
import {Button} from '@/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/dropdown-menu';

export function ModeToggle() {
	const {setTheme} = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon'>
					<SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem className='flex gap-2 cursor-pointer' onClick={() => {
					setTheme('light');
				}}>
          Light
				</DropdownMenuItem>
				<DropdownMenuItem className='flex gap-2 cursor-pointer' onClick={() => {
					setTheme('dark');
				}}>
          Dark
				</DropdownMenuItem>
				<DropdownMenuItem className='flex gap-2 cursor-pointer' onClick={() => {
					setTheme('system');
				}}>
          System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
