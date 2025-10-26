'use client'

import { Volume1,Music,Play,Pause, ChevronFirst, ChevronLast,Repeat } from 'lucide-react';
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


  return (
    <div className="flex flex-col items-center justify-center w-full p-5 ">
      <div> Cross Music </div>
      <Music className='m-5' />
      <div className='flex w-50 justify-start items-center self-start'>
        <Volume1 />
        <Slider className='m-5' aria-label="Volume" value={volume} onChange={handleVolume} />
      </div>
      <div>
        <IconButton> <ChevronFirst color='white' /> </IconButton>
        <IconButton onClick={() => setPaused(!paused)}>
          {paused ? (<Play color='white' />) : (<Pause color='white'/>)}
        </IconButton>
        <IconButton> <ChevronLast color='white' /> </IconButton>
        <IconButton className='self-end'> <Repeat color='white' /> </IconButton>
      </div>
      <div className='w-full flex items-center'>
        <div className='m-2'> 0:00 </div>
        <Slider className='m-5' value={trackProgress} min={0} max={duration} onChange={(_,value) => setTrackProgress(value)} />
        <div className='m-2'> 1:00 </div>
      </div>
    </div>
  );
}
