'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

import { AugmentedFileType } from "@/ffmpeg-util";
import FileCard from "./ui/file-card";
import { Button } from "./ui/button";

export default function Ffmpeg({
  setFfmpegMessages,
  setPercent
}: {
  setFfmpegMessages: Dispatch<SetStateAction<string[]>>,
  setPercent: Dispatch<SetStateAction<number>>
}) {
  const [file, setFile] = useState<File | null>(null);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [fileLoaded, setFileLoaded] = useState(false);
  const [transcodedData, setTranscodedData] = useState<Blob | null>(null);
  const [outputFileName, setOutputFileName] = useState<string | null>(null);
  const [chosenAugmentedFileType, setChosenAugmentedFileType] = useState<AugmentedFileType | null>(null);
  const { current: ffmpeg } = useRef<FFmpeg>(new FFmpeg());
  const videoRef = useRef<HTMLVideoElement>(null);

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
      if (file === null) {
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
      <FileCard stateAugmentedFileType={[chosenAugmentedFileType, setChosenAugmentedFileType]} transcode={transcode} fileLoaded={fileLoaded && ffmpegLoaded} setFile={setFile} />
    </div>

    {transcodedData !== null ?
      <a href={URL.createObjectURL(transcodedData)} target="_blank" rel="noopener noreferrer" download={outputFileName}><Button>{transcodedData === null ? '...' : 'Download file'}</Button></a> : <></>}

    {/* {(loaded
      ? (
        <>
          <video ref={videoRef} controls></video><br />
          <button onClick={transcode}>Transcode webm to mp4</button>
          <p>Open Developer Tools (Ctrl+Shift+I) to View Logs</p>
        </>
      ) : undefined
    )} */}
  </>
}