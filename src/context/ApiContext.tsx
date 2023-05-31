import axios, { AxiosInstance } from 'axios';
import { ReactNode, createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';
import React from 'react';
import { GlobalContext } from './GlobalContext';

interface IApiProvider {
  authApi: AxiosInstance;
  publicApi: AxiosInstance;
}

const ApiContext = createContext<IApiProvider | undefined>(undefined);
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
  });
  const publicApi = axios.create({
    baseURL: setBaseURL(),
  });

  authApi.interceptors.request.use(
    (config) => {
      if (!config.headers['X-Authorization']) {
        config.headers['X-Authorization'] = `${authContext?.getAccessToken()}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return <Provider value={{ authApi, publicApi }}>{children}</Provider>;
};
