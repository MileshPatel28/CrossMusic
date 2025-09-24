import { Platform } from "react-native";
import TrackPlayer from "react-native-track-player";



export async function syncTrackPlayer() {
    const baseUrl = "http://localhost:3000"; // TO MODIFY
    const res = await fetch(`${baseUrl}/api/songs`);
    const songs = await res.json();

    let tracks = songs.map((song: { url: string; title: any; }) => ({
      url: baseUrl + song.url,
      title: song.title
    }))
    
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks)

    // Add specific local storage for android phone (Not sure how to do for other platforms)
    if(Platform.OS === 'android'){

    }
}