import { useApiContext } from '../context/ApiContext';
import { TSingleMessage } from '../types/TSchema';

// https://github.com/ZJav1310/WhatsThat_TS/issues/1
interface IMessageController {
  getMessages: (chat_id: number) => Promise<TSingleMessage[] | undefined>;
  sendMessage: (chat_id: number, message: string) => Promise<Response | undefined>;
  deleteMessage: (chat_id: number, message_id: number) => Promise<Response | undefined>;
  updateMessage: (
    chat_id: number,
    message_id: number,
    message: string
  ) => Promise<Response | undefined>;
}
const MessageController = (): IMessageController => {
  const apiProvider = useApiContext();
  const { useApi } = apiProvider;

  if (!apiProvider || !useApi) {
    throw new Error('Unable to find Auth API...');
  }

  const getMessages = async (chat_id: number): Promise<TSingleMessage[] | undefined> => {
    const response = await useApi({ url: `/chat/${chat_id}`, method: 'GET' }, true);
    return response.data.messages as TSingleMessage[];
  };

  /**
   * Current logged in user sends a message in a chat.
   * @param chat_id
   * @param message
   * @returns
   */
  const sendMessage = async (chat_id: number, message: string): Promise<Response | undefined> => {
    const response = await useApi(
      { url: `/chat/${chat_id}/message`, method: 'POST', data: { message: message } },
      true
    );
    return response.data;
  };

  /**
   * Delete message in chat
   * @param chat_id
   * @param message_id
   * @returns
   */
  const deleteMessage = async (
    chat_id: number,
    message_id: number
  ): Promise<Response | undefined> => {
    const response = await useApi(
      { url: `/chat/${chat_id}/message/${message_id}`, method: 'DELETE' },
      true
    );
    return response.data;
  };

  /**
   * Update message in chat
   * @param chat_id
   * @param message_id
   * @param message
   * @returns
   */
  const updateMessage = async (
    chat_id: number,
    message_id: number,
    message: string
  ): Promise<Response | undefined> => {
    const response = await useApi(
      { url: `/chat/${chat_id}/message/${message_id}`, method: 'PUT', data: { message: message } },
      true
    );
    return response.data;
  };

  return { getMessages, sendMessage, deleteMessage, updateMessage };
};

export default MessageController;
