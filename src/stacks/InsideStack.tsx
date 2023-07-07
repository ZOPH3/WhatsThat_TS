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

import { useAuth } from '../lib/context/auth';
import useChatController from '../lib/controller/ChatController';

import log, { apiLog, pollingLog, rootLog } from '../lib/util/LoggerUtil';
import { getCachedData } from '../lib/services/CacheService';
import { TDraftMessage } from '../lib/context/services/types';
import PollingService, { pollingItem } from '../lib/services/PollingService';
import DraftController from '../lib/controller/DraftController';

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
  return (
    <InsideStack.Navigator>
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
        options={{
          headerShown: false,
        }}
      />
      <ChatStack.Screen
        name="ChatView"
        component={ChatView}
        options={{
          headerShown: false,
        }}
      />

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
  const { authState } = useAuth();
  const { fetchChatDetails, fetchChatSummary } = useChatController();
  const { addPolling, clearAllPolling, startAllPolling } = PollingService();
  const d = DraftController();
  const fetch = () => {
    fetchChatSummary().then((data) => {
      if (data) {
        if (data.length > 0) {
          fetchChatDetails(data);
        }
      }
    });
  };

  const queuePolling = () => {
    pollingLog.debug('Queueing Polling...');
    addPolling(fetch, 50000);
    addPolling(d.checkDraft, 50000);
  };

  useEffect(() => {
    if (authState.authenticated === true) {
      queuePolling();
      startAllPolling();
    }

    return () => clearAllPolling();
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
