import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { StyleSheet } from "react-native";

export default function Settings() {



  return (
    <ThemedView style={styles.container}>
      <ThemedText> Settings! (TBA) </ThemedText>
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
