import React from 'react';
import { AxiosError } from 'axios';
import { Snackbar, TextInput } from 'react-native-paper';
import { View } from 'react-native';

import log from '../../lib/util/LoggerUtil';

import { useApiContext } from '../../lib/context/ApiContext';
import { useAuthContext } from '../../lib/context/AuthContext';

import ButtonComponent from '../../components/Button';
import { styles } from '../../styles/GlobalStyle';

const LoginView = () => {
  const { useFetch } = useApiContext();
  const { setAuthState } = useAuthContext();

  if (!useFetch) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const user = {
    // email: 'newwilliams@mmu.ac.uk',
    // password: 'Characters1*',
    email: 'ashley.williams@mmu.ac.uk',
    password: 'Wr3xh4m!',
  };

  const [isLoading, setIsLoading] = React.useState(false);
  const [onError, setOnError] = React.useState<string | undefined>(undefined);
  const [text, setText] = React.useState({ email: '', password: '' });

  const onLogin = async (email: string, password: string) => {
    /**
     * Fetch
     */
    setIsLoading(true);

    const data = await useFetch(
      { url: '/login', method: 'POST', data: { email: email, password: password } },
      false,
      setIsLoading
    ).catch((err: AxiosError) => {
      const msg = err.request?.response
        ? err.request.response
        : 'Timeout: It took more than 5 seconds to get the result!';
      setOnError(msg);
    });

    if (data) {
      setAuthState({ accessToken: data.token, authenticated: true });
    }
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
          await onLogin(user.email, user.password);
        }}
        loading={isLoading}
        mode="contained"
      />
      <Snackbar visible={onError !== undefined} onDismiss={() => setOnError(undefined)}>
        {onError}
      </Snackbar>
    </View>
  );
};

export default LoginView;
