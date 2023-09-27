import { AppTheme, ThemeMap } from "types/app.types";

export const darkTheme = {
    bodyBG: '#2e2e38',
    bodyBGShade: '#22222a',
    bodyBGShadeActive: '#17171c',
    bodyBGTint: '#393946',
    bodyFC: '#e3e3e8',
    bodyFLightBlue: '#80aaff',
    bodyHeaderFC: '#80b3ff',
    formBG: '#091e2a',
    formBGShade: '#040f15',
    formBGTint: '#0c2e40',
    formInputBorder: '#737373',
    formInputFC: '#e6e6e6',
    formInputFCPlaceHolder: '#bfbfbf',
    bodyGreen: '#009900',
    bodyGreenFade: 'rgba(0, 153, 0,0.2)',
    bodyGreenShade: '#009900',
    bodyGreenTint: '#009900',
    bodyGreenContrast: '#fff',
    bodyOrange: '#df7307',
    bodyOrangeFade: 'rgba(223, 115, 7,0.3)',
    bodyOrangeShade: '#c66606',
    bodyOrangeTint: '#f78008',
    bodyOrangeContrast: '#fff',
    bodyRed: '#cc0000',
    bodyRedFade: 'rgba(204, 0, 0,0.3)',
    bodyRedShade: '#b30000',
    bodyRedTint: '#e60000',
    bodyRedContrast: '#fff',
    bodyBlue: '#0099e6',
    bodyBlueFade: 'rgba(0, 170, 255,0.3)',
    bodyBlueShade: '#0088cc',
    bodyBlueTint: '#00aaff',
    bodyBlueContrast: '#fff',
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

/**
 * mocked
 *TODO: define light theme colors
 */
export const lightTheme = darkTheme;

export const loadTheme = (theme: AppTheme): ThemeMap => {
    switch (theme) {
        case 'dark':
        default:
            return darkTheme;
    }
}