import { Tabs } from 'expo-router';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import MainHeader from 'screens/common/main-header';
import { darkTheme } from 'resources/theme.styles';
import { AppShell } from 'screens/app';

export default function RootLayout() {

    return <>
        <ExpoStatusBar style="auto" />
        <AppShell />
        <View style={{ ...styles.layoutView, backgroundColor: darkTheme.bodyBG }}>
            <MainHeader />
            {/* <Slot /> */}
            <Tabs screenOptions={{
                headerShown: false,
                tabBarIcon: undefined,
                tabBarInactiveBackgroundColor: '#22222a',
                tabBarActiveBackgroundColor: '#393946',
                tabBarActiveTintColor: '#e3e3e8',
                tabBarInactiveTintColor: '#ccc',
            }}>
                <Tabs.Screen
                    name='setting/index'
                    options={{
                        title: 'Setting',
                        href: {
                            pathname: '/setting'
                        }
                    }}
                />
                <Tabs.Screen
                    name='index'
                    options={{
                        href: '/'
                    }}
                />
            </Tabs>
        </View>
    </>;
}


const styles = StyleSheet.create({
    layoutView: {
        flex: 1,
        paddingTop: Constants.statusBarHeight
    }
})
