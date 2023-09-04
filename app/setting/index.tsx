import { Text, View } from "react-native";
import { useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Setting() {

    useEffect(() => {
        AsyncStorage.getItem('theme').then(res => {
            console.log(res);
        })
    }, [])

    return <>
        <View style={{ backgroundColor: '#141d2b', flex: 1 }}>
            <Text>
                THIS IS SETTING
            </Text>
        </View>
    </>;
}