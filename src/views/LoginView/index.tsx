import React from 'react';
import { TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { useAuthContext } from '../../lib/context/AuthContext';

import ButtonComponent from '../../components/Button';
import { styles } from '../../styles/GlobalStyle';
import useFetchHook from '../../lib/hooks/useFetchHook';

const LoginView = () => {
  const user = {
    // email: 'newwilliams@mmu.ac.uk',
    // password: 'Characters1*',
    email: 'ashley.williams@mmu.ac.uk',
    password: 'Wr3xh4m!',
  };

  const [text, setText] = React.useState({ email: '', password: '' });
  const { setAuthState } = useAuthContext();

  const { isLoading, onFetch, getFresh } = useFetchHook(
    { url: '/login', method: 'POST', data: { ...user } },
    false
  );

  const onLogin = async () => {
    onFetch(async () => await getFresh())
      .then((data) => {
        if (!data) return;
        if (data && data.id && data.token)
          setAuthState({
            id: data.id,
            current_user: undefined,
            token: data.token,
            authenticated: true,
          });
      })
      .catch();
  };

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
        title={'Login'}
        onPress={async () => {
          await onLogin();
        }}
        loading={isLoading}
        mode="contained"
      />
    </View>
  );
};

export default LoginView;
