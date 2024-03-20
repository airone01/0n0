/* eslint-disable @typescript-eslint/naming-convention */
enum Category {
	Image = 'Image',
	Video = 'Video',
	Audio = 'Audio',
	Document = 'Document',
	MagicDocument = 'MagicDocument',
	Archive = 'Archive',
}

export const augmentedFileTypes: Record<FileType, AugmentedFileType> = {
	PDF: {
		extension: 'PDF',
		icon: 'none',
		iconColor: 'stroke-red-500',
		mimeType: 'application/pdf',
		category: Category.MagicDocument,
	},
	PNG: {
		extension: 'PNG',
		icon: 'image',
		iconColor: 'stroke-blue-500',
		mimeType: 'image/png',
		category: Category.Image,
	},
	JPG: {
		extension: 'JPG',
		icon: 'image',
		iconColor: 'stroke-blue-500',
		mimeType: 'image/jpeg',
		category: Category.Image,
	},
	AVIF: {
		extension: 'AVIF',
		icon: 'image',
		iconColor: 'stroke-blue-500',
		mimeType: 'image/avif',
		category: Category.Image,
	},
	ICO: {
		extension: 'ICO',
		icon: 'image',
		iconColor: 'stroke-blue-500',
		mimeType: 'image/x-icon',
		category: Category.Image,
	},
	GIF: {
		extension: 'GIF',
		icon: 'image',
		iconColor: 'stroke-blue-500',
		mimeType: 'image/gif',
		category: Category.Image,
	},
	WEBP: {
		extension: 'WEBP',
		icon: 'image',
		iconColor: 'stroke-blue-500',
		mimeType: 'image/webp',
		category: Category.Image,
	},
	APNG: {
		extension: 'APNG',
		icon: 'image',
		iconColor: 'stroke-blue-500',
		mimeType: 'image/apng',
		category: Category.Image,
	},
	AGIF: {
		extension: 'AGIF',
		icon: 'image',
		iconColor: 'stroke-blue-500',
		mimeType: 'image/gif',
		category: Category.Image,
	},
	AWEBP: {
		extension: 'AWEBP',
		icon: 'image',
		iconColor: 'stroke-blue-500',
		mimeType: 'image/webp',
		category: Category.Image,
	},
	AAVIF: {
		extension: 'AAVIF',
		icon: 'image',
		iconColor: 'stroke-blue-500',
		mimeType: 'image/avif',
		category: Category.Image,
	},
	WEBM: {
		extension: 'WEBM',
		icon: 'video',
		iconColor: 'stroke-purple-500',
		mimeType: 'video/webm',
		category: Category.Video,
	},
	AV1: {
		extension: 'AV1',
		icon: 'video',
		iconColor: 'stroke-purple-500',
		mimeType: 'video/av1',
		category: Category.Video,
	},
	H264: {
		extension: 'H264',
		icon: 'video',
		iconColor: 'stroke-purple-500',
		mimeType: 'video/h264',
		category: Category.Video,
	},
	MP4: {
		extension: 'MP4',
		icon: 'video',
		iconColor: 'stroke-purple-500',
		mimeType: 'video/mp4',
		category: Category.Video,
	},
	HEVC: {
		extension: 'HEVC',
		icon: 'video',
		iconColor: 'stroke-purple-500',
		mimeType: 'video/hevc',
		category: Category.Video,
	},
	MATROSKA: {
		extension: 'MATROSKA',
		icon: 'video',
		iconColor: 'stroke-purple-500',
		mimeType: 'video/matroksa',
		category: Category.Video,
	},
	AVI: {
		extension: 'AVI',
		icon: 'video',
		iconColor: 'stroke-purple-500',
		mimeType: 'video/avi',
		category: Category.Video,
	},
	MOV: {
		extension: 'MOV',
		icon: 'video',
		iconColor: 'stroke-purple-500',
		mimeType: 'video/quicktime',
		category: Category.Video,
	},
	MP3: {
		extension: 'MP3',
		icon: 'audio',
		iconColor: 'stroke-green-400',
		mimeType: 'audio/mpeg',
		category: Category.Audio,
	},
	VORBIS: {
		extension: 'VORBIS',
		icon: 'audio',
		iconColor: 'stroke-green-400',
		mimeType: 'audio/vorbis',
		category: Category.Audio,
	},
	OPUS: {
		extension: 'OPUS',
		icon: 'audio',
		iconColor: 'stroke-green-400',
		mimeType: 'audio/opus',
		category: Category.Audio,
	},
	FLAC: {
		extension: 'FLAC',
		icon: 'audio',
		iconColor: 'stroke-green-400',
		mimeType: 'audio/flac',
		category: Category.Audio,
	},
	WAV: {
		extension: 'WAV',
		icon: 'audio',
		iconColor: 'stroke-green-400',
		mimeType: 'audio/wav',
		category: Category.Audio,
	},
	M4A: {
		extension: 'M4A',
		icon: 'audio',
		iconColor: 'stroke-green-400',
		mimeType: 'audio/m4a',
		category: Category.Audio,
	},
	AAC: {
		extension: 'AAC',
		icon: 'audio',
		iconColor: 'stroke-green-400',
		mimeType: 'audio/aac',
		category: Category.Audio,
	},
	AC3: {
		extension: 'AC3',
		icon: 'audio',
		iconColor: 'stroke-green-400',
		mimeType: 'audio/ac3',
		category: Category.Audio,
	},
	EAC3: {
		extension: 'EAC3',
		icon: 'audio',
		iconColor: 'stroke-green-400',
		mimeType: 'audio/eac3',
		category: Category.Audio,
	},
	ALAC: {
		extension: 'ALAC',
		icon: 'audio',
		iconColor: 'stroke-green-400',
		mimeType: 'audio/alac',
		category: Category.Audio,
	},
	MP2: {
		extension: 'MP2',
		icon: 'audio',
		iconColor: 'stroke-green-400',
		mimeType: 'audio/mp2',
		category: Category.Audio,
	},
	OGG: {
		extension: 'OGG',
		icon: 'audio',
		iconColor: 'stroke-green-400',
		mimeType: 'audio/ogg',
		category: Category.Audio,
	},
	ZIP: {
		extension: 'ZIP',
		icon: 'archive',
		iconColor: 'stroke-yellow-400',
		mimeType: 'application/zip',
		category: Category.Archive,
	},
	TAR: {
		extension: 'TAR',
		icon: 'archive',
		iconColor: 'stroke-yellow-400',
		mimeType: 'application/x-tar',
		category: Category.Archive,
	},
	GZIP: {
		extension: 'GZIP',
		icon: 'archive',
		iconColor: 'stroke-yellow-400',
		mimeType: 'application/gzip',
		category: Category.Archive,
	},
	BZIP2: {
		extension: 'BZIP2',
		icon: 'archive',
		iconColor: 'stroke-yellow-400',
		mimeType: 'application/x-bzip2',
		category: Category.Archive,
	},
	XZ: {
		extension: 'XZ',
		icon: 'archive',
		iconColor: 'stroke-yellow-400',
		mimeType: 'application/x-xz',
		category: Category.Archive,
	},
	LZ4: {
		extension: 'LZ4',
		icon: 'archive',
		iconColor: 'stroke-yellow-400',
		mimeType: 'application/x-lz4',
		category: Category.Archive,
	},
	ZSTD: {
		extension: 'ZSTD',
		icon: 'archive',
		iconColor: 'stroke-yellow-400',
		mimeType: 'application/zstd',
		category: Category.Archive,
	},
};

type Action = {
	direction: 'to' | 'transfert_to';
	format: AugmentedFileType;
};

export const fileHierarchy: Record<Category, {
	name: Category;
	actions: Action[];
}> = {
	[Category.Image]: {
		name: Category.Image,
		actions: [
			{direction: 'to', format: augmentedFileTypes.PNG},
			{direction: 'to', format: augmentedFileTypes.JPG},
			{direction: 'to', format: augmentedFileTypes.AVIF},
			{direction: 'to', format: augmentedFileTypes.ICO},
			{direction: 'to', format: augmentedFileTypes.WEBP},
			{direction: 'to', format: augmentedFileTypes.GIF},
			{direction: 'transfert_to', format: augmentedFileTypes.PDF},
		],
	},
	[Category.Video]: {
		name: Category.Video,
		actions: [
			{direction: 'to', format: augmentedFileTypes.WEBM},
			// { direction: 'to', format: augmentedFileTypes.AV1 },
			{direction: 'to', format: augmentedFileTypes.H264},
			{direction: 'to', format: augmentedFileTypes.HEVC},
			{direction: 'to', format: augmentedFileTypes.MATROSKA},
			{direction: 'to', format: augmentedFileTypes.AVI},
		],
	},
	[Category.Audio]: {
		name: Category.Audio,
		actions: [
			{direction: 'to', format: augmentedFileTypes.MP3},
			{direction: 'to', format: augmentedFileTypes.VORBIS},
			{direction: 'to', format: augmentedFileTypes.OPUS},
			{direction: 'to', format: augmentedFileTypes.FLAC},
			{direction: 'to', format: augmentedFileTypes.WAV},
			{direction: 'to', format: augmentedFileTypes.M4A},
			{direction: 'to', format: augmentedFileTypes.AAC},
			{direction: 'to', format: augmentedFileTypes.AC3},
			{direction: 'to', format: augmentedFileTypes.EAC3},
			{direction: 'to', format: augmentedFileTypes.ALAC},
			{direction: 'to', format: augmentedFileTypes.MP2},
			{direction: 'to', format: augmentedFileTypes.OGG},
		],
	},
	[Category.Document]: {
		name: Category.Document,
		actions: [
			{direction: 'to', format: augmentedFileTypes.PDF},
		],
	},
	[Category.MagicDocument]: {
		name: Category.MagicDocument,
		actions: [
			{direction: 'transfert_to', format: augmentedFileTypes.PNG},
			{direction: 'transfert_to', format: augmentedFileTypes.JPG},
			{direction: 'transfert_to', format: augmentedFileTypes.AVIF},
			{direction: 'transfert_to', format: augmentedFileTypes.ICO},
			{direction: 'transfert_to', format: augmentedFileTypes.WEBP},
			{direction: 'transfert_to', format: augmentedFileTypes.GIF},
		],
	},
	[Category.Archive]: {
		name: Category.Archive,
		actions: [
			{direction: 'transfert_to', format: augmentedFileTypes.ZIP},
			{direction: 'transfert_to', format: augmentedFileTypes.TAR},
			{direction: 'transfert_to', format: augmentedFileTypes.GZIP},
			{direction: 'transfert_to', format: augmentedFileTypes.BZIP2},
			{direction: 'transfert_to', format: augmentedFileTypes.XZ},
			{direction: 'transfert_to', format: augmentedFileTypes.LZ4},
			{direction: 'transfert_to', format: augmentedFileTypes.ZSTD},
		],
	},
};

/**
 * Image file types
 */
type ImageFileType = 'PNG' | 'JPG' | 'AVIF' | 'ICO' | 'GIF' | 'WEBP';
/**
 * Animated image file types
 */
type AnimatedImageFileType = 'APNG' | 'AGIF' | 'AWEBP' | 'AAVIF';
/**
 * Video file types
 */
type VideoFileType = 'WEBM' | 'AV1' | 'H264' | 'MP4' | 'HEVC' | 'MATROSKA' | 'AVI' | 'MOV';
/**
 * Audio file types
 */
type AudioFileType = 'MP3' | 'VORBIS' | 'OPUS' | 'FLAC' | 'WAV' | 'M4A' | 'AAC' | 'AC3' | 'EAC3' | 'ALAC' | 'MP2' | 'OGG';
/**
 * Archive file types
 */
type ArchiveFileType = 'ZIP' | 'TAR' | 'GZIP' | 'BZIP2' | 'XZ' | 'LZ4' | 'ZSTD';
/**
 * Special documents
 */
type MagicDocumentFileType = 'PDF';

/**
 * All file types
 */
export type FileType = AudioFileType | VideoFileType | ImageFileType | AnimatedImageFileType | MagicDocumentFileType | ArchiveFileType;

export type FileIcon = 'text' | 'image' | 'video' | 'audio' | 'archive' | 'code' | 'none';
export type FileIconColor = 'stroke-gray-500' | 'stroke-red-500' | 'stroke-yellow-400' | 'stroke-green-400' | 'stroke-blue-500' | 'stroke-indigo-400' | 'stroke-purple-500' | 'stroke-pink-300';
export type AugmentedFileType = {
	icon: FileIcon;
	iconColor: FileIconColor;
	extension: FileType;
	mimeType: string;
	category: Category;
};

function fileTypeFromFileName(fileName: string): FileType {
	const extension = fileName.split('.').pop();
	if (!extension) {
		throw new Error('No extension found');
	}

	return extension.toUpperCase() as FileType;
}

function categoryFromExtension(extension: string): Category {
	return augmentedFileTypes[fileTypeFromFileName(extension)].category;
}

export function actionsFromFile(file: File): Action[] {
	const category = categoryFromExtension(file.name);
	return fileHierarchy[category].actions;
}
