import RNDateTimePicker, { AndroidNativeProps, DateTimePickerEvent, IOSNativeProps, WindowsNativeProps } from "@react-native-community/datetimepicker";
import { FC } from "react";

type RNDateTimePickerProps = FC<
    IOSNativeProps | AndroidNativeProps | WindowsNativeProps
>

export type RNDateTimePickerOnChange = (e: DateTimePickerEvent, date?: Date) => void;

export interface RNDatePickerProps extends Partial<RNDateTimePickerProps> {
    onChange?: RNDateTimePickerOnChange,
    show?: boolean
}

export const RNDTPicker = ({ show = false, ...props }: RNDatePickerProps) => {
    return <>
        {show &&
            (<RNDateTimePicker
                mode="datetime"
                display="default"
                value={new Date()}
                minimumDate={new Date()}
                {...props}
            />)
        }
    </>;
}