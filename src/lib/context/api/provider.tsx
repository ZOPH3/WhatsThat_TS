/* eslint-disable no-underscore-dangle */
import React, { ReactNode } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

import ApiContext from './context';

import { useAuth } from '../auth';
import { useGlobal } from '../global';

import log from '../../util/LoggerUtil';

interface Props {
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
}

const { Provider } = ApiContext;

function ApiProvider({ children }: Props) {
  const globalContext = useGlobal();
  const { getToken } = useAuth();

  const BASE_URL = globalContext.isMobile
    ? 'http://10.0.2.2:3333/api/1.0.0'
    : 'http://localhost:3333/api/1.0.0';

  const _authApi = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  });
  const _publicApi = axios.create({
    baseURL: BASE_URL,
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

  const apiCaller = async (config: AxiosRequestConfig<any>, auth: any) => {
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
      log.debug(globalContext.isMobile);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return <Provider value={{ apiCaller }}>{children}</Provider>;
}

export default ApiProvider;
