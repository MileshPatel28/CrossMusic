import { theme } from "@/components/theme";
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from "expo-router";
import { useEffect } from "react";
import TrackPlayer from 'react-native-track-player';
import {syncTrackPlayer} from './lib'

TrackPlayer.registerPlaybackService(() => require('./service.js'));

export default function RootLayout() {

  useEffect(() => {
    
    async function setupPlayer() {
      await TrackPlayer.setupPlayer();
      syncTrackPlayer();
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
