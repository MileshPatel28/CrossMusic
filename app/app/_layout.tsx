import { theme } from "@/components/theme";
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import TrackPlayer from 'react-native-track-player';


TrackPlayer.registerPlaybackService(() => require('./service.js'));

export default function RootLayout() {

  useEffect(() => {
    async function setupPlayer() {
      if(Platform.OS === "web"){
        const baseUrl = "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/songs`);
        const songs = await res.json();

        let tracks = songs.map((song: { url: string; title: any; }) => ({
          url: baseUrl + song.url,
          title: song.title
        }))

        await TrackPlayer.add(tracks)
      }   
      else {
        const track1 = {
          url: require('../assets/test_music/St.Cliche - Spectral.mp3'), 
          title: 'St.Cliche - Spectral',
        }

        const track2 = {
          url: require('../assets/test_music/Ivan B - Sweaters.mp3'), 
          title: 'Ivan B - Sweaters',
        }

        const track3 = {
          url: require('../assets/test_music/Blank.mp3'), 
          title: 'Blank',
        }

        await TrackPlayer.add([track1,track2,track3])
      }


    }

    setupPlayer();
    
  })


  return <Tabs
  screenOptions={{
    tabBarActiveTintColor: theme.colors.lightText,
    headerShown: false,
    headerShadowVisible: false,
    tabBarStyle: {backgroundColor: theme.colors.darkBackground, borderTopWidth: 0}
  }}>
    <Tabs.Screen
      name="index"
      options={{
        title: "",
        tabBarIcon: ({ color }) => <Feather size={28} name="music" color={color} />,
      }}
    />
    <Tabs.Screen
      name="settings"
      options={{
        title: "",
        tabBarIcon: ({ color }) => <Feather size={28} name="settings" color={color} />,
      }}
    />

  </Tabs>


  // return <Stack
  //   screenOptions={{headerShown: false}}
  //   />

}
