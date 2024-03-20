import {Poppins} from 'next/font/google';
import '~/styles/globals.css';
import {ThemeProvider} from '@/theme-provider';
import {ModeToggle} from '@/ui/mode-toggle';

// eslint-disable-next-line new-cap
const poppins = Poppins({
	weight: '500',
	subsets: ['latin'],
});

export const metadata = {
	title: 'NoConverter',
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
			<body className={`${poppins.className} flex flex-col min-h-screen antialiased`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
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
