import React, { ReactNode, useState } from 'react';
import { IGlobalState } from './types';
import GlobalContext, { GlobalStateDefault } from './context';

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

  const initialise = () => {
    setGlobalState((prevState) => {
      return {
        ...prevState,
        init: true,
      };
    });
  };

  return <Provider value={{ ...GlobalState, toggleTheme, initialise }}>{children}</Provider>;
}

export default GlobalProvider;
