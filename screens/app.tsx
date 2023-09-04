import { useFocusEffect } from "expo-router";
import { useAppStore } from "store/app.store";
import { useCallback } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASK_APP_THEME, DEFAULT_APP_THEME } from "constants/app.constants";
import { isValidAppTheme } from "resources/validators/app.validators";

export const AppShell = () => {

    const { setTheme } = useAppStore();

    const shellEffects = useCallback(() => {
        AsyncStorage.getItem(ASK_APP_THEME, (err, res) => {
            if (!!err) console.error(err);
            const _theme = isValidAppTheme(res) ? res : DEFAULT_APP_THEME;
            setTheme(_theme);
            AsyncStorage.setItem(ASK_APP_THEME, _theme);
        });
    }, [setTheme])

    useFocusEffect(shellEffects);

    return <></>;
}