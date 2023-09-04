import { validAppThemes } from "constants/app.constants"
import { AppTheme } from "types/app.types";


export const isValidAppTheme = (t: any): t is AppTheme => {
    return validAppThemes.includes(t);
}