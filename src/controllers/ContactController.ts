import AuthService from '../services/auth.services';
import { User } from '../types/TSchema';
import { AuthHeader } from '../util/helpers/api.helper';
import UrlBuilder, { SearchParams } from '../util/URLBuilder';

// https://github.com/ZJav1310/WhatsThat_TS/issues/1
class ContactController {
  public static async fetchContacts(): Promise<User[]> {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(UrlBuilder.fetchContacts(), requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then((response) => response as User[]);
    // .catch((error) => console.log('Error caught while fetching contact list: ', error));
  }

  public static async addContact(user_id: number): Promise<Response> {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(UrlBuilder.addContact(user_id), requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then((response) => response);
    // .catch((error) => console.log('Error caught while adding contact: ', error));
  }

  public static async deleteContact(user_id: number): Promise<Response> {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(UrlBuilder.deleteContact(user_id), requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then((response) => response);
    // .catch((error) => console.log('Error caught while deleting contact: ', error));
  }

  public static async blockUser(user_id: number) {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(UrlBuilder.blockUser(user_id), requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then((response) => response)
      .catch((error) => console.log('Error caught while blocking user: ', error));
  }

  public static async unblockUser(user_id: number): Promise<Response> {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(UrlBuilder.unblockUser(user_id), requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then((response) => response);
    // .catch((error) => console.log('Error caught while unblocking user: ', error));
  }

  public static async fetchblocked(): Promise<User[]> {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(UrlBuilder.fetchBlocked(), requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then((response) => response as User[]);
    // .catch((error) => console.log('Error caught while fetching blocked list: ', error));
  }

  public static async search(params: SearchParams): Promise<User[]> {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(UrlBuilder.search(params), requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        const userList: { user_id: any; first_name: any; last_name: any; email: any }[] = [];
        response.forEach(
          (user: {
            user_id: any;
            first_name: any;
            given_name: any;
            last_name: any;
            family_name: any;
            email: any;
          }) => {
            userList.push({
              user_id: user.user_id,
              first_name: user.first_name ?? user.given_name,
              last_name: user.last_name ?? user.family_name,
              email: user.email,
            });
          }
        );
        return userList as User[];
      });
    // .catch((error) => console.log('Error caught while fetching contact list: ', error));
  }
}

export default ContactController;
