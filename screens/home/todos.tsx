import { FlatList, ListRenderItemInfo, View } from "react-native"
import { TODO } from "types/data.types";


export const TODOs = () => {

    return <FlatList
        data={[]}
        renderItem={(props) => <RenderItem {...props} />}>
    </FlatList>
}


const RenderItem = ({ item }: ListRenderItemInfo<TODO>) => {
    return <>
        <View></View>
    </>;
}