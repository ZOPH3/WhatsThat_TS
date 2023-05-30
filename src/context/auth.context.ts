import { createContext } from 'react';

const initialState = {
  isLoggedIn: false,
  token: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setIsLoggedIn: (value: boolean) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setToken: (value: boolean) => {}
};

export const AuthContext = createContext(initialState);
