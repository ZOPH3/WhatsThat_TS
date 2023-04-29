import { TokenStoreWrapper } from "../store/token.store";
import UrlBuilder from "../util/url.builder";

class UserController {
    // FIXME: This style I like the most
  public static async login(email: string, password: string) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ email, password }),
      redirect: "follow",
    };

    return fetch(UrlBuilder.login(), requestOptions)
      .then((response) => response.json())
      .then((response: { id: number; token: string }) => {
        return {
          status: true,
          message: "Login credentials successful.",
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: "Credentials are incorrect...",
          result: {id: -1, token: ''},
          error: error
        };
      });
  }
}

export default UserController;
