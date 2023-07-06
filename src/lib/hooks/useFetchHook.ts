/* eslint-disable @typescript-eslint/no-shadow */
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';

import log from '../util/LoggerUtil';
import { getCachedData, setCachedData } from '../services/CacheService';

import { useApi } from '../context/api';
import { useNotification } from '../context/notification';

export enum EState {
  success = 'success',
  error = 'error',
  empty = 'empty',
}

export enum EFetch {
  cache = 'cache',
  fresh = 'fresh',
}

const useFetchHook = (config: any, auth = false) => {
  const { apiCaller } = useApi();
  const { dispatcher } = useNotification();

  if (!apiCaller) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const [data, setData] = React.useState<any>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [onError, setOnError] = React.useState<any | undefined>(undefined);
  const [dataState, setDataState] = useState<EState | undefined>(undefined); // State of the data

  // TODO: Do i need a useeffect for this?
  useEffect(() => {
    if (onError) {
      dispatcher.addNotification({ type: 'error', message: onError });
    }
  }, [onError]);

  async function getCache() {
    const cachedData = await getCachedData(config.url);
    if (!cachedData) {
      throw new Error(`No cached data found...${config.url}`);
    }
    return Object.values(cachedData);
  }

  const getFresh = async () => {
    /**
     * Fetch
     */
    let msg = '';
    const data = await apiCaller(config, auth).catch((err: AxiosError) => {
      msg = err.request?.response
        ? err.request.response
        : 'Timeout: It took more than 5 seconds to get the result!!';
    });

    if (data) {
      await setCachedData(config.url, { ...data.data });
      return data.data;
    }

    throw new Error(msg);
  };

  const onFetch = async (fn: () => Promise<any>) => {
    /**
     * Fetch
     */
    setOnError(undefined);
    setData(undefined);
    setDataState(undefined);
    setIsLoading(true);

    const data = await fn()
      .catch((err: any) => {
        setOnError(err.message ? err.message : 'Something went wrong...');
        setDataState(EState.error);
      })
      .finally(() => setIsLoading(false));

    if (data) {
      setData(data);
      setOnError(undefined);
      setDataState(EState.success);
      return data;
    }

    if (!data && !onError) {
      setDataState(EState.empty);
      setOnError(undefined);
    }
  };

  const fetchCacheorFresh = async () => {
    /**
     * Fetch
     */
    setOnError(undefined);
    setData(undefined);
    setDataState(undefined);
    setIsLoading(true);

    let error;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const data = Promise.race([getCache(), getFresh()])
      .then((data) => data)
      .catch((err: any) => {
        // setOnError(err.message ? err.message : 'Something went wrong...');
        error = err.message ? err.message : 'Something went wrong...';
      })
      .finally(() => setIsLoading(false));

    if (data) {
      setData(data);
      setOnError(undefined);
      setDataState(EState.success);
      return data;
    }

    if (!data && !error) {
      setDataState(EState.empty);
      setOnError(undefined);
      return null;
    }

    if (error) {
      setOnError(error);
      setDataState(EState.error);
      return null;
    }
    return null;
  };

  const doFetch = async () => {
    let data = await onFetch(async () => getCache());
    if (!data) {
      data = await onFetch(async () => getFresh());
    }
    return data;
  };

  return {
    data,
    dataState,
    isLoading,
    onError,
    doFetch,
    onFetch,
    getCache,
    getFresh,
    fetchCacheorFresh,
  };
};

export default useFetchHook;
