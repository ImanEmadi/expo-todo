import { PATH_ALL_TODOS } from "constants/app.constants";
import { useRouter } from "expo-router";
import { deleteTODOByID } from "helpers/todo.utils";
import { useTheme } from "hooks/useTheme";
import { useCallback, useState } from "react";
import { Alert, GestureResponderEvent, Pressable, StyleSheet, Text, View } from "react-native";
import { _Font_Sizes } from "resources/styles/global.styles";

export type TODOButtonsProps = {
    todoID: string;
}
export const TODOButtons = ({ todoID }: TODOButtonsProps) => {

    const themeMap = useTheme();
    const router = useRouter();
    const [delPressed, setDelPressed] = useState(false);

    const handleDELPress = useCallback<(e: GestureResponderEvent) => void>(() => {
        Alert.alert(`Delete TODO ?`, 'Are you sure ?', [
            {
                text: 'Cancel',
            },
            {
                text: 'Delete',
                onPress: e => deleteTODOByID(todoID).then(() => router.replace(PATH_ALL_TODOS))
            }
        ], { cancelable: true });
    }, [todoID, router]);

    return <>
        <View style={{ ...styles.container }}>
            <Pressable
                onPressIn={e => setDelPressed(true)}
                onPressOut={e => setDelPressed(false)}
                onPress={handleDELPress}
                style={{
                    ...styles.btnPressAble,
                    backgroundColor: delPressed ? themeMap.bodyRedTint : 'transparent',
                    borderColor: themeMap.bodyRedTint
                }}>
                <Text style={{ ...styles.btnText, color: delPressed ? themeMap.bodyRedContrast : themeMap.bodyRedTint }}>
                    Delete TODO
                </Text>
            </Pressable>
        </View>
    </>;
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 15,
        justifyContent: 'center'
    },
    btnPressAble: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        minWidth: 140,
        borderStyle: 'solid',
        borderWidth: 1
    },
    btnText: {
        lineHeight: 35,
        textAlign: 'center',
        fontSize: _Font_Sizes.btn,
    }
});