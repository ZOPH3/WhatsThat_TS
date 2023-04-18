import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

import ChatScreen from './core/screens/ChatScreen';
import HomeScreen from './core/screens/HomeScreen';
import UnauthorisedScreen from './core/screens/UnauthorisedScreen';
import { Button, IconButton } from '@react-native-material/core';


const Stack = createNativeStackNavigator();

function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
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
                  headerRight: () => (
                    <>
                      {/* <IconButton
                        icon={props => 
                        <Icon name="plus" {...props} />}
                        color="primary" 
                        onPress={() => {
                          navigation.push('AddNew', {})
                      }}/> */}
                    </>
                  ),
                }}
              />
              <Stack.Screen name="MyModal" component={ModalScreen} />
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