import { customAxios } from "../helpers/axiosInstance";
import StringBuilder from "../util/string.builder";
import { endpoint } from "../util/endpoint.enum";
import log from "../util/logger.util";
import { TokenStoreWrapper } from "../redux/store/token.store";

class MessageServices {

    static async getMessages(chat_id: number) {
        log.debug(`Fetching conversation id ${chat_id}...`);

        const url = StringBuilder(endpoint.getChatDetails, { chat_id: chat_id });

        const token = await TokenStoreWrapper.getInstance().getToken();

        return await customAxios(url, {
            method: 'get',
            headers: {
                'X-Authorization': token.result,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.data;
        })
    }

    static async sendMessage(chat_id: number, message: string) {
        log.debug(`Adding message to conversation id ${chat_id}...`);

        const url = StringBuilder(endpoint.sendMessage, { chat_id: chat_id });

        return customAxios.post(url, { message: message }, {
            headers: {
                'X-Authorization': '1b6c1bfaa74ed4b180ddd85659d7bba8',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log("Message Sent...", response.data);
            return response.data;
        })
    }

    static async deleteMessage(chat_id: number, message_id: number) {
        log.debug(`Removing message from conversation id ${chat_id}...`);

        const url = StringBuilder(endpoint.deleteMessage, { chat_id: chat_id, message_id: message_id });

        return customAxios.delete(url, {
            headers: {
                'X-Authorization': '1b6c1bfaa74ed4b180ddd85659d7bba8',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log("Deleted Message...", response.data);
            return response.data;
        })
    }

    static async updateMessage(chat_id: number, message_id: number, message: string) {
        log.debug(`Updating message in conversation id ${chat_id}...`);

        const url = StringBuilder(endpoint.updateMessage, { chat_id: chat_id, message_id: message_id });

        return customAxios.patch(url, { message: message }, {
            headers: {
                'X-Authorization': '1b6c1bfaa74ed4b180ddd85659d7bba8',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log("Updated Message", response.data);
            return response.data;
        })
    }

}


export default MessageServices;