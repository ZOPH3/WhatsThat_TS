import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmptyScreen from "../screens/EmptyScreen";
import HomeScreen from '../screens/chatList/ChatListScreen';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
    return (
        <Tab.Navigator initialRouteName='Chats'>
            <Tab.Screen name="Contacts" component={EmptyScreen} />
            <Tab.Screen name="Chats" component={HomeScreen} />
            <Tab.Screen name="Profile" component={EmptyScreen} />
            
        </Tab.Navigator>
        
    );
}