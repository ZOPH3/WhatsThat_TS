import AuthService from "../services/auth.services";
import UserType from "../util/types/user.type";
import UrlBuilder from "../util/url.builder";

// https://github.com/ZJav1310/WhatsThat_TS/issues/1
class UserController {
  // FIXME: Some of the JSON things dont work and need ot be removed
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
        console.log("ERROR FROM USER CONTROLLER FETCH", error);
        return {
          status: false,
          message: "Credentials are incorrect...",
          result: { id: -1, token: "" },
          error: error,
        };
      });
  }
  public static async logout() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const value = await AuthService.getToken();

    if (value != null) {
      myHeaders.append("X-Authorization", value.result);
    }

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(UrlBuilder.logout(), requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          status: true,
          message: "User successfully logged out.",
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: "Unable to proceed with logout request...",
          result: "",
          error: error,
        };
      });
  }
  public static async register(
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        first_name: first_name,
        llast_name: last_name,
        email: email,
        password: password,
      }),
      redirect: "follow",
    };

    return fetch(UrlBuilder.createNewUser(), requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          status: true,
          message: "User created successfully.",
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: "Unable to create user.",
          result: "",
          error: error,
        };
      });
  }
  public static async getUserInfo(user_id: number) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const value = await AuthService.getToken();

    if (value != null) {
      myHeaders.append("X-Authorization", value.result);
    }

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(UrlBuilder.fetchUserInformation(user_id), requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          status: true,
          message: `Successfully fetched user ${user_id} information.`,
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: `Unable to fetch user ${user_id} information...`,
          result: "",
          error: error,
        };
      });
  }
  public static async updateUserInfo(user_id: number, payload: Partial<UserType>) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const value = await AuthService.getToken();

    if (value != null) {
      myHeaders.append("X-Authorization", value.result);
    }

    const requestOptions: RequestInit = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: "follow",
    };

    return fetch(UrlBuilder.fetchUserInformation(user_id), requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          status: true,
          message: `Successfully updated user ${user_id} information.`,
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: `Unable to update user ${user_id} information...`,
          result: "",
          error: error,
        };
      });
  }
  // TODO: Below API things
  // public static async getUserPhoto() {}
  // public static async uploadUserPhoto() {}
  // public static async searchForUser() {}
}

export default UserController;
