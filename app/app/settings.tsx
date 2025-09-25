import { theme } from "@/components/theme";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from "./lib";



export async function saveSearchTerm(term:string) {
  if (Platform.OS === "web") {
    localStorage.setItem("serverSearchTerm", term);
  } else {
    await AsyncStorage.setItem('server_adresse', term);
  }
}

export async function loadSearchTerm() {
  if (Platform.OS === "web") {
    return localStorage.getItem("serverSearchTerm") || baseUrl;
  } else {
    return await AsyncStorage.getItem('server_adresse') || baseUrl;
  }
}

export default function Settings() {
  const [serverSearchTerm, setServerSearchTerm] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    async function loadData(){
      setServerSearchTerm(await loadSearchTerm())

    }

    loadData()

  }, [])


  return (
    <ThemedView style={styles.container}>
      <ThemedText> Settings </ThemedText>

      <ThemedView style={{ margin: 10 }}>
        <ThemedText style={{ padding: 5, fontSize: 20}}> Server adresse: </ThemedText>
        <TextInput
          placeholder="Enter adresse..."
          value={serverSearchTerm}
          onChangeText={async (text) => {
            saveSearchTerm(text);
            setServerSearchTerm(text);
          }}
          style={{
            marginBottom: 10,
            padding: 8,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: theme.colors.outline,
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
          }}
        />
        {error ? (
          <ThemedText style={{ color: 'red', marginTop: 4 }}>{error}</ThemedText>
        ) : null}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  }
});
