import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/chat/chatSummary.list.screen';
import ProfileScreen from '../screens/account/account.screen';
import { HStack, IconButton } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import ContactsScreen from '../screens/account/contacts.list.screen';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
    const navigation = useNavigation();

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
                            color="primary" onPress={() => navigation.navigate('Blocked List')}
                        />
                    </HStack>
                ),
            })} />
            <Tab.Screen name="Chats" component={HomeScreen} options={() => ({
                // Add a placeholder button without the `onPress` to avoid flicker
                headerRight: () => (
                    <IconButton
                        icon={props => <Icon name="plus" {...props} />}
                        color="primary" onPress={() => navigation.navigate('MyModal')}
                    />
                ),
            })} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>

    );
}