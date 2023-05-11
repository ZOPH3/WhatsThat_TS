import ChatController from '../controllers/chat.controller';

class ChatService {
  static async fetchChatList() {
    const response = (await ChatController.fetchChatList()) ?? undefined;
    return response;
  }

  static async newConversation(name: string) {
    const response = (await ChatController.newConversation(name)) ?? undefined;
    return response;
  }

  static async fetchChatDetails(chat_id: number) {
    const response = (await ChatController.fetchChatDetails(chat_id)) ?? undefined;
    return response;
  }

  static async updateChatDetails(chat_id: number, name: string) {
    const response = (await ChatController.updateChatDetails(chat_id, name)) ?? undefined;
    return response;
  }

  static async addUserToConversation(chat_id: number, user_id: number) {
    const response = (await ChatController.addUserToConversation(chat_id, user_id)) ?? undefined;
    return response;
  }

  static async removeUserFromConversation(chat_id: number, user_id: number) {
    const response =
      (await ChatController.removeUserFromConversation(chat_id, user_id)) ?? undefined;
    return response;
  }
}

export default ChatService;
