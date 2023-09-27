import { ItemValue } from "@react-native-picker/picker/typings/Picker";
import { RNPickerItem, ReactNativePicker } from "components/common/RN.picker";
import { useTheme } from "hooks/useTheme";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { _Font_Sizes } from "resources/styles/global.styles";
import { useAppStore } from "store/app.store";
import { AppTheme } from "types/app.types";
import { isValidAppTheme } from "validators/app.validators";

const appThemeOptions: RNPickerItem<AppTheme>[] = [
    { label: 'Dark', value: 'dark' },
    { label: 'Light', value: 'light' },
]

export const SettingOptions = () => {

    const themeMap = useTheme();
    const [selectedTheme, setSelectedTheme] = useState<AppTheme>();
    const { theme, setTheme } = useAppStore(s => s);

    const handleThemeChange = useCallback((v: ItemValue, i: number) => {
        if (isValidAppTheme(v)) {
            setSelectedTheme(v);
            setTheme(v);
        }
    }, [setTheme]);

    useEffect(() => {
        console.log(theme)
    }, [theme])


    return <>
        <View style={{ ...styles.settingBox }}>
            <View style={{ ...styles.settingSection, backgroundColor: themeMap.bodyBGShade }}>
                <Text style={{ ...styles.labelText, color: themeMap.bodyFC }}>
                    App Theme:
                </Text>
                <ReactNativePicker
                    dropdownIconColor={themeMap.bodyFCLightBlue}
                    style={{ color: themeMap.bodyFCLightBlue }}
                    selectionColor={themeMap.bodyFCLightBlue}
                    selectedValue={selectedTheme}
                    onValueChange={handleThemeChange}
                    items={appThemeOptions}
                />
            </View>
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