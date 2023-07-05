/* eslint-disable no-underscore-dangle */
import React, { ReactNode, createContext, useContext } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

import log from '../util/LoggerUtil';

import { useAuthContext } from './AuthContext';
import { useGlobalContext } from './GlobalContext';

interface IApiContext {
  useFetch?: (config: AxiosRequestConfig, auth: boolean) => any;
}

const ApiContext = createContext<IApiContext>({});
const { Provider } = ApiContext;

interface Props {
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
}

function setBaseURL() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const globalContext = useGlobalContext();

  if (globalContext.isMobile) {
    return 'http://10.0.2.2:3333/api/1.0.0';
  }
  return 'http://localhost:3333/api/1.0.0';
}

const doNothing = (): void => {
  /* Does nothing */
};

function ApiProvider({ children }: Props) {
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

  const useFetch = async (config: AxiosRequestConfig<any>, auth: any) => {
    const _apiInstance = auth ? _authApi : _publicApi;
    return _apiInstance
      .request({
        ...config,
        signal: newAbortSignal(5000),
        validateStatus: (status) => status <= 304,
      })
      .catch((err) => null); // Had to add catch here to catch the abort error
  };

  _authApi.interceptors.request.use(
    (config) => {
      // log.debug('[AUTH API] Intercepting: ' + config.url);

      if (!config.headers['X-Authorization'] && getToken) {
        // eslint-disable-next-line no-param-reassign
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
      // eslint-disable-next-line no-param-reassign
      error.message = error.name === 'CanceledError' ? 'Request timed out' : error.message;
      log.error(`[AUTH API] Response error: ${error.message}`);
      return Promise.reject(error);
    }
  );

  _publicApi.interceptors.request.use(
    (config) => {
      log.debug(`[PUBLIC API] Intercepting: ${config.url}`);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return <Provider value={{ useFetch }}>{children}</Provider>;
}

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
