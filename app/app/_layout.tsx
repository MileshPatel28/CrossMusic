import { theme } from "@/components/theme";
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from "expo-router";
import { useEffect } from "react";
import TrackPlayer, { Capability } from 'react-native-track-player';
import {syncTrackPlayer} from './lib'
import * as Notifications from 'expo-notifications';

TrackPlayer.registerPlaybackService(() => require('./service.js'));

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {

  useEffect(() => {

    function rgbToInt(rgb: string) {
      const result = rgb.match(/\d+/g); 
      if (!result) return 0; 
      const [r, g, b] = result.map(Number);
      return (255 << 24) | (r << 16) | (g << 8) | b; 
    }

    
    async function setupPlayer() {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        color: rgbToInt(theme.colors.background)
      })
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
