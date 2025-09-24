import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import Collapsible from "react-native-collapsible";
import Accordion from 'react-native-collapsible/Accordion';



import React, { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { theme } from "@/components/theme";
import TrackPlayer from "react-native-track-player";
import { TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import * as DocumentPicker from "expo-document-picker";




export default function Playlists(){
    const [activeSections, setActiveSections] = useState<number[]>([]);
    const [tracks, setTracks] = useState<any[]>([]);

    useEffect(() => {
        async function loadTracks() {
            setTracks(await TrackPlayer.getQueue())
        }
        
        loadTracks();
    }, []);

      async function uploadSong() {
        const res = await DocumentPicker.getDocumentAsync({
          type: "audio/mpeg", 
          multiple: true
        });
    
        if (res.canceled) return;
    
        for(const file of res.assets){
          console.log(file);
        }
    
    
      }
    

    function createAllSongList() {
        return (
            <ThemedView
                style={{
                    marginVertical: 10,
                    padding: 10
                }}
            >
                {tracks.map((track, index) => (
                    singleSongTile(track)
                ))}
            </ThemedView>
        );
    }

    function singleSongTile(singleTrack:any) {
        return(
            <ThemedView 
                style={{
                    borderColor: theme.colors.outline,
                    borderWidth: 2,
                    borderCurve: 'circular',
                    borderRadius: 10,
                    padding: 3,
                    margin: 5,
                }}>
                <ThemedText
                    style={{
                        fontSize: 20,
                    }}
                > {singleTrack.title} </ThemedText>
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