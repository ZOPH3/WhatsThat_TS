import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmptyScreen from '../screens/empty.screen';
import LoginScreen from '../screens/login/login.screen';

const Tab = createBottomTabNavigator();

export function UnAuthTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Login">
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Register" component={EmptyScreen} />
    </Tab.Navigator>
  );
}
