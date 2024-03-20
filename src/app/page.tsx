'use client';

import {atom, useAtom} from 'jotai';
import {ChevronsUpIcon} from 'lucide-react';
import TypingAnimation from '@/typing-animation';
import Ffmpeg from '@/ffmpeg';
import {
	Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTrigger,
} from '@/ui/drawer';
import {RadialLoader} from '@/ui/radial-loader';

const percentAtom = atom(0);
const ffmpegMessagesAtom = atom<string[]>([]);

export default function HomePage() {
	const [ffmpegMessages] = useAtom(ffmpegMessagesAtom);

	return (
		<>
			<main className='grow flex flex-col items-center justify-center'>
				<div className='container flex flex-col items-center justify-center p-8 pt-12'>
					<div className='flex just-center items-center'>
						<h1 className='text-6xl font-extrabold'>NoConverter</h1>
						<RadialLoader percentAtom={percentAtom} />
					</div>
					<TypingAnimation />
				</div>
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
