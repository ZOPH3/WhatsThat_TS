import React, { useEffect } from 'react';
import { Appbar, HelperText, TextInput } from 'react-native-paper';
import { View } from 'react-native';

import { useAuth } from '../../lib/context/auth';
import useFetchHook from '../../lib/hooks/useFetchHook';
import ButtonComponent from '../../components/Button';

function LoginView() {
  const [seePass, setSeePass] = React.useState(false);
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
    <View style={{ margin: 10, justifyContent: 'center', alignContent: 'center' }}>
      <Appbar.Header>
        <Appbar.Content title="Login" />
      </Appbar.Header>
      <TextInput
        mode="outlined"
        label="Email"
        value={text.email}
        onChangeText={(e) => setText({ ...text, email: e.toLowerCase() })}
      />
      <HelperText type="error" visible={emailErrors()}>
        Email address is invalid!
      </HelperText>
      <TextInput
        mode="outlined"
        label="Password"
        value={text.password}
        onChangeText={(e) => setText({ ...text, password: e })}
        secureTextEntry={!seePass}
        right={<TextInput.Icon onPress={() => setSeePass(!seePass)} icon="eye" />}
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
