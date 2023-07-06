import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import { setCachedData } from '../../services/CacheService';
import ServicesReducer from './reducer';
import ServicesContext, { initialState } from './context';
import { loadCachedData } from './utils';
import { TDraftMessage } from './types';

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
  // FIXME: Clear draft messages does not work
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

export default ServiceProvider;
