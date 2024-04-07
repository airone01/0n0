import {forwardRef} from 'react';
import {DownloadIcon, FullscreenIcon, XIcon} from 'lucide-react';
import Image from 'next/image';
import {atom, useAtom} from 'jotai';
import {
	Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger,
} from '@0n0/ui/dialog';
import {Button} from '@0n0/ui/button';
import MyMediaPlayer from './media-player';
import {cn} from '~/lib/utils';

const widthHeightAtom = atom<[number | undefined, number | undefined]>([undefined, undefined]);

type FilesCardProperties = {
	files: File[];
} & React.HTMLProps<HTMLDivElement>;
const FileCard = forwardRef<HTMLDivElement, FilesCardProperties>(
	({className, files}, reference) => {
		if (files.length === 1) {
			const file = files[0]!;
			const splittedFileType = file.type.split('/');
			if (splittedFileType.length <= 1) {
				throw new Error('File type is not in the correct format');
			}

			const [fileTypeFirstPart, ...fileTypeSecondPart] = file.type.split('/') as [string, string[]];
			const actualFileType = fileTypeSecondPart.join('/');

			if (fileTypeFirstPart === 'image') {
				return <ImageFileElement file={file} actualFileType={actualFileType} />;
			}

			if (fileTypeFirstPart === 'video') {
				return <VideoFileElement file={file} />;
			}

			// Return <Card ref={reference} className={cn('', className)}>
			// 	<div className='w-full flex flex-col justify-center items-center gap-1 rounded-xl border bg-card text-card-foreground'>
			// 		{files.map((file, index) =>
			// 			<FileElement file={file} key={`filelist_file_${index}`} />,
			// 		)}
			// 	</div>
			// </Card>;
		}

		return undefined;
	},
);
FileCard.displayName = 'FileCard';

type ImageFileElementProperties = {
	file: File;
	actualFileType: string;
} & React.HTMLProps<HTMLImageElement>;
const ImageFileElement = forwardRef<HTMLImageElement, ImageFileElementProperties>(
	({className, file, actualFileType, ...properties}, reference) => {
		const [[width, height]] = useAtom(widthHeightAtom);

		const FileImage = forwardRef<HTMLImageElement, React.HTMLProps<HTMLImageElement>>(({className}) => <Image
			alt={file.name}
			src={URL.createObjectURL(file)}
			width={300}
			height={300}
			className={cn('w-full h-full object-contain rounded-xl', className)}
		/>);
		FileImage.displayName = 'FileImage';

		return <div className='flex flex-col gap-1 w-96'>
			<div className='relative group rounded-xl border'>
				<FileImage className='blur-md opacity-60 max-h-64 object-cover' />
				<FileImage className='absolute top-0 left-0 max-h-64 object-cover' />
				<div className='flex gap-1 group-hover:opacity-100 opacity-10 absolute top-1 right-1 transition-all'>
					<Button variant='secondary' className='rounded-xl p-1 aspect-square'>
						<DownloadIcon />
					</Button>
					<Button variant='destructive' className='rounded-xl p-1 aspect-square'>
						<XIcon />
					</Button>
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button className='rounded-xl p-1 aspect-square group-hover:opacity-100 opacity-10 absolute bottom-1 right-1 transition-all'>
							<FullscreenIcon />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>{file.name}</DialogHeader>
						<FileImage className='object-cover' />
						<DialogDescription>{actualFileType}{width ?? height ? ` (${width ?? '???'} x ${height ?? '???'})` : ''}</DialogDescription>
					</DialogContent>
				</Dialog>
			</div>
			<p className='text-md text-center truncate'>{file.name}</p>
			<p className='text-sm text-muted-foreground truncate text-center'>{actualFileType}{width ?? height ? ` (${width ?? '???'} x ${height ?? '???'})` : ''}</p>
		</div>;
	},
);
ImageFileElement.displayName = 'ImageFileElement';

type VideoFileElementProperties = {
	file: File;
} & React.HTMLProps<HTMLDivElement>;
const VideoFileElement = forwardRef<HTMLDivElement, VideoFileElementProperties>(
	({className, file, ...properties}, reference) => <div ref={reference} className={cn('w-full flex justify-between items-center', className)} {...properties}>
		<MyMediaPlayer file={file} widthHeightAtom={widthHeightAtom} />
	</div>,
);
VideoFileElement.displayName = 'VideoFileElement';

// Type FileElementProperties = {
// 	file: File;
// } & React.HTMLProps<HTMLDivElement>;
// const FileElement = forwardRef<HTMLDivElement, FileElementProperties>(
// 	({className, file, ...properties}, reference) => {
// 		return <div ref={reference} className={cn('w-full flex justify-between items-center', className)} {...properties}>
// 			 ? <Dialog>
// 				<DialogTrigger asChild>
// 					<p className='underline cursor-pointer hover:text-primary text-md [&:not(:first-child)]:mt-6 pl-2 py-0 truncate'>{file.name}</p>
// 				</DialogTrigger>
// 				<DialogContent>

// 				</DialogContent>
// 			</Dialog> : <p className='text-md [&:not(:first-child)]:mt-6 pl-2 py-0 truncate'>{file.name}</p>
// 			<div className='flex justify-center items-center gap-2'>
// 				<p className='text-sm text-muted-foreground'>actualFileType</p>
// 				<Button variant='destructive' className='w-7 h-7 p-1'>
// 					<XIcon />
// 				</Button>
// 			</div>
// 		</div>;
// 	},
// );
// FileElement.displayName = 'FileElement';

export default FileCard;
