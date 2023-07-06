import React, { createContext } from 'react';
import { IGlobalState } from './types';
import { isMobile } from './utils';

export const GlobalStateDefault = {
  isMobile: isMobile(),
  theme: 'dark',
  init: false,
};

const GlobalContext = createContext<IGlobalState>(GlobalStateDefault);

export default GlobalContext;
