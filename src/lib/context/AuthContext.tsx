import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { TUser } from '../types/TSchema';

interface IAuthState {
  user_id: number | undefined;
  current_user: TUser | undefined;
  accessToken: string | undefined;
  authenticated: boolean | undefined;
}

interface IAuthContext {
  authState: IAuthState;
  setAuthState: Dispatch<SetStateAction<IAuthState>>;
  setAccessToken?: (token: string) => void;
  setUserId?: (id: number) => void;
  getAccessToken?: () => string | undefined;
  setAuth?: (auth: boolean) => void;
  logout?: () => void;
}

const AuthStateDefault: IAuthState = {
  user_id: undefined,
  current_user: undefined,
  accessToken: undefined,
  authenticated: undefined,
};

const AuthContextDefault: IAuthContext = {
  authState: AuthStateDefault,
  setAuthState: () => {
    /* */
  },
};

const AuthContext = createContext<IAuthContext>(AuthContextDefault);

interface Props {
  children?: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const { Provider } = AuthContext;

  const [authState, setAuthState] = useState<IAuthState>({
    ...AuthStateDefault,
    authenticated: false,
  });


  const setAuth = (auth: boolean) => {
    setAuthState({
      ...authState,
      authenticated: auth,
    });
  };

  const setAccessToken = (token: string) => {
    setAuthState({
      ...authState,
      accessToken: token,
    });
  };

  const setUserId = (id: number) => {
    setAuthState({
      ...authState,
      user_id: id,
    });
  };

  const logout = async () => {
    setAuthState({
      ...AuthStateDefault,
      authenticated: false,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setUserId,
        setAccessToken,
        setAuthState,
        logout,
        setAuth,
      }}
    >
      {children}
    </Provider>
  );
};

const useAuthContext = () => {
  // get the context
  const context = useContext(AuthContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error('useAuthContext was used outside of its Provider');
  }

  return context;
};

export { useAuthContext, AuthProvider };
