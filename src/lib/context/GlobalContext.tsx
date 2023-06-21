import React, { ReactNode, createContext, useContext, useState } from 'react';
import { Platform } from 'react-native';

// Check what the platform is
// Set the global to that platform

// I could use useResponsivity() hook for this to check if its mobile
function isMobile(): boolean {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    return true;
  } else {
    return false;
  }
}

interface IGlobalState {
  isMobile?: boolean;
  theme?: string;
  toggleTheme?: () => void;
}

const GlobalStateDefault = {
  isMobile: isMobile(),
  theme: 'dark',
};

const GlobalContext = createContext<IGlobalState>(GlobalStateDefault);
const { Provider } = GlobalContext;

interface Props {
  children?: ReactNode;
}

const GlobalProvider = ({ children }: Props) => {
  const [GlobalState, setGlobalState] = useState<IGlobalState>(GlobalStateDefault);
  const toggleTheme = () => {
    setGlobalState((prevState) => {
      return {
        ...prevState,
        theme: prevState.theme === 'light' ? 'dark' : 'light',
      };
    });
  };

  return <Provider value={{...GlobalState, toggleTheme}}>{children}</Provider>;
};

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
