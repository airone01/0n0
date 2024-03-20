import Image from 'next/image';
import {type PrimitiveAtom, atom, useAtom} from 'jotai';
import {forwardRef, type ReactElement} from 'react';
import {XIcon} from 'lucide-react';
import {FileTypeButton} from '../filetype-button';
import {Dialog, DialogTrigger, DialogContent} from './dialog';
import {Input} from './input';
import {
	Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from './card';
import {Button} from './button';
import MyMediaPlayer from './media-player';
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from './carousel';
import {type AugmentedFileType, type actionsFromFile} from '~/ffmpeg-util';
import {cn} from '~/lib/utils';

type Properties = {
	fileLoaded: boolean;
	filesAtom: PrimitiveAtom<File[]>;
	transcode: () => void;
	augmentedFileTypeAtom: PrimitiveAtom<AugmentedFileType | undefined>;
};

const widthHeightAtom = atom<[number | undefined, number | undefined]>([undefined, undefined]);
const carouselAtom = atom<CarouselApi | undefined>(undefined);

export default function FileCard({fileLoaded, filesAtom, transcode, augmentedFileTypeAtom}: Properties) {
	const [files, setFiles] = useAtom(filesAtom);

	const onFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const {files} = event.target;

		if (files === null || files?.length === 0) {
			setFiles([]);
			return;
		}

		setFiles(Array.from(files));
	};

	let cardFooter: ReactElement | undefined;

	// Switch (fileMode) {
	// 	case 'single': {
	// 		const file = files[0]!;
	// 		const fileActions = actionsFromFile(file);

	// 		cardTitle = 'Convert your file';
	// 		cardDesc = 'Now hit the convert button below';
	// 		cardContent = <SingleFileHeader file={file} />;
	// 		cardFooter = <SingleFileFooter file={file} fileActions={fileActions} fileLoaded={fileLoaded} transcode={transcode} augmentedFileTypeAtom={augmentedFileTypeAtom} />;
	// 		break;
	// 	}

	// 	case 'multiple': {
	// 		cardTitle = 'Convert your files';
	// 		cardDesc = 'Now hit the convert button below';
	// 		cardContent = <MultipleFileHeader files={files} />;
	// 		cardFooter = <MultipleFilesFooter fileLoaded={fileLoaded} transcode={transcode} fileActions={actionsFromFile(files[0])} augmentedFileTypeAtom={augmentedFileTypeAtom} />;
	// 		break;
	// 	}

	// 	// Case 'none':
	// 	default:
	// }

	return <Card className='w-96'>
		<CardHeader>
			<CardTitle>Upload a file</CardTitle>
			<CardDescription>Click the upload button or drag and drop below</CardDescription>
		</CardHeader>
		<CardContent className='flex flex-col justify-center items-center gap-2'>
			<Input id='file' multiple type='file' onChange={onFileUpload} />
			{files.length > 0 && <div className='w-full flex flex-col justify-center items-center gap-1 rounded-xl border bg-card text-card-foreground shadow p-1'>
				{files.map((file, index) =>
					<FileElement file={file} key={`filelist_file_${index}`} />,
				)}
			</div>}
		</CardContent>
		{cardFooter && <CardFooter>
			{cardFooter}
		</CardFooter>}
	</Card>;
}

type FileElementProperties = {
	file: File;
} & React.HTMLProps<HTMLDivElement>;
const FileElement = forwardRef<HTMLDivElement, FileElementProperties>(
	({className, file, ...properties}, reference) => {
		const [, ...secondPartOfFileType] = file.type.split('/');
		const actualFileType = secondPartOfFileType.join('/');

		return <div ref={reference} className={cn('w-full flex justify-between items-center', className)} {...properties}>
			{['image', 'video'].includes(file.type.split('/')[0]!) ? <Dialog>
				<DialogTrigger asChild>
					<p className='underline cursor-pointer hover:text-primary text-md [&:not(:first-child)]:mt-6 pl-2 py-0 truncate'>{file.name}</p>
				</DialogTrigger>
				<DialogContent>
					{/* TODO: Play video or show image here */}
				</DialogContent>
			</Dialog> : <p className='text-md [&:not(:first-child)]:mt-6 pl-2 py-0 truncate'>{file.name}</p>}
			<div className='flex justify-center items-center gap-2'>
				<p className='text-sm text-muted-foreground'>{actualFileType}</p>
				<Button variant='destructive' className='w-7 h-7 p-1'>
					<XIcon />
				</Button>
			</div>
		</div>;
	},
);
FileElement.displayName = 'FileElement';

type SingleFileHeaderProperties = {
	file: File;
} & React.HTMLProps<HTMLDivElement>;
const SingleFileHeader = forwardRef<HTMLDivElement, SingleFileHeaderProperties>(
	({className, file, ...properties}, reference) => {
		const [widthHeight, setWidthHeight] = useAtom(widthHeightAtom);

		return <>
			{file.type.startsWith('image')
				? <Image
					alt={file.name}
					src={URL.createObjectURL(file)}
					width={300}
					height={300}
					className='w-full h-full object-contain rounded-t-xl'
				/>
				: (file.type.startsWith('video')
					? <MyMediaPlayer file={file} setWidthHeight={setWidthHeight} />
					: 'Unknown file type')
			}
			<div ref={reference} className={cn('text-center w-full', className)} {...properties}>
				<p className='text-lg font-semibold w-full px-2 truncate'>{file.name}</p>
				<p className='text-sm text-gray-500 dark:text-gray-400'>{file.type}</p>
				{widthHeight[0] === undefined ? ''
					: <p className='text-sm text-gray-500 dark:text-gray-400'>{widthHeight[0]} x {widthHeight[1]} pixels</p>}
			</div>
		</>;
	},
);
SingleFileHeader.displayName = 'SingleFileHeader';

type SingleFileFooterProperties = {
	file: File;
	fileActions: ReturnType<typeof actionsFromFile>;
	fileLoaded: boolean;
	transcode: () => void;
	augmentedFileTypeAtom: PrimitiveAtom<AugmentedFileType | undefined>;
} & React.HTMLProps<HTMLDivElement>;
const SingleFileFooter = forwardRef<HTMLDivElement, SingleFileFooterProperties>(
	({className, fileActions, transcode, fileLoaded, augmentedFileTypeAtom, file, ...properties}, reference) => {
		const [chosenAugmentedFileType, setChosenAugmentedFileType] = useAtom(augmentedFileTypeAtom);

		return <div className='w-96 flex flex-col justify-center items-center gap-4'>
			<h3>Select a format to convert to</h3>
			<div className='flex flex-wrap justify-center items-center gap-1'>
				{fileActions.map(({format}, index) => <FileTypeButton className={format === chosenAugmentedFileType ? 'outline' : ''} variant='outline' key={`action-${format.extension}-${index}`} fileType={format} onClick={() => {
					setChosenAugmentedFileType(format);
				}} />)}
			</div>
			<h3>And hit this button!</h3>
			<Button disabled={!fileLoaded} variant='destructive' className='bg-green-700 hover:bg-green-600' onClick={transcode}>{fileLoaded ? 'Convert!' : 'Loading...'}</Button>
		</div>;
	},
);
SingleFileFooter.displayName = 'SingleFileFooter';

type MultipleFileHeaderProperties = {
	files: File[];
} & React.HTMLProps<HTMLDivElement>;
const MultipleFileHeader = forwardRef<HTMLDivElement, MultipleFileHeaderProperties>(
	({className, files, ...properties}, reference) => {
		const [widthHeight, setWidthHeight] = useAtom(widthHeightAtom);
		const [, setApi] = useAtom(carouselAtom);

		return <Carousel
			ref={reference}
			setApi={setApi}
			className='max-w-md'
		>
			<CarouselContent>
				{files.map((file, index) =>
					<CarouselItem key={`carousel-file-${index}`}>
						<div className='flex justify-center items-center p-2'>
							<Card className='w-full'>
								<CardContent className='flex flex-col items-center gap-4 select-none'>
									<div className='aspect-video w-full'>
										{file.type.startsWith('image')
											? <Image
												alt={file.name}
												src={URL.createObjectURL(file)}
												width={300}
												height={300}
												className='w-full h-full object-contain rounded-t-xl'
											/>
											: (file.type.startsWith('video')
												? <MyMediaPlayer file={file} setWidthHeight={setWidthHeight} />
												: 'Unknown file type')
										}
									</div>
									<div className='text-center w-full'>
										<p className='text-lg font-semibold w-full px-2 truncate'>{file.name}</p>
										<p className='text-sm text-gray-500 dark:text-gray-400'>{file.type}</p>
										{widthHeight[0] === undefined ? ''
											: <p className='text-sm text-gray-500 dark:text-gray-400'>{widthHeight[0]} x {widthHeight[1]} pixels</p>}
									</div>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>,
				)}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>;
	},
);
MultipleFileHeader.displayName = 'MultipleFileHeader';

type MultipleFilesFooterProperties = {
	fileLoaded: boolean;
	transcode: () => void;
	fileActions: ReturnType<typeof actionsFromFile>;
	augmentedFileTypeAtom: PrimitiveAtom<AugmentedFileType | undefined>;
} & React.HTMLProps<HTMLDivElement>;
const MultipleFilesFooter = forwardRef<HTMLDivElement, MultipleFilesFooterProperties>(
	({className, fileLoaded, fileActions, transcode, augmentedFileTypeAtom, ...properties}, reference) => {
		const [chosenAugmentedFileType, setChosenAugmentedFileType] = useAtom(augmentedFileTypeAtom);

		return <div className='w-96 flex flex-col justify-center items-center gap-4'>
			<h3>Select a format to convert to</h3>
			<div className='flex flex-wrap justify-center items-center gap-1'>
				{fileActions.map(({format}, index) => <FileTypeButton className={format === chosenAugmentedFileType ? 'outline' : ''} variant='outline' key={`action-${format.extension}-${index}`} fileType={format} onClick={() => {
					setChosenAugmentedFileType(format);
				}} />)}
			</div>
			<h3>And hit this button!</h3>
			<Button disabled={!true} variant='destructive' className='bg-green-700 hover:bg-green-600' onClick={transcode}>Convert</Button>
		</div>;
	},
);
MultipleFilesFooter.displayName = 'MultipleFilesFooter';
