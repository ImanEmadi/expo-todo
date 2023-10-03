import { ReactNativePicker, ReactNativePickerProps } from "components/common/RN.picker";
import { useTheme } from "hooks/useTheme";
import { StyleSheet, Text, View } from "react-native";
import { _Font_Sizes } from "resources/styles/global.styles";
import { StringOrNumber } from "types/custom.types";

export interface SettingPickerInputProps<PickerItemType extends StringOrNumber> extends ReactNativePickerProps<PickerItemType> {
    label: string
}

/**
 * Label-pickerInput component to be used in `Setting`
 */
export const SettingPickerInput = <V extends StringOrNumber>({ label, ...props }: SettingPickerInputProps<V>) => {

    const themeMap = useTheme();

    return <>
        <View style={{ ...styles.settingSection, backgroundColor: themeMap.bodyBGShade }}>
            <Text style={{ ...styles.labelText, color: themeMap.bodyFC }}>
                {label}
            </Text>
            <ReactNativePicker<V>
                dropdownIconColor={themeMap.bodyFCLightBlue}
                style={{ color: themeMap.bodyFCLightBlue }}
                selectionColor={themeMap.bodyFCLightBlue}
                {...props}
            />
        </View>
    </>;
}




const styles = StyleSheet.create({
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
})