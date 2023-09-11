import { useWindowDimensions } from 'react-native';
import { Oriention } from 'types/app.types';

export const UseOriention = (): Oriention => {
    const { width, height } = useWindowDimensions();
    return width > height ? 'landscape' : 'portrait';
}