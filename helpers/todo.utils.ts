import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASK_TODO_DATA, DAY } from 'constants/app.constants';
import { TODO, TODOData, TODOExpiryStatusCode } from 'types/data.types';

export const getTODOData = async (): Promise<TODOData> => {
    const data_str = await AsyncStorage.getItem(ASK_TODO_DATA);
    if (data_str === null) return [];
    try {
        const data = JSON.parse(data_str) as TODOData;
        return data;
    } catch (error) {
        alert('Error reading TODO Data !');
        resetTODOData();
        return [];
    }
}

export const saveTODOData = async (todo_data: TODOData): Promise<void> => {
    return await AsyncStorage.setItem(ASK_TODO_DATA, JSON.stringify(todo_data));
}

export const getTODObyID = async (id: string): Promise<TODO | null> => {
    const data_str = await AsyncStorage.getItem(ASK_TODO_DATA);
    if (data_str === null) return null;
    try {
        const data = JSON.parse(data_str) as TODOData;
        return data.filter(todo => todo.id === id)[0] ?? null;
    } catch (error) {
        alert('Error reading TODO Data !');
        resetTODOData();
        return null;
    }
}

const resetTODOData = () => {
    AsyncStorage.setItem(ASK_TODO_DATA, '[]'); // resetting data
}


export const getTodoExpiryStatusCode = (expiry: number): TODOExpiryStatusCode => {

    const diff = expiry - Date.now();
    switch (true) {
        case diff < 0: return 0;
        //TODO: add dynamic setting feature. user can choose "when it's soon to expire!"
        case diff < DAY: return 1;
        default:
            return 2;
    }
}

export const getTodoExpiryStatus = (expiryCode: TODOExpiryStatusCode): string => {

    switch (expiryCode) {
        case 0: return 'Expired!';
        case 1: return '"Soon to expire!"';
        case 2: return 'Valid'
    }

}

