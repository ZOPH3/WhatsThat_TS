import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuthContext } from '../lib/context/AuthContext';
import MasterStackNavigator from './MasterStack';
import { useGlobalContext } from '../lib/context/GlobalContext';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../styles/theme';
import { PaperProvider } from 'react-native-paper';

//TODO Add the splash screen here and the state such as loading can be dealt with at this level.
const StackNavigator = () => {
  const { authState } = useAuthContext();
  const { theme } = useGlobalContext();
  const { authenticated } = authState;

  return (
    <PaperProvider theme={theme === 'light' ? CombinedDefaultTheme : CombinedDarkTheme}>
      <NavigationContainer theme={theme === 'light' ? CombinedDefaultTheme : CombinedDarkTheme}>
        <MasterStackNavigator auth={authenticated} />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default StackNavigator;
