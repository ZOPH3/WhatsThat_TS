import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../screens/conversation/message.list.screen';
import { TabNavigator } from './contacts.tab.navigator';
import ModalScreen from '../components/modal.component';

const Stack = createNativeStackNavigator();

function AuthorisedNavigator() {
  return (
    <>
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params.title,
          chat_id: route.params.chat_id,
        })}
      />
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
    </>
  );
}

export default AuthorisedNavigator;
