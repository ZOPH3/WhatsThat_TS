import React, { useState } from "react";
import { Alert, Button, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import User from "../../core/classes/User";

export default function SignUpForm() {

  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [firstname, onChangeFirstname] = useState('');
  const [lastname, onChangeLastname] = useState('');

  function SignUpRequest() {
    const _User = new User()

    _User.setEmail(email)
    _User.setFirstName(firstname)
    _User.setLastName(lastname)
    _User.setPassword(password)

    return _User;
  }

  return <>
    <SafeAreaView>
      <TextInput onChangeText={onChangeFirstname} value={firstname} placeholder='Enter your First Name' />
      <TextInput onChangeText={onChangeLastname} value={lastname} placeholder='Enter your Last Name' />
      <TextInput onChangeText={onChangeEmail} value={email} placeholder='Enter your Email' />
      <TextInput onChangeText={onChangePassword} value={password} placeholder='Enter your Password' />
      <Button
        title="Sign In"
        onPress={() => SignUpRequest()}
      />
    </SafeAreaView>
  </>

}

