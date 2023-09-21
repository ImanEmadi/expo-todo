import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import MainHeader from 'components/common/main-header';
import { darkTheme } from 'resources/styles/theme.styles';
import { AppShell } from 'components/app';
import { _Font_Sizes } from 'resources/styles/global.styles';
import { BottomTabsNavigator } from 'components/common/navs/bottom.tabs';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function RootLayout() {

    return (
        <>
            <StatusBar style="auto" backgroundColor={darkTheme.headerBG} />
            <RootSiblingParent>
                <AppShell />
                <View style={{ ...styles.layoutView, backgroundColor: darkTheme.bodyBG }}>
                    <MainHeader />
                    <BottomTabsNavigator />
                </View>
            </RootSiblingParent>
        </>
    );
}

const styles = StyleSheet.create({
    layoutView: {
        flex: 1
    }
});