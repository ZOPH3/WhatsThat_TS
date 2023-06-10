import React, { ReactNode, createContext, useContext } from 'react';
import { useAuthContext } from './AuthContext';
import { GlobalContext } from './GlobalContext';
import log from '../util/LoggerUtil';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface IApiContext {
  // authApi?: AxiosInstance; publicApi?: AxiosInstance;
  useApi?: (config: AxiosRequestConfig, auth: boolean) => any;
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

  const _authApi = axios.create({
    baseURL: setBaseURL(),
    timeout: 5000,
  });

  const _publicApi = axios.create({
    baseURL: setBaseURL(),
    timeout: 5000,
  });

  const useApi = async (config: AxiosRequestConfig, auth: boolean) => {
    const _apiInstance = auth ? _authApi : _publicApi;
    try {
      const response = await _apiInstance.request({ ...config, signal: AbortSignal.timeout(5000) });
      return response;
    } catch (err) {
      log.error(err);
    }
  };

  _authApi.interceptors.request.use(
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

  _authApi.interceptors.response.use(
    (response) => {
      log.debug('response: ', response);
      return response;
    },
    (error) => {
      log.debug('response error: ', error);
      return Promise.reject(error);
    }
  );

  return <Provider value={{ useApi }}>{children}</Provider>;
};

const useApiContext = () => {
  // get the context
  const context = useContext(ApiContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error('useAuthContext was used outside of its Provider');
  }

  return context;
};

export { ApiProvider, useApiContext };
