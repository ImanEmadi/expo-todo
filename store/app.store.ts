import { AppStoreInterface } from "types/store.types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAppStore = create<AppStoreInterface>()(set => ({
    theme: null,
    setTheme: t => set({ theme: t })
}))



export { useAppStore };