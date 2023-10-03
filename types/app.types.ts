import { darkTheme } from "resources/styles/theme.styles";


export type AppTheme = 'dark' | 'light';
export type ThemeMap = typeof darkTheme;
export type Oriention = 'portrait' | 'landscape';


/**
 * possible values to be set for `Soon to expire` input in `setting section`.               
 * indicates the number of days remaining, when a TODO is set as `STE`
 */
export type STEDaysNumerics = 1 | 2 | 3 | 5 | 7;