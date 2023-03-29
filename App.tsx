import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './core/screens/HomeScreen';
import ProfileScreen from './core/screens/ProfileScreen';
import SettingsScreen from './core/screens/SettingsScreen';
import SignInScreen from './core/screens/SignInScreen';
import SignUpScreen from './core/screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const getIsSignedIn = () => {
  return false;
};

export default function App() {
    const isSignedIn = getIsSignedIn();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {isSignedIn ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
}

