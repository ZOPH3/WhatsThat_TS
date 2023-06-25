import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CombinedDarkTheme, CombinedDefaultTheme } from '../styles/theme';
import { PaperProvider, Portal } from 'react-native-paper';

import { useAuthContext } from '../lib/context/AuthContext';
import { useGlobalContext } from '../lib/context/GlobalContext';

import MasterStackNavigator from './MasterStack';
import SplashView from '../views/SplashView';
import NotificationContainer from '../components/Notification';

//TODO Add the splash screen here and the state such as loading can be dealt with at this level.
const StackNavigator = () => {
  const { theme, init } = useGlobalContext();
  const { authState } = useAuthContext();

  const stack = createNativeStackNavigator();

  const SplashNavigator = () => {
    return (
      <stack.Navigator>
        <stack.Screen name="SplashView" component={SplashView} options={{ headerShown: false }} />
      </stack.Navigator>
    );
  };

  return (
    <PaperProvider theme={theme === 'light' ? CombinedDefaultTheme : CombinedDarkTheme}>
      <Portal>
        <NotificationContainer />
      </Portal>
      <NavigationContainer theme={theme === 'light' ? CombinedDefaultTheme : CombinedDarkTheme}>
        {init ? <MasterStackNavigator auth={authState.authenticated} /> : <SplashNavigator />}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default StackNavigator;
