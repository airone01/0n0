import {type PrimitiveAtom, useAtom} from 'jotai';
import {Input} from '@0n0/ui/input';
import {
	Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@0n0/ui/card';

type Properties = {
	filesAtom: PrimitiveAtom<File[]>;
	// Transcode: () => void;
	// augmentedFileTypeAtom: PrimitiveAtom<AugmentedFileType | undefined>;
};

// Const widthHeightAtom = atom<[number | undefined, number | undefined]>([undefined, undefined]);
// const carouselAtom = atom<CarouselApi | undefined>(undefined);

export default function InputCard({filesAtom}: Properties) {
	const [, setFiles] = useAtom(filesAtom);

	const onFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const {files} = event.target;

		if (files === null || files?.length === 0) {
			setFiles([]);
			return;
		}

		setFiles(Array.from(files));
	};

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
			<CardTitle>Upload one or more files</CardTitle>
			<CardDescription>Click the upload button or drag and drop below</CardDescription>
		</CardHeader>
		<CardContent className='flex flex-col justify-center items-center gap-2'>
			<Input id='file' multiple type='file' onChange={onFileUpload} />
		</CardContent>
	</Card>;
}

// Type SingleFileHeaderProperties = {
// 	file: File;
// } & React.HTMLProps<HTMLDivElement>;
// const SingleFileHeader = forwardRef<HTMLDivElement, SingleFileHeaderProperties>(
// 	({className, file, ...properties}, reference) => {
// 		const [widthHeight, setWidthHeight] = useAtom(widthHeightAtom);

// 		return <>
// 			{file.type.startsWith('image')
// 				? <Image
// 					alt={file.name}
// 					src={URL.createObjectURL(file)}
// 					width={300}
// 					height={300}
// 					className='w-full h-full object-contain rounded-t-xl'
// 				/>
// 				: (file.type.startsWith('video')
// 					? <MyMediaPlayer file={file} setWidthHeight={setWidthHeight} />
// 					: 'Unknown file type')
// 			}
// 			<div ref={reference} className={cn('text-center w-full', className)} {...properties}>
// 				<p className='text-lg font-semibold w-full px-2 truncate'>{file.name}</p>
// 				<p className='text-sm text-gray-500 dark:text-gray-400'>{file.type}</p>
// 				{widthHeight[0] === undefined ? ''
// 					: <p className='text-sm text-gray-500 dark:text-gray-400'>{widthHeight[0]} x {widthHeight[1]} pixels</p>}
// 			</div>
// 		</>;
// 	},
// );
// SingleFileHeader.displayName = 'SingleFileHeader';

// type SingleFileFooterProperties = {
// 	file: File;
// 	fileActions: ReturnType<typeof actionsFromFile>;
// 	fileLoaded: boolean;
// 	transcode: () => void;
// 	augmentedFileTypeAtom: PrimitiveAtom<AugmentedFileType | undefined>;
// } & React.HTMLProps<HTMLDivElement>;
// const SingleFileFooter = forwardRef<HTMLDivElement, SingleFileFooterProperties>(
// 	({className, fileActions, transcode, fileLoaded, augmentedFileTypeAtom, file, ...properties}, reference) => {
// 		const [chosenAugmentedFileType, setChosenAugmentedFileType] = useAtom(augmentedFileTypeAtom);

// 		return <div className='w-96 flex flex-col justify-center items-center gap-4'>
// 			<h3>Select a format to convert to</h3>
// 			<div className='flex flex-wrap justify-center items-center gap-1'>
// 				{fileActions.map(({format}, index) => <FileTypeButton className={format === chosenAugmentedFileType ? 'outline' : ''} variant='outline' key={`action-${format.extension}-${index}`} fileType={format} onClick={() => {
// 					setChosenAugmentedFileType(format);
// 				}} />)}
// 			</div>
// 			<h3>And hit this button!</h3>
// 			<Button disabled={!fileLoaded} variant='destructive' className='bg-green-700 hover:bg-green-600' onClick={transcode}>{fileLoaded ? 'Convert!' : 'Loading...'}</Button>
// 		</div>;
// 	},
// );
// SingleFileFooter.displayName = 'SingleFileFooter';

// type MultipleFileHeaderProperties = {
// 	files: File[];
// } & React.HTMLProps<HTMLDivElement>;
// const MultipleFileHeader = forwardRef<HTMLDivElement, MultipleFileHeaderProperties>(
// 	({className, files, ...properties}, reference) => {
// 		const [widthHeight, setWidthHeight] = useAtom(widthHeightAtom);
// 		const [, setApi] = useAtom(carouselAtom);

// 		return <Carousel
// 			ref={reference}
// 			setApi={setApi}
// 			className='max-w-md'
// 		>
// 			<CarouselContent>
// 				{files.map((file, index) =>
// 					<CarouselItem key={`carousel-file-${index}`}>
// 						<div className='flex justify-center items-center p-2'>
// 							<Card className='w-full'>
// 								<CardContent className='flex flex-col items-center gap-4 select-none'>
// 									<div className='aspect-video w-full'>
// 										{file.type.startsWith('image')
// 											? <Image
// 												alt={file.name}
// 												src={URL.createObjectURL(file)}
// 												width={300}
// 												height={300}
// 												className='w-full h-full object-contain rounded-t-xl'
// 											/>
// 											: (file.type.startsWith('video')
// 												? <MyMediaPlayer file={file} setWidthHeight={setWidthHeight} />
// 												: 'Unknown file type')
// 										}
// 									</div>
// 									<div className='text-center w-full'>
// 										<p className='text-lg font-semibold w-full px-2 truncate'>{file.name}</p>
// 										<p className='text-sm text-gray-500 dark:text-gray-400'>{file.type}</p>
// 										{widthHeight[0] === undefined ? ''
// 											: <p className='text-sm text-gray-500 dark:text-gray-400'>{widthHeight[0]} x {widthHeight[1]} pixels</p>}
// 									</div>
// 								</CardContent>
// 							</Card>
// 						</div>
// 					</CarouselItem>,
// 				)}
// 			</CarouselContent>
// 			<CarouselPrevious />
// 			<CarouselNext />
// 		</Carousel>;
// 	},
// );
// MultipleFileHeader.displayName = 'MultipleFileHeader';

// type MultipleFilesFooterProperties = {
// 	fileLoaded: boolean;
// 	transcode: () => void;
// 	fileActions: ReturnType<typeof actionsFromFile>;
// 	augmentedFileTypeAtom: PrimitiveAtom<AugmentedFileType | undefined>;
// } & React.HTMLProps<HTMLDivElement>;
// const MultipleFilesFooter = forwardRef<HTMLDivElement, MultipleFilesFooterProperties>(
// 	({className, fileLoaded, fileActions, transcode, augmentedFileTypeAtom, ...properties}, reference) => {
// 		const [chosenAugmentedFileType, setChosenAugmentedFileType] = useAtom(augmentedFileTypeAtom);

// 		return <div className='w-96 flex flex-col justify-center items-center gap-4'>
// 			<h3>Select a format to convert to</h3>
// 			<div className='flex flex-wrap justify-center items-center gap-1'>
// 				{fileActions.map(({format}, index) => <FileTypeButton className={format === chosenAugmentedFileType ? 'outline' : ''} variant='outline' key={`action-${format.extension}-${index}`} fileType={format} onClick={() => {
// 					setChosenAugmentedFileType(format);
// 				}} />)}
// 			</div>
// 			<h3>And hit this button!</h3>
// 			<Button disabled={!true} variant='destructive' className='bg-green-700 hover:bg-green-600' onClick={transcode}>Convert</Button>
// 		</div>;
// 	},
// );
// MultipleFilesFooter.displayName = 'MultipleFilesFooter';
