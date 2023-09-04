import { darkTheme, lightTheme } from "resources/theme.styles";
import { useAppStore } from "store/app.store"
import { ThemeMap } from "types/app.types";


/**
 * returns the appTheme object, based on currently selected app's theme.
 */
export const useTheme = (): ThemeMap => {
    const { theme } = useAppStore();
    return theme === 'dark' ? darkTheme : lightTheme;

}