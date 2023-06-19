/**
 * MessageContext
 * - Draft message queue,
 * - Message queue?,
 * - Current state of the chat list?
 */

import React, { createContext, useReducer } from 'react';
import { TChatSummary, TChat } from '../types/TSchema';

interface IMessageContext {
  chatRooms?: TChatSummary[] & TChat; // This also contains the messages
}

const MessageContext = createContext<IMessageContext>({});

const messageReducer = (state: any, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_CHAT_ROOMS':
      return {
        ...state,
        chatRooms: payload,
      };
    case 'DELETE_CHAT_ROOM':
      console.log('DELETE_CHAT_ROOM', payload);
      return state;

    case 'DELETE_MESSAGE':
      return state.filter((item: any) => item.id !== payload);
    case 'SEND_MESSAGE':
      return [...state, payload];
    case 'UPDATE_MESSAGE':
      console.log('UPDATE_MESSAGE', payload);
      return state;

    case 'ADD_USER_TO_CHAT':
      console.log('ADD_USER', payload);
      return state;
    case 'REMOVE_USER_TO_CHAT':
      console.log('REMOVE_USER', payload);
      return state;
    default:
      throw new Error(`No case for type ${type} found in MessageReducer.`);
  }
};

const MessageProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(messageReducer, {}); // TODO: Add initial state

  const setChatRooms = (payload: any) => {
    dispatch({ type: 'SET_CHAT_ROOMS', payload });
  };

  return <MessageContext.Provider value={{}}>{children}</MessageContext.Provider>;
};
