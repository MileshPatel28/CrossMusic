import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { StyleSheet, TouchableOpacity } from "react-native";
import TrackPlayer, { State, useActiveTrack, useProgress } from "react-native-track-player";
import {  useState } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Slider from "@react-native-community/slider";
import { theme } from "@/components/theme";

function VolumeSlider() {
  return (
    <ThemedView
      style={{
        top: 35,
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
        width: '100%',
        marginTop: 8, // optional spacing
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


export default function Index() {

  const activeTrack = useActiveTrack();
  const [isPlaying, setIsPlaying] = useState(false);

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
  } catch  {}
};

const nextSong = async () => {
  try {
    await TrackPlayer.skipToNext();
  } catch  {}
};



  return (
    <ThemedView style={{
      flex: 1,
      justifyContent: "flex-end"
    }}>


      <ThemedView
        style={[
          {
            flexDirection: 'column',
            alignItems: 'center',
          }
        ]}>





        <ThemedText style={{ zIndex: 2 }}> {activeTrack?.title} </ThemedText> {/* DOES NOT WORKS HERE */}

        <VolumeSlider/>

        <ThemedView
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
            }
          ]}>

          <TouchableOpacity onPressIn={previousSong}>
            <MaterialIcons id="playPauseIcon" name="skip-previous" size={24} color={theme.colors.text} />
          </TouchableOpacity>

          <TouchableOpacity onPressIn={togglePlayPause}>
            <MaterialIcons id="playPauseIcon" name={isPlaying ? "pause" : "play-arrow"} size={24} color={theme.colors.text} />
          </TouchableOpacity>

          <TouchableOpacity onPressIn={nextSong}>
            <MaterialIcons id="playPauseIcon" name="skip-next" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </ThemedView>












        <MyPlayerBar></MyPlayerBar>

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
