import { Platform } from "react-native";
import TrackPlayer from "react-native-track-player";
import * as DocumentPicker from "expo-document-picker";
import { loadSearchServerAddress } from "./settings";
import { Directory, File, Paths } from 'expo-file-system';


export let baseUrl = "http://localhost:3000"; // TO MODIFY

const SONGS_DIR = new Directory(Paths.document, "songs");


export async function syncTrackPlayer() {

  baseUrl = await loadSearchServerAddress()

  let tracks;

  try {
  
  const res = await fetch(`${baseUrl}/api/songs`);
  const songs = await res.json();

 
    tracks = songs.map((song: { url: string; title: any; }) => ({
      url: baseUrl + song.url,
      title: song.title
    }))

    await TrackPlayer.reset();
    await TrackPlayer.add(tracks)
  }catch(e){
    console.log("(CrossMusic Error) " + e);
    console.log("Maybe the serve adresse is incorrect?")
  }

  
  // Add specific local storage for android phone (Not sure how to do for other platforms)
  if (Platform.OS === 'android') {
    if(!SONGS_DIR.exists){
      SONGS_DIR.create();
    }

    let songFilesAndroid = SONGS_DIR.list();

    if(tracks != null && tracks.length > songFilesAndroid.length){

    }
    else if(tracks != null && tracks.length <= songFilesAndroid.length){
      
    }
    else {

    }


  }
}


export async function uploadSong() {

  baseUrl = await loadSearchServerAddress()

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

  baseUrl = await loadSearchServerAddress()

  try {
    await fetch(baseUrl +`/delete/${encodeURIComponent(songTitle)}`, { method: "DELETE" });
    await syncTrackPlayer();
  }catch(e) {
    console.log(e);
  }
}