import config from "../config.json";

export default class UrlBuilder {
  static createNewUser = () => config.BASE_URL + "/user";
  static fetchUserInformation = (user_id: number) => config.BASE_URL + `/user/${user_id}`;
  static updateUserInformation = (user_id: number) => config.BASE_URL + `/user/${user_id}`;
  static login = () => config.BASE_URL + "/login";
  static logout = () => config.BASE_URL + "/logout";
  static fetchUserPhoto = (user_id: number) => config.BASE_URL + `/user/${user_id}/photo`;
  static uploadUserPhoto = (user_id: number) => config.BASE_URL + `/user/${user_id}/photo`;
  static search = () => config.BASE_URL + "/search";

  static fetchContacts = () => config.BASE_URL + "/contacts";
  static addContact = (user_id: number) => config.BASE_URL + `/user/${user_id}/contact`;
  static deleteContact = (user_id: number) => config.BASE_URL + `/user/${user_id}/contact`;
  static fetchBlocked = () => config.BASE_URL + "/blocked";
  static blockUser = (user_id: number) => config.BASE_URL + `/user/${user_id}/block`;
  static unblockUser = (user_id: number) => config.BASE_URL + `/user/${user_id}/block`;

  static fetchChatList = () => config.BASE_URL + "/chat";
  static startNewConversation = () => "/chat";
  static fetchChatDetails = (chat_id: number) => config.BASE_URL + `/chat/${chat_id}`;
  static updateChatDetails = (chat_id: number) => config.BASE_URL + `/chat/${chat_id}`;

  static addUserToConversation = (chat_id: number, user_id: number) =>
    config.BASE_URL + `/chat/${chat_id}/user/${user_id}`;
  static removeUserFromConversation = (chat_id: number, user_id: number) =>
    config.BASE_URL + `/chat/${chat_id}/user/${user_id}`;

  static sendMessage = (chat_id: number) => config.BASE_URL + `/chat/${chat_id}/message`;
  static updateMessage = (chat_id: number, message_id: number) =>
    config.BASE_URL + `/chat/${chat_id}/message/${message_id}`;
  static deleteMessage = (chat_id: number, message_id: number) =>
    config.BASE_URL + `/chat/${chat_id}/message/${message_id}`;
}
