import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TChat, TChatSummary, TCreateChatResponse } from '../types/TSchema';
import { AuthHeader, AuthHeaderTest } from '../util/helpers/api.helper';
import UrlBuilder from '../util/URLBuilder';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiContext } from '../context/ApiContext';
import log from '../util/LoggerUtil';

// https://github.com/ZJav1310/WhatsThat_TS/issues/1
class ChatController {
  static fetchChatList(apiProvider: AxiosInstance | undefined) {
    let error = undefined;

    try {
      if (!apiProvider) {
        throw new Error('Unable to find Auth API');
      }

      const response = apiProvider
        .get('/chat', {
          signal: AbortSignal.timeout(5000)
        })
        .then(
          (res) => res,
          (err) => {
            error = err;
            log.error(err.response);
          }
        );


      if (error) {
        throw new Error('Failed to fetch chat list');
      }

      if (response == undefined) {
        throw new Error('No data found');
      }

      log.debug('Fetch Response: ', response);
      return response;
    } catch (err) {
      log.error(err);
    }
  }

  static async newConversation(name: string): Promise<TCreateChatResponse> {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ name: name }),
      redirect: 'follow',
    };

    return fetch(UrlBuilder.startNewConversation(), requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then((response) => response as TCreateChatResponse);
    // .catch((error) => console.log('Error caught while creating new conversation: ', error));
  }

  static async fetchChatDetails(chat_id: number): Promise<TChat> {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(UrlBuilder.fetchChatDetails(chat_id), requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then((response) => response as TChat);
    // .catch((error) => console.log('Error caught while fetching chat details: ', error));
  }

  static async updateChatDetails(chat_id: number, name: string): Promise<Response> {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify({ name: name }),
      redirect: 'follow',
    };

    return fetch(UrlBuilder.updateChatDetails(chat_id), requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then((response) => response)
      .catch((error) => console.log('Error caught while updating chat details: ', error));
  }

  static async addUserToConversation(chat_id: number, user_id: number): Promise<Response> {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(UrlBuilder.addUserToConversation(chat_id, user_id), requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then((response) => response)
      .catch((error) => console.log('Error caught while adding user to conversation: ', error));
  }

  static async removeUserFromConversation(chat_id: number, user_id: number): Promise<Response> {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(UrlBuilder.removeUserFromConversation(chat_id, user_id), requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then((response) => response)
      .catch((error) => console.log('Error caught while removing user from conversation: ', error));
  }
}

export default ChatController;
