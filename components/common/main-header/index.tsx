import { StyleSheet, View, Pressable, Text } from "react-native";
import { Image } from 'expo-image';
import { useState } from 'react';
import { Asset } from "expo-asset";
import { useTheme } from "hooks/useTheme";
import { usePathname, useRouter } from "expo-router";
import Constants from 'expo-constants';
import { MAIN_HEADER_HEIGHT, PATH_SETTINGS } from "constants/app.constants";
import { _Font_Sizes } from "resources/styles/global.styles";

const asset = Asset.fromModule(require('./../../../static/images/logo.png'));
const iconWidth = 50;

export default function MainHeader() {

    const [headerBtnPressed, setHeaderBtnPressed] = useState(false);
    const themeMap = useTheme();
    const router = useRouter();
    const pathname = usePathname();


    return <>
        <View style={{
            ...styles.headerContainer,
            backgroundColor: themeMap.headerBG,
            borderColor: themeMap.headerBorder
        }}>
            <View style={{ flex: 1, padding: 8, alignItems: 'center' }}>
                <Pressable style={{ width: iconWidth }} onPress={e => router.push('/')}>
                    <Image
                        style={{ width: iconWidth, height: iconWidth }}
                        source={{ uri: asset.uri }}
                    />
                </Pressable>
            </View>
            <View style={{ ...styles.headerBtnBox }}>
                <Pressable
                    style={{ ...styles.headerBtnPressable }}
                    onPressIn={e => setHeaderBtnPressed(true)}
                    onPressOut={e => setHeaderBtnPressed(false)}
                    onPress={e => router.push(PATH_SETTINGS)}
                >
                    <Text style={{
                        color: headerBtnPressed ? themeMap.headerFCSecondary : themeMap.headerFC,
                        backgroundColor: pathname === PATH_SETTINGS ? themeMap.headerBGActive : 'transparent',
                        ...styles.headerBtnText
                    }}>
                        Setting
                    </Text>
                </Pressable>
            </View>
        </View>
    </>;
}

const styles = StyleSheet.create({
    headerContainer: {
        height: MAIN_HEADER_HEIGHT + Constants.statusBarHeight,
        borderBottomWidth: 1,
        paddingTop: Constants.statusBarHeight,
        flexDirection: "row",
    },
    headerBtnBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 8,
        height: MAIN_HEADER_HEIGHT,
    },
    headerBtnPressable: {
        flex: 1,
    },
    headerBtnText: {
        textAlign: 'center',
        fontSize: _Font_Sizes.headerBtn,
        flex: 1,
        textAlignVertical: 'center'
    }
});