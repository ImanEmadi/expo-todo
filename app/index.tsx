import { useTheme } from "hooks/useTheme";
import { StyleSheet, Text, View } from "react-native";
import { darkTheme } from "resources/theme.styles";

export default function Home() {

    const themeMap = useTheme();

    return <>
        <View style={{ ...styles.homeView, backgroundColor: themeMap.bodyBG }}>
            <Text style={{ color: themeMap.bodyFC }}>
                Home Screen
            </Text>
        </View>
    </>;
}



const styles = StyleSheet.create({
    homeView: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
})