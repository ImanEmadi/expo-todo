import { AppStoreInterface } from "types/store.types";
import { create } from "zustand";

const useAppStore = create<AppStoreInterface>()(set => ({
    theme: null,
    setTheme: t => set({ theme: t })
}))

export { useAppStore };