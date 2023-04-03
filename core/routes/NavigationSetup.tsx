import React, { useState } from 'react';
import { View, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';


const Stack = createNativeStackNavigator();


export default function NavigationSetup() {

  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <>
      <Button title='sfsd' onPress={ () => setIsSignedIn(true)} />
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
      </NavigationContainer></>
  );
}