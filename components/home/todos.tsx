import { useFocusEffect } from "expo-router";
import { getTODOData, getTodoExpiryStatus, getTodoExpiryStatusCode } from "helpers/todo.utils";
import { useTheme } from "hooks/useTheme";
import { useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View, VirtualizedList } from "react-native"
import { _Font_Sizes } from "resources/styles/global.styles";
import { TODO } from "types/data.types";

export const TODOs = () => {

    const [todoData, setTodoData] = useState<TODO[]>([]);

    const focusEffect = useCallback(() => {
        getTODOData().then(d => {
            setTodoData(d.sort((b, a) => b.expires - a.expires).slice(0, 4))
        })
    }, [setTodoData]);

    useFocusEffect(focusEffect);

    return <View style={{ ...styles.vList }}>
        {todoData.map((d, i) => <RenderItem item={d} key={i} />)}
    </View>
}

const RenderItem = ({ item: { title, description, expires } }: { item: TODO }) => {

    const theme = useTheme();
    const statusCode = useMemo(() => getTodoExpiryStatusCode(expires), [getTodoExpiryStatusCode, expires]);

    return (
        <>
            <Pressable
                style={({ pressed }) => ({
                    ...styles.todoPressable,
                    backgroundColor: pressed ? theme.bodyContentBGActiveBlue : theme.bodyContentBGBlue,
                })}
            >
                <View style={{ ...styles.subViews }}>
                    <Text
                        style={{
                            fontSize: _Font_Sizes.cardTitle,
                            color: theme.bodyContentFCTitleBlue,
                        }}
                    >
                        {title}
                    </Text>
                </View>
                <View style={{ ...styles.subViews }}>
                    <Text style={{ fontSize: _Font_Sizes.normal, color: theme.bodyFC }}>
                        {description}
                    </Text>
                </View>
                <View style={{ ...styles.subViews }}>
                    <Text style={{ fontSize: _Font_Sizes.normal, color: theme.bodyFC }}>
                        Status : {getTodoExpiryStatus(statusCode)}
                    </Text>
                </View>
            </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    vList: {
        flex: 1,
        rowGap: 10,
        padding: 10,
        alignItems: 'center'
    },
    todoPressable: {
        width: '80%',
        paddingVertical: 10,
        paddingHorizontal: 7
    },
    subViews: {
        padding: 6
    },
    subTexts: {
    }
})


