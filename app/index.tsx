import { StyleSheet, Text, View } from "react-native";
import { darkTheme } from "resources/theme.styles";

export default function Home() {
    return <>
        <View style={{ ...styles.homeView }}>
            <Text style={{ color: darkTheme.bodyFC }}>
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