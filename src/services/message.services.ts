import MessageController from '../controllers/message.controller';
import ChatService from './chat.services';

class MessageServices {
  static async getMessage(chat_id: number) {
    const response = (await ChatService.fetchChatDetails(chat_id)) ?? undefined;
    const messages = response !== undefined ? response.messages : undefined;
    return messages;
  }

  static async sendMessage(chat_id: number, message: string) {
    const response = (await MessageController.sendMessage(chat_id, message)) ?? undefined;
    return response;
  }

  static async deleteMessage(chat_id: number, message_id: number) {
    const response = (await MessageController.deleteMessage(chat_id, message_id)) ?? undefined;
    return response;
  }

  static async updateMessage(chat_id: number, message_id: number, message: string) {
    const response =
      (await MessageController.updateMessage(chat_id, message_id, message)) ?? undefined;
    return response;
  }
}

export default MessageServices;
