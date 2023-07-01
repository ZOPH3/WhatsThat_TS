/**
 * Extra services
 */
import React, { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import { TSingleMessage } from '../types/TSchema';
import { getCachedData, setCachedData } from '../services/CacheService';

export type TDraftMessage = {
  draft_id: number;
  chat_id: number;
  message: Partial<TSingleMessage>;
  created_at: number;
  scheduled: number;
  sent: boolean;
};

const loadCachedData = async () => {
  const data = await getCachedData<TDraftMessage[]>('/drafts');
  return data;
};

const initialState: any = {
  draftMessageList: [] as TDraftMessage[],
};

const ServicesContext = createContext(initialState);

const ServicesReducer = (state: any, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_DRAFT_MESSAGE_LIST':
      return {
        ...state,
        draftMessageList: payload,
      };
    case 'ADD_DRAFT_MESSAGE':
      return {
        ...state,
        draftMessageList: [
          ...state.draftMessageList,
          { draft_id: state.draftMessageList.length + 1, ...payload },
        ],
      };
    case 'UPDATE_DRAFT_MESSAGE':
      return {
        ...state,
        draftMessageList: state.draftMessageList.map((message: TDraftMessage) =>
          message.draft_id === payload.draft_id ? payload : message
        ),
      };
    case 'DELETE_DRAFT_MESSAGE':
      return {
        ...state,
        draftMessageList: state.draftMessageList.filter(
          (message: TDraftMessage) => message.draft_id !== payload
        ),
      };
    case 'CLEAR_DRAFT_MESSAGE_LIST':
      return {
        ...state,
        draftMessageList: [] as TDraftMessage[],
      };
    default:
      throw new Error(`No case for type ${type} found in ServicesReducer.`);
  }
};

function ServiceProvider({ children }: any) {
  const [state, dispatch] = useReducer(ServicesReducer, initialState);

  useEffect(() => {
    const getCache = async () => {
      const data = await loadCachedData();
      if (!data) return;
      dispatch({ type: 'SET_DRAFT_MESSAGE_LIST', payload: data });
    };
    getCache();
  }, []);

  useEffect(() => {
    // console.log('state.draftMessageList', state.draftMessageList);
    const setCache = async () => setCachedData<TDraftMessage[]>('/drafts', state.draftMessageList);
    setCache();
  }, [state.draftMessageList]);

  const setDraftMessageList = useCallback(
    (payload: TDraftMessage[]) => {
      dispatch({ type: 'SET_DRAFT_MESSAGE_LIST', payload });
    },
    [dispatch]
  );
  const addDraftMessage = useCallback(
    (payload: Partial<TDraftMessage>) => {
      dispatch({ type: 'ADD_DRAFT_MESSAGE', payload });
    },
    [dispatch]
  );
  const updateDraftMessage = useCallback(
    (payload: Partial<TDraftMessage>) => {
      dispatch({ type: 'UPDATE_DRAFT_MESSAGE', payload });
    },
    [dispatch]
  );
  const deleteDraftMessage = useCallback(
    (payload: number) => {
      dispatch({ type: 'DELETE_DRAFT_MESSAGE', payload });
    },
    [dispatch]
  );
  const clearDraftMessageList = useCallback(() => {
    dispatch({ type: 'CLEAR_DRAFT_MESSAGE_LIST' });
  }, [dispatch]);

  const value = useMemo(
    () => ({
      draftMessageList: state.draftMessageList,
      dispatcher: {
        setDraftMessageList,
        addDraftMessage,
        updateDraftMessage,
        deleteDraftMessage,
        clearDraftMessageList,
      },
    }),
    [
      state.draftMessageList,
      setDraftMessageList,
      addDraftMessage,
      updateDraftMessage,
      deleteDraftMessage,
      clearDraftMessageList,
    ]
  );

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>
  );
}

const useServiceContext = () => {
  const context = React.useContext(ServicesContext);
  if (context === undefined) {
    throw new Error('useServiceContext must be used within a ServiceProvider');
  }
  return context;
};

export { ServiceProvider, useServiceContext };
