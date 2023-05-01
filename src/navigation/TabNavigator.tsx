import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmptyScreen from "../screens/EmptyScreen";
import HomeScreen from '../screens/chatList/ChatListScreen';
import { View } from 'react-native';
import ProfileScreen from '../screens/account/AccountScreen';
import { HStack, IconButton } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import ContactsScreen from '../screens/account/ContactsScreen';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
    return (
        <Tab.Navigator initialRouteName='Chats'>
            <Tab.Screen name="Contacts" component={ContactsScreen} options={() => ({
                // Add a placeholder button without the `onPress` to avoid flicker
                headerRight: () => (
                    <HStack>
                        <IconButton
                            icon={props => <Icon name="account-plus" {...props} />}
                            color="primary"
                        />
                        <IconButton
                            icon={props => <Icon name="account-remove" {...props} />}
                            color="primary"
                        />
                    </HStack>
                ),
            })} />
            <Tab.Screen name="Chats" component={HomeScreen} options={() => ({
                // Add a placeholder button without the `onPress` to avoid flicker
                headerRight: () => (
                    <IconButton
                        icon={props => <Icon name="plus" {...props} />}
                        color="primary"
                    />
                ),
            })} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>

    );
}