import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

import ChatScreen from './core/screens/ChatScreen';
import HomeScreen from './core/screens/HomeScreen';
import UnauthorisedScreen from './core/screens/UnauthorisedScreen';


const Stack = createNativeStackNavigator();

function App() {

  // const [isUserStateSet, setIsUserStateSet] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
                  headerLeft: () => <></>
                }}
              />
              {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
              <Stack.Screen name="Chat" component={ChatScreen} options={({ route }) => ({
                title: route.params.title,
                chat_id: route.params.chat_id
              })}
              />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="SignInScreen" component={UnauthorisedScreen}
                initialParams={{ setIsLoggedIn: setIsLoggedIn }} />
            </Stack.Group>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;