import React, { useEffect } from 'react';
import { Appbar, HelperText, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import ButtonComponent from '../../components/Button';

import { useAuth } from '../../lib/context/auth';
import useFetchHook from '../../lib/hooks/useFetchHook';

import styles from '../../styles/GlobalStyle';
import { TSignUpResponse } from '../../lib/types/TSchema';
import { useNotification } from '../../lib/context/notification';

const defaultText = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
};

function RegisterView({ navigation }) {
  const n = useNotification();

  const [seePass, setSeePass] = React.useState(false);
  const [text, setText] = React.useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  const { setAuthState } = useAuth();

  const register = useFetchHook({ url: '/user', method: 'POST', data: { ...text } }, false);

  const emailErrors = () => {
    if (text.email === '') return false;
    return !text.email.includes('@');
  };
  const passwordErrors = () => {
    if (text.password === '') return false;

    const regex = '^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$';

    return !(text.password.length > 8) || text.password.match(regex);
  };
  const firstNameErrors = () => {
    if (text.first_name === '') return false;
    return !(text.first_name.length > 1);
  };
  const lastNameErrors = () => {
    if (text.last_name === '') return false;
    return !(text.last_name.length > 1);
  };

  const onRegister = async () => {
    register
      .onFetch(async () => register.getFresh())
      .then((data: TSignUpResponse) => {
        if (!data) return;
        if (!data.user_id) return;
        n.dispatcher.addNotification({
          type: 'success',
          message: 'Successfully registered, you can login!',
        });
        setText({ ...defaultText });
        navigation.navigate('LoginView');
      })
      .catch((err) => {
        console.log('err', err);
        setAuthState({
          id: undefined,
          current_user: undefined,
          token: undefined,
          authenticated: false,
        });
      });
  };

  return (
    <View style={{ margin: 10, justifyContent: 'center', alignContent: 'center' }}>
      <Appbar.Header>
        <Appbar.Content title="Register" />
      </Appbar.Header>
      <TextInput
        mode="outlined"
        label="First Name"
        value={text.first_name}
        onChangeText={(e) => setText({ ...text, first_name: e })}
      />
      <HelperText type="error" visible={firstNameErrors()}>
        First name can not be 1 character!
      </HelperText>
      <TextInput
        mode="outlined"
        label="Last Name"
        value={text.last_name}
        onChangeText={(e) => setText({ ...text, last_name: e })}
      />
      <HelperText type="error" visible={lastNameErrors()}>
        Last name can not be 1 character!
      </HelperText>
      <TextInput
        mode="outlined"
        label="Email"
        value={text.email}
        onChangeText={(e) => setText({ ...text, email: e })}
      />
      <HelperText type="error" visible={emailErrors()}>
        Email address is invalid!
      </HelperText>
      <TextInput
        mode="outlined"
        label="Password"
        value={text.password}
        secureTextEntry={!seePass}
        right={<TextInput.Icon onPress={() => setSeePass(!seePass)} icon="eye" />}
        onChangeText={(e) => setText({ ...text, password: e })}
      />
      <HelperText type="error" visible={passwordErrors()}>
        Password must be 8 characters, contain 1 uppercase, 1 lowercase and 1 number!
      </HelperText>
      <ButtonComponent
        title="Register"
        onPress={async () => {
          await onRegister();
        }}
        loading={register.isLoading}
        mode="contained"
      />
    </View>
  );
}

export default RegisterView;
