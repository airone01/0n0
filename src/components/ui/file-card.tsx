import { useState } from "react";
import Image from "next/image";
import { actionsFromFile } from "@/ffmpeg-util";

import { Input } from "./input";
import { Card, CardContent } from "./card";
import { Label } from "./label";
import { FileTypeButton } from "../filetype-button";
import { Separator } from "./separator";

type FileMode = 'single' | 'multiple' | 'picture' | 'none';

export default function FileCard() {
  const [fileMode, setFileMode] = useState<FileMode>('none');
  const [files, setFiles] = useState<File[]>([]);

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
    }

    if (files.length > 1) {
      setFileMode('multiple');
    }
  }

  switch (fileMode) {
    case 'single':
      return <SingleFileCard file={files[0]!} />;

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

function truncateFileName(
  fullStr: string,
  strLen: number = 8,
  separator: string = "...",
  frontChars: number = 3,
  backChars: number = 4
) {
  if (fullStr.length <= strLen) return fullStr;

  return (
    fullStr.substr(0, frontChars) +
    separator +
    fullStr.substr(fullStr.length - backChars)
  );
}

function SingleFileCard({ file }: { file: File }) {
  const [chosenButton, setChosenButton] = useState<number>(NaN);
  const fileActions = actionsFromFile(file.type)

  return <div className="flex flex-col justify-center items-center gap-4">
    <Card className="w-full max-w-md">
      <CardContent className="flex flex-col items-center gap-4 px-0">
        <Image
          alt={file.name}
          src={URL.createObjectURL(file)}
          width={300}
          height={300}
          className="w-full h-full object-contain rounded-t-xl"
        />
        <div className="text-center">
          <h2 className="text-lg font-semibold">{truncateFileName(file.name, 8, '...', 20)}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{file.type}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">??? x ??? pixels</p>
        </div>
      </CardContent>
    </Card>
    <div className="w-96 flex flex-col justify-center items-center gap-4">
      <h3>Select a format to convert to</h3>
      <div className="flex flex-wrap justify-center items-center gap-1">
        {fileActions.map(({ extension }, index) => <FileTypeButton className={index === chosenButton ? 'outline' : ''} variant='outline' key={`action-${extension.extension}`} fileType={extension} onClick={() => {
          setChosenButton(index);
        }} />)}
      </div>
    </div>
  </div>
}