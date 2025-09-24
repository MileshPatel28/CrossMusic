import { theme } from "@/components/theme";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";

export default function Settings() {

  async function uploadSong() {
    const res = await DocumentPicker.getDocumentAsync({
      type: "audio/mpeg", 
      multiple: true
    });

    if (res.canceled) return;

    for(const file of res.assets){
      console.log(file);
    }


  }


  return (
    <ThemedView style={styles.container}>
      <ThemedText> Settings! </ThemedText>

      <TouchableOpacity onPress={uploadSong}>
        <Feather name="plus" size={24} color={theme.colors.lightText} />
      </TouchableOpacity>

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
