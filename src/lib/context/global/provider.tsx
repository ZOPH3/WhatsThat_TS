import React, { ReactNode, useEffect, useState } from 'react';
import { IGlobalState } from './types';
import GlobalContext, { GlobalStateDefault } from './context';
import { getCachedData, setCachedData } from '../../services/CacheService';

const { Provider } = GlobalContext;

interface Props {
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
}

function GlobalProvider({ children }: Props) {
  const [GlobalState, setGlobalState] = useState<IGlobalState>(GlobalStateDefault);
  const toggleTheme = () => {
    setGlobalState((prevState) => {
      return {
        ...prevState,
        theme: prevState.theme === 'light' ? 'dark' : 'light',
      };
    });
  };

  const setCache = async () => {
    await setCachedData('/theme', GlobalState.theme);
  };

  const initialise = () => {
    setGlobalState((prevState) => {
      return {
        ...prevState,
        init: true,
        theme: prevState.theme,
      };
    });
  };

  useEffect(() => {
    const setFromCache = async () => {
      const theme = await getCachedData<string>('/theme');
      if (theme) {
        setGlobalState((prevState) => {
          return {
            ...prevState,
            theme,
          };
        });
      }
    };

    setFromCache();
  }, []);

  useEffect(() => {
    if (GlobalState.theme && GlobalState.init) setCache();
  }, [GlobalState.theme]);

  return <Provider value={{ ...GlobalState, toggleTheme, initialise }}>{children}</Provider>;
}

export default GlobalProvider;
