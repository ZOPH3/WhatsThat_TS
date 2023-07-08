/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PaperProvider, Portal } from 'react-native-paper';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../styles/theme';

import { useAuth } from '../lib/context/auth';
import { useGlobal } from '../lib/context/global';

import MasterStackNavigator from './MasterStack';
import SplashView from '../views/SplashView';
import NotificationContainer from '../components/Notification';

// TODO Add the splash screen here and the state such as loading can be dealt with at this level.
function StackNavigator() {
  const { theme, init } = useGlobal();
  const { authState } = useAuth();

  const stack = createNativeStackNavigator();

  function SplashNavigator() {
    return (
      <stack.Navigator>
        <stack.Screen
          name="SplashView"
          component={SplashView}
          options={{ headerShown: false, title: 'WhatsThat!' }}
        />
      </stack.Navigator>
    );
  }

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
}

export default StackNavigator;
