import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Button, TextInput } from '@react-native-material/core';

import HomeScreen from './src/screens/chatList/ChatListScreen';
import ChatScreen from './src/screens/conversation/ConversationScreen';
import UnauthorisedScreen from './src/screens/login/LoginScreen';
import ChatService from './src/services/chat.services';

const Stack = createNativeStackNavigator();

function ModalScreen({ navigation }) {
  const [text, setText] = useState('')
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Create New Chat</Text>
      <TextInput style={{ width: "90%" }} value={text} onChangeText={(e) => setText(e)} />
      <Button title='Create' onPress={() => { ChatService.newChat({ "name": text }) }} />
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [tempToken, setTempToken] = useState('')
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          isLoggedIn ? (
            <Stack.Group>
              <Stack.Screen name="Home"
                component={HomeScreen} options={{
                  gestureEnabled: false,
                  headerShown: true,
                  headerLeft: () => <></>,
                }}
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
              <Stack.Screen name="SignInScreen" component={UnauthorisedScreen}
                initialParams={{
                  setIsLoggedIn: setIsLoggedIn,
                  setTempToken: setTempToken
                }} />
            </Stack.Group>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;