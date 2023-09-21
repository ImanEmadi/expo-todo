import { PATH_NEW_TODO } from "constants/app.constants";
import { router } from "expo-router";
import { useTheme } from "hooks/useTheme";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const NewTodoButton = () => {

    const theme = useTheme();
    const [isPressed, setIsPressed] = useState(false);

    return <>
        <View style={styles.container}>
            <View style={{ ...styles.innerBox, backgroundColor: theme.bodyBGShade }}>
                <Pressable
                    style={{
                        backgroundColor: isPressed ? theme.bodyBGShadeActive : 'transparent'
                    }}
                    onPressIn={e => setIsPressed(true)}
                    onPressOut={e => setIsPressed(false)}
                    onPress={e => router.push(PATH_NEW_TODO)}
                >
                    <Text style={{ ...styles.mainText, color: theme.bodyFC }}>
                        Create New TODO
                    </Text>
                </Pressable>
            </View>
        </View>
    </>;
}

const styles = StyleSheet.create({
    container: {
        minHeight: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    innerBox: {
        width: '80%',
    },
    mainText: {
        padding: 20,
        lineHeight: 40
    }
});