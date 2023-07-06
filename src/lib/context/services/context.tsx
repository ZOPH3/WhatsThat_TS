import React, { createContext } from 'react';
import { TDraftMessage } from './types';

export const initialState: any = {
  draftMessageList: [] as TDraftMessage[],
};

const ServicesContext = createContext(initialState);

export default ServicesContext;
