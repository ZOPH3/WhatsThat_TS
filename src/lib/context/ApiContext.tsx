import React, { ReactNode, createContext, useContext } from 'react';
import { useAuthContext } from './AuthContext';
import { useGlobalContext } from './GlobalContext';
import log from '../util/LoggerUtil';

import axios, { AxiosRequestConfig } from 'axios';

interface IApiContext {
  useFetch?: (config: AxiosRequestConfig, auth: boolean, setIsLoading?: any) => any;
}

interface QueryConfig {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  isLoading?: (arg0: boolean) => void;
}

const ApiContext = createContext<IApiContext>({});
const { Provider } = ApiContext;

interface Props {
  children?: ReactNode;
}

function setBaseURL() {
  const globalContext = useGlobalContext();

  if (globalContext.isMobile) {
    return 'http://10.0.2.2:3333/api/1.0.0';
  } else {
    return 'http://localhost:3333/api/1.0.0';
  }
}

const doNothing = (): void => {
  /* Does nothing */
};

const ApiProvider = ({ children }: Props) => {
  const { getToken } = useAuthContext();
  const _authApi = axios.create({
    baseURL: setBaseURL(),
    timeout: 5000,
  });
  const _publicApi = axios.create({
    baseURL: setBaseURL(),
    timeout: 5000,
  });

  /**
   * https://axios-http.com/docs/cancellation
   * @param timeoutMs
   * @returns
   */
  function newAbortSignal(timeoutMs: any) {
    const abortController = new AbortController();
    setTimeout(() => abortController.abort(), timeoutMs || 0);
    return abortController.signal;
  }

  const useFetch = (config: AxiosRequestConfig<any>, auth: any, setIsLoading?: any) => {
    try {
      const _apiInstance = auth ? _authApi : _publicApi;
      return _apiInstance
        .request({
          ...config,
          signal: newAbortSignal(5000),
          validateStatus: (status) => status <= 304,
        })
        .then((res) => {
          // if (res.status <= 200 && res.status >= 304) throw new Error(res.statusText);
          return res.data;
        })
        .finally(() => {
          if (setIsLoading) setIsLoading(false);
        });
    } catch (err: any) {
      log.error(err);
      if (setIsLoading) setIsLoading(false);
    }
  };

  _authApi.interceptors.request.use(
    (config) => {
      log.debug('[AUTH API] Intercepting: ' + config.url);

      if (!config.headers['X-Authorization'] && getToken) {
        config.headers['X-Authorization'] = `${getToken()}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  _authApi.interceptors.response.use(
    (response) => {
      log.debug(`[AUTH API] Response status for ${response.config.url}: ${response.status}`);
      return response;
    },
    (error) => {
      log.debug(`[AUTH API] Response error: ${error}`);
      return Promise.reject(error);
    }
  );

  _publicApi.interceptors.request.use(
    (config) => {
      log.debug('[PUBLIC API] Intercepting: ' + config.url);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return <Provider value={{ useFetch }}>{children}</Provider>;
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
