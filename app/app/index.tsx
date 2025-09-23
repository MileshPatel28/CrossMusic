import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Button } from "@react-navigation/elements";
import { StyleSheet } from "react-native";
import TrackPlayer from "react-native-track-player";

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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
