import { useTheme } from "hooks/useTheme";
import { Text, View } from "react-native";
import { ActiveTasks } from "./active-tasks";
import { _Font_Sizes } from "resources/styles/global.styles";



export const TasksScreen = () => {

    const themeMap = useTheme();

    return <>

        <View style={{ flex: 1, backgroundColor: themeMap.bodyBG }}>
            <View style={{ marginBottom: 7 }}>
                {/* Header */}
                <Text style={{
                    color: themeMap.bodyHeaderFC,
                    padding: 10,
                    paddingHorizontal: 20,
                    fontSize: _Font_Sizes.h5,
                    lineHeight: 30
                }}>
                    Your active TODOs
                </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <ActiveTasks />
            </View>
        </View>
    </>;
}