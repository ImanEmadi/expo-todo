import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import MainHeader from 'screens/common/main-header';
import { darkTheme } from 'resources/theme.styles';
import { AppShell } from 'screens/app';
import { useTheme } from 'hooks/useTheme';

export default function RootLayout() {

    const themeMap = useTheme();

    return <>
        <StatusBar style="auto" backgroundColor={darkTheme.headerBG} />
        <AppShell />
        <View style={{ ...styles.layoutView, backgroundColor: darkTheme.bodyBG }}>
            <MainHeader />
            {/* <Slot /> */}
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarIcon: undefined,
                    tabBarStyle: {
                        borderTopWidth: 1,
                        borderColor: themeMap.bottomTabBorder
                    },
                    tabBarIconStyle: { display: 'none' },
                    tabBarLabelStyle: { fontSize: 20, height: '100%', verticalAlign: 'middle' },
                    tabBarInactiveBackgroundColor: themeMap.bottomTabBG,
                    tabBarActiveBackgroundColor: themeMap.bottomTabBGShade,
                    tabBarActiveTintColor: themeMap.bottomTabActiveTint,
                    tabBarInactiveTintColor: themeMap.bottomTabInactiveTint,
                }}>
                <Tabs.Screen
                    name='index'
                    options={{
                        title: 'Home',
                        href: '/'
                    }}
                />
                <Tabs.Screen
                    name='setting/index'
                    options={{
                        title: 'Setting',
                        href: {
                            pathname: '/setting'
                        }
                    }}
                />
            </Tabs>
        </View>
    </>;
}


const styles = StyleSheet.create({
    layoutView: {
        flex: 1
    }
})
