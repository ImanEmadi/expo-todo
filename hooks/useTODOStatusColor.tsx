import { TODOExpiryStatusCode } from "types/data.types";
import { useTheme } from "./useTheme";
import { useMemo } from "react";

/**
 * returns `[activeBG,BG,FC]`
 */
export const useTODOStatusColor = (s: TODOExpiryStatusCode): [string, string, string] => {

    const themeMap = useTheme();
    /**
     *? Assigning color groups based on current status code
     */
    return useMemo(() => {
        switch (s) {
            case 0: return [themeMap.bodyRedFade, themeMap.bodyRedShade, themeMap.bodyRed]
            case 1: return [themeMap.bodyOrangeFade, themeMap.bodyOrangeShade, themeMap.bodyOrange]
            case 2:
            default:
                return [themeMap.bodyBlueFade, themeMap.bodyBlueShade, themeMap.bodyBlue]
        }
    }, [s, themeMap]);
}