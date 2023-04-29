import AsyncStorage from '@react-native-async-storage/async-storage';

import { StorageKeys } from './as.keys';
import log from './logger.util';

export default class AsyncStorageHelper {

    static async storeData(keyName: StorageKeys, value: object) {
        try {
            await AsyncStorage.setItem(keyName, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    }

    static async getData(keyName: StorageKeys) {
        try {
            const value = await AsyncStorage.getItem(keyName);
            if (value !== null) {
                log.debug("Got from AsyncStorage...", value);
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



