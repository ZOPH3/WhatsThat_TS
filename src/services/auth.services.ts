import { AsyncStorageKey } from "../util/as.keys";
import AsyncStorageHelper from "../util/as.helper";

// private token
export const getToken = async () => {
    const token = await AsyncStorageHelper.getData(AsyncStorageKey.Authenticated_User)

    return token;
}