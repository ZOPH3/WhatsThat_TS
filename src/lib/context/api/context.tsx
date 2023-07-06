import React, { createContext } from 'react';
import { AxiosRequestConfig } from 'axios';

interface IApiContext {
  apiCaller?: (config: AxiosRequestConfig, auth: boolean) => any;
}
const ApiContext = createContext<IApiContext>({});

export default ApiContext;
