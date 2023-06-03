import { TChat, TCreateChatResponse, TChatSummary } from '../types/TSchema';
import log from '../util/LoggerUtil';
import { useApiContext } from '../context/ApiContext';

interface IChatController {
  fetchChatList: () => Promise<TChatSummary | undefined>;
  newConversation: (name: string) => Promise<TCreateChatResponse | undefined>;
  fetchChatDetails: (chat_id: number) => Promise<TChat | undefined>;
  updateChatDetails: (chat_id: number, name: string) => Promise<Response | undefined>;
  addUserToConversation: (chat_id: number, user_id: number) => Promise<Response | undefined>;
  removeUserFromConversation: (chat_id: number, user_id: number) => Promise<Response | undefined>;
}

const ChatController = (): IChatController => {
  const apiProvider = useApiContext();
  const { authApi } = apiProvider;

  if (!apiProvider || !authApi) {
    throw new Error('Unable to find Auth API...');
  }

  const fetchChatList = async (): Promise<TChatSummary | undefined> => {
    try {
      const response = await authApi.get('/chat');
      return response.data as TChatSummary;
    } catch (err) {
      log.error(err);
    }
  };

  const newConversation = async (name: string): Promise<TCreateChatResponse | undefined> => {
    try {
      const response = await authApi.post('/chat', { data: name });
      return response.data as TCreateChatResponse;
    } catch (err) {
      log.error(err);
    }
  };

  const fetchChatDetails = async (chat_id: number): Promise<TChat | undefined> => {
    try {
      const response = await authApi.get(`/chat/${chat_id}`);
      return response.data as TChat;
    } catch (err) {
      log.error(err);
    }
  };

  const updateChatDetails = async (
    chat_id: number,
    name: string
  ): Promise<Response | undefined> => {
    try {
      const response = await authApi.post(`/chat/${chat_id}`, { data: name });
      return response.data as Response;
    } catch (err) {
      log.error(err);
    }
  };

  const addUserToConversation = async (
    chat_id: number,
    user_id: number
  ): Promise<Response | undefined> => {
    try {
      const response = await authApi.post(`/chat/${chat_id}/user/${user_id}`);
      return response.data as Response;
    } catch (err) {
      log.error(err);
    }
  };

  const removeUserFromConversation = async (
    chat_id: number,
    user_id: number
  ): Promise<Response | undefined> => {
    try {
      const response = await authApi.delete(`/chat/${chat_id}/user/${user_id}`);
      return response.data as Response;
    } catch (err) {
      log.error(err);
    }
  };

  return {
    fetchChatDetails,
    newConversation,
    fetchChatList,
    updateChatDetails,
    addUserToConversation,
    removeUserFromConversation,
  };
};

export default ChatController ;
