/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton } from 'react-native-paper';

/**
 * Navigation responsible for authorised users
 */

import ProfileView from '../views/ProfileView';
import ChatSummaryView from '../views/ChaSummaryView';
import ChatView from '../views/ChatView';
import EditChatView from '../views/EditChatView';
import InviteUserView from '../views/InviteUserView';
import AddedUsersView from '../views/AddedUsersView';
import SearchUsersView from '../views/SearchUsersView';
import BlockedUsersView from '../views/BlockedUsersView';

import { useApiContext } from '../lib/context/ApiContext';
import { useAuthContext } from '../lib/context/AuthContext';
import log, { apiLog, pollingLog, rootLog } from '../lib/util/LoggerUtil';
import useChatController from '../lib/controller/ChatController';

const ChatStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const ContactTab = createMaterialTopTabNavigator();

const InsideStack = createNativeStackNavigator();
const InsideTab = createBottomTabNavigator();

function ContactTopTabNavigator() {
  return (
    <ContactTab.Navigator>
      <ContactTab.Screen
        name="AddedUsersView"
        component={AddedUsersView}
        options={{ title: 'Contacts' }}
      />

      <ContactTab.Screen
        name="BlockedUsersView"
        component={BlockedUsersView}
        options={{ title: 'Blocked' }}
      />
    </ContactTab.Navigator>
  );
}

function ContactStackNavigator({ navigation }) {
  const headerRight = () => (
    <IconButton icon="plus" size={20} onPress={() => navigation.navigate('SearchUsersView')} />
  );

  return (
    <InsideStack.Navigator>
      <InsideStack.Screen
        name="ContactTopTabNavigator"
        component={ContactTopTabNavigator}
        options={{
          title: 'Contacts',
          headerRight,
        }}
      />
      <InsideStack.Screen
        name="SearchUsersView"
        component={SearchUsersView}
        options={{
          title: 'Search Users',
          headerShown: false,
        }}
      />
    </InsideStack.Navigator>
  );
}

function ChatStackNavigator() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="ChatSummaryView"
        component={ChatSummaryView}
        options={{ title: 'Chat' }}
      />
      <ChatStack.Screen name="ChatView" component={ChatView} />

      <ChatStack.Screen
        name="EditChatView"
        component={EditChatView}
        options={{
          title: 'Edit Chat',
          headerShown: false,
        }}
      />
      <ChatStack.Screen name="InviteUserView" component={InviteUserView} />
    </ChatStack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileView" component={ProfileView} />
    </ProfileStack.Navigator>
  );
}

function InsideTabNavigator() {
  return (
    <InsideTab.Navigator initialRouteName="ChatStackNavigator">
      <InsideTab.Screen
        name="ChatStackNavigator"
        component={ChatStackNavigator}
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Icons name="chat" size={size} color={color} />,
        }}
      />
      <InsideTab.Screen
        name="ContactStackNavigator"
        component={ContactStackNavigator}
        options={{
          headerShown: false,
          title: 'Contacts',
          tabBarIcon: ({ color, size }) => <Icons name="contacts" size={size} color={color} />,
        }}
      />
    </InsideTab.Navigator>
  );
}

function InsideStackNavigator() {
  const { useFetch } = useApiContext();
  const { authState } = useAuthContext();
  const { fetchChatDetails, fetchChatSummary } = useChatController();
  let pollId: string | number | NodeJS.Timer | undefined;

  if (!useFetch) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const pollTest = () => {
    if (!pollId) {
      pollId = setInterval(() => {
        fetchChatSummary().then((data) => {
          if (data) {
            // dispatcher.setChatSummaryList(data);
            if (data.length > 0) fetchChatDetails(data);
          }
        });
      }, 5000);
    }
  };

  const clearPoll = () => {
    pollingLog.debug('Clearing Interval...');
    clearInterval(pollId);
  };

  useEffect(() => {
    if (authState.authenticated === true) pollTest();
    return () => clearPoll();
  }, [authState.authenticated]);

  return (
    <InsideStack.Navigator>
      <InsideStack.Screen
        name="InsideTabNavigator"
        component={InsideTabNavigator}
        options={{ headerShown: false }}
      />
      <InsideStack.Screen
        name="ProfileStackNavigator"
        component={ProfileStackNavigator}
        options={{ headerShown: false }}
      />
    </InsideStack.Navigator>
  );
}

export default InsideStackNavigator;
