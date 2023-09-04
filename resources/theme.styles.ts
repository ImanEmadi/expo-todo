import { AppTheme, ThemeMap } from "types/app.types";


export const darkTheme = {
    // main background color for the app
    bodyBG: '#2e2e38',
    bodyBGShade: '#22222a',
    bodyBGTint: '#393946',
    // primary font color appearing on `bodyBG`
    bodyFC: '#e3e3e8',
}






export const loadTheme = (theme: AppTheme): ThemeMap => {
    switch (theme) {
        case 'dark':
        default:
            return darkTheme;
    }
}