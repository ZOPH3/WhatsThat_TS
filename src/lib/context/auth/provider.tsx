/* eslint-disable react/require-default-props */
/* eslint-disable no-underscore-dangle */
import React, { ReactNode, useState } from 'react';
import AuthContext, { AuthStateDefault } from './context';
import { IAuthState } from './types';
import { clearCachedData } from '../../services/CacheService';

interface Props {
  children?: ReactNode;
}

function AuthProvider({ children }: Props) {
  const { Provider } = AuthContext;

  const [authState, setAuthState] = useState<IAuthState>({
    ...AuthStateDefault,
    authenticated: false,
  });

  const getCachedAuthState = async () => {
    /** Do Nothing */
  };

  const setUserId = (id: number) => {
    setAuthState({
      ...authState,
      id,
    });
  };

  const logout = async () => {
    setAuthState({
      ...AuthStateDefault,
      authenticated: false,
    });
  };

  const getToken = () => {
    return authState.token;
  };

  return (
    <Provider
      value={{
        authState,
        getToken,
        getCachedAuthState,
        setUserId,
        setAuthState,
        logout,
      }}
    >
      {children}
    </Provider>
  );
}

export default AuthProvider;
