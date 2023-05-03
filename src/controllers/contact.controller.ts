import AuthService from "../services/auth.services";
import UrlBuilder from "../util/url.builder";

// https://github.com/ZJav1310/WhatsThat_TS/issues/1
class ContactController {
  public static async fetchContacts() {
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

    return fetch(UrlBuilder.fetchContacts(), requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          status: true,
          message: `Successfully fetched contact list.`,
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: `Unable to fetch contact list...`,
          result: "",
          error: error,
        };
      });
  }
  public static async addContact(user_id: number) {
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

    return fetch(UrlBuilder.addContact(user_id), requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          status: true,
          message: `Successfully added user ${user_id}.`,
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: `Unable to add user ${user_id} to contact list...`,
          result: "",
          error: error,
        };
      });
  }

  public static async deleteContact(user_id: number) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const value = await AuthService.getToken();

    if (value != null) {
      myHeaders.append("X-Authorization", value.result);
    }

    const requestOptions: RequestInit = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(UrlBuilder.deleteContact(user_id), requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          status: true,
          message: `Successfully deleted user ${user_id}.`,
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: `Unable to delete user ${user_id} to contact list...`,
          result: "",
          error: error,
        };
      });
  }

  public static async blockUser(user_id: number) {
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

    return fetch(UrlBuilder.blockUser(user_id), requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          status: true,
          message: `Successfully blocked user ${user_id}.`,
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: `Unable to block user ${user_id} to contact list...`,
          result: "",
          error: error,
        };
      });
  }

  public static async unblockUser(user_id: number) {
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

    return fetch(UrlBuilder.unblockUser(user_id), requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          status: true,
          message: `Successfully unblocked user ${user_id}.`,
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: `Unable to unblock user ${user_id} to contact list...`,
          result: "",
          error: error,
        };
      });
  }

  public static async fetchblocked() {
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

    return fetch(UrlBuilder.fetchBlocked(), requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          status: true,
          message: `Successfully fetched blocked list.`,
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: `Unable to fetch blocked list...`,
          result: "",
          error: error,
        };
      });
  }
}

export default ContactController;
