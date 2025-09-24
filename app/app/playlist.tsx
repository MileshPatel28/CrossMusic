import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import Collapsible from "react-native-collapsible";




import React, { useState } from "react";

export default function Playlists(){
    const [isCollapsed, setIsCollapsed] = useState(false);

    return(
        <ThemedView
            style={{
                flex: 1,
                padding: 50
            }}>
            <ThemedText>
                Playlists!
            </ThemedText>



        </ThemedView>
    )
}