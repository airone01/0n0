import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/default/sliders.css';
import '@vidstack/react/player/styles/default/time.css';

import { FullscreenIcon, PauseIcon, PlayIcon, Volume1Icon, Volume2Icon, VolumeIcon, VolumeXIcon } from "lucide-react";
import { MediaPlayer, MediaProvider, PlayButton, MediaPlayerInstance, useStore, FullscreenButton, Poster, VolumeSlider } from "@vidstack/react";
import { useRef, useState } from 'react';
import { TimeSlider } from '@vidstack/react';
import { Time } from '@vidstack/react';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

type Props = {
  file: File
}

export default function MyMediaPlayer({ file }: Props) {
  const ref = useRef<MediaPlayerInstance>(null);
  const { paused, canFullscreen, volume } = useStore(MediaPlayerInstance, ref);
  const [startedOnce, setStartedOnce] = useState(false);

  const CurrentVolumeIcon = volume > (2 / 3) ?
    Volume2Icon : volume > (1 / 3) ?
      Volume1Icon : volume <= 0.05 ?
        VolumeXIcon : VolumeIcon;

  return <MediaPlayer autoPlay={false} ref={ref} src={file} className="text-background relative group rounded-t-xl">
    <MediaProvider className="absolute" />
    {startedOnce ?
      <div className="absolute w-full h-full flex flex-col justify-end items-center">
        <nav className="flex justify-between items-center gap-2 p-1 w-full bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-all">
          <PlayButton className='aspect-square flex justify-center items-center hover:backdrop-blur-md hover:bg-accent/50 text-slate-50 h-9 p-1 rounded-sm'>
            {paused ? <PlayIcon className="group-hover:shadow-sm fill-current" /> : <PauseIcon className="group-hover:shadow-sm fill-current" />}
          </PlayButton>
          <div className='flex flex-col justify-end items-start w-full h-full pb-1 g'>
            <TimeSlider.Root className="vds-time-slider vds-slider h-2 w-full m-0">
              <TimeSlider.Track className="vds-slider-track rounded-full h-full" />
              <TimeSlider.TrackFill className="vds-slider-track-fill bg-muted rounded-full vds-slider-track h-full" />
              <TimeSlider.Progress className="vds-slider-progress bg-muted/30 vds-slider-track rounded-full vds-slider-track h-full" />
              <TimeSlider.Thumb className="vds-slider-thumb bg-slate-50 h-full border shadow-sm" />
            </TimeSlider.Root>
            <Time className="text-muted/50 text-sm text-slate-50" />
          </div>
          <Popover>
            <PopoverTrigger>
              <Button variant="ghost" className='aspect-square flex justify-center items-center hover:backdrop-blur-md hover:bg-accent/50 text-slate-50 h-9 p-1 rounded-sm' >
                <CurrentVolumeIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='p-0 px-2'>
              <VolumeSlider.Root className="vds-slider m-0">
                <VolumeSlider.Track className="vds-slider-track bg-muted/30" />
                <VolumeSlider.TrackFill className="vds-slider-track-fill vds-slider-track bg-foreground" />
                <VolumeSlider.Thumb className="vds-slider-thumb bg-accent" />
              </VolumeSlider.Root>
            </PopoverContent>
          </Popover>
          <FullscreenButton className={`aspect-square flex justify-center items-center hover:backdrop-blur-md hover:bg-accent/50 text-slate-50 h-9 p-1 rounded-s ${!canFullscreen ? 'pointer-events-none text-muted' : ''}`}>
            <FullscreenIcon className="group-hover:shadow-sm pause-icon fill-current" />
          </FullscreenButton>
        </nav>
      </div> :
      <div className="absolute flex justify-center items-center h-full w-full">
        <PlayButton className='aspect-square flex justify-center items-center hover:bg-accent/50 hover:backdrop-blur-md text-slate-50 h-12 p-2 rounded-sm' onClick={() => { setStartedOnce(true) }}>
          <PlayIcon className="group-hover:shadow-sm play-icon fill-current" />
        </PlayButton>
      </div>}
  </MediaPlayer>
} 