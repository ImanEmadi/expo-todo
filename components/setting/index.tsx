import { useTheme } from "hooks/useTheme";
import { StyleSheet, View } from "react-native";
import { SettingOptions } from "./options";


export const SettingScreen = () => {

    const themeMap = useTheme();

    return <>
        <View style={{ backgroundColor: themeMap.bodyBG, flex: 1 }}>
            <SettingOptions />
        </View>
    </>;
}


const styles = StyleSheet.create({

});