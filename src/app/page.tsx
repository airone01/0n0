"use client";

import TypingAnimation from "@/components/typingAnimation";
import Ffmpeg from "@/components/ffmpeg";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { RadialLoader } from "@/components/ui/radial-loader";

import { atom, useAtom } from 'jotai';
import { ChevronsUpIcon } from "lucide-react";

const percentAtom = atom(0);
const ffmpegMessagesAtom = atom<string[]>([]);

export default function HomePage() {
  const [ffmpegMessages] = useAtom(ffmpegMessagesAtom);

  return (
    <>
      <main className="grow flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center px-4 py-16">
          <h1 className="cool-title flex just-center items-center">
            NoConverter<RadialLoader percentAtom={percentAtom} />
          </h1>
          <TypingAnimation />
        </div>
        <Ffmpeg ffmpegMessagesAtom={ffmpegMessagesAtom} percentAtom={percentAtom} />
      </main >
      <Drawer>
        <DrawerTrigger className="grow-0"><ChevronsUpIcon /></DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>Ffmpeg.wasm messages</DrawerHeader>
          <DrawerDescription>{ffmpegMessages.map(message => <><span>{message}</span><br /></>)}</DrawerDescription>
        </DrawerContent>
      </Drawer>
    </>
  );
}
