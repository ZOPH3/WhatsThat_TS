import ChatService from "../services/chat.services";

import { AsyncStorageKey } from "../storage/AsyncStorageKey";
import AsyncStorageHelper from "../storage/asyncStorage.helper";

class ChatController {

    static all = async () => {
        let projects = {};

        console.log("Called all...");

        try {
            let token = await AsyncStorageHelper.getData(AsyncStorageKey.Authenticated_User);

            if (token !== undefined) {
                projects = ChatService.all(token);
            } 
            else {
                console.log("Token is undefined");
            }

        } catch (e: any) {

            console.log("Failed to get all");
        }

        return projects;
    }
}

export default ChatController;