import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface IAuthState {
  user_id: number | undefined;
  accessToken: string | undefined;
  authenticated: boolean | undefined;
}

interface IAuthContext {
  authState: IAuthState;
  setAuthState: Dispatch<SetStateAction<IAuthState>>;
  getAccessToken?: () => string | undefined;
  logout?: () => void;
}

const AuthStateDefault: IAuthState = {
  user_id: undefined,
  accessToken: undefined,
  authenticated: undefined,
};

const AuthContextDefault: IAuthContext = {
  authState: AuthStateDefault,
  setAuthState: () => {/* */},
};

const AuthContext = createContext<IAuthContext>(AuthContextDefault);


interface Props {
  children?: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const { Provider } = AuthContext;

  const [authState, setAuthState] = useState<IAuthState>({
    user_id: undefined,
    accessToken: undefined,
    authenticated: false,
  });

  const logout = async () => {
    setAuthState({
      user_id: undefined,
      accessToken: undefined,
      authenticated: false,
    });
  };

  const getAccessToken = () => {
    console.log('FROM AUTHSTATE: ' + authState);
    return authState.accessToken;
  };

  return (
    <Provider value={{ authState, getAccessToken, setAuthState, logout }}>{children}</Provider>
  );
};

const useAuthContext = () => {
  // get the context
  const context = useContext(AuthContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useAuthContext was used outside of its Provider");
  }

  return context;
};

export { useAuthContext, AuthProvider };
