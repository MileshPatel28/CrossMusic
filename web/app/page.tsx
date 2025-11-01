'use client'

import { VolumeX, Volume, Volume1, Volume2, Music, Play, Pause, ChevronFirst, ChevronLast, Repeat, Search, X,Plus } from 'lucide-react';
import Slider from '@mui/material/Slider';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';


export default function Home() {

  const [songs, setSongs] = useState<{ title: string, url: string }[]>([]);
  const [songName, setSongName] = useState("N/A");
  const [duration, setDuration] = useState<number>(0);

  const [volume, setVolume] = useState<number>(30);
  const [trackProgress, setTrackProgress] = useState(0);
  const [paused, setPaused] = useState(true);

  const audioRef = useRef(
    typeof window !== "undefined" ? new Audio() : null
  );
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const [looped, setLooped] = useState(false)
  const [searchBoxOpened, setSearchBoxOpened] = useState(false)
  const [searchText,setSearchText] = useState("")

  const addFileInputRef = useRef<HTMLInputElement>(null)  

  
  useEffect(() => {


    async function fetchSongs() {
      try {
        const res = await fetch('http://localhost:3001/api/songs')
        const data = await res.json();
        setSongs(data)
        setSongName(data[currentTrackIndex].title)

      } catch { }
    }


    fetchSongs()

    if(audioRef.current != null){
      audioRef.current.volume = volume / 100;

      audioRef.current.addEventListener('timeupdate', () => {
        if(audioRef.current == null) return; 
        setTrackProgress(audioRef.current.currentTime)
      })

      audioRef.current.addEventListener('loadedmetadata', () => {
        if(audioRef.current == null) return; 
        setDuration(audioRef.current.duration)
      })
    }


  }, [])


  const handleVolume = (event: Event, newVolume: number) => {
    if(audioRef.current == null) return; 
    setVolume(newVolume)
    audioRef.current.volume = volume / 100;
  }

  const handlePlayPause = () => {
    const newPauseValue = !paused;

    setPaused(newPauseValue);
    if (!newPauseValue) {
      if(audioRef.current == null) return; 
      audioRef.current.play();
    }
    else {
      if(audioRef.current == null) return; 
      audioRef.current.pause();
    }

  }

  const handlePreviousTrack = () => {
    const newIndex = (currentTrackIndex - 1 < 0) ? songs.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(newIndex)
    setSongName(songs[newIndex].title)
  }

  const handleNextTrack = () => {
    if (!looped) {
      const newIndex = (currentTrackIndex + 1 >= songs.length) ? 0 : currentTrackIndex + 1;
      setCurrentTrackIndex(newIndex)
      setSongName(songs[newIndex].title)
    }


  }

  const handleTrackProgress = (_: Event, value: number) => {
    if(audioRef.current == null) return; 
    setTrackProgress(value)
    audioRef.current.currentTime = value;
  }


  const handleInputClick = () => {
    addFileInputRef.current?.click()
  }

  const handleFileAddition = async (event : ChangeEvent<HTMLInputElement>) => {
    if(event.target.files && event.target.files[0]){
      const body = new FormData()
      
      async function fetchSongs() {
        try {
          const res = await fetch('http://localhost:3001/api/songs')
          const data = await res.json();
          setSongs(data)
          setSongName(data[currentTrackIndex].title)

        } catch { }
      }

      for(const file of event.target.files){
        body.append("songs",file)
      }

      try{
        await fetch('http://localhost:3001/api/upload', {
          method: "POST",
          body: body
        })


        fetchSongs()


      }catch(err){
        console.log(err)
      }


    }
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


  useEffect(() => {
    const audio = audioRef.current;

    if (songs != null && songs.length != 0 && audio != null) {
      audio.src = encodeURI("http://localhost:3001" + songs[currentTrackIndex].url)
      if (!paused) audio.play()

      audio.addEventListener('ended', handleNextTrack)

    }

    return () => {
      if(audio != null){
        audio.removeEventListener('ended', handleNextTrack)
      }
    }

  }, [currentTrackIndex, songs])

  useEffect(() => {
    if(audioRef.current == null) return;
    audioRef.current.loop = looped;
  }, [looped]);




  return (
    // Search Song context box
    <div className='flex flex-col items-center'>
      {searchBoxOpened &&
      <div className='absolute z-10 border-2 p-5 rounded-lg bg-black flex flex-col items-center blur-none t-5 m-5'>
        <div className='ml-auto mr-2'>
          <IconButton onClick={() => {
            setSearchText("");
            setSearchBoxOpened(false)}
          }> 
            <X color={'white'} /> 
          </IconButton>
        </div>
        <div className='m-2'> Search Song </div>
        <input onChange={(event) => setSearchText(event.target.value.toLowerCase())} className='border-b-2 border-white-900' type='text' />
        
        <ul className='m-5 space-y-3 h-100 w-200 overflow-y-scroll'>
          {songs.map((song,index) => {

            function switchToSong(){
              setCurrentTrackIndex(index)
              setSongName(songs[index].title)
            }

            async function deleteSong(){
                async function fetchSongs() {
                try {
                  const res = await fetch('http://localhost:3001/api/songs')
                  const data = await res.json();
                  setSongs(data)
                  setSongName(data[currentTrackIndex].title)

                } catch { }
              }

              await fetch(`http://localhost:3001/delete/${encodeURIComponent(song.title)}`, { method: "DELETE" });
              fetchSongs()
            }
            
            if(song.title.toLowerCase().includes(searchText)){
              return (<li key={index} >
                <div onClick={switchToSong} style={{cursor: 'pointer'}} className='flex flex-row space-x-5 border-t-2 border-b-2 border-white-900 justify-between items-center'>
                  <label onClick={switchToSong} style={{cursor: 'pointer'}} className='unselectable'> {index + 1} </label>
                  <label onClick={switchToSong} style={{cursor: 'pointer'}} className='unselectable'> {song.title} </label>
                  <IconButton onClick={deleteSong}> <X color='white'/> </IconButton>
                </div>
              </li>)
            }

          })}
        </ul>
      </div>
      }

      {/* Main page*/}
      <div className="flex flex-col items-center justify-between w-full h-screen p-5" style={{filter: (searchBoxOpened) ? 'blur(var(--blur-sm))' : ''}}> {/* blur-lg */}
        <div className='flex flex-row'>
          <IconButton onClick={() => setSearchBoxOpened(true)}> <Search color='white' /> </IconButton>
          <input onChange={handleFileAddition} ref={addFileInputRef} type={'file'} style={{display: 'none'}}/>
          <IconButton onClick={handleInputClick}> 
            <Plus color='white' /> 
           </IconButton>
        </div>

        <div className='flex-1 flex items-center justify-center'>
          <Music className='m-5' size={256} />
        </div>
        <div className='w-full'>
          <div className='items-center justify-center w-full flex'>
            {songName}
          </div>

          <div className='flex justify-between items-center w-full'>

            <div className='flex w-50 items-center mr-auto'>
              {volume >= 60 ? <Volume2 /> :
                volume >= 15 ? <Volume1 /> :
                  volume >= 1 ? <Volume /> : <VolumeX />}
              <Slider className='m-5' aria-label="Volume" value={volume} onChange={handleVolume} />
            </div>

            <div className='absolute left-1/2 -translate-x-1/2 gap-2'>
              <IconButton onClick={handlePreviousTrack}> <ChevronFirst color='white' /> </IconButton>
              <IconButton onClick={handlePlayPause}>
                {paused ? (<Play color='white' />) : (<Pause color='white' />)}
              </IconButton>
              <IconButton onClick={handleNextTrack}> <ChevronLast color='white' /> </IconButton>
            </div>

            <div className='ml-auto mr-2'>
              <IconButton onClick={() => setLooped(!looped)}> <Repeat color={looped ? 'rgb(25, 118, 210)' : 'white'} /> </IconButton>
            </div>
          </div>
          <div className='w-full flex items-center'>
            <div className='m-2'> {formatDuration(trackProgress)} </div>
            <Slider className='m-5' value={trackProgress} min={0} max={duration} onChange={handleTrackProgress} />
            <div className='m-2'> -{formatDuration(duration - trackProgress)} </div>
          </div>
        </div>
      </div>
    </div>
  );
}

