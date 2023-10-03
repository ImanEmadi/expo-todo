import { AppTheme } from "types/app.types";


export const validAppThemes: AppTheme[] = ['dark', 'light'];
export const DEFAULT_APP_THEME: AppTheme = 'dark';

//** EXPO */

export const MEDIA_ALBUM_NAME = "Todos Album";

//** ROUTES */

export const PATH_SETTINGS = '/settings'
export const PATH_NEW_TODO = '/newTodo';
export const PATH_EDIT_TODO = '/edit/[todo]'
export const PATH_ALL_TODOS = '/';

//*  AsyncStorage keys

export const ASK_APP_THEME = 'theme';
export const ASK_TODO_DATA = 'todo_data';
export const ASK_STE = 'STE_VALUE';

//** VALUES */

export const MAIN_HEADER_HEIGHT = 66;

// Literally Constants:

export const DAY = 1e5 * 36 * 24;