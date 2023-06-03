import React, { ReactNode, createContext, useContext } from 'react';
import { useAuthContext } from './AuthContext';
import { GlobalContext } from './GlobalContext';
import log from '../util/LoggerUtil';
import axios, { AxiosInstance } from 'axios';

interface IApiContext {
  authApi?: AxiosInstance;
  publicApi?: AxiosInstance;
}

const ApiContext = createContext<IApiContext>({});
const { Provider } = ApiContext;

interface Props {
  children?: ReactNode;
}

function setBaseURL() {
  const globalContext = useContext(GlobalContext);

  if (globalContext.isMobile) {
    return 'http://10.0.2.2:3333/api/1.0.0';
  } else {
    return 'http://localhost:3333/api/1.0.0';
  }
}

const ApiProvider = ({ children }: Props) => {
  const authContext = useAuthContext();

  const authApi = axios.create({
    baseURL: setBaseURL(),
    timeout: 5000,
  });

  const publicApi = axios.create({
    baseURL: setBaseURL(),
    timeout: 5000,
  });

  authApi.interceptors.request.use(
    (config) => {
      log.debug('[AUTH API] Intercepting: ' + config.url);

      if (!config.headers['X-Authorization'] && authContext.authState.accessToken) {
        config.headers['X-Authorization'] = `${authContext.authState.accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authApi.interceptors.response.use(
    (response) => {
      log.debug('response: ', response);
      return response;
    },
    (error) => {
      log.debug('response error: ', error);
      return Promise.reject(error);
    }
  );

  return <Provider value={{ authApi, publicApi }}>{children}</Provider>;
};

const useApiContext = () => {
  // get the context
  const context = useContext(ApiContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useAuthContext was used outside of its Provider");
  }

  return context;
};

export { ApiProvider, useApiContext };
