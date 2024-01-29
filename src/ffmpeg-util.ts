/**
 * Actions possible to achieve from an image
*/
export type ActionFromImage = 'ToStaticPng' | 'ToJpg' | 'ToAvif' | 'ToIco' | 'ToWebm' | 'ToGif' | 'TransfertToPdf';

/**
 * Image file types
 */
type ImageFileType = 'PNG' | 'JPG' | 'AVIF' | 'ICO' | 'GIF' | 'WEBP' | 'AVIF';
/**
 * Animated image file types
 */
type AnimatedImageFileType = 'APNG' | 'AGIF' | 'AWEBP' | 'AAVIF';
/**
 * Video file types
 */
type VideoFileType = 'WEBM' | 'AV1' | 'H264' | 'HEVC' | 'MATROSKA' | 'AVI' | 'MOV';
/**
 * Audio file types
 */
type AudioFileType = 'MP3' | 'VORBIS' | 'OPUS' | 'FLAC' | 'WAV' | 'M4A' | 'AAC' | 'AC3' | 'EAC3' | 'ALAC' | 'MP2' | 'OGG';
/**
 * Special documents
 */
type SpecialDocumentFileType = 'PDF';

/**
 * All file types
 */
export type FileType = AudioFileType | VideoFileType | ImageFileType | AnimatedImageFileType | SpecialDocumentFileType;

export type FileIcon = 'text' | 'image' | 'video' | 'audio' | 'archive' | 'code' | 'none';
export type FileIconColor = 'stroke-gray-500' | 'stroke-red-500' | 'stroke-yellow-400' | 'stroke-green-400' | 'stroke-blue-500' | 'stroke-indigo-400' | 'stroke-purple-500' | 'stroke-pink-300';
export type AugmentedFileType = {
  icon: FileIcon;
  iconColor: FileIconColor;
  extension: FileType;
};

const PNG: AugmentedFileType = {
  extension: 'PNG',
  icon: 'image',
  iconColor: 'stroke-blue-500',
};
const JPG: AugmentedFileType = {
  extension: 'JPG',
  icon: 'image',
  iconColor: 'stroke-blue-500',
};
const AVIF: AugmentedFileType = {
  extension: 'AVIF',
  icon: 'image',
  iconColor: 'stroke-blue-500',
};
const ICO: AugmentedFileType = {
  extension: 'ICO',
  icon: 'image',
  iconColor: 'stroke-blue-500',
};
const GIF: AugmentedFileType = {
  extension: 'GIF',
  icon: 'image',
  iconColor: 'stroke-blue-500',
};
const WEBP: AugmentedFileType = {
  extension: 'WEBP',
  icon: 'image',
  iconColor: 'stroke-blue-500',
};
const APNG: AugmentedFileType = {
  extension: 'APNG',
  icon: 'image',
  iconColor: 'stroke-blue-500',
};
const AGIF: AugmentedFileType = {
  extension: 'AGIF',
  icon: 'image',
  iconColor: 'stroke-blue-500',
};
const AWEBP: AugmentedFileType = {
  extension: 'AWEBP',
  icon: 'image',
  iconColor: 'stroke-blue-500',
};
const AAVIF: AugmentedFileType = {
  extension: 'AAVIF',
  icon: 'image',
  iconColor: 'stroke-blue-500',
};
const WEBM: AugmentedFileType = {
  extension: 'WEBM',
  icon: 'video',
  iconColor: 'stroke-purple-500',
};
const AV1: AugmentedFileType = {
  extension: 'AV1',
  icon: 'video',
  iconColor: 'stroke-purple-500',
};
const H264: AugmentedFileType = {
  extension: 'H264',
  icon: 'video',
  iconColor: 'stroke-purple-500',
};
const HEVC: AugmentedFileType = {
  extension: 'HEVC',
  icon: 'video',
  iconColor: 'stroke-purple-500',
};
const MATROSKA: AugmentedFileType = {
  extension: 'MATROSKA',
  icon: 'video',
  iconColor: 'stroke-purple-500',
};
const AVI: AugmentedFileType = {
  extension: 'AVI',
  icon: 'video',
  iconColor: 'stroke-purple-500',
};
const PDF: AugmentedFileType = {
  extension: 'PDF',
  icon: 'none',
  iconColor: 'stroke-red-500',
};

type Action = { action: string, extension: AugmentedFileType };

export const actionsFromImage: Action[] = [{
  action: 'ToStaticPng',
  extension: PNG,
}, {
  action: 'ToJpg',
  extension: JPG,
}, {
  action: 'ToAvif',
  extension: AVIF,
}, {
  action: 'ToIco',
  extension: ICO,
}, {
  action: 'ToGif',
  extension: GIF,
}, {
  action: 'TransfertToPdf',
  extension: PDF,
}];

export const actionsFromFile = (fileType: string): Action[] => {
  if (fileType.startsWith('image')) {
    return actionsFromImage;
  }
  return [];
}

/**
 * A file with its extension attached
 */
export type FileWithExtension = {
  file: File;
  extension: FileType;
};
