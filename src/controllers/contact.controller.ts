import AuthService from '../services/auth.services';
import { AuthHeader } from '../util/api.helper';
import UrlBuilder from '../util/url.builder';

// https://github.com/ZJav1310/WhatsThat_TS/issues/1
class ContactController {
  public static async fetchContacts(): Promise<Response | void> {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(UrlBuilder.fetchContacts(), requestOptions)
      .then((response) => response.json())
      .then((response) => response)
      .catch((error) => console.log('Error caught while fetching contact list: ', error));
  }
  public static async addContact(user_id: number): Promise<Response | void> {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(UrlBuilder.addContact(user_id), requestOptions)
      .then((response) => response.json())
      .then((response) => response)
      .catch((error) => console.log('Error caught while adding contact: ', error));
  }

  public static async deleteContact(user_id: number): Promise<Response | void> {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(UrlBuilder.deleteContact(user_id), requestOptions)
      .then((response) => response.json())
      .then((response) => response)
      .catch((error) => console.log('Error caught while deleting contact: ', error));
  }

  public static async blockUser(user_id: number) {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(UrlBuilder.blockUser(user_id), requestOptions)
      .then((response) => response.json())
      .then((response) => response)
      .catch((error) => console.log('Error caught while blocking user: ', error));
  }

  public static async unblockUser(user_id: number): Promise<Response | void> {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(UrlBuilder.unblockUser(user_id), requestOptions)
      .then((response) => response.json())
      .then((response) => response)
      .catch((error) => console.log('Error caught while unblocking user: ', error));
  }

  public static async fetchblocked(): Promise<Response | void> {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(UrlBuilder.fetchBlocked(), requestOptions)
      .then((response) => response.json())
      .then((response) => response)
      .catch((error) => console.log('Error caught while fetching blocked list: ', error));
  }
}

export default ContactController;
