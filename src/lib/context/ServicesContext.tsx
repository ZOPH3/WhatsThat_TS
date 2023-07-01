/**
 * Extra services
 */
import React, { createContext, useCallback, useMemo, useReducer } from 'react';
import { TSingleMessage } from '../types/TSchema';

const initialState: any = {
  draftMessageList: [],
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
        draftMessageList: [...state.draftMessageList, payload],
      };
    case 'UPDATE_DRAFT_MESSAGE':
      return {
        ...state,
        draftMessageList: state.draftMessageList.map((message: TSingleMessage) =>
          message.message_id === payload.message_id ? payload : message
        ),
      };
    case 'DELETE_DRAFT_MESSAGE':
      return {
        ...state,
        draftMessageList: state.draftMessageList.filter(
          (message: TSingleMessage) => message.message_id !== payload
        ),
      };
    default:
      throw new Error(`No case for type ${type} found in ServicesReducer.`);
  }
};

function ServiceProvider({ children }: any) {
  const [state, dispatch] = useReducer(ServicesReducer, initialState);

  const setDraftMessageList = useCallback(
    (payload: TSingleMessage[]) => {
      dispatch({ type: 'SET_DRAFT_MESSAGE_LIST', payload });
    },
    [dispatch]
  );
  const addDraftMessage = useCallback(
    (payload: Partial<TSingleMessage>) => {
      dispatch({ type: 'ADD_DRAFT_MESSAGE', payload });
    },
    [dispatch]
  );
  const updateDraftMessage = useCallback(
    (payload: Partial<TSingleMessage>) => {
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

  const services = useMemo(
    () => ({
      setDraftMessageList,
      addDraftMessage,
      updateDraftMessage,
      deleteDraftMessage,
    }),
    [setDraftMessageList, addDraftMessage, updateDraftMessage, deleteDraftMessage]
  );

  return (
    <ServicesContext.Provider value={{ ...state, ...services }}>
      {children}
    </ServicesContext.Provider>
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
