import React, { useState } from "react";
import {Alert, Button, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import { UserModel } from "../models/UserModel";
import UserAsyncStorage from "../storage/UserAsyncStorage";

const _UserAsyncStorage : IStorageRequest<UserModel> = new UserAsyncStorage();

function setAuth(user: UserModel){
  _UserAsyncStorage.storeData(user)
}

const exampleUser : UserModel = {
  firstname: "Mario",
  lastname: "Liberato",
  id: 44,
  email: "sdfsdfsdsdfsdf@gmail.com",
  token: 'asfsfsdfdfs'
}

const user : UserModel = {
  firstname: "",
  lastname: "",
  id: 0,
  email: ""
}

function SignInRequest(username : string, password : string){
  // TODO: API call, get token if successful
  const APIRequest = null;
  
  if(APIRequest === null) {
    Alert.alert("Your credentials are incorrect", 
                "Username:"+ username + " Password:" + password)
  } else {
    
  }
}

export default function SignInScreen() {
  // const [authUser, setAuthUser] = useState<UserModel>(user)

  // _UserAsyncStorage.storeData(exampleUser)

  // const x = _UserAsyncStorage.getData();

  // x.then((response: any) => response)
  //   .then((data: React.SetStateAction<UserModel>) => {
  //     setAuthUser(data)
  //   })
  //   .catch(console.error);

  // return <>
  //   <View>
  //     <Text>helloo {authUser.firstname} </Text>
  //   </View>
  // </>

  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');

  return <>
    <SafeAreaView>
      <TextInput onChangeText={onChangeUsername} value={username} placeholder='Enter your username'/>
      <TextInput onChangeText={onChangePassword} value={password} placeholder='Enter your password'/>
      <Button
        title="Sign In"
        onPress={() => SignInRequest(username, password)}
      />
    </SafeAreaView>
  </>

}

