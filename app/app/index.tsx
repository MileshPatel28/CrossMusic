import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { StyleSheet, TouchableOpacity } from "react-native";
import TrackPlayer, { Event,State, useActiveTrack, useProgress } from "react-native-track-player";
import {  useEffect, useState } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Slider from "@react-native-community/slider";
import { theme } from "@/components/theme";
import Feather from "@expo/vector-icons/build/Feather";

function MusicVisualizer() {
  return (
    <ThemedView style={{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    }}>
      <Feather size={250} name="music" color={theme.colors.darkBackground} />
    </ThemedView>
  )
}


function VolumeSlider() {
  return (
    <ThemedView
      style={{
        top: 50,
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
        width: '100%',
        marginTop: 8, 
      }}>
        <MaterialIcons name="volume-up" size={24} color={theme.colors.text} />
        <Slider
        style={{ flex: 0.25, height: 40, marginHorizontal: 16 }}
        minimumValue={0}
        maximumValue={100}
        value={50}
        minimumTrackTintColor={theme.colors.text}  
        maximumTrackTintColor={theme.colors.darkBackground}
        thumbTintColor={theme.colors.lightText}
        onSlidingComplete={async (value) => {
          await TrackPlayer.setVolume(value/100)
        }}
      />

    </ThemedView>
    
  );
}


function MyPlayerBar() {
  const progress = useProgress();

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <ThemedView
        style={[
          styles.container,
          {
            flexDirection: 'row',
            width: '100%',
            padding: 16,
            alignItems: "center",
          }
        ]}>

      <ThemedText>{formatTime(progress.position)}</ThemedText>
      <Slider
        style={{ flex: 1, height: 40, marginHorizontal: 16 }}
        minimumValue={0}
        maximumValue={progress.duration || 0}
        value={progress.position}
        minimumTrackTintColor={theme.colors.text}  
        maximumTrackTintColor={theme.colors.darkBackground}
        thumbTintColor={theme.colors.lightText}
        onSlidingComplete={async (value) => {
          await TrackPlayer.seekTo(value); 
        }}
      />
      <ThemedText>{formatTime(progress.duration)}</ThemedText>
    </ThemedView>
  );
}


export default function MusicPlayer() {

  const [queueLength, setQueueLength] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeTrack = useActiveTrack();
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    async function loadQueue() {
      setQueueLength((await TrackPlayer.getQueue()).length)
      setCurrentIndex((await TrackPlayer.getActiveTrackIndex() ?? 0) + 1)

      const playbackState = await TrackPlayer.getPlaybackState();
      setIsPlaying((playbackState.state === State.Playing) ? true : false)
    }

    
    // Try Catch because of Expo routing
    try {
      loadQueue();

      TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async () => {
        setQueueLength((await TrackPlayer.getQueue()).length)
        setCurrentIndex((await TrackPlayer.getActiveTrackIndex() ?? 0) + 1)
      })
    }catch{}
  })

  const togglePlayPause = async () => {
    const playbackState = await TrackPlayer.getPlaybackState();

    if (playbackState.state === State.Playing) {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      await TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  const previousSong = async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch  {
      await TrackPlayer.skip((await TrackPlayer.getQueue()).length - 1)
    }
  };

  const nextSong = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch  {
      await TrackPlayer.skip(0)
    }
  };



  return (

    <ThemedView style={{
      flex: 1,
    }}>

      <MusicVisualizer></MusicVisualizer>

      <ThemedView style={{
        justifyContent: "flex-end", 
      }}>


        <ThemedView
          style={[
            {
              flexDirection: 'column',
              alignItems: 'center',

            }
          ]}>





          <ThemedText style={{ zIndex: 2, fontSize: 28 }}> {(activeTrack != null) ? activeTrack.title : "<No Songs>"} </ThemedText> 

          <ThemedView 
            style={{ 
              top: 50,
              flexDirection: 'row',
              justifyContent: "flex-end",
              alignItems: 'center',
              width: '100%',
              marginEnd: 50,
            }}>
            <ThemedText style={{fontSize: 24}}> {currentIndex} / {queueLength} </ThemedText>
          </ThemedView>
          
          <VolumeSlider/>

          <ThemedView
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
              }
            ]}>

            <TouchableOpacity onPressIn={previousSong}>
              <MaterialIcons id="playPauseIcon" name="skip-previous" size={48} color={theme.colors.text} />
            </TouchableOpacity>

            <TouchableOpacity onPressIn={togglePlayPause}>
              <MaterialIcons id="playPauseIcon" name={isPlaying ? "pause" : "play-arrow"} size={48} color={theme.colors.text} />
            </TouchableOpacity>

            <TouchableOpacity onPressIn={nextSong}>
              <MaterialIcons id="playPauseIcon" name="skip-next" size={48} color={theme.colors.text} />
            </TouchableOpacity>
          </ThemedView>












          <MyPlayerBar></MyPlayerBar>

        </ThemedView>

      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

  },
});
