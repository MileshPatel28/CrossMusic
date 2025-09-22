import { Text,TextProps } from "react-native";
import { theme } from "@/components/theme"




export function ThemedText(props: TextProps){
    const { style, ...rest } = props;
    return(
        <Text
        style={[{
            color: theme.colors.text
        },style]}
        {...rest}
        />
    );
}