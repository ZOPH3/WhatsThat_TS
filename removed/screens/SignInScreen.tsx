import React, { useEffect, useState } from "react";
import { Button, Text, View } from 'react-native';
import axios from 'axios';

import SignInForm from "../../components/forms/SignInForm";
import User from "../classes/User";


const baseUrl = 'http://10.0.2.2:3333/api/1.0.0';
const auth = 'a301c1603ac0ddbdc1be97d965fe867a';
const user = {
  "email": "ashley.williams@mmu.ac.uk",
  "password": "Wr3xh4m!2"
}

const loginUser = async () => {
  
  let data = JSON.stringify(user);

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
      // console.log(JSON.stringify(response.data));
      return response
    })
    .catch((error) => {
      console.log("error ", error);
      return error
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

function SignInTestScreen({ route, navigation }) {

  return <>
    <View>
      <Button title='Login' onPress={() => {
          
          loginUser().then(route.params.setIsLoggedIn(true), () => console.log("Failed to login")
          
          ); 
          
        }} />
      <Button title='getUser' onPress={() => fetchUser()} />
      <Button title='Logout' onPress={() => logoutUser()} />
    </View>
  </>

}

export default function SignInScreena() {
  const [user, setUser] = useState(new User());
  const [formState, setFormState] = useState({ isLoading: false })

  useEffect(() => {
    if (formState.isLoading) {
      console.log("something")
    }
  }, [formState])

  return <>
    <SignInForm user={user}
      setUser={setUser}
      setFormState={setFormState} />
    <Text>hello {user.email}</Text>
    <Button title="CLICK" onPress={() => setFormState({ isLoading: false })} />

    {formState.isLoading && <Text>isLoading</Text>}
  </>
}