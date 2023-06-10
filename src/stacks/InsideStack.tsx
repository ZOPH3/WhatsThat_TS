import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/**
 * Navigation responsible for authorised users
 */

import ProfileView from '../views/ProfileView';
import ChaSummaryView from '../views/ChaSummaryView';
import CreateChatView from '../views/CreateChatView';
import ChatView from '../views/ChatView';
import EditChatView from '../views/EditChatView';
import InviteUserView from '../views/InviteUserView';

import AddedUsersView from '../views/AddedUsersView';
import SearchUsersView from '../views/SearchUsersView';
import BlockedUsersView from '../views/BlockedUsersView';

const ChatStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const ContactStack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

const ChatStackNavigator = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="ChaSummaryView" component={ChaSummaryView} />
      <ChatStack.Screen name="CreateChatView" component={CreateChatView} />
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

const ContactStackNavigator = () => {
  return (
    <ContactStack.Navigator>
      <ContactStack.Screen name="AddedUsersView" component={AddedUsersView} />
      <ContactStack.Screen name="SearchUserView" component={SearchUsersView} />
      <ContactStack.Screen name="BlockedUsersView" component={BlockedUsersView} />
    </ContactStack.Navigator>
  );
};

const InsideStackNavigator = () => {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="ChatStackNavigator" component={ChatStackNavigator} />
      <InsideStack.Screen name="ProfileStackNavigator" component={ProfileStackNavigator} />
      <InsideStack.Screen name="ContactStackNavigator" component={ContactStackNavigator} />
    </InsideStack.Navigator>
  );
};

export default InsideStackNavigator;