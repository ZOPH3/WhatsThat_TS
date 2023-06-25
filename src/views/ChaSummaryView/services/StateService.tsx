import React, { useEffect, useState } from 'react';
import useFetchHook from '../../../lib/hooks/useFetchHook';
import { IComponentState } from '../../../components/Loader';
import { useChatContext } from '../../../lib/context/ChatContext';

const stateService = () => {
  const { chatSummaryList, dispatcher } = useChatContext();
  const [compState, setState] = useState<IComponentState>({ state: 'idle' });
  const { data, isLoading, onFetch, onError, getFresh, init } = useFetchHook(
    { url: '/chat', method: 'GET' },
    true
  );

  useEffect(() => {
    console.log('stateService: ', compState.state);
  }, [compState.state]);

  const fetch = () => {
    onFetch(async () => await getFresh())
      .then((res) => {
        if (!res || res.length === 0) {
          setState({ state: 'empty' });
        } else {
          dispatcher.setChatSummaryList(data);
          setState({ state: 'success' });
        }
      })
      .finally(() => {
        if (onError) setState({ state: 'error' });
      });
  };

  const initial = () => {
    init()
      .then((data) => {
        if (!data || data.length === 0) {
          setState({ state: 'empty' });
          return;
        }
        setState({ state: 'success' });
        dispatcher.setChatSummaryList(data);
      })
      .finally(() => {
        if (onError) setState({ state: 'error' });
      });
  };

  return { compState, chatSummaryList, onError, isLoading, fetch, initial };
};

export default stateService;
