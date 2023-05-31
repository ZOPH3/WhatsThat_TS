import React, { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

interface IAuthState {
  accessToken: string | undefined;
  refreshToken: boolean | undefined;
  authenticated: boolean | undefined;
}

const AuthStateDefault: IAuthState = {
  accessToken: undefined,
  refreshToken: undefined,
  authenticated: undefined,
};

interface IAuthProvider {
  authState: IAuthState;
  getAccessToken: () => string | undefined;
  setAuthState: Dispatch<SetStateAction<IAuthState>>;
  logout: () => void;
}

const AuthContext = createContext<IAuthProvider | undefined>(undefined);
const { Provider } = AuthContext;

interface Props {
  children?: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState<IAuthState>(AuthStateDefault);

  const logout = async () => {
    setAuthState({
      accessToken: undefined,
      refreshToken: undefined,
      authenticated: false,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <Provider value={{ authState, getAccessToken, setAuthState, logout }}>{children}</Provider>
  );
};

export { AuthContext, AuthProvider };
