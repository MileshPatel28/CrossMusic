import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import Accordion from 'react-native-collapsible/Accordion';
import React, { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { theme } from "@/components/theme";
import TrackPlayer ,{ Event} from "react-native-track-player";
import { TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import {uploadSong, deleteSong, syncTrackPlayer} from './lib'




export default function Playlists(){
    const [activeSections, setActiveSections] = useState<number[]>([]);
    const [tracks, setTracks] = useState<any[]>([]);

    useEffect(() => {
        async function loadTracks() {
            syncTrackPlayer()
            setTracks(await TrackPlayer.getQueue())
        }
        
        loadTracks();

        const sub = TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, loadTracks);

        return () => {
            sub.remove();
        };
    }, []);


    

    function createAllSongList() {
        return (
            <ThemedView
                style={{
                    marginVertical: 10,
                    padding: 10
                }}
            >  
           
                {tracks.map((track, index) => (
                    <React.Fragment key={track.id ?? index}>
                        {singleSongTile(track)}
                    </React.Fragment>
                ))}
            </ThemedView>
        );
    }

    function singleSongTile(singleTrack:any) {


        async function skipToSong() {
            const queue = await TrackPlayer.getQueue();
            const index = queue.findIndex((t) => {
                return t.url === singleTrack.url
            });

            if(index !== -1) {
                await TrackPlayer.skip(index);
                await TrackPlayer.play()
                router.push('/')

            }

        }   

        return(
            <ThemedView 
                style={{
                    borderColor: theme.colors.outline,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderCurve: 'circular',
                    borderRadius: 10,
                    padding: 3,
                    margin: 5,
                }}>
                <ThemedText
                    style={{
                        flex: 1,
                        fontSize: 20,
                    }}
                > {singleTrack.title} </ThemedText>
                <TouchableOpacity onPress={skipToSong}>
                    <MaterialIcons id="playPauseIcon" name="skip-next" size={24} color={theme.colors.text} />
                </TouchableOpacity>

                <TouchableOpacity style={{marginLeft:'auto'}} onPress={() => deleteSong(singleTrack.title)}>
                    <MaterialIcons name="delete" size={24} color={theme.colors.text} />
                </TouchableOpacity>
            </ThemedView>
        )
    }


    return(
        <ThemedView
            style={{
                flex: 1,
                padding: 50
            }}>

            <Accordion
                sections={[{ title: "All Songs", content: "" }]}
                activeSections={activeSections}
                renderHeader={(section, _) => (
                    <ThemedView 
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}> 
                        <MaterialIcons name="library-music" size={40} color={theme.colors.text} />
                        <ThemedText style={{ 
                                fontWeight: "bold",
                                fontSize: 28,
                                marginHorizontal: 8
                            }}>
                            {section.title}
                        </ThemedText>
                        <TouchableOpacity style={{marginLeft:'auto'}} onPress={uploadSong}>
                            <Feather name="plus" size={24} color={theme.colors.lightText} />
                        </TouchableOpacity>
                    </ThemedView>

                )}
                renderContent={(section) => (
                    createAllSongList()
                )}
                onChange={setActiveSections}
            />
            

        </ThemedView>
    )
}