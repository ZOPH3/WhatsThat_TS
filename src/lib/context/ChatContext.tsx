import React, { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import { TChat, TChatSummary } from '../types/TSchema';
import { getCachedData, setCachedData } from '../services/CacheService';

const CACHE_NAME = '/chat';
type TChatInfo = TChat & TChatSummary;

interface IChatContext {
  // chatSummaryList: TChatSummary[];
  chatSummaryList: TChatInfo[];
  dispatcher?: any;
}

const loadCachedData = async () => {
  const data = await getCachedData<(TChat & TChatSummary)[]>(CACHE_NAME);
  return data;
};

// type TChatInfo = {
//   chat_id: number;
//   name: string;
//   creator: TUser;
//   last_message: TSingleMessage;
//   members: TUser[];
//   messages: TSingleMessage[];
// };

const initialState: IChatContext = {
  chatSummaryList: [],
  // chatInfo: [],
};

const ChatContext = createContext(initialState);

const ChatReducer = (state: IChatContext, action: any) => {
  const { type, payload } = action;
  switch (type) {
    // case 'SET_CHAT_INFO':
    //   return {
    //     ...state,
    //     chatInfo: payload,
    //   };
    // case 'ADD_CHAT_INFO':
    //   return {
    //     ...state,
    //     chatInfo: [...[state.chatInfo], payload],
    //   };
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

  // const setChatInfo = useCallback(
  //   (payload: TChat & TChatSummary[]) => {
  //     dispatch({ type: 'SET_CHAT_INFO', payload });
  //   },
  //   [dispatch]
  // );

  // Note: useMemo is used to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      chatSummaryList: state.chatSummaryList,
      // chatInfo: state.chatInfo,
      dispatcher: {
        setChatSummaryList,
        addChatSummary,
        updateChatSummary,
        deleteChatSummary,
        // setChatInfo,
      },
    }),
    [
      addChatSummary,
      deleteChatSummary,
      setChatSummaryList,
      state.chatSummaryList,
      updateChatSummary,
      // setChatInfo,
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
