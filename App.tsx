// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserModel } from './core/models/UserModel';
import User from './core/classes/User';
import { storeDataJson } from './template/AsyncStorageTemplate';
import { useState } from 'react';

function signInLogic(email: string, password: string) {
  const valid_details = true
  return valid_details
}

function HomeScreen({ route, navigation }) {
  const { user_id, user_email } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>user_email: {JSON.stringify(user_email)}</Text>

      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function SignInTestScreen({ route, navigation }) {

  return <>
    <View>
      <Button title='SignIn' onPress={() => {
        if (signInLogic('fromsigninpage', 'l')) {
          navigation.push('Home', {
            user_id: 1,
            user_email: 'fromsigninpage'
          })
        }
        console.log('Login pressed')
      }} />
    </View>
  </>

}

// function DetailsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//       <Button
//         title="Go to Details... again"
//         onPress={() => navigation.navigate('Details')}
//       />
//       <Button
//         title="Go to Details... by making another screen"
//         onPress={() => navigation.push('Details')}
//       />
//       <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//       <Button
//         title="Go back to first screen in stack"
//         onPress={() => navigation.popToTop()}
//       />
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();

function App() {

  const [isUserStateSet, setIsUserStateSet] = useState(false)

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignInTestScreen">
        <Stack.Screen name="SignInTestScreen" component={SignInTestScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{
          gestureEnabled: false,
          headerShown: true,
          headerLeft: () => <></>,
        }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;