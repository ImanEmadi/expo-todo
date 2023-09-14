import { useTheme } from "hooks/useTheme";
import { ScrollView, StyleSheet, View } from "react-native";
import { NewTodoButton } from "./newTodoButton";
import { TODOs } from "./todos";

export function Home() {

    const themeMap = useTheme();
    return <>
        <View style={{ ...styles.homeView, backgroundColor: themeMap.bodyBG }}>
            <ScrollView>
                <NewTodoButton />
                <TODOs />
            </ScrollView>
        </View >
    </>;
}

const styles = StyleSheet.create({
    homeView: {
        flex: 1
    }
});