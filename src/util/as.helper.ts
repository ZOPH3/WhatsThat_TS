import AsyncStorage from '@react-native-async-storage/async-storage';

import { StorageKeys } from './as.keys';

export default class AsyncStorageHelper {

    static async storeData(keyName: StorageKeys, valueObject: any) {
        try {
            const jsonValue = JSON.stringify(valueObject);
            await AsyncStorage.setItem(keyName, jsonValue);
            return true;
        } catch (e) {
            return false;
        }
    }

    static async getData(keyName: StorageKeys) {
        try {
            const value = await AsyncStorage.getItem(keyName);
            if (value !== null) {
                console.log("Got from AsyncStorage...", value);
                return value;
            }
        } catch (error) {
            console.log(`Error retrieving ${keyName}`);
            return '';
        }
    }

    static async removeData(keyName: StorageKeys) {
        try {
            await AsyncStorage.removeItem(keyName)
            return true
        } catch (e) {
            return false
        }
    }

}



