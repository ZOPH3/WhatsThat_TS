import React, { createContext, useReducer } from 'react';
import { TChatSummary } from '../types/TSchema';

interface IChatContext {
  chatSummaryList: TChatSummary[];
  dispatcher?: any;
}

const initialState: IChatContext = {
  chatSummaryList: [],
};

const ChatContext = createContext(initialState);

const ChatReducer = (state: IChatContext, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_CHAT_SUMMARY_LIST':
      return {
        ...state,
        chatSummaryList: payload,
      };
    case 'ADD_CHAT_SUMMARY':
      console.log('ADD_CHAT_SUMMARY: ', payload);
      return {
        ...state,
        chatSummaryList: [...state.chatSummaryList, payload],
      };
    case 'UPDATE_CHAT_SUMMARY':
      return {
        ...state,
        chatSummaryList: state.chatSummaryList.map((chatSummary) =>
          chatSummary.chat_id === payload.chat_id ? payload : chatSummary
        ),
      };
    case 'DELETE_CHAT_SUMMARY':
      return {
        ...state,
        chatSummaryList: state.chatSummaryList.filter(
          (chatSummary) => chatSummary.chat_id !== payload
        ),
      };
    default:
      throw new Error(`No case for type ${type} found in ChatReducer.`);
  }
};

const ChatProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(ChatReducer, initialState);

  const setChatSummaryList = (payload: TChatSummary[]) => {
    dispatch({ type: 'SET_CHAT_SUMMARY_LIST', payload });
  };
  const addChatSummary = (payload: Partial<TChatSummary>) => {
    dispatch({ type: 'ADD_CHAT_SUMMARY', payload });
  };
  const updateChatSummary = (payload: TChatSummary) => {
    dispatch({ type: 'UPDATE_CHAT_SUMMARY', payload });
  };
  const deleteChatSummary = (payload: number) => {
    dispatch({ type: 'DELETE_CHAT_SUMMARY', payload });
  };

  const value = {
    chatSummaryList: state.chatSummaryList,
    dispatcher: {
      setChatSummaryList,
      addChatSummary,
      updateChatSummary,
      deleteChatSummary,
    },
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
};

const useChatContext = () => {
  const context = React.useContext(ChatContext);

  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }

  return context;
};

export { ChatProvider, useChatContext };
