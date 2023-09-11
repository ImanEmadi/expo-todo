import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import MainHeader from 'screens/common/main-header';
import { darkTheme } from 'resources/styles/theme.styles';
import { AppShell } from 'screens/app';
import { useTheme } from 'hooks/useTheme';
import { _Font_Sizes } from 'resources/styles/global.styles';

export default function RootLayout() {

    const themeMap = useTheme();

    return (
        <>
            <StatusBar style="auto" backgroundColor={darkTheme.headerBG} />
            <AppShell />
            <View
                style={{ ...styles.layoutView, backgroundColor: darkTheme.bodyBG }}
            >
                <MainHeader />
                {/* <Slot /> */}
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
                    }}
                >
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: "New Todo",
                            href: "/",
                            tabBarItemStyle: {
                                borderRightWidth: 1,
                                borderColor: themeMap.bottomTabBorder,
                                borderStyle: 'solid'
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
                </Tabs>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    layoutView: {
        flex: 1
    }
})
