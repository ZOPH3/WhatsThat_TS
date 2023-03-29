import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserModel } from '../models/UserModel';
import { AsyncStorageKey } from '../utils/AsyncStorageKey';

export default class UserAsyncStorage implements IStorageRequest<UserModel>{

    keyName: AsyncStorageKey = AsyncStorageKey.Authenticated_User;

    constructor() { }

    async storeData(valueObject: UserModel): Promise<boolean> {
        try {
            const jsonValue = JSON.stringify(valueObject);
            await AsyncStorage.setItem(this.keyName, jsonValue);
            return true;
        } catch (e) {
            return false;
        }
    }

    async getData(): Promise<UserModel | null> {
        try {
            const jsonValue = await AsyncStorage.getItem(this.keyName)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            return null
        }
    }

    async removeData(): Promise<boolean> {
        try {
            await AsyncStorage.removeItem(this.keyName)
            return true
        } catch (e) {
            return false
        }
    }

}



