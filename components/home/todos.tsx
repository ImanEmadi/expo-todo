import { PATH_EDIT_TODO } from "constants/app.constants";
import { useFocusEffect, useRouter } from "expo-router";
import { deleteExpiredTODOs, getTODOData, getTodoExpiryStatus, getTodoExpiryStatusCode } from "helpers/todo.utils";
import { useTODOStatusColor } from "hooks/useTODOStatusColor";
import { useTheme } from "hooks/useTheme";
import { useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { _Font_Sizes } from "resources/styles/global.styles";
import { TODO } from "types/data.types";

export const TODOs = () => {

    const [todoData, setTodoData] = useState<TODO[]>([]);

    //TODO: Display how many todo are there in total.
    useFocusEffect(useCallback(() => {
        deleteExpiredTODOs().then(() => { // deleting expired TODOs with `autoDel` property set to `true`
            getTODOData().then(d => { // fetching remaining TODOs
                const sortedData = d.sort((b, a) => b.expires - a.expires);
                setTodoData([
                    //TODO: add dynamic setting feature. user can choose "how many todo of each status can be displayed in home page"
                    //? Refactoring postponed until `setting` screen is implemented.
                    ...sortedData.filter(t => getTodoExpiryStatusCode(t.expires) === 0).slice(0, 3),
                    ...sortedData.filter(t => getTodoExpiryStatusCode(t.expires) === 1).slice(0, 3),
                    ...sortedData.filter(t => getTodoExpiryStatusCode(t.expires) === 2).slice(0, 3),
                ]);
            });
        });
    }, [setTodoData]));

    return <View style={{ ...styles.vList }}>
        {todoData.map((d, i) => <RenderItem item={d} key={i} />)}
    </View>
}

const RenderItem = ({ item: { title, description, expires, autoDel, id } }: { item: TODO }) => {

    const router = useRouter();
    const statusCode = useMemo(() => getTodoExpiryStatusCode(expires), [getTodoExpiryStatusCode, expires]);
    const themeMap = useTheme();
    const [bgActive, , fc] = useTODOStatusColor(statusCode);

    return (
        <>
            <Pressable
                onPress={e => {
                    router.push({ pathname: PATH_EDIT_TODO, params: { todo: id } })
                }}
                style={({ pressed: p }) => ({
                    ...styles.todoPressable,
                    backgroundColor: p ? themeMap.bodyBGShadeActive : themeMap.bodyBGShade
                })}>
                {/* Status Box */}
                <View style={{
                    ...styles.todoStatusView,

                }}>
                    <View style={{ ...styles.todoStatusInnerView, backgroundColor: bgActive }}>
                        <Text style={{ ...styles.todoStatusText, color: fc }}>
                            {getTodoExpiryStatus(statusCode)}
                        </Text>
                    </View>
                </View>
                {/* Content Box */}
                <View style={{ ...styles.todoContentViewBox }}>
                    <View style={{ ...styles.todoContent }}>
                        <Text numberOfLines={1} style={{ ...styles.todoContentText, color: themeMap.bodyFC }}>
                            {title}
                        </Text>
                    </View>
                    <View style={{ ...styles.todoContent }}>
                        <Text numberOfLines={1} style={{ ...styles.todoContentText, color: themeMap.bodyFC }}>
                            {description}
                        </Text>
                    </View>
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
        paddingVertical: 10,
        paddingHorizontal: 7,
        flexDirection: 'row'
    },
    todoStatusView: {
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    todoStatusInnerView: {
        flex: 0,
        alignItems: 'center'
    },
    todoStatusText: {
        lineHeight: 35,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    todoContentViewBox: {
        flex: 1
    },
    todoContent: {
        flex: 1,
        flexWrap: 'nowrap'
    },
    todoContentText: {
        overflow: 'hidden',
        lineHeight: 35,
        fontSize: _Font_Sizes.normal
    }
})


