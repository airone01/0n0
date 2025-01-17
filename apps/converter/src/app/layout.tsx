import {Poppins} from 'next/font/google';
import {ModeToggle} from '@0n0/ui/mode-toggle';
import '@0n0/ui/globals.css';
import {themes} from '@0n0/ui/lib/themes';
import {ThemeProvider} from '@/theme-provider';

// eslint-disable-next-line new-cap
const poppins = Poppins({
	weight: '500',
	subsets: ['latin'],
});

export const metadata = {
	title: 'Converter',
	description: 'Convert all files on the fly!',
	icons: [{rel: 'icon', url: '/favicon.ico'}],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`${poppins.className} flex flex-col min-h-screen antialiased bg-background text-foreground`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='orange-dark'
					themes={[...themes]}
					disableTransitionOnChange
				>
					<nav className='grow-0 flex flex-row-reverse p-2'>
						<ModeToggle />
					</nav>
					<div className='h-full grow flex flex-col justify-center items-center'>
						{children}
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
