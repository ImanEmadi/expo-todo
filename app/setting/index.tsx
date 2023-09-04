import { Text, View } from "react-native";
import { useTheme } from "hooks/useTheme";

export default function Setting() {

    const themeMap = useTheme();

    return <>
        <View style={{ backgroundColor: themeMap.bodyBG, flex: 1 }}>
            <Text style={{ color: themeMap.bodyFC }}>
                THIS IS SETTING
            </Text>
        </View>
    </>;
}