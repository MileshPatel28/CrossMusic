import { theme } from "@/components/theme";
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from "expo-router";
import { useEffect } from "react";
import TrackPlayer from 'react-native-track-player';

TrackPlayer.registerPlaybackService(() => require('./service.js'));

export default function RootLayout() {

  useEffect(() => {
    async function setupPlayer() {
      await TrackPlayer.setupPlayer()

      const track1 = {
         url: require('../assets/test_music/St.Cliche - Spectral.mp3'), 
        title: 'Avaritia',
        artist: 'deadmau5',
        album: 'while(1<2)',
        genre: 'Progressive House, Electro House',
        date: '2014-05-20T07:00:00+00:00', 
        duration: 402 
      }

      const track2 = {
         url: require('../assets/test_music/Ivan B - Sweaters.mp3'), 
        title: 'Avaritia',
        artist: 'deadmau5',
        album: 'while(1<2)',
        genre: 'Progressive House, Electro House',
        date: '2014-05-20T07:00:00+00:00', 
        duration: 402 
      }

      const track3 = {
         url: require('../assets/test_music/Blank.mp3'), 
        title: 'Avaritia',
        artist: 'deadmau5',
        album: 'while(1<2)',
        genre: 'Progressive House, Electro House',
        date: '2014-05-20T07:00:00+00:00', 
        duration: 402 
      }

      await TrackPlayer.add([track1,track2,track3])

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
