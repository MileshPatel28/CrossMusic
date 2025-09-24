import { theme } from "@/components/theme";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";

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
