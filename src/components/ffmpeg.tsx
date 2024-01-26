'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export default function Ffmpeg({ setFfmpegMessages, setPercent }: { setFfmpegMessages: Dispatch<SetStateAction<string>>, setPercent: Dispatch<SetStateAction<number>> }) {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef<FFmpeg>(new FFmpeg());
  const videoRef = useRef<HTMLVideoElement>(null);

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on('log', ({ message }) => {
      setFfmpegMessages((oldMessage) => `${oldMessage}\n\n${message}`)
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

    }
    setPercent(100);
    setLoaded(true);
  }

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.writeFile('input.webm', await fetchFile('https://raw.githubusercontent.com/ffmpegwasm/testdata/master/Big_Buck_Bunny_180_10s.webm'));
    await ffmpeg.exec(['-i', 'input.webm', 'output.mp4']);
    const data = await ffmpeg.readFile('output.mp4');
    if (videoRef.current !== null) {
      videoRef.current.src =
        URL.createObjectURL(new Blob([data], { type: 'video/mp4' }));
    }
  }

  useEffect(() => {
    load();
  }, []);

  return <>
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Upload file or drag and drop here</Label>
      <Input id="picture" type="file" />
    </div>
    {(loaded
      ? (
        <>
          <video ref={videoRef} controls></video><br />
          <button onClick={transcode}>Transcode webm to mp4</button>
          <p>Open Developer Tools (Ctrl+Shift+I) to View Logs</p>
        </>
      ) : undefined
    )}
  </>
}