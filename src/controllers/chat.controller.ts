import { TokenStoreWrapper } from "../store/token.store";
import UrlBuilder from "../util/url.builder";

class ChatController {

  static async fetchChatList() {
    const myHeaders = new Headers();
    const value = await TokenStoreWrapper.getInstance().getToken();

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
      .then((result) => result)
      .catch((error) => error);
  }
}

export default ChatController;