import React, { useEffect, useState } from "react";
import { Button, Text, View } from 'react-native';
// import axios from 'axios';

import ApiUserClient from "../api/ApiUserClient";
const UserApi = new ApiUserClient('http://10.0.2.2:3333/api/1.0.0', '');

const user = {
  "email": "ashley.williams@mmu.ac.uk",
  "password": "Wr3xh4m!"
}

function UnauthorisedScreen({ route, navigation }) {

  return <>
    <View>
      <Button title='Login' onPress={() => {

        UserApi.login(user.email, user.password)
          .then(
            (element) => {
              console.log('Successfully Logged in')
              UserApi.setAuth(element.data.token)
              // route.params.setIsLoggedIn(true)
            },
            () => console.log("Failed to login")
          );

      }} />
      <Button title='getUser' onPress={() => {
        UserApi.getUserById(1).then(
          (user) => console.log(user.data), 
          () => console.log("Unable to get User"))
      }} />
      <Button title='Logout' onPress={() => {
        UserApi.logout().then(
          () => console.log("Logged Out"),
          () => console.log("Unable to log out"))
      }} />
    </View>
  </>

}

export default UnauthorisedScreen;

// export default function SignInScreen() {
//   const [user, setUser] = useState(new User());
//   const [formState, setFormState] = useState({ isLoading: false })

//   useEffect(() => {
//     if (formState.isLoading) {
//       console.log("something")
//     }
//   }, [formState])

//   return <>
//     <SignInForm user={user}
//       setUser={setUser}
//       setFormState={setFormState} />
//     <Text>hello {user.email}</Text>
//     <Button title="CLICK" onPress={() => setFormState({ isLoading: false })} />

//     {formState.isLoading && <Text>isLoading</Text>}
//   </>
// }