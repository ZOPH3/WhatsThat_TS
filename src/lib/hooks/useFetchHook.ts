import { AxiosError } from 'axios';
import React from 'react';
import { useApiContext } from '../context/ApiContext';
import log from '../util/LoggerUtil';

const useFetchHook = (config: any, auth = false) => {
  const { useFetch } = useApiContext();

  if (!useFetch) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const [data, setData] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [onError, setOnError] = React.useState<string | undefined>(undefined);

  const onFetch = async () => {
    /**
     * Fetch
     */
    setOnError(undefined);
    setData([]);
    setIsLoading(true);

    const data = await useFetch(config, auth, setIsLoading).catch((err: AxiosError) => {
      const msg = err.request?.response
        ? err.request.response
        : 'Timeout: It took more than 5 seconds to get the result!!';
      setOnError(msg);
    });

    if (data) {
      setData(data);
    }
  };

  return { onFetch, data, isLoading, onError, setOnError };
};

export default useFetchHook;
