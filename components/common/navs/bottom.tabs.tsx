import { Tabs } from "expo-router";
import { ScreenProps } from "expo-router/build/useScreens";
import { useTheme } from "hooks/useTheme";
import { _Font_Sizes } from "resources/styles/global.styles";

export const BottomTabsNavigator = () => {

    const themeMap = useTheme();

    return <>
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarIcon: undefined,
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderColor: themeMap.bottomTabBorder,
                },
                tabBarIconStyle: { display: "none" },
                tabBarLabelStyle: {
                    fontSize: _Font_Sizes.bottomTabTitle,
                    height: "100%",
                    verticalAlign: "middle",
                },
                tabBarInactiveBackgroundColor: themeMap.bottomTabBG,
                tabBarActiveBackgroundColor: themeMap.bottomTabBG,
                tabBarActiveTintColor: themeMap.bottomTabActiveTint,
                tabBarInactiveTintColor: themeMap.bottomTabInactiveTint,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    href: "/",
                    tabBarItemStyle: {
                        ...tabsBorderRightOptions,
                        borderColor: themeMap.bottomTabBorder,
                    }
                }}
            />
            <Tabs.Screen
                name="newTodo"
                options={{
                    title: "New Todo",
                    href: null,
                    tabBarItemStyle: {
                        ...tabsBorderRightOptions,
                        borderColor: themeMap.bottomTabBorder,
                    }
                }}
            />
            <Tabs.Screen
                name="todos/index"
                options={{
                    title: "Active Tasks",
                    href: {
                        pathname: "/todos",
                    },
                }}
            />
            <Tabs.Screen name="settings/index" options={{ href: null }} />
            <Tabs.Screen name="edit/[todo]" options={{ href: null }} />
        </Tabs>
    </>;
}



const tabsBorderRightOptions: ScreenProps['options'] = {
    tabBarItemStyle: {
        borderRightWidth: 1,
        borderStyle: 'solid'
    }
}