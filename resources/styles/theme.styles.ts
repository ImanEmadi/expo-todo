import { AppTheme, ThemeMap } from "types/app.types";

export const darkTheme = {
    bodyBG: '#2e2e38',
    bodyBGShade: '#22222a',
    bodyBGShadeActive: '#17171c',
    bodyBGTint: '#393946',
    bodyFC: '#e3e3e8',
    headerBorder: '#677882',
    headerBG: '#121c21',
    headerBGShade: '#090e10',
    headerBGTint: '#1c2b31',
    headerBGActive: 'rgba(63, 97, 115,0.2)',
    headerFC: '#fff',
    headerFCSecondary: '#a6a6a6',
    bottomTabBG: '#121c21',
    bottomTabBGShade: '#090e10',
    bottomTabBGTint: '#1c2b31',
    bottomTabActiveTint: '#fff',
    bottomTabInactiveTint: '#8a8a8a',
    bottomTabBorder: '#9494a6'
}

export const lightTheme = {
    bodyBG: '#2e2e38',
    bodyBGShade: '#22222a',
    bodyBGShadeActive: '#17171c',
    bodyBGTint: '#393946',
    bodyFC: '#e3e3e8',
    headerBorder: '#677882',
    headerBG: '#121c21',
    headerBGShade: '#090e10',
    headerBGTint: '#1c2b31',
    headerBGActive: 'rgba(63, 97, 115,0.2)',
    headerFC: '#fff',
    headerFCSecondary: '#a6a6a6',
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