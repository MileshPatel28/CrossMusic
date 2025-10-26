import { theme } from "@/components/theme";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl, syncTrackPlayer } from "./lib";
import Feather from "@expo/vector-icons/Feather";
import { Directory, Paths } from "expo-file-system";
import * as Notifications from 'expo-notifications';



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
      <TouchableOpacity onPress={() => {
        async function sendTestNotification() {

            Notifications.setNotificationCategoryAsync("music", [
            {
              identifier: "PLAY",
              buttonTitle: "Play",
              options: { opensAppToForeground: false }
            },
            {
              identifier: "PAUSE",
              buttonTitle: "Pause",
              options: { opensAppToForeground: false }
            }
          ]);

          const sub = Notifications.addNotificationResponseReceivedListener(response => {
            const actionId = response.actionIdentifier;
            if (actionId === "PLAY") {
              console.log("Play pressed");
            } else if (actionId === "PAUSE") {
              console.log("Pause pressed");
            }
          });

          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Test Notification",
              body: "This is a notification with a button!",
              categoryIdentifier: "music"
            },
            trigger: null,
          });
        }
        console.log("REFRESHING")
        
        sendTestNotification();

        syncTrackPlayer()
      }}>
        <Feather name="refresh-ccw" size={24} color={theme.colors.lightText} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        if(Platform.OS === 'android'){
          let SONGS_DIR = new Directory(Paths.document, "songs");
          SONGS_DIR.delete();
        }
        console.log("WIPING LOCAL DATA")
      }}>
        <Feather name="alert-octagon" size={24} color={theme.colors.lightText} />
      </TouchableOpacity>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  }
});
