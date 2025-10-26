'use client'

import { VolumeX,Volume,Volume1,Volume2, Music,Play,Pause, ChevronFirst, ChevronLast,Repeat } from 'lucide-react';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';

export default function Home() {


  const duration = 200;
  const [volume,setVolume] = useState<number>(30);
  const [trackProgress,setTrackProgress] = useState(0);
  const [paused,setPaused] = useState(true);

  const handleVolume = (event: Event, newVolume : number) => {
    setVolume(newVolume)
  }

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }


  return (
    <div className="flex flex-col items-center justify-between w-full h-screen p-5 ">
      <div className='flex-1 flex items-center justify-center'>
        <Music className='m-5' size={256} />
      </div>
      <div className='w-full'>
        <div className='items-center justify-center w-full flex'>
          Music Name
        </div>

        <div className='flex justify-between items-center w-full'>

          <div className='flex w-50 items-center mr-auto'>
            {volume >= 60 ? <Volume2/> :
             volume >= 15 ? <Volume1/> :
             volume >= 1 ? <Volume /> : <VolumeX />}
            <Slider className='m-5' aria-label="Volume" value={volume} onChange={handleVolume} />
          </div>

          <div className='absolute left-1/2 -translate-x-1/2 gap-2'>
            <IconButton> <ChevronFirst color='white' /> </IconButton>
            <IconButton onClick={() => setPaused(!paused)}>
              {paused ? (<Play color='white' />) : (<Pause color='white'/>)}
            </IconButton>
            <IconButton> <ChevronLast color='white' /> </IconButton>
          </div>

          <div className='ml-auto mr-2'>
            <IconButton > <Repeat color='white' /> </IconButton>
          </div>
        </div>
        <div className='w-full flex items-center'>
          <div className='m-2'> {formatDuration(trackProgress)} </div>
          <Slider className='m-5' value={trackProgress} min={0} max={duration} onChange={(_,value) => setTrackProgress(value)} />
          <div className='m-2'> -{formatDuration(duration - trackProgress)} </div>
        </div>
      </div>
    </div>
  );
}
