import RNDateTimePicker, { AndroidNativeProps, DateTimePickerEvent, IOSNativeProps } from "@react-native-community/datetimepicker";
import { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";
import { _Font_Sizes } from "resources/styles/global.styles";

//? `WindowsNativeProps` is commented, as this app is not supposed to be run on windows/web .
export type RNDateTimePickerProps = IOSNativeProps & AndroidNativeProps // & WindowsNativeProps

export type RNDateTimePickerOnChange = (e: DateTimePickerEvent, date?: Date) => void;

export interface RNDatePickerProps extends Omit<RNDateTimePickerProps, 'mode' | 'value'> {
    /**
     * styles for the Picker's `View` element. (the top-level view containing others)
     */
    pickerView?: StyleProp<ViewStyle>,
    /**
     * styles for `mode selection button's pressable`
     */
    pressAblesStyle?: StyleProp<ViewStyle>,
    /**
     * styles for `mode selection pressable's Text`
     */
    pressAbleTextsStyle?: StyleProp<TextStyle>,
    /**
     * styles for the `Text` element, containing the selected value
     */
    displayDateStyle?: StyleProp<TextStyle>,
    onSelection?: (d: Date) => void
}

export const RNDTPicker = ({
    displayDateStyle = {},
    pressAbleTextsStyle = {},
    pressAblesStyle = {},
    pickerView = {},
    onSelection,
    ...props
}: RNDatePickerProps) => {

    const [pickerMode, setPickerMode] = useState<RNDateTimePickerProps['mode']>('time');
    const [value_Date, setValue_Date] = useState<string>('');
    const [value_time, setValue_time] = useState<string>('00:00:00');
    const [showDP, setShowDP] = useState<boolean>(false);
    const [selectedDateTime, setSelectedDateTime] = useState<Date>();
    const _pressableStyle = useMemo(() => Object.assign({ ...styles.modeBtn }, pressAblesStyle), [pressAblesStyle]);
    const _pressableTextsStyle = useMemo(() => Object.assign({ ...styles.modeBtnText }, pressAbleTextsStyle), [pressAbleTextsStyle]);
    const _displayTextStyle = useMemo(() => Object.assign({ ...styles.displayText }, displayDateStyle), [displayDateStyle]);
    const _pickerView = useMemo(() => Object.assign({}, pickerView), []);

    const handleChange = useCallback<RNDateTimePickerOnChange>((e, d) => {
        setShowDP(false);

        if (e.type === 'set' && !!d) {
            if (pickerMode === 'time')
                setValue_time(`${d.getHours()}:${d.getMinutes()}:00`);
            if (pickerMode === 'date') {
                const month = (d.getMonth() + 1).toString();
                const day = d.getDate().toString();
                setValue_Date(`${d.getFullYear()}-${month}-${day}`);
            }
        }
    }, [setShowDP, pickerMode, setValue_time, setValue_Date]);

    /**
     * updates Component value, when a selection occurs.
     */
    useEffect(() => {
        if (value_Date) {
            const d = new Date(`${value_Date} ${value_time}`);
            setSelectedDateTime(d);
            onSelection && onSelection(d);
        }
    }, [value_Date, value_time, setSelectedDateTime, onSelection])

    const handlePressable = useCallback((m: RNDateTimePickerProps['mode']) => {
        setPickerMode(m);
        setShowDP(true);
    }, [setPickerMode, setShowDP]);

    return <>
        <View style={_pickerView}>
            <Text style={_displayTextStyle}>
                {/*//TODO: Customize date display, using a utility function. */}
                {selectedDateTime ? selectedDateTime.toString().split("GMT")[0] : "No Date selected"}
            </Text>
            <View style={styles.modeBtnView}>
                <Pressable style={_pressableStyle} onPress={e => handlePressable('date')}>
                    <Text style={_pressableTextsStyle}>Pick a Date</Text>
                </Pressable>
                <Pressable style={_pressableStyle} onPress={e => handlePressable('time')}>
                    <Text style={_pressableTextsStyle}>Pick a Time</Text>
                </Pressable>
            </View>
        </View >

        {showDP &&
            (<RNDateTimePicker
                mode={pickerMode}
                display="default"
                value={new Date()}
                minimumDate={new Date()}
                onChange={handleChange}
                {...props}
            />)
        }
    </>;
}


const styles = StyleSheet.create({
    displayText: {
        lineHeight: 40,
        fontSize: _Font_Sizes.normalLarge,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginBottom: 10
    },
    modeBtnView: {
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    modeBtn: {
        flex: 0,
        paddingHorizontal: 15,
    },
    modeBtnText: {
        minWidth: 100,
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 40,
        fontSize: _Font_Sizes.btn
    }
});