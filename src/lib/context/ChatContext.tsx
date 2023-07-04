import React, { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import { TChat, TChatSummary, TSingleMessage } from '../types/TSchema';
import { getCachedData, setCachedData } from '../services/CacheService';

const CACHE_NAME = '/chat';
export type TChatInfo = TChat & TChatSummary;

interface IChatContext {
  chatSummaryList: TChatInfo[];
  dispatcher?: any;
}

const loadCachedData = async () => {
  const data = await getCachedData<(TChat & TChatSummary)[]>(CACHE_NAME);
  return data;
};

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
        chatSummaryList: [...state.chatSummaryList, ...payload],
      };
    case 'ADD_CHAT_SUMMARY':
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
    case 'SET_MESSAGES':
      return {
        ...state,
        chatSummaryList: state.chatSummaryList.map((chatSummary) =>
          chatSummary.chat_id === payload.chat_id
            ? { ...chatSummary, messages: payload.messages }
            : chatSummary
        ),
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        chatSummaryList: state.chatSummaryList.map((chatSummary) =>
          chatSummary.chat_id === payload.chat_id
            ? {
                ...chatSummary,
                messages: [...chatSummary.messages, payload.message as TSingleMessage],
              }
            : chatSummary
        ),
      };
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        chatSummaryList: state.chatSummaryList.map((chatSummary) =>
          chatSummary.chat_id === payload.chat_id
            ? {
                ...chatSummary,
                messages: chatSummary.messages.map((message) =>
                  message.message_id === payload.message_id ? payload : message
                ),
              }
            : chatSummary
        ),
      };
    case 'DELETE_MESSAGE':
      return {
        ...state,
        chatSummaryList: state.chatSummaryList.map((chatSummary) =>
          chatSummary.chat_id === payload.chat_id
            ? {
                ...chatSummary,
                messages: chatSummary.messages.filter(
                  (message) => message.message_id !== payload.message_id
                ),
              }
            : chatSummary
        ),
      };
    default:
      throw new Error(`No case for type ${type} found in ChatReducer.`);
  }
};

function ChatProvider({ children }: any) {
  const [state, dispatch] = useReducer(ChatReducer, initialState);

  useEffect(() => {
    const getCache = async () => {
      const data = await loadCachedData();
      if (!data) return;
      dispatch({ type: 'SET_CHAT_SUMMARY_LIST', payload: data });
    };
    getCache();
  }, []);

  useEffect(() => {
    if (!state.chatSummaryList.length) return;
    const setCache = async () => {
      await setCachedData(CACHE_NAME, state.chatSummaryList);
    };
    setCache();
  }, [state.chatSummaryList]);

  const setChatSummaryList = useCallback(
    (payload: TChatSummary[]) => {
      dispatch({ type: 'SET_CHAT_SUMMARY_LIST', payload });
    },
    [dispatch]
  );
  const addChatSummary = useCallback(
    (payload: Partial<TChatSummary>) => {
      dispatch({ type: 'ADD_CHAT_SUMMARY', payload });
    },
    [dispatch]
  );

  const updateChatSummary = useCallback(
    (payload: TChatSummary) => {
      dispatch({ type: 'UPDATE_CHAT_SUMMARY', payload });
    },
    [dispatch]
  );

  const deleteChatSummary = useCallback(
    (payload: number) => {
      dispatch({ type: 'DELETE_CHAT_SUMMARY', payload });
    },
    [dispatch]
  );

  const addMessage = useCallback(
    (payload: Partial<TChatInfo>) => {
      dispatch({ type: 'ADD_MESSAGE', payload });
    },
    [dispatch]
  );

  const updateMessage = useCallback(
    (payload: Partial<TChatInfo>) => {
      dispatch({ type: 'UPDATE_MESSAGE', payload });
    },
    [dispatch]
  );

  const deleteMessage = useCallback(
    (payload: Partial<TChatInfo>) => {
      dispatch({ type: 'DELETE_MESSAGE', payload });
    },
    [dispatch]
  );

  const setMessages = useCallback(
    (payload: Partial<TChatInfo>) => {
      dispatch({ type: 'SET_MESSAGES', payload });
    },
    [dispatch]
  );

  const getChatSummaryList = useCallback(() => {
    return state.chatSummaryList;
  }, [state.chatSummaryList]);

  // Note: useMemo is used to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      chatSummaryList: state.chatSummaryList,
      dispatcher: {
        setChatSummaryList,
        addChatSummary,
        updateChatSummary,
        deleteChatSummary,
        addMessage,
        updateMessage,
        deleteMessage,
        setMessages,
        getChatSummaryList,
      },
    }),
    [
      addChatSummary,
      deleteChatSummary,
      setChatSummaryList,
      state.chatSummaryList,
      updateChatSummary,
      addMessage,
      updateMessage,
      deleteMessage,
      setMessages,
      getChatSummaryList,
    ]
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
