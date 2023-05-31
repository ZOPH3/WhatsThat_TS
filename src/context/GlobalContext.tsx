import React, { ReactNode, createContext } from 'react';
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
  isMobile: boolean;
}

const GlobalStateDefault = {
  isMobile: false,
};

const GlobalContext = createContext<IGlobalState>(GlobalStateDefault);
const { Provider } = GlobalContext;

interface Props {
  children?: ReactNode;
}

const GlobalProvider = ({ children }: Props) => {
  return <Provider value={{ isMobile: isMobile() }}>{children}</Provider>;
};

export { GlobalProvider, GlobalContext };
