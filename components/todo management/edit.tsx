import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { getTODObyID, getTodoExpiryStatus, getTodoExpiryStatusCode, readSTEValueFromStorage } from "helpers/todo.utils";
import { useTheme } from "hooks/useTheme";
import { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions, TextStyle } from "react-native";
import { _Font_Sizes } from "resources/styles/global.styles";
import { TODO, TODOExpiryStatusCode } from "types/data.types";
import { NoTODO } from "./no-todo";
import { Image } from "expo-image";
import { ScrollView } from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
import { handleMediaLibraryPermissions } from "helpers/permissions";
import { TODOButtons } from "./todo-actions";
import { FontAwesome } from '@expo/vector-icons';
import { useTODOStatusColor } from "hooks/useTODOStatusColor";
export const EditTODO = () => {

    const themeMap = useTheme();
    const { todo: todoID } = useLocalSearchParams();
    const [todo, setTodo] = useState<TODO | null>(null);

    const [statusCode, setStatusCode] = useState<TODOExpiryStatusCode>(0)

    useEffect(() => {
        if (todo)
            readSTEValueFromStorage().then(ste => {
                setStatusCode(getTodoExpiryStatusCode(todo.expires, ste))
            })
    }, [todo]);

    const [, , fc] = useTODOStatusColor(statusCode);

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
                <Text style={{ ...styles.headerTxt, color: themeMap.bodyHeaderFC }}>Manage TODO</Text>
                {todo ? (
                    //? Currently, only deleting a TODO is implemented.
                    //TODO Implement Edition of a TODO details.
                    <View style={{ ...styles.cardBox, backgroundColor: themeMap.bodyBGShade }}>
                        <TODOLabel label="Id: " />
                        <TODOValue value={todo.id} />
                        <TODOLabel label="Status :" />
                        <TODOValue color={fc} value={getTodoExpiryStatus(statusCode)} />
                        <TODOLabel label="Expiry :" />
                        <TODOValue color={fc} value={(new Date(todo.expires).toString().split('GMT')[0])} />
                        <TODOLabel label="Auto delete :" />
                        <TODOValue value={todo.autoDel ? "YES" : "NO"} />
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


const TODOValue = ({ value, color, ...props }: { value: string } & TextStyle) => {

    const themeMap = useTheme();

    return <>
        <Text style={{ ...styles.value, color: color ?? themeMap.bodyFCLightBlue }} {...props}>
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

            setFailedLoadsCount(assetInfos.length - filteredAssets.length);

            setTodoAssets(filteredAssets);
            setRenderImages(true);
        })
    }, [themeMap, todo]));

    return (
        <>
            <View style={{ ...styles.imgBox }}>
                {renderImages && (
                    <>
                        {todoAssets.map((ast, index) => (
                            <Image
                                key={index}
                                source={{ uri: ast.localUri }}
                                style={{
                                    width: ast.width > width ? "95%" : ast.width,
                                    height: (width / ast.width) * ast.height,
                                    ...styles.img,
                                }}
                            />
                        ))}
                        {failedLoadsCount !== 0 && (
                            <View
                                style={{
                                    ...styles.failNoticeView,
                                    backgroundColor: themeMap.bodyOrangeFade,
                                }}>
                                <FontAwesome
                                    style={{
                                        ...styles.excIcon
                                    }}
                                    name="exclamation-triangle"
                                    size={_Font_Sizes.textIcon}
                                    color={themeMap.bodyOrangeContrast}
                                />
                                <Text
                                    style={{
                                        ...styles.failedNoticeText,
                                        color: themeMap.bodyOrangeContrast,
                                    }}>
                                    {failedLoadsCount} Image{failedLoadsCount === 1 ? '' : 's'} failed to load.
                                </Text>
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

    },
    failNoticeView: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: '90%'
    },
    failedNoticeText: {
        lineHeight: 30,
        textAlign: 'center',
        verticalAlign: 'middle',
        fontSize: _Font_Sizes.normalLarge
    },
    excIcon: {
        lineHeight: 30,
        marginHorizontal: 10
    }
})