import { useEffect, useState } from 'react';

export interface State<T> {
  data: T | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: string;
}

const doNothing = (): void => {
  /* Does nothing */
};

interface QueryConfig {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

const defaultConfig: QueryConfig = {
  onSuccess: doNothing,
  onError: doNothing,
};

function useQuery<T>(callback: () => Promise<T>, config = defaultConfig) {
  const [state, setState] = useState<State<T>>({
    data: undefined,
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: '',
  });

  const { onSuccess, onError } = config;

  const runQuery = () => {
    if (!callback) return;

    setState((s) => ({ ...s, isLoading: true }));

    callback()
      .then((response) => {
        setState({
          data: response as T,
          isLoading: false,
          isSuccess: true,
          isError: false,
          error: '',
        });
        if (onSuccess) onSuccess(response as T);
      })
      .catch((error) => {
        setState({
          data: undefined,
          isLoading: false,
          isSuccess: false,
          isError: true,
          error: error || 'Failed to fetch...',
        });
        if (onError) onError(error);
      });
  };

  useEffect(runQuery, []);

  return { ...state, refetch: runQuery };
}

export default useQuery;
