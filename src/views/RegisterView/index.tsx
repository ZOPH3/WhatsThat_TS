/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TSignUpResponse, TAddUser } from '../../lib/types/TSchema';
import UserServices from '../../lib/services/UserServices';
import { useApi } from '../../lib/context/api';

function RegisterView({ navigation }) {
  const { apiCaller } = useApi();
  const { register } = UserServices(apiCaller);

  const [input, setInput] = useState<TAddUser | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  function _send() {
    setError(undefined);
    if (!input) return setError('Please fill in all fields');
    setIsLoading(true);
    if (input) {
      register(input)
        .then((res) => {
          if (res) return navigation.navigate('LoginView');
          throw new Error('Unable to register...');
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }

  return (
    <View>
      <Text>RegisterView</Text>
    </View>
  );
}

export default RegisterView;
