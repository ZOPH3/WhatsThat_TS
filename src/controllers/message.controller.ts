import AuthService from "../services/auth.services";
import { AuthHeader } from "../util/api.helper";
import UrlBuilder from "../util/url.builder";

// https://github.com/ZJav1310/WhatsThat_TS/issues/1
class MessageController {
  static async sendMessage(chat_id: number, message: string) {
    // const myHeaders = await AuthHeader();
    const requestOptions: RequestInit = {
      method: "POST",
      headers: await AuthHeader(),
      body: JSON.stringify({ message: message }),
    };

    return fetch(UrlBuilder.sendMessage(chat_id), requestOptions)
      .then((response) => response)
      .catch((error) =>
        console.log("Error caught while sending message: ", error)
      );
  }

  static async deleteMessage(chat_id: number, message_id: number) {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(UrlBuilder.deleteMessage(chat_id, message_id), requestOptions)
      .then((response) => response)
      .catch((error) =>
        console.log("Error caught while deleting message: ", error)
      );
  }

  static async updateMessage(
    chat_id: number,
    message_id: number,
    message: string
  ) {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify({ message: message }),
      redirect: "follow",
    };

    return fetch(UrlBuilder.updateMessage(chat_id, message_id), requestOptions)
      .then((response) => response.json())
      .then((response) => response)
      .catch((error) =>
        console.log("Error caught while updating message: ", error)
      );
  }
}

export default MessageController;
