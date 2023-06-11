import React, { ReactNode, createContext, useContext } from 'react';
import { useAuthContext } from './AuthContext';
import { useGlobalContext } from './GlobalContext';
import log from '../util/LoggerUtil';
import axios, { AxiosRequestConfig } from 'axios';

interface IApiContext {
  useApi?: (
    config: AxiosRequestConfig,
    auth: boolean,
    /*setIsLoading: any, setError: any*/
    out: QueryConfig
  ) => any;
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
  const authContext = useAuthContext();
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

  const defaultConfig: QueryConfig = {
    onSuccess: doNothing,
    onError: doNothing,
    setIsLoading: doNothing,
  };

  const useApi = async (
    config: AxiosRequestConfig,
    auth: boolean,
    /*setIsLoading: (arg0: boolean) => void*/
    out = defaultConfig
  ) => {
    const { onSuccess, onError, isLoading } = out;
    let msg = undefined;

    try {
      const _apiInstance = auth ? _authApi : _publicApi;

      const response = await _apiInstance.request({ ...config, signal: newAbortSignal(5000) });
      if (response.status !== 200) throw new Error(response.statusText);
      
      if (isLoading) isLoading(false);
      if (onSuccess) onSuccess(response.data);

    } catch (err: any) {
      if (isLoading) isLoading(false);

      err.name === 'CanceledError'
        ? log.error(`[${config.url}] Timeout: It took more than 5 seconds to get the result!`)
        : log.error(`[${config.url}] ` + err.request.response);

      msg = err.request.response;
      if (err.name === 'CanceledError')
        msg = 'Timeout: It took more than 5 seconds to get the result!';
      // const obj = err.request.response;
      // console.log(JSON.stringify(obj, null, 3));

      if (onError) onError(msg);
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

  _publicApi.interceptors.request.use(
    (config) => {
      log.debug('[PUBLIC API] Intercepting: ' + config.url);

      return config;
    },
    (error) => {
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
