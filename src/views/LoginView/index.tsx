import React, { useEffect } from 'react';
import { HelperText, TextInput } from 'react-native-paper';
import { View } from 'react-native';

import { useAuth } from '../../lib/context/auth';
import useFetchHook from '../../lib/hooks/useFetchHook';

import ButtonComponent from '../../components/Button';

import styles from '../../styles/GlobalStyle';

function LoginView() {
  const user = {
    email: 'newwilliams@mmu.ac.uk',
    password: 'Characters1*',
    // email: 'ashley.williams@mmu.ac.uk',
    // password: 'Wr3xh4m!',
  };

  const [text, setText] = React.useState({ email: '', password: '' });
  const { authState, setAuthState } = useAuth();

  const { isLoading, onFetch, getFresh } = useFetchHook(
    { url: '/login', method: 'POST', data: { ...text } },
    false
  );

  const getUser = useFetchHook({ url: `/user/${authState.id}` }, true);

  const emailErrors = () => {
    if (text.email === '') return false;
    return !text.email.includes('@');
  };
  const passwordErrors = () => {
    if (text.password === '') return false;

    const regex = '^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$';

    return !(text.password.length > 8) || text.password.match(regex);
  };
  const onLogin = async () => {
    onFetch(async () => getFresh())
      .then((data) => {
        if (!data) return;
        if (data && data.id && data.token) {
          setAuthState({
            id: data.id,
            current_user: undefined,
            token: data.token,
            authenticated: false,
          });
          return data;
        }
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

  useEffect(() => {
    if (authState.id && authState.token) {
      getUser.getFresh().then((data) => {
        if (data) {
          console.log('data', data);
          setAuthState({
            ...authState,
            current_user: data,
            authenticated: true,
          });
        }
      });
    }
  }, [authState]);

  return (
    <View style={{ margin: 10 }}>
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
        onChangeText={(e) => setText({ ...text, password: e })}
      />
      <HelperText type="error" visible={passwordErrors()}>
        Password must be 8 characters, contain 1 uppercase, 1 lowercase and 1 number!
      </HelperText>
      <ButtonComponent
        title="Login"
        onPress={async () => {
          await onLogin();
        }}
        loading={isLoading}
        mode="contained"
      />
    </View>
  );
}

export default LoginView;
