import React, { createContext } from 'react';
import { IMessageContext } from './types';

export const initialState: IMessageContext = {
  messageList: [],
};

const MessageContext = createContext<IMessageContext>(initialState);

export default MessageContext;
