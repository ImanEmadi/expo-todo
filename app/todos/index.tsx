import { useTheme } from 'hooks/useTheme';
import { View } from 'react-native';

export default function TODOs() {

    const themeMap = useTheme();

    return <>
        <View style={{ flex: 1, backgroundColor: themeMap.bodyBG }}></View>
    </>;
}