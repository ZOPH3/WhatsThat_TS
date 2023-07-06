/* eslint-disable camelcase */

import { useApi } from '../../../lib/context/api';
import { useAuth } from '../../../lib/context/auth';
import { useMessages } from '../../../lib/context/messages';
import useFetchHook from '../../../lib/hooks/useFetchHook';
import MessageServices from '../../../lib/services/MessageServices';

import { TSingleMessage } from '../../../lib/types/TSchema';

const MessageInteractions = (chat_id: number) => {
  const { authState } = useAuth();
  const { messageList, dispatcher } = useMessages();
  const { current_user } = authState;
  const { apiCaller } = useApi();

  const { isLoading, onFetch, onError, getFresh } = useFetchHook(
    { url: `/chat/${chat_id}`, method: 'GET' },
    true
  );

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
    dispatcher.setMessages(messages);
  };

  const fetchMessages = async () => {
    onFetch(async () => getFresh()).then((data) => {
      if (!data) return;
      dispatchMessages(data.messages);
    });
  };

  const sendMessage = async (message: string) => {
    return m.sendMessage(chat_id, message).then((response) => {
      if (!response) return;
      dispatcher.sendMessage({
        timestamp: Date.now(),
        message,
        author: current_user,
      });
    });
  };

  const deleteMessage = async (message_id: number) => {
    return m
      .deleteMessage(chat_id, message_id)
      .then((response) => dispatcher.deleteMessage(message_id));
  };

  const updateMessage = async (message_id: number, message: string) => {
    return m
      .updateMessage(chat_id, message_id, message)
      .then((response) => dispatcher.updateMessage({ message, message_id }));
  };

  return {
    isLoading,
    onError,
    fetchMessages,
    dispatchMessages,
    sendMessage,
    deleteMessage,
    updateMessage,
    messageList,
  };
};

export default MessageInteractions;
