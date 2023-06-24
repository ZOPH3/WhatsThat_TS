import { AxiosError } from 'axios';
import React from 'react';
import { useApiContext } from '../context/ApiContext';
import log from '../util/LoggerUtil';
import { getCachedData, setCachedData } from '../services/CacheService';

const useFetchHook = (config: any, auth = false) => {
  const { useFetch } = useApiContext();

  if (!useFetch) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const [data, setData] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [onError, setOnError] = React.useState<string | undefined>(undefined);

  const getCache = async () => {
    const cachedData = await getCachedData(config.url);
    if (!cachedData) {
      throw new Error('No cached data found...', config.url);
    }
    const data = JSON.parse(cachedData);
    if (data.expiresAt < Date.now()) {
      throw new Error('Cache expired...');
    }
    return data.data;
  };

  const getFresh = async (expiresAt?: number) => {
    /**
     * Fetch
     */
    let msg = '';
    const data = await useFetch(config, auth, setIsLoading).catch((err: AxiosError) => {
      msg = err.request?.response
        ? err.request.response
        : 'Timeout: It took more than 5 seconds to get the result!!';
    });

    if (data) {
      await setCachedData(config.url, { ...data }, expiresAt);
      return data;
    } else {
      throw new Error(msg);
    }
  };

  const onFetch = async (fn: () => Promise<any>) => {
    /**
     * Fetch
     */
    setOnError(undefined);
    setData([]);
    setIsLoading(true);

    const data = await fn()
      .catch((err: any) => setOnError(err))
      .finally(() => setIsLoading(false));

    if (data) {
      // console.log('onFetch Data: ', data)
      setData(data);
      return data;
    }
  };

  return {
    data,
    isLoading,
    onError,
    setOnError,
    setData,
    onFetch,
    getCache,
    getFresh,
  };
};

export default useFetchHook;
