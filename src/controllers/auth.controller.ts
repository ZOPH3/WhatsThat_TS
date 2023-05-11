import AsyncStorageHelper from '../util/as.helper';
import { StorageKeys } from '../util/as.keys';
import { logType, logOutput } from '../util/logger.util';

// https://github.com/ZJav1310/WhatsThat_TS/issues/1
export default class AuthController {
  public static async getToken() {
    const result = await AsyncStorageHelper.getData(StorageKeys.AuthToken);
    return result
      ? {
          status: true,
          message: `${StorageKeys.AuthToken} has been found. `,
          result: JSON.parse(result).token,
        }
      : {
          status: false,
          message: `Unable to find token... `,
          result: 'No token',
        };
  }

  public static async resetToken() {
    let message = 'Request to reset authentication... ';
    let type = logType.success;
    const result = await AsyncStorageHelper.removeData(StorageKeys.AuthToken);

    if (result) {
      message += `${StorageKeys.AuthToken} has been removed successfully`;
    } else {
      type = logType.error;
      message += `Unable to find ${StorageKeys.AuthToken}...`;
    }

    logOutput(type, message);

    return {
      status: result,
      message: message,
      result: result,
    };
  }

  public static async setToken(value: string) {
    let message = '';
    const result = await AsyncStorageHelper.storeData(StorageKeys.AuthToken, { token: value });

    if (result) {
      message += `${StorageKeys.AuthToken} has been set. `;
    } else {
      message += `Unable to store token... `;
    }

    return {
      status: result,
      message: message,
      result: value,
    };
  }
}
