import { AuthHeader } from "../util/api.helper";
import { RegularHeader } from "../util/api.helper";
import UserType from "../util/types/user.type";
import UrlBuilder from "../util/url.builder";

// https://github.com/ZJav1310/WhatsThat_TS/issues/1
class UserController {
  // FIXME: Some of the JSON things dont work and need ot be removed
  public static async login(email: string, password: string): Promise<Response | void> {
    const myHeaders = RegularHeader();

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ email, password }),
      redirect: "follow",
    };

    return fetch(UrlBuilder.login(), requestOptions)
      .then((response) => response.json())
      .then((response) => response)
      .catch((error) => console.log("Error caught while logging in user: ", error));
  }
  public static async logout(): Promise<Response | void> {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(UrlBuilder.logout(), requestOptions)
      .then((response) => response.json())
      .then((response) => response)
      .catch((error) => console.log("Error caught while logging out user: ", error));
  }
  public static async register(
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ): Promise<Response | void> {
    const myHeaders = RegularHeader();

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
      .then((response) => response)
      .catch((error) => console.log("Error caught while registering user: ", error));
  }
  public static async getUserInfo(user_id: number) {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(UrlBuilder.fetchUserInformation(user_id), requestOptions)
      .then((response) => response.json())
      .then((response) => response)
      .catch((error) => console.log("Error caught while fetching user information: ", error));
  }
  public static async updateUserInfo(user_id: number, payload: Partial<UserType>): Promise<Response | void> {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: "follow",
    };

    return fetch(UrlBuilder.fetchUserInformation(user_id), requestOptions)
      .then((response) => response.json())
      .then((response) => response)
      .catch((error) => console.log("Error caught while updating user information: ", error));
  }
  // TODO: Below API things
  // public static async getUserPhoto() {}
  // public static async uploadUserPhoto() {}
  // public static async searchForUser() {}
}

export default UserController;
