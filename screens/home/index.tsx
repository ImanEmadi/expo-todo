import { useTheme } from "hooks/useTheme";
import { ScrollView, StyleSheet, View } from "react-native";
import { TODOHomeInput } from "./input";
import { TODOs } from "./todos";

export function Home() {

    const themeMap = useTheme();
    return <>
        <View style={{ ...styles.homeView, backgroundColor: themeMap.bodyBG }}>
            {/* <ScrollView> */}
            <TODOHomeInput />
            <TODOs />
            {/* </ScrollView> */}
        </View >
    </>;
}

const styles = StyleSheet.create({
    homeView: {
        flex: 1
    }
});