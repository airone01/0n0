'use client';

import * as React from 'react';
import {PaletteIcon} from 'lucide-react';
import {useTheme} from 'next-themes';
import {atom, useAtom} from 'jotai';
import {useEffect} from 'react';
import {Button} from '../button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '../dropdown-menu';
import {
	type ThemeLuminiosity, themesColors, type ThemeColors, themesLuminiosity,
	getPrimaryFromColor,
} from '../../lib/themes';

const luminiosityAtom = atom<ThemeLuminiosity>('dark');
const colorsAtom = atom<ThemeColors>('orange');

export function ModeToggle() {
	const {theme, setTheme} = useTheme();
	const [luminiosity, setLuminiosity] = useAtom(luminiosityAtom);
	const [colors, setColors] = useAtom(colorsAtom);

	useEffect(() => {
		if (theme === undefined) {
			return;
		}

		// Fetch the theme from the storage
		const [colors, luminiosity] = theme.split('-') as [ThemeColors, ThemeLuminiosity];
		setColors(colors);
		setLuminiosity(luminiosity);
	}, [theme]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild onSelect={event => {
				event.preventDefault();
			}}>
				<Button variant='outline' size='icon'>
					<PaletteIcon className='h-[1.2rem] w-[1.2rem]' />
					<span className='sr-only'>Change site theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Theme</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Luminiosity</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuRadioGroup value={luminiosity} onValueChange={luminiosity => {
									setLuminiosity(luminiosity as ThemeLuminiosity);
									setTheme(`${colors}-${luminiosity}`);
								}}>
									{themesLuminiosity.map(themeLuminiosity => <DropdownMenuRadioItem key={themeLuminiosity} className='capitalize' value={themeLuminiosity}>{themeLuminiosity}</DropdownMenuRadioItem>)}
								</DropdownMenuRadioGroup>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuGroup>
				<DropdownMenuGroup>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Colors</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuRadioGroup value={colors} onValueChange={colors => {
									setColors(colors as ThemeColors);
									setTheme(`${colors}-${luminiosity}`);
								}}>
									{themesColors.map(themeColors => <DropdownMenuRadioItem key={themeColors} className='capitalize flex justify-between' value={themeColors}>
										<p>
											{themeColors}
										</p>
										<div className={`w-4 h-4 rounded-full border ${getPrimaryFromColor(themeColors)}`} />
									</DropdownMenuRadioItem>)}
								</DropdownMenuRadioGroup>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
