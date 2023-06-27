import { TChatSummary, TCreateChatResponse, TChat } from "../types/TSchema";

interface IChatServices {
  fetchChatList: () => Promise<TChatSummary | undefined>;
  newConversation: (name: string) => Promise<TCreateChatResponse | undefined>;
  fetchChatDetails: (chat_id: number) => Promise<TChat | undefined>;
  updateChatDetails: (chat_id: number, name: string) => Promise<Response | undefined>;
  addUserToConversation: (chat_id: number, user_id: number) => Promise<Response | undefined>;
  removeUserFromConversation: (chat_id: number, user_id: number) => Promise<Response | undefined>;
}

const ChatServices = (useFetch: any): IChatServices => {
    
  const fetchChatList = async (): Promise<TChatSummary | undefined> => {
    const response = await useFetch({ url: '/chat', method: 'GET' }, false);
    return response.data as TChatSummary;
  };

  const newConversation = async (name: string): Promise<TCreateChatResponse | undefined> => {
    const response = await useFetch({ url: '/chat', method: 'POST', data: name }, true);
    return response.data as TCreateChatResponse;
  };

  const fetchChatDetails = async (chat_id: number): Promise<TChat | undefined> => {
    const response = await useFetch({ url: `/chat/${chat_id}`, method: 'GET' }, true);
    return response.data as TChat;
  };

  const updateChatDetails = async (
    chat_id: number,
    name: string
  ): Promise<Response | undefined> => {
    const response = await useFetch({ url: `/chat/${chat_id}`, method: 'POST', data: name }, true);
    return response.data;
  };

  const addUserToConversation = async (
    chat_id: number,
    user_id: number
  ): Promise<Response | undefined> => {
    const response = await useFetch(
      { url: `/chat/${chat_id}/user/${user_id}`, method: 'POST' },
      true
    );
    return response.data;
  };

  const removeUserFromConversation = async (
    chat_id: number,
    user_id: number
  ): Promise<Response | undefined> => {
    const response = await useFetch(
      { url: `/chat/${chat_id}/user/${user_id}`, method: 'DELETE' },
      true
    );
    return response.data;
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

export default ChatServices;