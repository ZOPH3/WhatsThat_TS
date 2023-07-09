/* eslint-disable camelcase */

import { useApi } from '../../../lib/context/api';
import { useAuth } from '../../../lib/context/auth';
import { useChat } from '../../../lib/context/chats';
import MessageServices from '../../../lib/services/MessageServices';

import { TSingleMessage } from '../../../lib/types/TSchema';

/**
 * @description - This hook will handle all the interactions with the messages
 */
const MessageInteractions = (chat_id: number) => {
  const { authState } = useAuth();
  const { dispatcher } = useChat();
  const { current_user } = authState;
  const { apiCaller } = useApi();

  if (dispatcher === undefined) {
    throw new Error('Message dispatcher is undefined');
  }

  if (current_user === undefined) {
    throw new Error('Current user is undefined');
  }

  if (chat_id === undefined) {
    throw new Error('Chat id is undefined');
  }

  const m = MessageServices(apiCaller);

  const dispatchMessages = (messages: TSingleMessage[]) => {
    dispatcher.setMessages({ chat_id, messages });
  };

  const sendMessage = async (message: string): Promise<Partial<TSingleMessage>> => {
    return m.sendMessage(chat_id, message).then((response) => {
      return {
        timestamp: Date.now(),
        message,
        author: current_user,
      };
    });
  };

  const deleteMessage = async (message_id: number) => {
    return m.deleteMessage(chat_id, message_id).then((response) => message_id);
  };

  const updateMessage = async (message_id: number, message: string) => {
    return m.updateMessage(chat_id, message_id, message).then((response) => response);
  };

  function getLatestMessageId(messages: TSingleMessage[]): number {
    if (!messages || messages.length === 0) return 0;
    const filteredMessages = messages.filter((message) => message.message_id);
    return filteredMessages[filteredMessages.length - 1].message_id;
  }

  return {
    dispatchMessages,
    sendMessage,
    deleteMessage,
    updateMessage,
    // messageList,
  };
};

export default MessageInteractions;
