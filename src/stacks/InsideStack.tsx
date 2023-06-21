import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/**
 * Navigation responsible for authorised users
 */

import ProfileView from '../views/ProfileView';
import ChatSummaryView from '../views/ChaSummaryView';
import CreateChatView from '../views/CreateChatView';
import ChatView from '../views/ChatView';
import EditChatView from '../views/EditChatView';
import InviteUserView from '../views/InviteUserView';

import AddedUsersView from '../views/AddedUsersView';
import SearchUsersView from '../views/SearchUsersView';
import BlockedUsersView from '../views/BlockedUsersView';
import { useApiContext } from '../lib/context/ApiContext';
import { useAuthContext } from '../lib/context/AuthContext';
import log from '../lib/util/LoggerUtil';

const ChatStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const ContactStack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

const ChatStackNavigator = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="ChatSummaryView" component={ChatSummaryView} />
      <ChatStack.Screen
        name="CreateChatView"
        component={CreateChatView}
        options={{ title: 'Create new chat' }}
      />
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
  const { useFetch } = useApiContext();
  const { authState, setAuthState } = useAuthContext();

  if (!useFetch) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  //FIXME: Move to a loader component
  const fetch = async () => {
    const user = await useFetch({ url: `/user/${authState.user_id}` }, true);
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
        name="ChatStackNavigator"
        component={ChatStackNavigator}
        options={{ headerShown: false }}
      />
      <InsideStack.Screen
        name="ProfileStackNavigator"
        component={ProfileStackNavigator}
        options={{ headerShown: false }}
      />
      <InsideStack.Screen
        name="ContactStackNavigator"
        component={ContactStackNavigator}
        options={{ headerShown: false }}
      />
    </InsideStack.Navigator>
  );
};

export default InsideStackNavigator;
