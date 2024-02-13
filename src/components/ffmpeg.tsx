'use client';

import { useEffect, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { PrimitiveAtom, atom, useAtom } from "jotai";

import { AugmentedFileType } from "@/ffmpeg-util";
import FileCard from "./ui/file-card";
import { Button } from "./ui/button";

type Props = {
  ffmpegMessagesAtom: PrimitiveAtom<string[]>,
  percentAtom: PrimitiveAtom<number>
};

const fileAtom = atom<File | undefined>(undefined);
const ffmpegLoadedAtom = atom(false);
const fileLoadedAtom = atom(false);
const transcodedDataAtom = atom<Blob | null>(null);
const outputFileNameAtom = atom<string | undefined>(undefined);
const chosenAugmentedFileTypeAtom = atom<AugmentedFileType | undefined>(undefined);

export default function Ffmpeg({
  ffmpegMessagesAtom,
  percentAtom
}: Props) {
  const [file] = useAtom(fileAtom);
  const [ffmpegLoaded, setFfmpegLoaded] = useAtom(ffmpegLoadedAtom);
  const [fileLoaded, setFileLoaded] = useAtom(fileLoadedAtom);
  const [transcodedData, setTranscodedData] = useAtom(transcodedDataAtom);
  const [outputFileName, setOutputFileName] = useAtom(outputFileNameAtom);
  const [chosenAugmentedFileType] = useAtom(chosenAugmentedFileTypeAtom);
  const [, setFfmpegMessages] = useAtom(ffmpegMessagesAtom);
  const [, setPercent] = useAtom(percentAtom);

  const { current: ffmpeg } = useRef<FFmpeg>(new FFmpeg());

  const loadFfmpeg = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
    ffmpeg.on('log', ({ message }) => {
      setFfmpegMessages((oldMessage) => [...oldMessage, message])
    });

    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    try {
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm', true, (event) => {
          setPercent(Math.floor(event.received / 32129114 * 100));
        })
      })
    } catch (error) {
      console.error(error);
      setPercent(0);
      return;
    }
    setPercent(100);
    setFfmpegLoaded(true);
  }

  const transcode = async () => {
    const myOutputFileName = `output_file.${chosenAugmentedFileType?.extension!.toLowerCase()}`;
    setOutputFileName(myOutputFileName);
    try {
      const test = await ffmpeg.exec(['-i', 'input_file', myOutputFileName]);
      console.log('test', test)
    } catch {
      console.log('CRASHED 1')
    }
    try {
      const data = await ffmpeg.readFile(myOutputFileName);
      console.log('data', data)
      setTranscodedData(new Blob([data], { type: chosenAugmentedFileType?.mimeType }));
    } catch {
      console.log('CRASHED 2');
    }
  }

  useEffect(() => {
    new Promise<void>((resolve) => {
      if (file === undefined) {
        return;
      };
      const reader = new FileReader();
      reader.onload = async () => {
        const fileData = new Uint8Array(reader.result as ArrayBuffer);
        await ffmpeg.writeFile('input_file', fileData);
        resolve();
      }
      reader.readAsArrayBuffer(file);
    }).then(() => {
      setFileLoaded(true);
      console.log('loading file: done.');
    }).catch((error) => {
      console.error(error);
    });
  }, [file])

  useEffect(() => {
    loadFfmpeg();
  }, []);

  return <>
    <div className="flex flex-col w-96 max-w-sm justify-center items-center gap-1.5">
      <FileCard augmentedFileTypeAtom={chosenAugmentedFileTypeAtom} transcode={transcode} fileLoaded={fileLoaded && ffmpegLoaded} fileAtom={fileAtom} />
    </div>

    {transcodedData !== null ?
      <a href={URL.createObjectURL(transcodedData)} target="_blank" rel="noopener noreferrer" download={outputFileName}><Button>{transcodedData === null ? '...' : 'Download file'}</Button></a> : <></>}
  </>
}