import { Picker, PickerProps } from '@react-native-picker/picker';

export type RNPickerItem<V = string> = {
    label: string;
    value: V;
}
export interface ReactNativePickerProps extends PickerProps {
    items: RNPickerItem[]
}

export const ReactNativePicker = ({ items, ...props }: ReactNativePickerProps) => {

    return <>
        <Picker {...props}>
            {items.map(({ value, label }, key) => <Picker.Item key={key} label={label} value={value} />)}
        </Picker>
    </>;

}