import { StyleSheet, View, Pressable } from "react-native";
import { Image } from 'expo-image';
import { Asset } from "expo-asset";
import { LazyLoad } from "../lazy-load";
import { useTheme } from "hooks/useTheme";
import { router } from "expo-router";
import Constants from 'expo-constants';

const asset = Asset.fromModule(require('./../../../static/images/logo.png'));

export default function MainHeader() {

    const themeMap = useTheme();

    return <>
        <View style={{
            ...styles.headerContainer,
            backgroundColor: themeMap.headerBG,
            borderColor: themeMap.headerBorder
        }}>
            <View style={{ justifyContent: 'flex-start', padding: 8 }}>
                <LazyLoad lazy={typeof asset === 'undefined'}>
                    <Pressable onPress={e => router.replace('/')}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={{ uri: asset.uri }}
                        />
                    </Pressable>
                </LazyLoad>
            </View>
        </View>
    </>;
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 66 + Constants.statusBarHeight,
        borderBottomWidth: 1,
        paddingTop: Constants.statusBarHeight
    }
})