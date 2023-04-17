import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageKey } from './AsyncStorageKey';

export default class AsyncStorageHelper {

    static async storeData(keyName: AsyncStorageKey, valueObject: any) {
        try {
            const jsonValue = JSON.stringify(valueObject);
            await AsyncStorage.setItem(keyName, jsonValue);
            return true;
        } catch (e) {
            return false;
        }
    }

    static async getData(keyName: AsyncStorageKey) {
        console.log("Get key...");
        try {
            const value = await AsyncStorage.getItem(keyName);
            if (value !== null) {
                console.log(value);
                return value;
            }
        } catch (error) {
            console.log(`Error retrieving ${keyName}`);
            return '';
        }
    }

    static async removeData(keyName: AsyncStorageKey) {
        try {
            await AsyncStorage.removeItem(keyName)
            return true
        } catch (e) {
            return false
        }
    }

}



