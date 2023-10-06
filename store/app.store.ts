import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASK_APP_THEME } from "constants/app.constants";
import { AppStoreInterface } from "types/store.types";
import { create } from "zustand";

const useAppStore = create<AppStoreInterface>()(set => ({
    theme: null,
    setTheme: t => {
        AsyncStorage.setItem(ASK_APP_THEME, t);
        return set({ theme: t });
    }
}))

export { useAppStore };