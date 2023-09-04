import { StyleSheet, View, Text } from "react-native";
import { Image } from 'expo-image';
import { Asset } from "expo-asset";
import { LazyLoad } from "../lazy-load";
const asset = Asset.fromModule(require('./../../../static/images/logo.png'));

export default function MainHeader() {

    return <>
        <View style={{ height: 70, backgroundColor: '#ccc' }}>
            <View style={{ justifyContent: 'flex-start' }}>
                <LazyLoad lazy={typeof asset === 'undefined'}>
                    <Image
                        style={{ width: 100, height: 70 }}
                        source={{ uri: asset.uri }}
                    />
                </LazyLoad>
            </View>
        </View>
    </>;
}

const styles = StyleSheet.create({

})