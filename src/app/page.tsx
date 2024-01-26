'use client'

import TypingAnimation from "@/components/typingAnimation";
import Ffmpeg from "@/components/ffmpeg";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";

export default function HomePage() {
  const [ffmpegMessages, setFfmpegMessages] = useState('');
  const [percent, setPercent] = useState(0);

  return (
    <>
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>Ffmpeg.wasm messages</DrawerHeader>
          <DrawerDescription>{ffmpegMessages}</DrawerDescription>
        </DrawerContent>
      </Drawer>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center px-4 py-16">
          <h1 className="cool-title flex just-center items-center">
            NoConverter<RadialLoader percent={percent} />
          </h1>
          <TypingAnimation />
        </div>
        <Ffmpeg setFfmpegMessages={setFfmpegMessages} setPercent={setPercent} />
      </main >
    </>
  );
}

const RadialLoader = ({ percent }: { percent: number }) => (
  <div className="w-8 h-14 flex flex-col justify-end">
    <svg className="w-8 h-8 transform translate-x-1 translate-y-1" aria-hidden="true">
      <circle
        className="stroke-muted"
        strokeWidth="5"
        fill="transparent"
        r="12.5"
        cx="15"
        cy="15"
      />
      <circle
        className="stroke-foreground transition-all"
        strokeWidth="5"
        strokeDasharray={2 * Math.PI * 12.5}
        strokeDashoffset={2 * Math.PI * 12.5 - percent / 100 * 2 * Math.PI * 12.5}
        strokeLinecap="round"
        fill="transparent"
        r="12.5"
        cx="15"
        cy="15"
      />
    </svg>
  </div>
)
