/* eslint-disable camelcase */
import React, { useReducer, useMemo } from 'react';
import MessageContext, { initialState } from './context';
import MessageReducer from './reducer';
import { TSingleMessage } from '../../types/TSchema';
import { useChat } from '../chats';

function MessageProvider({ children, chat_id }: any) {
  const { dispatcher } = useChat();
  if (!dispatcher) throw new Error('useChat must be used within a ChatProvider');

  const [state, dispatch] = useReducer(MessageReducer, initialState);

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

  const value = useMemo(
    () => ({
      messageList: state.messageList,
      chat_details: state.chat_details,
      chat_id,
      dispatcher: { deleteMessage, sendMessage, updateMessage, setMessages },
    }),
    [state.messageList, state.chat_details, chat_id]
  );

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
}

export default MessageProvider;
