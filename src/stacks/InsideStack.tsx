import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
import log from '../lib/util/LoggerUtil';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton } from 'react-native-paper';

const ChatStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const ContactTab = createMaterialTopTabNavigator();

const InsideStack = createNativeStackNavigator();
const InsideTab = createBottomTabNavigator();

const ContactTopTabNavigator = () => {
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
};

const ContactStackNavigator = ({ navigation }) => {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen
        name="ContactTopTabNavigator"
        component={ContactTopTabNavigator}
        options={{
          title: 'Contacts',
          headerRight: () => (
            <IconButton
              icon="plus"
              size={20}
              onPress={() => navigation.navigate('SearchUsersView')}
            />
          ),
        }}
      />
      <InsideStack.Screen
        name="SearchUsersView"
        component={SearchUsersView}
        options={{
          title: 'Search Users',
        }}
      />
    </InsideStack.Navigator>
  );
};

const ChatStackNavigator = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="ChatSummaryView" component={ChatSummaryView} />
      <ChatStack.Screen name="ChatView" component={ChatView} />

      <ChatStack.Screen name="EditChatView" component={EditChatView} />
      <ChatStack.Screen name="InviteUserView" component={InviteUserView} />
    </ChatStack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileView" component={ProfileView} />
    </ProfileStack.Navigator>
  );
};

const InsideTabNavigator = () => {
  return (
    <InsideTab.Navigator initialRouteName="ChatStackNavigator">
      <InsideTab.Screen
        name="ChatStackNavigator"
        component={ChatStackNavigator}
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Icons name={'chat'} size={size} color={color} />,
        }}
      />
      <InsideTab.Screen
        name="ContactStackNavigator"
        component={ContactStackNavigator}
        options={{
          headerShown: false,
          title: 'Contacts',
          tabBarIcon: ({ color, size }) => <Icons name={'contacts'} size={size} color={color} />,
        }}
      />
    </InsideTab.Navigator>
  );
};

const InsideStackNavigator = () => {
  const { useFetch } = useApiContext();
  const { authState, setAuthState } = useAuthContext();

  if (!useFetch) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  //FIXME: Move to a loader component
  const fetch = async () => {
    const user = await useFetch({ url: `/user/${authState.id}` }, true);
    if (user) {
      setAuthState({
        ...authState,
        current_user: user,
      });
    }
  };

  useEffect(() => {
    fetch();
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
};

export default InsideStackNavigator;
