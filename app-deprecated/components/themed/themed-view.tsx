import { View,ViewProps } from "react-native";
import { theme } from "@/components/theme"





export function ThemedView(props: ViewProps){
    const { style, ...rest } = props;
    return(
        <View
        style={[{
            backgroundColor: theme.colors.background,
            outlineColor: theme.colors.outline,
        },style]}
        {...rest}
        />
    )
}