import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import TrackPlayer, { State, useProgress } from "react-native-track-player";
import * as Progress from 'react-native-progress'
import { useEffect, useState } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';




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
            alignItems: "center",
            justifyContent: "space-between"
          }
        ]}>

      <ThemedText>{formatTime(progress.position)}</ThemedText>
      <Progress.Bar style={{ marginHorizontal: 16 }}
        progress={progress.duration ? progress.position / progress.duration : 0}
        width={200}
      />
      <ThemedText>{formatTime(progress.duration)}</ThemedText>
    </ThemedView>
  );
}


export default function Index() {
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
    <ThemedView style={styles.container}>
      <ThemedText> Cross Music! </ThemedText>

      <ThemedView
        style={[
          styles.container,
          {
            flexDirection: 'row'
          }
        ]}>

        <TouchableOpacity onPressIn={previousSong}>
          <MaterialIcons id="playPauseIcon" name="skip-previous" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPressIn={togglePlayPause}>
          <MaterialIcons id="playPauseIcon" name={isPlaying ? "pause" : "play-arrow"} size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPressIn={nextSong}>
          <MaterialIcons id="playPauseIcon" name="skip-next" size={24} color="white" />
        </TouchableOpacity>

      </ThemedView>


      <MyPlayerBar></MyPlayerBar>



      

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
