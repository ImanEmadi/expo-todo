import { useTheme } from "hooks/useTheme";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";



export const TODOHomeInput = () => {

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
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerBox: {
        width: '80%',
    },
    mainText: {
        padding: 20,
        lineHeight: 40
    }
})