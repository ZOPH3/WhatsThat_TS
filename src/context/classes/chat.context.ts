import { createContext } from 'react';

const initialState = {
  toggleRefresh: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setToggleRefresh: () => {},
  setIsLoggedIn: (value: boolean) => {},
};

export const ChatContext = createContext(initialState);