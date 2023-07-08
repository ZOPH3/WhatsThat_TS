import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Navigation responsible for unauthorised users
 */

import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';

const OutsideTab = createBottomTabNavigator();
const OutsideStack = createNativeStackNavigator();

function OutsideTabNavigator() {
  return (
    <OutsideTab.Navigator>
      <OutsideTab.Screen
        name="LoginView"
        component={LoginView}
        options={{
          title: 'Login',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Icons name="login" size={size} color={color} />,
        }}
      />
      <OutsideTab.Screen
        name="RegisterView"
        component={RegisterView}
        options={{
          title: 'Register',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Icons name="book-open" size={size} color={color} />,
        }}
      />
    </OutsideTab.Navigator>
  );
}

function OutsideStackNavigator() {
  return (
    <OutsideStack.Navigator>
      <OutsideStack.Screen
        name="OutsideStack"
        component={OutsideTabNavigator}
        options={{ headerShown: false }}
      />
    </OutsideStack.Navigator>
  );
}

export default OutsideStackNavigator;
