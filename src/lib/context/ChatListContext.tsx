import React, { createContext, useContext, useReducer } from 'react';
import { TChatSummary } from '../types/TSchema';

interface IChatListContext {
  state?: TChatSummary;
  dispatcher?: any;
}

const ChatListContext = createContext<IChatListContext>({});
const chatListReducer = (state: any, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_CHAT_ROOMS':
      return {
        ...state,
        chatList: payload as TChatSummary[],
      };
    case 'DELETE_CHAT_ROOM':
      console.log('DELETE_CHAT_ROOM', payload);
      return state;
    case 'ADD_USER_TO_CHAT':
      console.log('ADD_USER', payload);
      return state;
    case 'REMOVE_USER_FROM_CHAT':
      console.log('REMOVE_USER', payload);
      return state;
    default:
      throw new Error(`No case for type ${type} found in MessageReducer.`);
  }
};

const ChatListProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(chatListReducer, {}); // TODO: Add initial state

  const setChatRooms = (payload: any) => {
    dispatch({ type: 'SET_CHAT_ROOMS', payload });
  };

  const deleteChatRoom = (payload: any) => {
    dispatch({ type: 'DELETE_CHAT_ROOM', payload });
  };

  const addUserToChat = (payload: any) => {
    dispatch({ type: 'ADD_USER_TO_CHAT', payload });
  };

  const removeUserToChat = (payload: any) => {
    dispatch({ type: 'REMOVE_USER_FROM_CHAT', payload });
  };

  // const editChatRoom = (payload: any) => {
  //   dispatch({ type: 'EDIT_CHAT_ROOM', payload });
  // };

  const print = () => {
    console.log('state', state);
  };

  return (
    <ChatListContext.Provider
      value={{
        state,
        dispatcher: { print, setChatRooms, deleteChatRoom, addUserToChat, removeUserToChat },
      }}
    >
      {children}
    </ChatListContext.Provider>
  );
};

const useChatListContext = () => {
  // get the context
  const context = useContext(ChatListContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error('useChatListContext was used outside of its Provider');
  }

  return context;
};

export { ChatListProvider, useChatListContext };
