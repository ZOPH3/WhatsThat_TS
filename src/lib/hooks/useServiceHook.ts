/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect } from 'react';
import { useApiContext } from '../context/ApiContext';
import { useNotificationContext } from '../context/NotificationContext';

interface IConfig {
  onEmpty: string;
  onError: string;
  onSuccess?: string;
  onLoading?: string;
}

/**
 * @param service Generic service api hook
 * TODO: Replace useFetch with useServiceApiHook 
 */
function useServiceApiHook<T>(service: (api: any) => Promise<T>, config: IConfig) {
  const { dispatcher } = useNotificationContext();
  const { useFetch } = useApiContext();

  const [data, setData] = React.useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [onError, setOnError] = React.useState<any | undefined>(undefined);

  useEffect(() => {
    if (onError) {
      dispatcher.addNotification({ type: 'error', message: onError });
    }
  }, [onError]);

  function execute() {
    setIsLoading(true);
    setOnError(undefined);
    setData(undefined);

    return service(useFetch)
      .then(
        (res: any) => {
          if (res && res.data) {
            setData(res.data as T);
            return res.data;
          }
          throw new Error(config.onEmpty || 'Something went wrong...');
        },
        (err: any) => setOnError(err.message ? err.message : 'Something went wrong...')
      )
      .catch((err: any) => {
        setOnError(err.message ? err.message : 'Something went wrong...');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return { data, isLoading, execute, onError };
}
export default useServiceApiHook;
