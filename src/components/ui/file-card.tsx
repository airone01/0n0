import Image from "next/image";
import { AugmentedFileType, actionsFromFile } from "@/ffmpeg-util";
import { PrimitiveAtom, atom, useAtom } from "jotai";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { Input } from "./input";
import { Card, CardContent } from "./card";
import { Label } from "./label";
import { FileTypeButton } from "../filetype-button";
import { Button } from "./button";
import MyMediaPlayer from "./media-player";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect } from "react";

type FileMode = 'single' | 'multiple' | 'picture' | 'none';
type Props = {
  fileAtom: PrimitiveAtom<File | undefined>,
  fileLoaded: boolean,
  transcode: () => void,
  augmentedFileTypeAtom: PrimitiveAtom<AugmentedFileType | undefined>
};

const widthHeightAtom = atom<[number | undefined, number | undefined]>([undefined, undefined]);
const fileIndexAtom = atom(0);
const fileModeAtom = atom<FileMode>('none');
const filesAtom = atom<File[]>([]);
const carouselAtom = atom<CarouselApi | undefined>(undefined);
const countAtom = atom(0);
const currentAtom = atom(0);

export default function FileCard({ fileAtom, fileLoaded, transcode, augmentedFileTypeAtom }: Props) {
  const [fileMode, setFileMode] = useAtom(fileModeAtom);
  const [files, setFiles] = useAtom(filesAtom);
  const [, setFile] = useAtom(fileAtom);

  const onFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files === null || files?.length === 0) {
      setFileMode('none');
      setFiles([]);
      return;
    }

    setFiles(Array.from(files));

    if (files.length === 1) {
      setFileMode('single');
      setFile(files[0]!);
    }

    if (files.length > 1) {
      setFileMode('multiple');
    }
  }

  switch (fileMode) {
    case 'single':
      return <SingleFileCard augmentedFileTypeAtom={augmentedFileTypeAtom} transcode={transcode} fileLoaded={fileLoaded} file={files[0]!} />;

    case 'multiple':
      return <MultipleFileCards files={files} augmentedFileTypeAtom={augmentedFileTypeAtom} transcode={transcode} />;

    default:
    case 'none':
      return <>
        <Label htmlFor="file">Upload file or drag and drop here</Label>
        <Input id="file" multiple type="file" onChange={onFileUpload} />
      </>;
  }
}

type SingleFileCardParams = {
  file: File,
  fileLoaded: boolean,
  transcode: () => void,
  augmentedFileTypeAtom: PrimitiveAtom<AugmentedFileType | undefined>
};
function SingleFileCard({ file, fileLoaded, transcode, augmentedFileTypeAtom }: SingleFileCardParams) {
  const [chosenAugmentedFileType, setChosenAugmentedFileType] = useAtom(augmentedFileTypeAtom);
  const fileActions = actionsFromFile(file.type)
  const [widthHeight, setWidthHeight] = useAtom(widthHeightAtom);

  return <div className="flex flex-col justify-center items-center gap-4">
    <Card className="w-full max-w-md">
      <CardContent className="flex flex-col items-center gap-4 px-0">
        {file.type.startsWith('image') ?
          <Image
            alt={file.name}
            src={URL.createObjectURL(file)}
            width={300}
            height={300}
            className="w-full h-full object-contain rounded-t-xl"
          /> :
          file.type.startsWith('video') ?
            <MyMediaPlayer file={file} setWidthHeight={setWidthHeight} />
            : 'Unknown file type'
        }
        <div className="text-center w-full">
          <p className="text-lg font-semibold w-full px-2 truncate">{file.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{file.type}</p>
          {widthHeight[0] === undefined ? '' :
            <p className="text-sm text-gray-500 dark:text-gray-400">{widthHeight[0]} x {widthHeight[1]} pixels</p>}
        </div>
      </CardContent>
    </Card>
    <div className="w-96 flex flex-col justify-center items-center gap-4">
      <h3>Select a format to convert to</h3>
      <div className="flex flex-wrap justify-center items-center gap-1">
        {fileActions.map(({ extension }, index) => <FileTypeButton className={extension === chosenAugmentedFileType ? 'outline' : ''} variant='outline' key={`action-${extension.extension}-${index}`} fileType={extension} onClick={() => {
          setChosenAugmentedFileType(extension);
        }} />)}
      </div>
      <h3>And hit this button!</h3>
      <Button disabled={!fileLoaded} variant='destructive' className='bg-green-700 hover:bg-green-600' onClick={transcode}>{fileLoaded ? 'Convert!' : 'Loading...'}</Button>
    </div>
  </div >
}

type MultipleFileCardsParams = {
  files: Array<File>,
  augmentedFileTypeAtom: PrimitiveAtom<AugmentedFileType | undefined>
  transcode: () => void,
};
function MultipleFileCards({ files, augmentedFileTypeAtom, transcode }: MultipleFileCardsParams) {
  const [chosenAugmentedFileType, setChosenAugmentedFileType] = useAtom(augmentedFileTypeAtom);
  const [widthHeight, setWidthHeight] = useAtom(widthHeightAtom);
  const [fileIndex, setFileIndex] = useAtom(fileIndexAtom);
  const fileActions = actionsFromFile(files[0]!.type)
  const [, setApi] = useAtom(carouselAtom);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Carousel
        setApi={setApi}
        className="max-w-md"
      >
        <CarouselContent>
          {files.map(file =>
            <CarouselItem>
              <div className="flex justify-center items-center p-2">
                <Card className="w-full">
                  <CardContent className="flex flex-col items-center gap-4 select-none">
                    <div className="aspect-video w-full">
                      {file.type.startsWith('image') ?
                        <Image
                          alt={file.name}
                          src={URL.createObjectURL(file)}
                          width={300}
                          height={300}
                          className="w-full h-full object-contain rounded-t-xl"
                        /> :
                        file.type.startsWith('video') ?
                          <MyMediaPlayer file={file} setWidthHeight={setWidthHeight} />
                          : 'Unknown file type'
                      }
                    </div>
                    <div className="text-center w-full">
                      <p className="text-lg font-semibold w-full px-2 truncate">{file.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{file.type}</p>
                      {widthHeight[0] === undefined ? '' :
                        <p className="text-sm text-gray-500 dark:text-gray-400">{widthHeight[0]} x {widthHeight[1]} pixels</p>}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="w-96 flex flex-col justify-center items-center gap-4">
        <h3>Select a format to convert to</h3>
        <div className="flex flex-wrap justify-center items-center gap-1">
          {fileActions.map(({ extension }, index) => <FileTypeButton className={extension === chosenAugmentedFileType ? 'outline' : ''} variant='outline' key={`action-${extension.extension}-${index}`} fileType={extension} onClick={() => {
            setChosenAugmentedFileType(extension);
          }} />)}
        </div>
        <h3>And hit this button!</h3>
        <Button disabled={!true} variant='destructive' className='bg-green-700 hover:bg-green-600' onClick={transcode}>{true ? 'Convert!' : 'Loading...'}</Button>
      </div>
    </div>
  );
}