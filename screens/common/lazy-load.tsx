import { View } from 'react-native';


export const LazyLoad = ({ children, lazy }: { children?: React.ReactNode, lazy: boolean }) => {
    return lazy ? <View>
        Lazy load goes here
    </View> :
        <>{children}</>;
}
