import { useTheme } from "hooks/useTheme";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { _Font_Sizes } from "resources/styles/global.styles";

export type TODOButtonsProps = {
    todoID: string;
}
export const TODOButtons = ({ todoID }: TODOButtonsProps) => {

    const themeMap = useTheme();

    return <>
        <View style={{ ...styles.container }}>
            <Pressable>
                <Text style={{ ...styles.btn }}>
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
        paddingHorizontal: 20,
    },
    btn: {
        marginVertical: 5,
        marginHorizontal: 7,
        lineHeight: 40,
        textAlign: 'center',
        fontSize: _Font_Sizes.btn,
    }
});