import axios, { AxiosInstance } from 'axios';
import { ReactNode, createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';
import React from 'react';
import { GlobalContext } from './GlobalContext';
import log from '../util/LoggerUtil';

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
  
  const authContext = useContext(AuthContext);

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
      log.debug("[AUTH API] Intercepting: " + config.url);
      
      if (!config.headers['X-Authorization'] && authContext.getAccessToken) {
        config.headers['X-Authorization'] = `${authContext?.getAccessToken()}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authApi.interceptors.response.use(
    (response) => {
      log.debug("response: ", response);
      return response;
    },
    (error) => {
      log.debug("response error: ", error);
      return Promise.reject(error);
    }
  );

  return <Provider value={{ authApi, publicApi }}>{children}</Provider>;
};

export { ApiProvider, ApiContext };
