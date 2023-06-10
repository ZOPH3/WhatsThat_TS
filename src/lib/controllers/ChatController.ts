import { TChat, TCreateChatResponse, TChatSummary } from '../types/TSchema';
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
  const { useApi } = apiProvider;

  if (!apiProvider || !useApi) {
    throw new Error('Unable to find Auth API...');
  }

  const fetchChatList = async (): Promise<TChatSummary | undefined> => {
    const response = await useApi({ url: '/chat', method: 'GET' }, false);
    return response.data as TChatSummary;
  };

  const newConversation = async (name: string): Promise<TCreateChatResponse | undefined> => {
    const response = await useApi({ url: '/chat', method: 'POST', data: name }, true);
    return response.data as TCreateChatResponse;
  };

  const fetchChatDetails = async (chat_id: number): Promise<TChat | undefined> => {
    const response = await useApi({ url: `/chat/${chat_id}`, method: 'GET' }, true);
    return response.data as TChat;
  };

  const updateChatDetails = async (
    chat_id: number,
    name: string
  ): Promise<Response | undefined> => {
    const response = await useApi({ url: `/chat/${chat_id}`, method: 'POST', data: name }, true);
    return response.data as Response;
  };

  const addUserToConversation = async (
    chat_id: number,
    user_id: number
  ): Promise<Response | undefined> => {
    const response = await useApi(
      { url: `/chat/${chat_id}/user/${user_id}`, method: 'POST' },
      true
    );
    return response.data as Response;
  };

  const removeUserFromConversation = async (
    chat_id: number,
    user_id: number
  ): Promise<Response | undefined> => {
    const response = await useApi(
      { url: `/chat/${chat_id}/user/${user_id}`, method: 'DELETE' },
      true
    );
    return response.data as Response;
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

export default ChatController;
