'use client';

import {atom, useAtom} from 'jotai';
import {ChevronsUpIcon} from 'lucide-react';
import React from 'react';
import {Libre_Franklin} from 'next/font/google';
import TypingAnimation from '@/typing-animation';
import Ffmpeg from '@/ffmpeg';
import {
	Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTrigger,
} from '@/ui/drawer';
import {RadialLoader} from '@/ui/radial-loader';
import {cn} from '~/lib/utils';

const percentAtom = atom(0);
const ffmpegMessagesAtom = atom<string[]>([]);

export default function HomePage() {
	const [ffmpegMessages] = useAtom(ffmpegMessagesAtom);

	return (
		<>
			<main className='grow flex flex-col items-center justify-start gap-4'>
				<Title />
				<Ffmpeg ffmpegMessagesAtom={ffmpegMessagesAtom} percentAtom={percentAtom} />
			</main >
			<Drawer>
				<DrawerTrigger className='grow-0'><ChevronsUpIcon /></DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>Ffmpeg.wasm messages</DrawerHeader>
					<DrawerDescription>{ffmpegMessages.map((message, index) => <span key={`ffmpeg-msg-${index}`}>{message}<br /></span>)}</DrawerDescription>
				</DrawerContent>
			</Drawer>
		</>
	);
}

// eslint-disable-next-line new-cap
const libreFranklin = Libre_Franklin({
	weight: '900',
	subsets: ['latin'],
});

const Title = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
	({className, ...properties}, reference) =>
		<div ref={reference} className={cn(libreFranklin.className, 'container flex flex-col items-center justify-center py-4', className)} {...properties}>
			<div className='flex just-center items-center'>
				<h1 className='text-6xl font-extrabold'>converter</h1>
				<RadialLoader percentAtom={percentAtom} />
			</div>
			<TypingAnimation />
		</div>,
);
Title.displayName = 'Title';
