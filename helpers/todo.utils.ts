import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASK_TODO_DATA, DAY } from 'constants/app.constants';
import { TODOData, TODOExpiryStatus, TODOExpiryStatusCode } from 'types/data.types';

export const getTODOData = async (): Promise<TODOData> => {
    const data_str = await AsyncStorage.getItem(ASK_TODO_DATA);
    if (data_str === null) return [];
    try {
        const data = JSON.parse(data_str) as TODOData;
        return data;
    } catch (error) {
        alert('Error reading TODO Data !');
        AsyncStorage.setItem(ASK_TODO_DATA, '[]'); // resetting data
        return [];
    }
}

export const saveTODOData = async (todo_data: TODOData): Promise<void> => {
    return await AsyncStorage.setItem(ASK_TODO_DATA, JSON.stringify(todo_data));
}

export const getTodoExpiryStatusCode = (expiry: number): TODOExpiryStatusCode => {

    const diff = expiry - Date.now();
    switch (true) {
        case diff < 0: return 0;
        case diff < DAY: return 1;
        default:
            return 2;
    }
}

export const getTodoExpiryStatus = (expiryCode: TODOExpiryStatusCode): TODOExpiryStatus => {

    switch (expiryCode) {
        case 0: return 'expired';
        case 1: return 'STE';
        case 2: return 'valid'
    }

}