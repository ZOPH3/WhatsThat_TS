import ChatController from "../controllers/chat.controller";
import { logType, logOutput } from "../util/logger.util";

class ChatService {
  static async fetchChatList() {
    const data = await ChatController.fetchChatList();
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }

  static async startNewConversation(name: string) {
    const data = await ChatController.startNewConversation(name);
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }

  static async fetchChatDetails(chat_id: number) {
    const data = await ChatController.fetchChatDetails(chat_id);
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }

  static async updateChatDetails(chat_id: number, name: string) {
    const data = await ChatController.updateChatDetails(chat_id, name);
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }

  static async addUserToConversation(chat_id: number, user_id: number) {
    const data = await ChatController.addUserToConversation(chat_id, user_id);
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }

  static async removeUserFromConversation(chat_id: number, user_id: number) {
    const data = await ChatController.removeUserFromConversation(
      chat_id,
      user_id
    );
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }

  static async sendMessage(chat_id: number, message: string) {
    const data = await ChatController.sendMessage(chat_id, message);
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }

  static async updateMessage(
    chat_id: number,
    message_id: number,
    message: string
  ) {
    const data = await ChatController.updateMessage(
      chat_id,
      message_id,
      message
    );
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }

  static async removeMessage(chat_id: number, message_id: number) {
    const data = await ChatController.removeMessage(chat_id, message_id);
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }
}

export default ChatService;
