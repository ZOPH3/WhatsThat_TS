/**
 * 
 * Deals with API output.
 * 
 */

import UserService from "../services/user.services";
import { AsyncStorageKey } from "../storage/AsyncStorageKey";
import AsyncStorageHelper from "../storage/asyncStorage.helper";

class UserController {

    static all = async () => {
        let users = {};
        let token = await AsyncStorageHelper.getData(AsyncStorageKey.Authenticated_User);

        if(token !== undefined){
            users = UserService.all(token);
        }
        return users;
    }
}

export default UserController;