import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { TUser } from '../types/TSchema';
import { clearCachedData } from '../services/CacheService';

export interface IAuthState {
  id: number | undefined;
  current_user: TUser | undefined;
  token: string | undefined;
  authenticated: boolean | undefined;
}

interface IAuthContext {
  authState: IAuthState;
  setAuthState: Dispatch<SetStateAction<IAuthState>>;
  setToken?: (token: string) => void;
  setUserId?: (id: number) => void;
  getToken?: () => string | undefined;
  setAuth?: (auth: boolean) => void;
  logout?: () => void;
  setCachedAuthState?: (authState: IAuthState) => void;
  getCachedAuthState?: () => Promise<any>;
}

const AuthStateDefault: IAuthState = {
  id: undefined,
  current_user: undefined,
  token: undefined,
  authenticated: false,
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

  const getCachedAuthState = async () => {
    // return await getCachedData('/login', AuthStateDefault)
    //   .then((login) => {
    //     console.log('getCachedAuthState')
    //     setAuthState({ authenticated: true, current_user: undefined, ...login });
    //     return login;
    //   })
    //   .catch((err) => {
    //     return AuthStateDefault;
    //   });
  };

  const setUserId = (id: number) => {
    setAuthState({
      ...authState,
      id: id,
    });
  };

  const logout = async () => {
    clearCachedData('/login');
    clearCachedData(`/user/${authState.id}`);
    clearCachedData('/chat');
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
        // setCachedAuthState,
        getCachedAuthState,
        setUserId,
        // setToken,
        setAuthState,
        logout,
        // setAuth,
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
