import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../util/as.keys';

// https://github.com/ZJav1310/WhatsThat_TS/issues/1
export default class AuthController {

  public static async getToken() {
    try {
      const result = await AsyncStorage.getItem(StorageKeys.AuthToken);

      if(!result) {
        throw new Error(`Unable to get ${StorageKeys.AuthToken}...`);
      }

      return result;
    }
    catch(error) {
      console.log(error);
      return false;
    }
  }

  public static async resetToken() {
    const result = await AsyncStorage.removeItem(StorageKeys.AuthToken);
    return result;
  }

  public static async setToken(value: string) {
    try {
      let error = undefined;

      await AsyncStorage.setItem(StorageKeys.AuthToken, JSON.stringify({ token: value }), error);

      if(error) {
        throw new Error(`Unable to set ${StorageKeys.AuthToken}...`);
      }

      return true;
    }
    catch(error) {
      console.log(error);
      return false;
    }
  }
}
