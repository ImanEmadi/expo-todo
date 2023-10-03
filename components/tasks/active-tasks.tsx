import { useFocusEffect } from "expo-router";
import { getTODOData } from "helpers/todo.utils";
import { useTheme } from "hooks/useTheme";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { _Font_Sizes } from "resources/styles/global.styles";
import { TODO } from "types/data.types";

export const ActiveTasks = () => {

    const themeMap = useTheme();
    const [todos, setTODOs] = useState<TODO[]>([]);

    useFocusEffect(useCallback(() => {
        const now = Date.now();
        getTODOData()
            .then(data => data.filter(_d => _d.expires > now))
            .then(data => data.sort((a, b) => a.expires - b.expires))
            .then(setTODOs);
    }, []));

    return <>
        <View style={{ ...styles.activeTasksContainer }}>
            {todos.map((t, i) => <ActiveTaskComponent todo={t} key={i} />)}
        </View>
    </>;
}

type ActiveTaskComponentProps = {
    todo: TODO
}

const ActiveTaskComponent = ({ todo }: ActiveTaskComponentProps) => {

    const themeMap = useTheme();

    return <>
        <View style={{ ...styles.activeTaskBox, backgroundColor: themeMap.bodyBGShade }}>
            <View>
                <Text style={{ color: themeMap.bodyFCLightBlue, fontSize: _Font_Sizes.normalLarge }}>
                    {todo.title}
                </Text>
            </View>
            <View style={{ paddingVertical: 10 }}>
                <Text style={{ color: themeMap.bodyFC, fontSize: _Font_Sizes.normal, lineHeight: 25 }}>
                    {todo.description}
                </Text>
            </View>
        </View>
    </>;
}

const styles = StyleSheet.create({
    activeTasksContainer: {
        width: '95%',
        rowGap: 10,
        alignItems: 'center'
    },
    activeTaskBox: {
        padding: 15,
        width: '100%'
    }
});