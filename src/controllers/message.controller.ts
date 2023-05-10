import AuthService from "../services/auth.services";
import UrlBuilder from "../util/url.builder";

// https://github.com/ZJav1310/WhatsThat_TS/issues/1
class MessageController {
  
  static async sendMessage(chat_id: number, message: string) {
    const myHeaders = new Headers();
    const value = await AuthService.getToken();

    if (value.status) {
      myHeaders.append("X-Authorization", value.result);
    }

    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ message: message }),
      redirect: "follow",
    };

    return fetch(UrlBuilder.sendMessage(chat_id), requestOptions)
      .then((response) => {
        return {
          status: true,
          message: `Sent new message in chat ${chat_id}.`,
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: `Unable to send message in chat ${chat_id}...`,
          result: "",
          error: error,
        };
      });
  }

  static async deleteMessage(chat_id: number, message_id: number) {
    const myHeaders = new Headers();
    const value = await AuthService.getToken();

    if (value.status) {
      myHeaders.append("X-Authorization", value.result);
    }

    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(UrlBuilder.deleteMessage(chat_id, message_id), requestOptions)
      .then((response) => {
        return {
          status: true,
          message: `Deleted message ${message_id} in chat ${chat_id}.`,
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: `Unable to delete message ${message_id} from chat ${chat_id}...`,
          result: "",
          error: error,
        };
      });
  }

  static async updateMessage(
    chat_id: number,
    message_id: number,
    message: string
  ) {
    const myHeaders = new Headers();
    const value = await AuthService.getToken();

    if (value.status) {
      myHeaders.append("X-Authorization", value.result);
    }

    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify({ message: message }),
      redirect: "follow",
    };

    return fetch(UrlBuilder.updateMessage(chat_id, message_id), requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          status: true,
          message: `Updated message ${message_id} in chat ${chat_id}.`,
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: `Unable to update message ${message_id} in chat ${chat_id}...`,
          result: "",
          error: error,
        };
      });
  }
}

export default MessageController;
