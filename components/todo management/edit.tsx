import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { getTODObyID, getTodoExpiryStatus, getTodoExpiryStatusCode } from "helpers/todo.utils";
import { useTheme } from "hooks/useTheme";
import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { _Font_Sizes } from "resources/styles/global.styles";
import { TODO } from "types/data.types";
import { NoTODO } from "./no-todo";
import { Image } from "expo-image";
import { ScrollView } from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
import { handleMediaLibraryPermissions } from "helpers/permissions";
import Toast from "react-native-root-toast";
import { DEFAULT_TOAST_OPTIONS } from 'constants/defaults';
import { TODOButtons } from "./todo-actions";

export const EditTODO = () => {

    const themeMap = useTheme();
    const { todo: todoID } = useLocalSearchParams();
    const [todo, setTodo] = useState<TODO | null>(null);

    const focusEffect = useCallback(() => {
        if (typeof todoID === 'string')
            getTODObyID(todoID).then(t => {
                if (t !== null) setTodo(t);
            })

        return () => {
            setTodo(null);
        }
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
                        {/* Action Buttons */}
                        <TODOButtons todoID={todo.id} />
                        {/* TODO Images */}
                        {todo.images.length > 0 && (<TODOImages key={todo.id} todo={todo} />)}
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
    const themeMap = useTheme();
    const [renderImages, setRenderImages] = useState<boolean>(false);
    const [todoAssets, setTodoAssets] = useState<MediaLibrary.AssetInfo[]>([]);
    const [failedLoadsCount, setFailedLoadsCount] = useState(0);

    useFocusEffect(useCallback(() => {
        handleMediaLibraryPermissions().then(async r => {
            if (!r) return;

            const assetInfos = await Promise.all(todo.images.map(async _img => {
                try {
                    const info = await MediaLibrary.getAssetInfoAsync(_img.id);
                    return info ?? null;
                } catch (error) {
                    return null;
                }
            }));
            const filteredAssets = assetInfos.filter(ai => ai !== null) as MediaLibrary.AssetInfo[];

            setFailedLoadsCount(filteredAssets.length - assetInfos.length)

            setTodoAssets(filteredAssets);
            setRenderImages(true);
        })
    }, [themeMap, todo]));

    return (
        <>
            <View style={{ ...styles.imgBox }}>
                {renderImages && (
                    <>
                        {todoAssets.map((ass, index) => (
                            <Image
                                key={index}
                                source={{ uri: ass.localUri }}
                                style={{
                                    width: ass.width > width ? "95%" : ass.width,
                                    height: (width / ass.width) * ass.height,
                                    ...styles.img,
                                }}
                            />
                        ))}
                        {failedLoadsCount !== 0 && (
                            <View>
                                <Text> {failedLoadsCount} Images failed to load. </Text>
                            </View>
                        )}
                    </>
                )}
            </View>
        </>
    );
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