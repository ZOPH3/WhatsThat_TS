import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { Button, TextInput } from '@react-native-material/core';
import ChatScreen from '../screens/conversation/ConversationScreen';
import UnauthorisedScreen from '../screens/login/LoginScreen';
import ChatService from '../services/chat.services';
import { TabNavigator } from '../navigation/TabNavigator';
import { useAppSelector } from '../redux/hooks';

const Stack = createNativeStackNavigator();

function ModalScreen({ navigation }) {
  const [text, setText] = useState('')
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Create New Chat</Text>
      <TextInput style={{ width: "90%" }} value={text} onChangeText={(e) => setText(e)} />
      <Button title='Create' onPress={() => { ChatService.startNewConversation(text) }} />
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}


function StackNavigator() {
  // const { isLoggedIn } = useContext(AuthContext);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  return (
    // FIXME: Dev mode runs 2 fetch twice, so strict mode removes it but also isnt the correct thing to do i think
    // <React.StrictMode> 
    <NavigationContainer>
      <Stack.Navigator>
        {
          isLoggedIn ? (
            <Stack.Group>
              {/* <Stack.Screen name="Home"
                component={HomeScreen} options={{
                  gestureEnabled: false,
                  headerShown: true,
                  headerLeft: () => <></>,
                }}
              /> */}
              <Stack.Screen
                name="Home"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="MyModal" component={ModalScreen} options={{
                gestureEnabled: false,
                headerShown: false,
                headerLeft: () => <></>
              }} />
              <Stack.Screen name="Chat" component={ChatScreen} options={({ route }) => ({
                title: route.params.title,
                chat_id: route.params.chat_id
              })}
              />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="SignInScreen" component={UnauthorisedScreen} />
            </Stack.Group>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
    // </React.StrictMode>

  );
}

export default StackNavigator;
