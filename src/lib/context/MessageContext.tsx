import React, { createContext, useContext, useReducer } from 'react';
import { TChat, TSingleMessage } from '../types/TSchema';

interface IMessageContext {
  state?: TSingleMessage[];
  dispatcher?: any;
}

const MessageContext = createContext<IMessageContext>({});

const messageReducer = (state: any, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_MESSAGES':
      // return { ...state, payload };
      console.log('SET_MESSAGES', payload);
      return state;
    case 'DELETE_MESSAGE':
      return state.filter((item: any) => item.id !== payload);
    case 'SEND_MESSAGE':
      return { ...state, payload };
    case 'UPDATE_MESSAGE':
      return state.map((message: any) => {
        if (message.id === payload.id) {
          return {
            ...message,
            ...payload,
          };
        }
        return message;
      });
    default:
      throw new Error(`No case for type ${type} found in MessageReducer.`);
  }
};

const MessageProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(messageReducer, {});

  const deleteMessage = (payload: any) => {
    dispatch({ type: 'DELETE_MESSAGE', payload });
  };

  const sendMessage = (payload: any) => {
    dispatch({ type: 'SEND_MESSAGE', payload });
  };

  const updateMessage = (payload: any) => {
    dispatch({ type: 'UPDATE_MESSAGE', payload });
  };

  const print = () => {
    console.log('state', state);
  };

  return (
    <MessageContext.Provider
      value={{ state, dispatcher: { print, deleteMessage, sendMessage, updateMessage } }}
    >
      {children}
    </MessageContext.Provider>
  );
};

const useMessageContext = () => {
  // get the context
  const context = useContext(MessageContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error('useMessageContext was used outside of its Provider');
  }

  return context;
};

export { useMessageContext, MessageProvider };
