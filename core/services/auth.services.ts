import { AsyncStorageKey } from "../storage/AsyncStorageKey";
import AsyncStorageHelper from "../storage/asyncStorage.helper";

// private token
export const getToken = async () => {
    const token = await AsyncStorageHelper.getData(AsyncStorageKey.Authenticated_User)

    return token;
}