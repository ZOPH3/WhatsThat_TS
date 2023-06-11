import React from 'react';
import { Snackbar, TextInput } from 'react-native-paper';
import { View } from 'react-native';

import log from '../../lib/util/LoggerUtil';

import { useApiContext } from '../../lib/context/ApiContext';
import { useAuthContext } from '../../lib/context/AuthContext';

import ButtonComponent from '../../components/Button';
import { styles } from '../../styles/GlobalStyle';
import { TLoginResponse } from '../../lib/types/TSchema';
import SnackbarComponent from '../../components/SnackBar';

const LoginView = () => {
  const { useApi } = useApiContext();
  const { setAuthState } = useAuthContext();

  if (!useApi) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const user = {
    email: 'newwilliams@mmu.ac.uk',
    password: 'Characters1*a',
  };

  const [isLoading, setIsLoading] = React.useState(false);
  const [onError, setOnError] = React.useState<string | undefined>(undefined);
  const [onSuccess, setOnSuccess] = React.useState<TLoginResponse | undefined>(undefined);
  const [text, setText] = React.useState({ email: '', password: '' });

  const onLogin = async (email: string, password: string) => {
    /**
     * Fetch
     */
    setIsLoading(true);
    await useApi(
      { url: '/login', method: 'POST', data: { email: email, password: password } },
      false,
      { isLoading: setIsLoading, onError: setOnError, onSuccess: setOnSuccess }
    );

    if (onError) {
      // <SnackbarComponent text={onError? onError : 'Unable to login'} toggleVisible={true} />;
      <Snackbar
        visible={true}
        children={undefined}
        onDismiss={function (): void {
          throw new Error('Function not implemented.');
        }}
      />;
      log.error('' + onError);
    }

    if (onSuccess) {
      setAuthState({
        accessToken: onSuccess.token,
        authenticated: true,
      });
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
