import MessageController from "../controllers/message.controller";
import { logType, logOutput } from "../util/logger.util";
import ChatService from "./chat.services";

class MessageServices {
  static async getMessage(chat_id: number) {
    const data = await ChatService.fetchChatDetails(chat_id);
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.result.messages);    
    return data.result.messages;
  }

  static async sendMessage(chat_id: number, message: string) {
    const data = await MessageController.sendMessage(chat_id, message);
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }

  static async deleteMessage(chat_id: number, message_id: number) {
    const data = await MessageController.deleteMessage(chat_id, message_id);
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }

  static async updateMessage(
    chat_id: number,
    message_id: number,
    message: string
  ) {
    const data = await MessageController.updateMessage(
      chat_id,
      message_id,
      message
    );
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }
}

export default MessageServices;
