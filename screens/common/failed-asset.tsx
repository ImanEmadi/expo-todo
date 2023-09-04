import { Text, View } from "react-native";

export interface FailedAssetProps {
    children?: React.ReactNode;
    failed: boolean
}

export const FailedAsset = ({ failed, children }: FailedAssetProps) => {
    return failed ?
        <View>
            <Text>
                Asset failed to load
            </Text>
        </View> : <>{children}</>
        ;
}