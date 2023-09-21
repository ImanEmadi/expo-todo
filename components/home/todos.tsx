import { PATH_EDIT_TODO } from "constants/app.constants";
import { useFocusEffect, useRouter } from "expo-router";
import { getTODOData, getTodoExpiryStatus, getTodoExpiryStatusCode } from "helpers/todo.utils";
import { useTheme } from "hooks/useTheme";
import { useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native"
import { _Font_Sizes } from "resources/styles/global.styles";
import { TODO } from "types/data.types";

export const TODOs = () => {

    const [todoData, setTodoData] = useState<TODO[]>([]);

    //TODO: Display how many todo are there in total.
    const focusEffect = useCallback(() => {
        getTODOData().then(d => {
            const sortedData = d.sort((b, a) => b.expires - a.expires);
            setTodoData([
                //TODO: add dynamic setting feature. user can choose "how many todo of each status can be displayed in home page"
                ...sortedData.filter(t => getTodoExpiryStatusCode(t.expires) === 0).slice(0, 3),
                ...sortedData.filter(t => getTodoExpiryStatusCode(t.expires) === 1).slice(0, 3),
                ...sortedData.filter(t => getTodoExpiryStatusCode(t.expires) === 2).slice(0, 3),
            ]);
        })
    }, [setTodoData]);

    useFocusEffect(focusEffect);

    return <View style={{ ...styles.vList }}>
        {todoData.map((d, i) => <RenderItem item={d} key={i} />)}
    </View>
}

const RenderItem = ({ item: { title, description, expires, autoDel, id } }: { item: TODO }) => {

    const router = useRouter();
    const theme = useTheme();
    const statusCode = useMemo(() => getTodoExpiryStatusCode(expires), [getTodoExpiryStatusCode, expires]);
    /**
     *? Assigning color groups based on current status code
     */
    const [bgActive, bg, fc] = useMemo(() => {
        switch (statusCode) {
            case 0: return [theme.bodyRedFade, theme.bodyRedShade, theme.bodyRedContrast]
            case 1: return [theme.bodyOrangeFade, theme.bodyOrangeShade, theme.bodyOrangeContrast]
            case 2:
            default:
                return [theme.bodyBlueFade, theme.bodyBlueShade, theme.bodyBlueContrast]
        }
    }, [statusCode, theme]);

    return (
        <>
            <Pressable
                onPress={e => {
                    router.push({ pathname: PATH_EDIT_TODO, params: { todo: id } })
                }}
                style={({ pressed }) => ({
                    ...styles.todoPressable,
                    backgroundColor: pressed ? bgActive : bg,
                })}
            >
                <View style={{ ...styles.subViews }}>
                    <Text
                        style={{
                            fontSize: _Font_Sizes.cardTitle,
                            color: fc,
                        }}
                    >
                        {title}
                    </Text>
                </View>
                <View style={{ ...styles.subViews }}>
                    <Text style={{ fontSize: _Font_Sizes.normal, color: fc }}>
                        {description}
                    </Text>
                </View>
                <View style={{ ...styles.subViews }}>
                    <Text style={{ fontSize: _Font_Sizes.normal, color: fc }}>
                        Status : {getTodoExpiryStatus(statusCode)}
                    </Text>
                    <Text style={{ fontSize: _Font_Sizes.normal, color: fc }}>
                        Auto Delete: {autoDel ? 'YES' : 'NO'}
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
    }
})


