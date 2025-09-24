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

      const baseUrl = "http://localhost:3000"; // TO MODIFY
      const res = await fetch(`${baseUrl}/api/songs`);
      const songs = await res.json();

      let tracks = songs.map((song: { url: string; title: any; }) => ({
        url: baseUrl + song.url,
        title: song.title
      }))

      await TrackPlayer.add(tracks)

      // Add specific local storage for android phone (Not sure how to do for other platforms)
      if(Platform.OS === 'android'){

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
      name="playlist"
      options={{
        title: "",
        tabBarIcon: ({ color }) => <Feather size={28} name="list" color={color} />,
      }}
    />
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
