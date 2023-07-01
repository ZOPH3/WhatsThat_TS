import React, { createContext, useCallback, useMemo, useReducer } from 'react';
import { TChat, TChatSummary } from '../types/TSchema';
import log from '../util/LoggerUtil';

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
      return {
        ...state,
        chatSummaryList: [...state.chatSummaryList, payload],
      };
    case 'UPDATE_CHAT_SUMMARY':
      return {
        ...state,
        chatSummaryList: state.chatSummaryList.map(chatSummary =>
          chatSummary.chat_id === payload.chat_id ? payload : chatSummary,
        ),
      };
    case 'DELETE_CHAT_SUMMARY':
      return {
        ...state,
        chatSummaryList: state.chatSummaryList.filter(
          chatSummary => chatSummary.chat_id !== payload,
        ),
      };
    default:
      throw new Error(`No case for type ${type} found in ChatReducer.`);
  }
};

function ChatProvider({ children }: any) {
  const [state, dispatch] = useReducer(ChatReducer, initialState);

  const setChatSummaryList = useCallback(
    (payload: TChatSummary[]) => {
      dispatch({ type: 'SET_CHAT_SUMMARY_LIST', payload });
    },
    [dispatch],
  );
  const addChatSummary = useCallback(
    (payload: Partial<TChatSummary>) => {
      dispatch({ type: 'ADD_CHAT_SUMMARY', payload });
    },
    [dispatch],
  );

  const updateChatSummary = useCallback(
    (payload: TChatSummary) => {
      dispatch({ type: 'UPDATE_CHAT_SUMMARY', payload });
    },
    [dispatch],
  );

  const deleteChatSummary = useCallback(
    (payload: number) => {
      dispatch({ type: 'DELETE_CHAT_SUMMARY', payload });
    },
    [dispatch],
  );

  // Note: useMemo is used to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      chatSummaryList: state.chatSummaryList,
      dispatcher: {
        setChatSummaryList,
        addChatSummary,
        updateChatSummary,
        deleteChatSummary,
      },
    }),
    [
      addChatSummary,
      deleteChatSummary,
      setChatSummaryList,
      state.chatSummaryList,
      updateChatSummary,
    ],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

const useChatContext = () => {
  const context = React.useContext(ChatContext);

  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }

  return context;
};

export { ChatProvider, useChatContext };
