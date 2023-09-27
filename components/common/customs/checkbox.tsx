import { View, Text, Pressable, StyleSheet, TextStyle } from "react-native";
import { useState, useMemo, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import { _Font_Sizes } from "resources/styles/global.styles";

export interface CheckBoxProps {
    label?: string,
    CheckedIcon?: React.ReactNode,
    UnCheckedIcon?: React.ReactNode,
    defaultState?: boolean,
    iconColor?: string,
    labelColor?: string,
    labelStyles?: TextStyle,
    onChange?: (b: boolean) => void
}

export const CheckBox = ({ label,
    defaultState = false,
    UnCheckedIcon,
    CheckedIcon,
    iconColor = 'lightblue',
    labelColor,
    labelStyles = {},
    onChange
}: CheckBoxProps) => {

    const [checked, setChecked] = useState<boolean>(defaultState);
    const _CheckedComp = useMemo<React.ReactNode>(() => CheckedIcon ? CheckedIcon : <Ionicons name="checkbox" size={_Font_Sizes.textIcon} color={iconColor} />, [CheckedIcon, iconColor])
    const _unCheckedComp = useMemo<React.ReactNode>(() => UnCheckedIcon ? UnCheckedIcon : <Ionicons name="checkbox-outline" size={_Font_Sizes.textIcon} color={iconColor} />, [UnCheckedIcon, iconColor])

    useEffect(() => {
        onChange && onChange(checked);
    }, [checked, onChange]);

    return <>
        <View style={{ ...styles.checkBoxView }}>
            <Text style={{ ...styles.labelStyle, color: labelColor, ...labelStyles }}>{label}</Text>
            <Pressable style={{ ...styles.pressable }} onPress={e => setChecked(b => !b)}>
                {checked ? _CheckedComp : _unCheckedComp}
            </Pressable>
        </View>
    </>;
}


const styles = StyleSheet.create({
    checkBoxView: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 7,
        marginVertical: 10
    },
    labelStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5,
        fontSize: _Font_Sizes.normalLarge
    },
    pressable: {
        justifyContent: 'center',
    }
})