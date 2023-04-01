import React, { useEffect, useState } from "react";
import { Button, Text } from 'react-native';

import SignInForm from "../../components/forms/SignInForm";
import User from "../classes/User";

export default function SignInScreen() {
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