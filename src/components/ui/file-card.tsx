import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { AugmentedFileType, actionsFromFile } from "@/ffmpeg-util";

import { Input } from "./input";
import { Card, CardContent } from "./card";
import { Label } from "./label";
import { FileTypeButton } from "../filetype-button";
import { Button } from "./button";
import MyMediaPlayer from "./media-player";
import { PrimitiveAtom, atom, useAtom } from "jotai";

type FileMode = 'single' | 'multiple' | 'picture' | 'none';
type Props = {
  fileAtom: PrimitiveAtom<File | undefined>,
  fileLoaded: boolean,
  transcode: () => void,
  stateAugmentedFileType: [AugmentedFileType | null, Dispatch<SetStateAction<AugmentedFileType | null>>]
};

const filesAtom = atom<File[]>([]);
const fileModeAtom = atom<FileMode>('none');

export default function FileCard({ fileAtom, fileLoaded, transcode, stateAugmentedFileType }: Props) {
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
      return <SingleFileCard stateAugmentedFileType={stateAugmentedFileType} transcode={transcode} fileLoaded={fileLoaded} file={files[0]!} />;

    case 'multiple':
      return <div>Multiple files</div>;

    default:
    case 'none':
      return <>
        <Label htmlFor="file">Upload file or drag and drop here</Label>
        <Input id="file" type="file" onChange={onFileUpload} />
      </>;
  }
}

const widthHeightAtom = atom<[number | undefined, number | undefined]>([undefined, undefined]);

function SingleFileCard({ file, fileLoaded, transcode, stateAugmentedFileType }: { file: File, fileLoaded: boolean, transcode: () => void, stateAugmentedFileType: [AugmentedFileType | null, Dispatch<SetStateAction<AugmentedFileType | null>>] }) {
  const [chosenAugmentedFileType, setChosenAugmentedFileType] = stateAugmentedFileType;
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