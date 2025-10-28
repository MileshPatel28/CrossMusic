'use client'

import { VolumeX,Volume,Volume1,Volume2, Music,Play,Pause, ChevronFirst, ChevronLast,Repeat } from 'lucide-react';
import Slider from '@mui/material/Slider';
import { useEffect, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';


export default function Home() {

  const [songs,setSongs] = useState([]);
  const [songName,setSongName] = useState("N/A");

  const [volume,setVolume] = useState<number>(30);
  const [trackProgress,setTrackProgress] = useState(0);
  const [paused,setPaused] = useState(true);
  const [duration,setDuration] = useState<number>(0);

  const audioRef = useRef(new Audio())
  const [currentTrackIndex,setCurrentTrackIndex] = useState(0);

  useEffect(() => {

    async function fetchSongs(){
      try {
        const res = await fetch('http://localhost:3001/api/songs')
        const data = await res.json();
        setSongs(data)
        setSongName(data[currentTrackIndex].title)
        // audioRef.current.src = encodeURI("http://localhost:3001/songs/Ivan B - Sweaters.mp3")
        
      }catch{}
    }



    fetchSongs()

    audioRef.current.volume = volume/100;
    audioRef.current.addEventListener('timeupdate', () => {
      setTrackProgress(audioRef.current.currentTime)
    })

    audioRef.current.addEventListener('loadedmetadata', () => {
      setDuration(audioRef.current.duration)
      
    })

    console.log(duration)
  },[])

  useEffect(() => {
    if(songs != null && songs.length != 0){
      audioRef.current.src = encodeURI("http://localhost:3001" + songs[currentTrackIndex].url)
    }
  },[currentTrackIndex, songs])


  const handleVolume = (event: Event, newVolume : number) => {
    setVolume(newVolume)
    audioRef.current.volume = volume/100;
  }
  
  const handlePlayPause = () => {
    setPaused(!paused);
    if(paused) {
      audioRef.current.play();
    }
    else {
      audioRef.current.pause();
    }
    
  }

  const handleNextTrack = () => {
    setCurrentTrackIndex(currentTrackIndex + 1)
    setSongName(songs[currentTrackIndex].title)
    console.log(currentTrackIndex)
  }

  const handleTrackProgress = (_,value) => {
    setTrackProgress(value)

    audioRef.current.currentTime = value;
  }

  function formatDuration(value: number) {
    const hrs = Math.floor(value / 3600);
    const mins = Math.floor((value % 3600) / 60);
    const secs = Math.floor(value % 60);

    if (hrs > 0) {
      return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
    return `${mins}:${String(secs).padStart(2, "0")}`;
  }


  return (
    <div className="flex flex-col items-center justify-between w-full h-screen p-5 ">

      <div className='flex-1 flex items-center justify-center'>
        <Music className='m-5' size={256} />
      </div>
      <div className='w-full'>
        <div className='items-center justify-center w-full flex'>
          {songName}
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
            <IconButton onClick={handlePlayPause}>
              {paused ? (<Play color='white' />) : (<Pause color='white'/>)}
            </IconButton>
            <IconButton onClick={handleNextTrack}> <ChevronLast color='white' /> </IconButton>
          </div>

          <div className='ml-auto mr-2'>
            <IconButton > <Repeat color='white' /> </IconButton>
          </div>
        </div>
        <div className='w-full flex items-center'>
          <div className='m-2'> {formatDuration(trackProgress)} </div>
          <Slider className='m-5' value={trackProgress} min={0} max={duration} onChange={handleTrackProgress} />
          <div className='m-2'> -{formatDuration(duration - trackProgress)} </div>
        </div>
      </div>
    </div>
  );
}
