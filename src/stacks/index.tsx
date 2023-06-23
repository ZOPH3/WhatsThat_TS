import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MasterStackNavigator from './MasterStack';
import { useGlobalContext } from '../lib/context/GlobalContext';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../styles/theme';
import { PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashView from '../views/SplashView';

//TODO Add the splash screen here and the state such as loading can be dealt with at this level.
const StackNavigator = () => {
  const { theme, init } = useGlobalContext();

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
      <NavigationContainer theme={theme === 'light' ? CombinedDefaultTheme : CombinedDarkTheme}>
        {init ? <MasterStackNavigator /> : <SplashNavigator />}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default StackNavigator;
