/* eslint-disable react/require-default-props */
/* eslint-disable no-underscore-dangle */
import React, { ReactNode, useState } from 'react';
import AuthContext, { AuthStateDefault } from './context';
import { IAuthState } from './types';

interface Props {
  children?: ReactNode;
}

/**
 * @description AuthProvider is a component that wraps the entire application and provides the auth context.
 */
function AuthProvider({ children }: Props) {
  const { Provider } = AuthContext;

  const [authState, setAuthState] = useState<IAuthState>({
    ...AuthStateDefault,
    authenticated: false,
  });

  const getCachedAuthState = async () => {
    /** Do Nothing, Not implemented */
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
