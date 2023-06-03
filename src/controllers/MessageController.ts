import { useApiContext } from '../context/ApiContext';
import { TSingleMessage } from '../types/TSchema';
import log from '../util/LoggerUtil';

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
  const { authApi } = apiProvider;

  if (!apiProvider || !authApi) {
    throw new Error('Unable to find Auth API...');
  }

  const getMessages = async (chat_id: number): Promise<TSingleMessage[] | undefined> => {
    try {
      const response = await authApi.get(`/chat/${chat_id}`);
      return response.data.messages as TSingleMessage[];
    } catch (err) {
      log.error(err);
    }
  };

  /**
   * Current logged in user sends a message in a chat.
   * @param chat_id
   * @param message
   * @returns
   */
  const sendMessage = async (chat_id: number, message: string): Promise<Response | undefined> => {
    try {
      const response = await authApi.post(`/chat/${chat_id}/message`, { data: message });
      return response.data;
    } catch (err) {
      log.error(err);
    }
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
    try {
      const response = await authApi.delete(`/chat/${chat_id}/message/${message_id}`);
      return response.data;
    } catch (err) {
      log.error(err);
    }
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
    try {
      const response = await authApi.put(`/chat/${chat_id}/message/${message_id}`, {
        data: message,
      });
      return response.data;
    } catch (err) {
      log.error(err);
    }
  };

  return { getMessages, sendMessage, deleteMessage, updateMessage };
};

export default MessageController;
