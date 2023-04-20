import { AsyncStorageKey } from "../util/as.keys";
import AsyncStorageHelper from "../util/as.helper";
import { loadKey } from "../wrappers/storage.methods";

// private token
class AuthService {
    //FIXME: This wil work too if i chain promises
    // static getToken = async () => {
    //     const token = await AsyncStorageHelper.getData(AsyncStorageKey.Authenticated_User)
    //     return token;
    // }

    static async getToken(){
        return await loadKey(AsyncStorageKey.Authenticated_User);
    }
}

export default AuthService;
