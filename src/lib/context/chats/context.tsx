import React, { createContext } from 'react';
import { IChatContext } from './types';

export const initialState: IChatContext = {
  chatSummaryList: [],
};

const ChatContext = createContext(initialState);

export default ChatContext;
