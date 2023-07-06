import React, { useEffect } from 'react';
import { TextInput } from 'react-native-paper';
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
    { url: '/login', method: 'POST', data: { ...user } },
    false
  );

  const getUser = useFetchHook({ url: `/user/${authState.id}` }, true);

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
      // .then((res) => {
      //   if (authState.id && authState.token) {
      //     getUser.getFresh().then((data) => {
      //       if (data) {
      //         setAuthState({
      //           ...authState,
      //           current_user: data.data,
      //           authenticated: true,
      //         });
      //       }
      //     });
      //   }
      // })
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
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={text.email}
        onChangeText={(e) => setText({ ...text, email: e })}
      />
      <TextInput
        label="Password"
        value={text.password}
        onChangeText={(e) => setText({ ...text, password: e })}
      />
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
