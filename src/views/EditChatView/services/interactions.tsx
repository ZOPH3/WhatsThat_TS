/* eslint-disable camelcase */

import { useApi } from '../../../lib/context/api';
import { useAuth } from '../../../lib/context/auth';
import ChatServices from '../../../lib/services/ChatServices';

const EditChatInteractions = (chat_id: number) => {
  const { authState } = useAuth();
  const { current_user } = authState;
  const { apiCaller } = useApi();

  if (current_user === undefined) {
    throw new Error('Current user is undefined');
  }

  if (chat_id === undefined) {
    throw new Error('Chat id is undefined');
  }

  const c = ChatServices(apiCaller);

  const inviteUser = (user_id: number) => {
    c.addUserToConversation(chat_id, user_id);
  }

  const sendMessage = async (message: string): Promise<Partial<TSingleMessage>> => {
    return m.sendMessage(chat_id, message).then((response) => {
      return {
        timestamp: Date.now(),
        message,
        author: current_user,
      };
    });
  };

  return {
    sendMessage,
  };
};

export default EditChatInteractions;
