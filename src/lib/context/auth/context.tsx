import React, { createContext } from 'react';
import { IAuthContext, IAuthState } from './types';

export const AuthStateDefault: IAuthState = {
  id: undefined,
  current_user: undefined,
  token: undefined,
  authenticated: false,
};

export const AuthContextDefault: IAuthContext = {
  authState: AuthStateDefault,
  setAuthState: () => {
    /* */
  },
};

const AuthContext = createContext<IAuthContext>(AuthContextDefault);

export default AuthContext;
