import React, { useCallback, useEffect, useMemo, useReducer } from 'react';

import { getCachedData, setCachedData } from '../../services/CacheService';

import ChatReducer from './reducer';
import ChatContext, { initialState } from './context';

import { TChatInfo } from './types';
import { TChatSummary } from '../../types/TSchema';

const CACHE_NAME = '/chat';

const loadCachedData = async () => {
  const data = await getCachedData<TChatInfo[]>(CACHE_NAME);
  return data;
};

/**
 * @description ChatProvider is a component that wraps the entire application and provides the chat context.
 */
function ChatProvider({ children }: any) {
  const [state, dispatch] = useReducer(ChatReducer, initialState);

  /**
   * @description Load cached data on mount
   */
  useEffect(() => {
    const getCache = async () => {
      const data = await loadCachedData();
      if (!data) return;
      dispatch({ type: 'SET_CHAT_SUMMARY_LIST', payload: data });
    };
    getCache();
  }, []);

  /**
   * @description Set cached data on chatSummaryList change
   */
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

  /**
   * @deprecated Use MessageProvider instead,
   *  using chat context for messages is causes performance issues.
   */
  const addMessage = useCallback(
    (payload: Partial<TChatInfo>) => {
      dispatch({ type: 'ADD_MESSAGE', payload });
    },
    [dispatch]
  );

  /**
   * @deprecated Use MessageProvider instead
   */
  const updateMessage = useCallback(
    (payload: Partial<TChatInfo>) => {
      dispatch({ type: 'UPDATE_MESSAGE', payload });
    },
    [dispatch]
  );

  /**
   * @deprecated Use MessageProvider instead
   */
  const deleteMessage = useCallback(
    (payload: Partial<TChatInfo>) => {
      dispatch({ type: 'DELETE_MESSAGE', payload });
    },
    [dispatch]
  );

  /**
   * @deprecated Use MessageProvider instead
   */
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
      dispatch,
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

export default ChatProvider;
