import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASK_TODO_DATA } from 'constants/app.constants';
import { TODOData } from 'types/data.types';

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