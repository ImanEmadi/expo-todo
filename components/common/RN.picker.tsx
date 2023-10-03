import { Picker, PickerProps } from '@react-native-picker/picker';
import { StringOrNumber } from 'types/custom.types';

export type RNPickerItem<V> = {
    label: string;
    value: V;
}
export interface ReactNativePickerProps<V extends StringOrNumber> extends PickerProps<V> {
    items: RNPickerItem<V>[]
}


export const ReactNativePicker: <V extends StringOrNumber>(p: ReactNativePickerProps<V>) => JSX.Element = ({ items, ...props }) => {
    return <>
        <Picker {...props}>
            {items.map(({ value, label }, key) => <Picker.Item key={key} label={label} value={value} />)}
        </Picker>
    </>;
}