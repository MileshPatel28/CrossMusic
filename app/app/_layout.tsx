import { theme } from "@/components/theme";
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from "expo-router";
import TrackPlayer from 'react-native-track-player';
import service from './service.js'

export default async function RootLayout() {
  TrackPlayer.registerPlaybackService(() => service);
  await TrackPlayer.setupPlayer()

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
        title: "Home",
        tabBarIcon: ({ color }) => <Feather size={28} name="music" color={color} />,
      }}
    />
    <Tabs.Screen
      name="settings"
      options={{
        title: "Settings",
        tabBarIcon: ({ color }) => <Feather size={28} name="settings" color={color} />,
      }}
    />

  </Tabs>


  // return <Stack
  //   screenOptions={{headerShown: false}}
  //   />

}
