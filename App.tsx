import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './core/screens/MainScreen';
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      {
        <Stack.Navigator>
          <Stack.Screen name="Home" component={MainScreen} />
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}

