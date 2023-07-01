/* eslint-disable camelcase */
import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { TChat, TSingleMessage } from '../types/TSchema';

interface IMessageDispatcher {
  print: () => void;
  setMessages: (payload: Partial<TSingleMessage>[]) => void;
  deleteMessage: (payload: number) => void;
  sendMessage: (payload: Partial<TSingleMessage>) => void;
  updateMessage: (payload: Partial<TSingleMessage>) => void;
}

interface IMessageContext {
  messageList: Partial<TSingleMessage>[];
  chat_id?: number;
  chat_details?: TChat;
  dispatcher?: IMessageDispatcher;
}

const doNothing = (): void => {
  /* Does nothing */
};

const initialState: IMessageContext = {
  messageList: [],
  // dispatcher: {
  //   print: doNothing,
  //   setMessages: doNothing,
  //   deleteMessage: doNothing,
  //   sendMessage: doNothing,
  //   updateMessage: doNothing,
  // },
};

const MessageContext = createContext<IMessageContext>(initialState);

const messageReducer = (state: IMessageContext, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_MESSAGES':
      return { ...state, messageList: payload };
    case 'DELETE_MESSAGE':
      return {
        ...state,
        messageList: state.messageList.filter((item: any) => item.id !== payload),
      };
    case 'SEND_MESSAGE':
      console.log('payload', payload);
      return { ...state, messageList: [...state.messageList, payload] };
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messageList: state.messageList.map((message: any) => {
          message.id === payload.id ? payload : message;
        }),
      };
    case 'SET_CHAT_ID':
      return { ...state, chat_id: payload };
    default:
      throw new Error(`No case for type ${type} found in MessageReducer.`);
  }
};

function MessageProvider({ children, chat_id }: any) {
  const [state, dispatch] = useReducer(messageReducer, initialState);

  const setMessages = (payload: Partial<TSingleMessage>[]) => {
    dispatch({ type: 'SET_MESSAGES', payload });
  };

  const deleteMessage = (payload: number) => {
    dispatch({ type: 'DELETE_MESSAGE', payload });
  };

  const sendMessage = (payload: Partial<TSingleMessage>) => {
    dispatch({ type: 'SEND_MESSAGE', payload });
  };

  const updateMessage = (payload: Partial<TSingleMessage>) => {
    dispatch({ type: 'UPDATE_MESSAGE', payload });
  };

  const print = () => {
    console.log('state', state);
  };

  const value = useMemo(
    () => ({
      messageList: state.messageList,
      chat_details: state.chat_details,
      chat_id,
      dispatcher: { print, deleteMessage, sendMessage, updateMessage, setMessages },
    }),
    [state.messageList, chat_id]
  );

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
}

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
