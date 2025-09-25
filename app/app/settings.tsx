import { theme } from "@/components/theme";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from "./lib";



function formatAddress(serverAddress:string){
  if(!serverAddress.startsWith('http://')){
    serverAddress = 'http://' + serverAddress;
  }

  if(!serverAddress.endsWith(':3000')){ //Modify this to allow dynamic ports
    serverAddress = serverAddress + ':3000'
  }

  return serverAddress;
}

export async function saveSearchServerAddress(serverAddress:string) {

  serverAddress = formatAddress(serverAddress);

  if (Platform.OS === "web") {
    localStorage.setItem("serverSearchserverAddress", serverAddress);
  } else {
    await AsyncStorage.setItem('server_Addresse', serverAddress);
  }
}

export async function loadSearchServerAddress() {
  if (Platform.OS === "web") {
    return localStorage.getItem("serverSearchserverAddress") || baseUrl;
  } else {
    return await AsyncStorage.getItem('server_Addresse') || baseUrl;
  }
}

export default function Settings() {
  const [serverSearchserverAddress, setServerSearchserverAddress] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    async function loadData(){
      setServerSearchserverAddress(await loadSearchServerAddress())

    }

    loadData()

  }, [])


  return (
    <ThemedView style={styles.container}>
      <ThemedText> Settings </ThemedText>

      <ThemedView style={{ margin: 10 }}>
        <ThemedText style={{ padding: 5, fontSize: 20}}> Server Addresse: </ThemedText>
        <TextInput
          placeholder="Enter Addresse..."
          value={serverSearchserverAddress}
          onChangeText={async (text) => {
            saveSearchServerAddress(text);
            setServerSearchserverAddress(text);
          }}
          onSubmitEditing={(event) => {
            let finalInput = event.nativeEvent.text;
            setServerSearchserverAddress(formatAddress(finalInput))
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
