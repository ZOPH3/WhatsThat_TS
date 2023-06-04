import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/**
 * Navigation responsible for unauthorised users
 */

import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';

const OutsideTab = createBottomTabNavigator();
const OutsideStack = createNativeStackNavigator();

const OutsideTabNavigator = () => {
  return (
    <OutsideTab.Navigator>
      <OutsideTab.Screen name="LoginView" component={LoginView} />
      <OutsideTab.Screen name="RegisterView" component={RegisterView} />
    </OutsideTab.Navigator>
  );
};

const OutsideStackNavigator = () => {
  return (
    <OutsideStack.Navigator>
      <OutsideStack.Screen name="OutsideStack" component={OutsideTabNavigator} />
    </OutsideStack.Navigator>
  );
};

export default OutsideStackNavigator;