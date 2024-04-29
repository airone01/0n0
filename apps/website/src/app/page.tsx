import Link from 'next/link';
import {Button} from '@0n0/ui/button';
import {ClapperboardIcon, GithubIcon} from 'lucide-react';

export default function HomePage() {
	return (
		<main className='flex flex-col items-center justify-center'>
			<p className='text-center'>
				Hello, world!<br />
				This website and all of its future subdomains are a <i>work in progress</i>.<br />
				In the meantime, check out my <Link href='https://mov.0n0.sh/'>
					<Button>self-hosted movie-web instance</Button>
				</Link> or my <Link href='https://github.com/AirOne01'>
					<Button>Github</Button>
				</Link>.
			</p>
		</main>
	);
}
