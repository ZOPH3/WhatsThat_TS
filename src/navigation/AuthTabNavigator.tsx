import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmptyScreen from "../screens/EmptyScreen";
import LoginScreen from '../screens/login/LoginScreen';

const Tab = createBottomTabNavigator();

export function AuthTabNavigator() {
    return (
        <Tab.Navigator initialRouteName='Login'>
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Register" component={EmptyScreen} />          
        </Tab.Navigator>
    );
}