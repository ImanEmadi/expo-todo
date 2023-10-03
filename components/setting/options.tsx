import { ItemValue } from "@react-native-picker/picker/typings/Picker";
import { RNPickerItem } from "components/common/RN.picker";
import { useTheme } from "hooks/useTheme";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { _Font_Sizes } from "resources/styles/global.styles";
import { useAppStore } from "store/app.store";
import { AppTheme, STEDaysNumerics } from "types/app.types";
import { isValidAppTheme } from "validators/app.validators";
import { SettingPickerInput } from "./picker.setting";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASK_STE, PATH_SETTINGS } from "constants/app.constants";
import { useFocusEffect, useRouter } from "expo-router";
import { readSTEValueFromStorage } from "helpers/todo.utils";

const appThemeOptions: RNPickerItem<AppTheme>[] = [
    { label: 'Dark', value: 'dark' },
    { label: 'Light', value: 'light' },
]


const soonToExpireOptions: RNPickerItem<STEDaysNumerics>[] = [
    { label: '1 day', value: 1 },
    { label: '2 day', value: 2 },
    { label: '3 day', value: 3 },
    { label: '5 day', value: 5 },
    { label: '7 day', value: 7 },
]

export const SettingOptions = () => {

    const themeMap = useTheme();
    const [selectedTheme, setSelectedTheme] = useState<AppTheme>();
    const [selectedSTE, setSelectedSTE] = useState<STEDaysNumerics>();
    const { theme, setTheme } = useAppStore(s => s);

    const handleThemeChange = useCallback((v: ItemValue, i: number) => {
        if (isValidAppTheme(v)) {
            setSelectedTheme(v);
            setTheme(v);
        }
    }, [setTheme]);

    const handleSTEChange = useCallback((v: STEDaysNumerics) => {
        setSelectedSTE(v);
        AsyncStorage.setItem(ASK_STE, v.toString());
    }, []);

    useFocusEffect(useCallback(() => {
        //? Reads ste value from storage and sets for the pickerInput.
        readSTEValueFromStorage().then(ste => {
            setSelectedSTE(ste as STEDaysNumerics);
        })
    }, []))

    return <>
        <View style={{ ...styles.settingBox }}>
            <SettingPickerInput<AppTheme>
                label="App Theme:"
                items={appThemeOptions}
                selectedValue={selectedTheme}
                onValueChange={handleThemeChange}
            />
            <SettingPickerInput<STEDaysNumerics>
                label="Mark as 'Soon to expire' when expires in less than:"
                items={soonToExpireOptions}
                selectedValue={selectedSTE}
                onValueChange={handleSTEChange}
            />
        </View>
    </>;
}


const styles = StyleSheet.create({
    settingBox: {
        alignItems: 'center'
    },
    settingSection: {
        width: '95%',
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    labelText: {
        fontSize: _Font_Sizes.normalLarge,
        lineHeight: 35
    }
});