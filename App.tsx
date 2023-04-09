// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import ChatListHomeComponent from './components/ChatListHomeComponent';
import ChatWindowComponent from './components/ChatWindowComponent';
import axios from 'axios';

const baseUrl = 'http://10.0.2.2:3333/api/1.0.0';
const auth = 'a301c1603ac0ddbdc1be97d965fe867a';

const loginUser = async () => {
  
  let data = JSON.stringify({
    "email": "ashley.williams@mmu.ac.uk",
    "password": "Wr3xh4m!"
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

};

const logoutUser = async () => {

  let config = {
    method: 'post',
    // maxBodyLength: Infinity,
    url: `${baseUrl}/logout`,
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization' : '924174e0001c17ace2498bb4a9b13c55'
    }
  };

  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

};

const fetchUser = async () => {

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}/user/4`,
    headers: { 
      'X-Authorization': auth
    }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
};

const chatListView = [
  {
    "title": "I hate JS Group Chat",
    "preview": "I have an absolute hatered for javascript",
    "chat_id": 1,
    "user_name": "Zophia Javari",
    "isUnread": true
  },
  {
    "title": "I love JS",
    "preview": "JS is the superior programming language",
    "chat_id": 2,
    "user_name": "Mario Liberato",
    "isUnread": true
  },
  {
    "title": "",
    "preview": "I do not tilt after 4 rounds of shooters",
    "chat_id": 3,
    "user_name": "Briana Bolton",
    "isUnread": true
  },
  {
    "title": "Go repent!!!!!!!!!!",
    "preview": "You should because John Wick said so",
    "chat_id": 4,
    "user_name": "God Herself",
    "isUnread": false
  }
]

function signInLogic(email: string, password: string) {
  const valid_details = true
  return valid_details
}

function HomeScreen({ route, navigation }) {
  // const { user_id, user_email } = route.params;
  return (
    <>
      <View>
        <ChatListHomeComponent
          messages={chatListView}
          navigation={navigation}
        />
      </View>
    </>
  );
}

function ChatScreen() {
  return <>
    <View>
      <ChatWindowComponent />
    </View>
  </>
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
        console.log('Login pressed')
        route.params.setIsLoggedIn(true)
      }} />

      <Button title='Login' onPress={() => loginUser()} />
      <Button title='getUser' onPress={() => fetchUser()} />
      <Button title='Logout' onPress={() => logoutUser()} />
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

// function LoggedInScreens(){
//   return (
//     <Stack.Group>
//                 <Stack.Screen name="Home" 
//                   component={HomeScreen} options={{
//                   gestureEnabled: false,
//                   headerShown: true,
//                   headerLeft: () => <></> }} 
//               />
//               <Stack.Screen name="Details" component={DetailsScreen} />
//               <Stack.Screen name="Chat" component={ChatScreen} options={({ route }) => ({ 
//                   title: route.params.title, 
//                   chat_id: route.params.chat_id 
//                 })}
//               />
//       </Stack.Group>
//   );
// }
const Stack = createNativeStackNavigator();

function App() {

  const [isUserStateSet, setIsUserStateSet] = useState(false)

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
              <Stack.Screen name="Details" component={DetailsScreen} />
              <Stack.Screen name="Chat" component={ChatScreen} options={({ route }) => ({
                title: route.params.title,
                chat_id: route.params.chat_id
              })}
              />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="SignInTestScreen" component={SignInTestScreen}
                initialParams={{ setIsLoggedIn: setIsLoggedIn }} />
            </Stack.Group>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;