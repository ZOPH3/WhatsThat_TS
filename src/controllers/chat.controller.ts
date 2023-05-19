import { Chat, ChatSummary, CreateChatResponse } from '../types/api.schema.types';
import { AuthHeader } from '../util/api.helper';
import UrlBuilder from '../util/url.builder';

// https://github.com/ZJav1310/WhatsThat_TS/issues/1
class ChatController {
  static async fetchChatList(): Promise<ChatSummary[]> {
    const myHeaders = await AuthHeader();

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(UrlBuilder.fetchChatList(), requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then((response) => response as ChatSummary[])
      // .catch((error) => console.log('Error caught while fetching chat summary list: ', error));
  }

  static async newConversation(name: string): Promise<CreateChatResponse> {
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
      .then((response) => response as CreateChatResponse)
      // .catch((error) => console.log('Error caught while creating new conversation: ', error));
  }

  static async fetchChatDetails(chat_id: number): Promise<Chat> {
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
      .then((response) => response as Chat)
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

  static async removeUserFromConversation(
    chat_id: number,
    user_id: number
  ): Promise<Response> {
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
