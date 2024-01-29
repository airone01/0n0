import { FileArchiveIcon, FileAudioIcon, FileCodeIcon, FileIcon, FileImageIcon, FileTextIcon, FileVideoIcon, LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

type FileIcon = 'text' | 'image' | 'video' | 'audio' | 'archive' | 'code' | 'none';
type FileIconColor = 'stroke-gray-500' | 'stroke-red-500' | 'stroke-yellow-400' | 'stroke-green-400' | 'stroke-blue-500' | 'stroke-indigo-400' | 'stroke-purple-500' | 'stroke-pink-300';

type Props = {
  small?: boolean;
  name: string;
  description: string;
  icon: FileIcon;
  iconColor: FileIconColor;
  action?: 'CONVERT_TO'
}

function nameToIcon(name: FileIcon): LucideIcon {
  switch (name) {
    case 'text':
      return FileTextIcon;
    case 'code':
      return FileCodeIcon;
    case 'image':
      return FileImageIcon;
    case 'video':
      return FileVideoIcon;
    case 'audio':
      return FileAudioIcon;
    case 'archive':
      return FileArchiveIcon;
    case 'none':
    default:
      return FileIcon;
  }
}

function FileTypeButton({ action, name, description, icon, iconColor }: Props): JSX.Element {
  const Icon = nameToIcon(icon);

  return <Button variant="outline" className="aspect-square h-16 w-16 flex flex-col justify-center items-center gap-1 p-2">
    <Icon className={`h-6 w-6 text-gray-500 ${iconColor}`} />
    <h3>{action ? `${action} ` : ''}{name}</h3>
  </Button>
}

export const TXT = () => <FileTypeButton name='TXT' description="A text file (sometimes spelled textfile: an old alternate name is flatfile) is a kind of computer file that is structured as a sequence of lines of electronic text." icon="text" iconColor="stroke-gray-500" />;
export const PDF = () => <FileTypeButton name='PDF' description="A file format used to present and exchange documents reliably, independent of software, hardware, or operating system." icon="text" iconColor="stroke-red-500" />;
export const JPG = () => <FileTypeButton name='JPG' description="A commonly used method of lossy compression for digital images, particularly for those images produced by digital photography." icon="image" iconColor="stroke-yellow-400" />;
export const filesObject: Record<string, () => JSX.Element> = {
  TXT,
  PDF,
  JPG,
};
export const filesTypes = Object.values(filesObject);
