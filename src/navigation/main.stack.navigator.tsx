import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';

import ChatScreen from '../screens/conversation/message.list.screen';
import { TabNavigator } from './tab.navigator';
import { AuthContext } from '../context/classes/auth.context';
import { UnAuthTabNavigator } from './unauthorised.tab.navigator';
import ModalScreen from '../components/modal.component';
import AddContactScreen from '../screens/account/addContact.screen';

export type MainStackNavigator = {
  Home: undefined;
  MyModal: undefined;
  Chat: { title: string; chat_id: number };
  UnAuthorised: undefined;
  AddContact: undefined;
};
const Stack = createNativeStackNavigator<MainStackNavigator>();

function StackNavigator() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Group>
            <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen
              name="MyModal"
              component={ModalScreen}
              options={{
                gestureEnabled: false,
                headerShown: false,
                headerLeft: () => <></>,
              }}
            />
            <Stack.Screen
              name="Add Contact"
              component={AddContactScreen}
              options={{
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              options={({ route }) => ({
                title: route.params.title,
                chat_id: route.params.chat_id,
              })}
            />
            {/* <Stack.Screen name="Blocked List" component={BlockedScreen} /> */}
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              options={{ headerShown: false }}
              name="UnAuthorised"
              component={UnAuthTabNavigator}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
