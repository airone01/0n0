'use client';

import {useEffect, useRef} from 'react';
import {FFmpeg} from '@ffmpeg/ffmpeg';
import {toBlobURL} from '@ffmpeg/util';
import {type PrimitiveAtom, atom, useAtom} from 'jotai';
import FileCard from '@/ui/file-card';
import {Button} from '@/ui/button';
import {type AugmentedFileType} from '~/ffmpeg-util';

function newFfmpegNoNodeError() {
	try {
		return new FFmpeg();
	} catch (error: unknown) {
		if (error instanceof Error && error.message === 'ffmpeg.wasm does not support nodejs') { /* */ } else {
			throw error;
		}
	}
}

type Properties = {
	ffmpegMessagesAtom: PrimitiveAtom<string[]>;
	percentAtom: PrimitiveAtom<number>;
};

const ffmpegLoadedAtom = atom(false);
const fileLoadedAtom = atom(false);
const transcodedDataAtom = atom<Blob | undefined>(undefined);
const outputFileNameAtom = atom<string | undefined>(undefined);
const chosenAugmentedFileTypeAtom = atom<AugmentedFileType | undefined>(undefined);
const filesAtom = atom<File[]>([]);

export default function Ffmpeg({
	ffmpegMessagesAtom,
	percentAtom,
}: Properties) {
	const [files] = useAtom(filesAtom);
	const [ffmpegLoaded, setFfmpegLoaded] = useAtom(ffmpegLoadedAtom);
	const [fileLoaded, setFileLoaded] = useAtom(fileLoadedAtom);
	const [transcodedData, setTranscodedData] = useAtom(transcodedDataAtom);
	const [outputFileName, setOutputFileName] = useAtom(outputFileNameAtom);
	const [chosenAugmentedFileType] = useAtom(chosenAugmentedFileTypeAtom);
	const [, setFfmpegMessages] = useAtom(ffmpegMessagesAtom);
	const [, setPercent] = useAtom(percentAtom);

	const {current: ffmpeg} = useRef<FFmpeg>(newFfmpegNoNodeError()!);

	const loadFfmpeg = async () => {
		const baseUrl = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
		ffmpeg.on('log', ({message}) => {
			setFfmpegMessages(oldMessage => [...oldMessage, message]);
		});

		// ToBlobURL is used to bypass CORS issue, urls with the same
		// domain can be used directly.
		try {
			await ffmpeg.load({
				// eslint-disable-next-line @typescript-eslint/naming-convention
				coreURL: await toBlobURL(`${baseUrl}/ffmpeg-core.js`, 'text/javascript'),
				// eslint-disable-next-line @typescript-eslint/naming-convention
				wasmURL: await toBlobURL(`${baseUrl}/ffmpeg-core.wasm`, 'application/wasm', true, event => {
					setPercent(Math.floor(event.received / 32_129_114 * 100));
				}),
			});
		} catch (error) {
			console.error(error);
			setPercent(0);
			return;
		}

		setPercent(100);
		setFfmpegLoaded(true);
	};

	const transcode = async () => {
		const myOutputFileName = `output_file.${chosenAugmentedFileType?.extension!.toLowerCase()}`;
		setOutputFileName(myOutputFileName);
		try {
			const test = await ffmpeg.exec(['-i', 'input_file', myOutputFileName]);
			console.log('test', test);
		} catch {
			console.log('CRASHED 1');
		}

		try {
			const data = await ffmpeg.readFile(myOutputFileName);
			console.log('data', data);
			setTranscodedData(new Blob([data], {type: chosenAugmentedFileType?.mimeType}));
		} catch {
			console.log('CRASHED 2');
		}
	};

	useEffect(() => {
		(async () => {
			// TODO: handle multiple files
			if (files[0] === undefined) {
				return;
			}

			const result = await files[0].arrayBuffer();
			const fileData = new Uint8Array(result);
			await ffmpeg.writeFile('input_file', fileData);
		})().then(() => {
			setFileLoaded(true);
			console.log('loading file: done.');
		}).catch(error => {
			console.error(error);
		});
	}, [files]);

	useEffect(() => {
		void loadFfmpeg();
	}, []);

	return <>
		<div className='flex flex-col w-96 max-w-sm justify-center items-center gap-1.5'>
			<FileCard filesAtom={filesAtom} augmentedFileTypeAtom={chosenAugmentedFileTypeAtom} transcode={transcode} fileLoaded={fileLoaded && ffmpegLoaded} />
		</div>

		{transcodedData === null || transcodedData === undefined
			? <></> : <a href={URL.createObjectURL(transcodedData)} target='_blank' rel='noopener noreferrer' download={outputFileName}><Button>{transcodedData === null ? '...' : 'Download file'}</Button></a>}
	</>;
}

