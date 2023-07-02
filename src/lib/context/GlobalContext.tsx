import React, { ReactNode, createContext, useContext, useState } from 'react';
import { Platform } from 'react-native';

// I could use useResponsivity() hook for this to check if its mobile
function isMobile(): boolean {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    return true;
  }
  return false;
}

interface IGlobalState {
  isMobile?: boolean;
  theme?: string;
  init?: boolean;
  initialise?: () => void;
  toggleTheme?: () => void;
}

const GlobalStateDefault = {
  isMobile: isMobile(),
  theme: 'dark',
  init: false,
};

const GlobalContext = createContext<IGlobalState>(GlobalStateDefault);
const { Provider } = GlobalContext;

interface Props {
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

const useGlobalContext = () => {
  // get the context
  const context = useContext(GlobalContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error('useGlobalContext was used outside of its Provider');
  }

  return context;
};

export { GlobalProvider, useGlobalContext };
