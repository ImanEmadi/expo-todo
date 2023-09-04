import { AppTheme } from "./app.types";


export interface AppStoreInterface {
    theme: AppTheme | null;
    setTheme: (t: AppTheme) => void
}


