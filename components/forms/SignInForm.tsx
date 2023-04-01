import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet, TextInput, Text, Alert } from 'react-native';
import User from "../../core/classes/User";

export default function SignInForm(props: any) {

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  function createUser(): User {
    const _User = new User()
    _User.setEmail(email)
    _User.setPassword(password)
    return _User;
  }

  function trySignIn() {

    const user = createUser();

    if (user.email != '' && user.password != '') {
      props.setUser(user);
      props.setFormState({ isLoading: true });

      onChangeEmail('');
      onChangePassword('');
      
    } else {
      Alert.alert("WRONG!")
    }
  }

  return <>
    <SafeAreaView>
      <TextInput onChangeText={onChangeEmail} value={email} placeholder='Enter your email' />
      <TextInput onChangeText={onChangePassword} value={password} placeholder='Enter your password' />

      <Text>{email}</Text>

      <Button
        title="Sign In"
        onPress={() => {
          trySignIn()
        }}
      />
    </SafeAreaView>
  </>

}
