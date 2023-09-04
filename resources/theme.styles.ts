import { AppTheme, ThemeMap } from "types/app.types";


export const darkTheme = {
    bodyBG: '#2e2e38',
    bodyBGShade: '#22222a',
    bodyBGTint: '#393946',
    bodyFC: '#e3e3e8',
    headerBorder: '#677882',
    headerBG: '#121c21',
    bottomTabBG: '#262626',
    bottomTabBGShade: '#1a1a1a',
    bottomTabBGTint: '#333333',
    bottomTabActiveTint: '#fff',
    bottomTabInactiveTint: '#8a8a8a',
    bottomTabBorder: '#9494a6'
}

export const lightTheme = {
    bodyBG: '#2e2e38',
    bodyBGShade: '#22222a',
    bodyBGTint: '#393946',
    bodyFC: '#e3e3e8',
    headerBorder: '#ccc',
    bottomTabBG: '#262626',
    bottomTabBGShade: '#1a1a1a',
    bottomTabBGTint: '#333333',
    bottomTabActiveTint: '#fff',
    bottomTabInactiveTint: '#8a8a8a',
    bottomTabBorder: '#9494a6'
}






export const loadTheme = (theme: AppTheme): ThemeMap => {
    switch (theme) {
        case 'dark':
        default:
            return darkTheme;
    }
}