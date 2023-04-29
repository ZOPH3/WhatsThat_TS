import AuthService from "../services/auth.services";
import UrlBuilder from "../util/url.builder";

class ChatController {
  static async fetchChatList() {
    const myHeaders = new Headers();
    const value = await AuthService.getToken();

    if (value.status) {
      myHeaders.append("Authorization", value.result);
    }

    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(UrlBuilder.fetchChatList(), requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          status: true,
          message: "Fetched chat list successfully.",
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: "Unable to fetch chat list...",
          result: "",
          error: error,
        };
      });
  }

  static async startNewConversation(name: string) {
    const myHeaders = new Headers();
    const value = await AuthService.getToken();

    if (value.status) {
      myHeaders.append("Authorization", value.result);
    }

    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ name: name }),
      redirect: "follow",
    };

    return fetch(UrlBuilder.startNewConversation(), requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          status: true,
          message: `New conversation created: ${name}.`,
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: "Unable to create new conversation...",
          result: "",
          error: error,
        };
      });
  }

  static async fetchChatDetails(chat_id: number) {
    const myHeaders = new Headers();
    const value = await AuthService.getToken();

    if (value.status) {
      myHeaders.append("Authorization", value.result);
    }

    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(UrlBuilder.fetchChatDetails(chat_id), requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          status: true,
          message: `Fetched chat ${chat_id} successfully.`,
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: `Unable to fetch chat ${chat_id}...`,
          result: "",
          error: error,
        };
      });
  }

  static async updateChatDetails(chat_id: number, name: string) {
    const myHeaders = new Headers();
    const value = await AuthService.getToken();

    if (value.status) {
      myHeaders.append("Authorization", value.result);
    }

    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify({ name: name }),
      redirect: "follow",
    };

    return fetch(UrlBuilder.updateChatDetails(chat_id), requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          status: true,
          message: `Updated chat ${chat_id}.`,
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: `Unable to update chat ${chat_id}...`,
          result: "",
          error: error,
        };
      });
  }

  static async addUserToConversation(chat_id: number, user_id: number) {
    const myHeaders = new Headers();
    const value = await AuthService.getToken();

    if (value.status) {
      myHeaders.append("Authorization", value.result);
    }

    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(
      UrlBuilder.addUserToConversation(chat_id, user_id),
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          status: true,
          message: `Added user ${user_id} to chat ${chat_id}.`,
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: `Unable to add ${user_id} to chat ${chat_id}...`,
          result: "",
          error: error,
        };
      });
  }

  static async removeUserFromConversation(chat_id: number, user_id: number) {
    const myHeaders = new Headers();
    const value = await AuthService.getToken();

    if (value.status) {
      myHeaders.append("Authorization", value.result);
    }

    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(
      UrlBuilder.removeUserFromConversation(chat_id, user_id),
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          status: true,
          message: `Successfully removed ${user_id} from chat ${chat_id}.`,
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: `Unable to remove ${user_id} from chat ${chat_id} ...`,
          result: "",
          error: error,
        };
      });
  }

  static async sendMessage(chat_id: number, message: string) {
    const myHeaders = new Headers();
    const value = await AuthService.getToken();

    if (value.status) {
      myHeaders.append("Authorization", value.result);
    }

    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ message: message }),
      redirect: "follow",
    };

    return fetch(UrlBuilder.sendMessage(chat_id), requestOptions)
    .then((response) => response.json())
    .then((response) => {
      return {
        status: true,
        message: `Sent message in chat ${chat_id}.`,
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

  static async updateMessage(
    chat_id: number,
    message_id: number,
    message: string
  ) {
    const myHeaders = new Headers();
    const value = await AuthService.getToken();

    if (value.status) {
      myHeaders.append("Authorization", value.result);
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

  static async removeMessage(chat_id: number, message_id: number) {
    const myHeaders = new Headers();
    const value = await AuthService.getToken();

    if (value.status) {
      myHeaders.append("Authorization", value.result);
    }

    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(UrlBuilder.deleteMessage(chat_id, message_id), requestOptions)
    .then((response) => response.json())
    .then((response) => {
      return {
        status: true,
        message: `Message ${message_id} successfully from ${chat_id}.`,
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
}

export default ChatController;
