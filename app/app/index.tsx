import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Button } from "@react-navigation/elements";
import { StyleSheet, View, Animated } from "react-native";
import TrackPlayer from "react-native-track-player";
import * as Progress from 'react-native-progress'
import { useEffect, useRef } from "react";



export default function Index() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText> Cross Music! </ThemedText>

      

      <Button onPressIn={() => {
        TrackPlayer.play()
      }}>Play</Button>

      <Button onPressIn={() => {
        TrackPlayer.pause()
      }}>Stop</Button>

      <Button onPressIn={() => { TrackPlayer.skipToNext() }}> {'>'} </Button>
      <Button onPressIn={() => { TrackPlayer.skipToPrevious() }}> {'<'} </Button>
      
      <Progress.Bar width={200} progress={0.5}></Progress.Bar>

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
