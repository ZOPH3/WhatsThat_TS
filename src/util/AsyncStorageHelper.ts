import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../types/TStorageKeys';
import log from './LoggerUtil';

export default class ASHelper {
  public static async getItem(key: StorageKeys) {
    try {
      const result = await AsyncStorage.getItem(key);

      if (!result) {
        throw new Error(`Unable to get ${key}...`);
      }

      return result;
    } catch (error) {
      log.error(error);
      return null;
    }
  }

  public static async resetKey(key: StorageKeys) {
    try {
      const error = undefined;
      await AsyncStorage.removeItem(key, error);

      if (error) {
        throw new Error(`Unable to reset ${key}...`);
      }

      return true;
    } catch (error) {
      log.error(error);
      return false;
    }
  }

  public static async setKey(key: StorageKeys, value: string) {
    try {
      const error = undefined;

      await AsyncStorage.setItem(key, JSON.stringify({ value }), error);

      if (error) {
        throw new Error(`Unable to set ${key}...`);
      }

      return true;
    } catch (error) {
      log.error(error);
      return false;
    }
  }
}
