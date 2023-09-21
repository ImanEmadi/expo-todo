import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { getTODObyID, getTodoExpiryStatus, getTodoExpiryStatusCode } from "helpers/todo.utils";
import { useTheme } from "hooks/useTheme";
import { useCallback, useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { _Font_Sizes } from "resources/styles/global.styles";
import { TODO } from "types/data.types";
import { NoTODO } from "./no-todo";
import { Image } from "expo-image";
import { ScrollView } from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
import { MEDIA_ALBUM_NAME } from "constants/app.constants";

export const EditTODO = () => {

    const themeMap = useTheme();
    const { todo: todoID } = useLocalSearchParams();
    const [todo, setTodo] = useState<TODO | null>(null);

    const focusEffect = useCallback(() => {
        if (typeof todoID === 'string')
            getTODObyID(todoID).then(t => {
                if (t !== null) setTodo(t);
            })
    }, [todoID])

    useFocusEffect(focusEffect);

    return <>
        <View style={{ backgroundColor: themeMap.bodyBG, flex: 1 }}>
            <ScrollView contentContainerStyle={{ ...styles.contentBox }}>
                <Text style={{ ...styles.headerTxt, color: themeMap.bodyHeaderFC }}>Edit TODO</Text>
                {todo ? (
                    <View style={{ ...styles.cardBox, backgroundColor: themeMap.bodyBGShade }}>
                        <TODOLabel label="Id: " />
                        <TODOValue value={todo.id} />
                        <TODOLabel label="Status :" />
                        <TODOValue value={getTodoExpiryStatus(getTodoExpiryStatusCode(todo.expires))} />
                        <TODOLabel label="Expiry :" />
                        <TODOValue value={(new Date(todo.expires).toString().split('GMT')[0])} />
                        <TODOLabel label="Title :" />
                        <TODOValue value={todo.title} />
                        <TODOLabel label="Description :" />
                        <TODOValue value={todo.description} />
                        {todo.images.length > 0 && (<TODOImages todo={todo} />)}
                    </View>
                ) : <NoTODO />}
            </ScrollView>
        </View>
    </>;
}


const TODOValue = ({ value }: { value: string }) => {

    const themeMap = useTheme();

    return <>
        <Text style={{ ...styles.value, color: themeMap.bodyFLightBlue }}>
            {value}
        </Text>
    </>
}
const TODOLabel = ({ label }: { label: string }) => {

    const themeMap = useTheme();

    return <>
        <Text style={{ ...styles.label, color: themeMap.bodyFC }}>
            {label}
        </Text>
    </>
}

interface TODOImages {
    todo: TODO
}
export const TODOImages = ({ todo }: TODOImages) => {

    const { width } = useWindowDimensions();
    const [renderImages, setRenderImages] = useState<boolean>(false);
    const [todoAssets, setTodoAssets] = useState<MediaLibrary.AssetInfo[]>([]);

    const focusEffect = useCallback(() => {
        MediaLibrary.isAvailableAsync().then(isAV => {
            if (!isAV) return alert("MediaLibrary API is not available on your device!");
            MediaLibrary.getPermissionsAsync().then(async per => {
                if (!per.granted) {
                    if (!per.canAskAgain) return alert("Permission to access device media is denied!");
                    else {
                        const _per = await MediaLibrary.requestPermissionsAsync() // end request permissions
                        if (!_per.granted) return alert("access to media denied. can not render images");
                    }
                } // end permission validation

                // const album = await MediaLibrary.getAlbumAsync(MEDIA_ALBUM_NAME);
                // if (!album) return alert("Album not found!");
                // const { assets } = await MediaLibrary.getAssetsAsync({ album });
                // const img_ids = todo.images.map(img => img.id);

                const assetInfos = await new Promise<MediaLibrary.AssetInfo[]>(async r => {
                    const _Arr: MediaLibrary.AssetInfo[] = [];
                    for (const img of todo.images) {
                        try {
                            const info = await MediaLibrary.getAssetInfoAsync(img.id);
                            if (info)
                                _Arr.push(info);
                        } catch (error) {
                            continue;
                        }
                    }
                    r(_Arr);
                })
                setTodoAssets(assetInfos);
                setRenderImages(true);
            }) // end check permissions
        })
    }, [setTodoAssets, setRenderImages, todo]);

    useFocusEffect(focusEffect)

    return <>
        <View style={{ ...styles.imgBox }}>
            {renderImages ? <>
                {todoAssets.map((ass, index) => <Image
                    key={index}
                    source={{ uri: ass.localUri }}
                    style={{
                        width: ass.width > width ? '95%' : ass.width,
                        height: (width / ass.width) * ass.height,
                        ...styles.img
                    }}
                />)}
            </> : <Text>Error loading images.</Text>}
        </View>

    </>;
}

const styles = StyleSheet.create({
    headerTxt: {
        marginTop: 10,
        lineHeight: 50,
        textAlign: 'center',
        fontSize: _Font_Sizes.h3
    },
    contentBox: {
        alignItems: 'center'
    },
    cardBox: {
        padding: 10,
        width: '90%',
        marginBottom: 10
    },
    label: {
        paddingLeft: 5,
        lineHeight: 35,
        fontSize: _Font_Sizes.normalLarge
    },
    value: {
        paddingLeft: 10,
        lineHeight: 30,
        fontSize: _Font_Sizes.normal,
    },
    imgBox: {
        alignItems: 'center',
        rowGap: 15,
        marginTop: 25
    },
    img: {

    }
})