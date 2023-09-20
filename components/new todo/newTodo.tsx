import { useTheme } from "hooks/useTheme";
import { useCallback, useRef, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Pressable, useWindowDimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { _Font_Sizes } from "resources/styles/global.styles";
import * as ImagePicker from 'expo-image-picker';
import { Image } from "expo-image";
import * as MediaLibrary from 'expo-media-library';
import { MEDIA_ALBUM_NAME } from "constants/app.constants";
import { TODO, TODO_Image } from "types/data.types";
import { getTODOData, saveTODOData } from "helpers/todo.utils";
import { generateTODOId } from "helpers/generators";
import { RNDTPicker, RNDateTimePickerOnChange, RNDateTimePickerProps } from "components/common/Datepicker/RNDatepicker";

type TextData = Pick<TODO, 'title' | 'description'>;
export const NewTodo = () => {

    const themeMap = useTheme();
    const { width, height } = useWindowDimensions();
    const [assets, setAssets] = useState<ImagePicker.ImagePickerAsset[]>([]);
    const [textData, setTextData] = useState<TextData>({
        title: '',
        description: ''
    });
    const [expiryDate, setExpiryDate] = useState(0);

    const handleTextInputs = useCallback<(v: string, k: keyof TextData) => void>((v, k) => {
        setTextData(d => ({ ...d, [k]: v }));
    }, [setTextData]);

    const askPermissions = useCallback<() => Promise<boolean>>(async () => {
        const ip_per_check = await ImagePicker.getMediaLibraryPermissionsAsync();

        if (!ip_per_check.granted) {
            const ip_per = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!ip_per.granted) {
                alert("Requires: Permission to access Media Library for: ImagePicker");
                return false;
            }
        }

        if (await MediaLibrary.isAvailableAsync() === false) {
            alert("Media Library API is not enabled on your device!");
            return false;
        }

        const a = await MediaLibrary.getPermissionsAsync();
        if (a.granted) return true;

        const per = await MediaLibrary.requestPermissionsAsync();
        if (per.granted) return true;
        else {
            alert("App requires permission to access Media Library");
            return false;
        }

    }, []);

    const pickImages = useCallback(
        async () => {
            const per = await askPermissions();
            if (!per) return;

            const result = await ImagePicker.launchImageLibraryAsync({
                allowsMultipleSelection: true,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                selectionLimit: 3
            });
            if (result.canceled) return;
            setAssets(result.assets);
        }, [setAssets, askPermissions]);

    const addToAlbum = useCallback(async (asts: MediaLibrary.Asset[], album: MediaLibrary.Album) => {
        try {
            const _r = await MediaLibrary.addAssetsToAlbumAsync(asts, album);
            if (!_r) throw new Error();
            return _r;
        } catch (error) {
            alert("failed to save assets to the album!");
        }
    }, []);

    const addTodo = useCallback(async () => {
        const todo_images: TODO_Image[] = [];

        if (!textData.title.length || !textData.description.length)
            return alert("Inputs can not be empty");

        if (assets.length) {
            try {

                const album = await MediaLibrary.getAlbumAsync(MEDIA_ALBUM_NAME);
                const _createdAssets = await new Promise<MediaLibrary.Asset[]>(async r => {
                    //? creating asset from the selected media
                    const new_asts: MediaLibrary.Asset[] = [];
                    for (const ip_ast of assets)
                        new_asts.push(await MediaLibrary.createAssetAsync(ip_ast.uri));
                    r(new_asts);
                });

                if (!album) {
                    //? Creating the album, by adding an asset to it.
                    const _album = await MediaLibrary.createAlbumAsync(MEDIA_ALBUM_NAME, _createdAssets[0]);
                    if (_createdAssets.length > 1) {
                        addToAlbum(_createdAssets.slice(1), _album);
                    }
                } else {
                    addToAlbum(_createdAssets, album);
                }

                //? populate `todo_images` with the info from created assets
                _createdAssets.forEach(({ id, width, height, filename, uri }) => todo_images.push({
                    id, width, height, filename, uri
                }));

                const todo_data = await getTODOData();
                todo_data.push({
                    id: generateTODOId(),
                    created: Date.now(),
                    title: textData.title,
                    autoDel: true,
                    expires: 0,
                    description: textData.description,
                    images: todo_images
                });

                await saveTODOData(todo_data);

            } catch (error) {
                console.error(error);
            }
        }

    }, [assets, addToAlbum, textData])

    return (
        <>
            <View style={{ ...styles.container, backgroundColor: themeMap.bodyBG }}>
                <ScrollView keyboardShouldPersistTaps={'always'}>
                    <View style={{ ...styles.header }}>
                        <Text
                            style={{ ...styles.headerText, color: themeMap.bodyHeaderFC }}
                        >
                            Create a new TODO!
                        </Text>
                    </View>
                    <View style={{ ...styles.formBox }}>
                        <View
                            style={{ ...styles.form, backgroundColor: themeMap.formBG }}
                        >
                            {/* TODO Title input */}
                            <TextInput
                                cursorColor={themeMap.formInputFC}
                                placeholderTextColor={themeMap.formInputFCPlaceHolder}
                                style={{
                                    ...styles.textInputs,
                                    borderColor: themeMap.formInputBorder,
                                    color: themeMap.formInputFC,
                                }}
                                placeholder="Title"
                                onChangeText={v => handleTextInputs(v, 'title')}
                            />
                            {/* TODO Description input */}
                            <TextInput
                                cursorColor={themeMap.formInputFC}
                                placeholderTextColor={themeMap.formInputFCPlaceHolder}
                                style={{
                                    ...styles.textInputs,
                                    borderColor: themeMap.formInputBorder,
                                    color: themeMap.formInputFC,
                                }}
                                placeholder="Description"
                                onChangeText={v => handleTextInputs(v, 'description')}
                            />
                            {/* DatePicker input */}
                            <Text style={{ ...styles.datePickerLabel, color: themeMap.formInputFC }}>
                                TODO Expires at :
                            </Text>
                            <RNDTPicker
                                displayDateStyle={{ color: themeMap.bodyFC }}
                                pressAblesStyle={{ backgroundColor: themeMap.bodyBlue }}
                                pressAbleTextsStyle={{ color: themeMap.bodyBlueContrast }}
                            />
                            <View style={{ alignItems: "center", marginTop: 15 }}>
                                <Pressable
                                    onPress={pickImages}
                                    style={({ pressed }) => ({
                                        ...styles.formBtnBox,
                                        backgroundColor: pressed
                                            ? themeMap.bodyBlueFade
                                            : "transparent",
                                        borderColor: themeMap.bodyBlue,
                                    })}
                                >
                                    <Text
                                        style={{
                                            ...styles.formBtnText,
                                            color: themeMap.bodyBlueContrast,
                                        }}
                                    >
                                        Choose Images
                                    </Text>
                                </Pressable>
                                <Pressable
                                    onPress={addTodo}
                                    style={({ pressed }) => ({
                                        ...styles.formBtnBox,
                                        backgroundColor: pressed
                                            ? themeMap.bodyGreenFade
                                            : "transparent",
                                        borderColor: themeMap.bodyGreen,
                                    })}>
                                    <Text
                                        style={{
                                            ...styles.formBtnText,
                                            color: themeMap.bodyGreenContrast,
                                        }}
                                    >
                                        Add TODO!
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                        {/* end form */}
                    </View>
                    {/* end form box */}
                    <View style={{ ...styles.imagesBox }}>
                        {assets.map((ast, i) => (
                            <Image
                                style={{
                                    ...styles.image,
                                    width: ast.width > width ? "95%" : ast.width,
                                    height: ast.height > height / 2 ? height / 2 : ast.height
                                }}
                                key={i}
                                source={{ uri: ast.uri }}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        paddingBottom: 5
    },
    headerText: {
        fontSize: _Font_Sizes.h4,
        textAlignVertical: 'center',
    },
    formBox: {
        alignItems: 'center',
        marginTop: 20
    },
    form: {
        width: '90%',
        padding: 20
    },
    datePickerLabel: {
        lineHeight: 50,
        fontSize: _Font_Sizes.textInput
    },
    textInputs: {
        borderBottomWidth: 1,
        borderStyle: 'solid',
        marginTop: 10,
        padding: 5,
        fontSize: _Font_Sizes.textInput
    },
    formBtnBox: {
        borderWidth: 1,
        borderStyle: 'solid',
        width: '60%',
        marginTop: 15
    },
    formBtnText: {
        height: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    imagesBox: {
        marginTop: 25,
        alignItems: 'center',
        paddingBottom: 30
    },
    image: {
        marginTop: 10,
    }
})