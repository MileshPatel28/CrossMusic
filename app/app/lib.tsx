import { Platform } from "react-native";
import TrackPlayer from "react-native-track-player";
import * as DocumentPicker from "expo-document-picker";

const baseUrl = "http://localhost:3000"; // TO MODIFY

export async function syncTrackPlayer() {

  const res = await fetch(`${baseUrl}/api/songs`);
  const songs = await res.json();

  let tracks = songs.map((song: { url: string; title: any; }) => ({
    url: baseUrl + song.url,
    title: song.title
  }))

  await TrackPlayer.reset();
  await TrackPlayer.add(tracks)

  // Add specific local storage for android phone (Not sure how to do for other platforms)
  if (Platform.OS === 'android') {

  }
}


export async function uploadSong() {
  const res = await DocumentPicker.getDocumentAsync({
    type: "audio/mpeg",
    multiple: true
  });

  if (res.canceled) return;

  const formData = new FormData();

  for (const file of res.assets) {
    if (file.file && Platform.OS === 'web') {
      formData.append("songs", file.file);
    }
    else if(Platform.OS === 'android') {
      formData.append("songs", {
          uri: file.uri,
          type: "audio/mpeg",
          name: file.name || "upload.mp3",
        } as any);
    }
  }

  await fetch(baseUrl + "/api/upload", {
    method: "POST",
    body: formData,
    headers: Platform.OS !== "web" ? { "Content-Type": "multipart/form-data" } : {},
  })


  syncTrackPlayer();
}


export async function deleteSong(songTitle:string){
  try {
    await fetch(baseUrl +`/delete/${encodeURIComponent(songTitle)}`, { method: "DELETE" });
  }catch(e) {
    console.log(e);
  }
}