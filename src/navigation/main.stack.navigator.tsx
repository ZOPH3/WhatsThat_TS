import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';

import ChatScreen from '../screens/conversation/message.list.screen';
import { TabNavigator } from './contacts.tab.navigator';
import { AuthContext } from '../context/auth.context';
import { AuthTabNavigator } from './unauthorised.tab.navigator';
import ModalScreen from '../components/modal.component';
import BlockedScreen from '../screens/account/blocked.list.screen';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          isLoggedIn ? (
            <Stack.Group>
              <Stack.Screen
                name="Home"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="MyModal" component={ModalScreen} options={{
                gestureEnabled: false, headerShown: false, headerLeft: () => <></>
              }} />
              <Stack.Screen name="Chat" component={ChatScreen} options={({ route }) => ({
                title: route.params.title, chat_id: route.params.chat_id
              })}
              />
              <Stack.Screen name="Blocked List" component={BlockedScreen}/>
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen options={{ headerShown: false }} name="UnAuthorised" component={AuthTabNavigator} />
            </Stack.Group>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;