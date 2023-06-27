import { useApiContext } from '../../../lib/context/ApiContext';
import { useAuthContext } from '../../../lib/context/AuthContext';
import { useMessageContext } from '../../../lib/context/MessageContext';

import MessageServices from '../../../lib/services/MessageServices';

import { TSingleMessage } from '../../../lib/types/TSchema';

const MessageInteractions = (chat_id: number) => {
  const { messageList, dispatcher } = useMessageContext();
  const { authState } = useAuthContext();
  const current_user = authState.current_user;
  const { useFetch } = useApiContext();

  if (dispatcher === undefined) {
    throw new Error('Message dispatcher is undefined');
  }

  if (current_user === undefined) {
    throw new Error('Current user is undefined');
  }

  if (chat_id === undefined) {
    throw new Error('Chat id is undefined');
  }

  const m = MessageServices(useFetch);

  const dispatchMessages = (messages: TSingleMessage[]) => {
    dispatcher.setMessages(messages);
  };

  const sendMessage = async (message: string) => {
    // console.log('sending message', messageList);
    return m.sendMessage(chat_id, message).then((response) =>
      dispatcher.sendMessage({
        timestamp: Date.now(),
        message: message,
        author: current_user,
      })
    );
  };

  const deleteMessage = async (message_id: number) => {
    return m
      .deleteMessage(chat_id, message_id)
      .then((response) => dispatcher.deleteMessage(message_id));
  };

  const updateMessage = async (obj: TSingleMessage) => {
    return m
      .updateMessage(chat_id, obj.message_id, obj.message)
      .then((response) => dispatcher.updateMessage(obj));
  };

  function getLatestMessageId(messages: TSingleMessage[]): number {
    if (!messages || messages.length === 0) return 0;
    const filteredMessages = messages.filter((message) => message.message_id);
    return filteredMessages[filteredMessages.length - 1].message_id;
  }

  return { dispatchMessages, sendMessage, deleteMessage, updateMessage, messageList };
};

export default MessageInteractions;
