import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { IAuthState, useAuthContext } from '../lib/context/AuthContext';
import { useGlobalContext } from '../lib/context/GlobalContext';
import { getCachedData } from '../lib/services/CacheService';
import { ActivityIndicator } from 'react-native-paper';
import { TLoginResponse, TUser } from '../lib/types/TSchema';

/**
 * - Read state from context
 * - Render UI from state
 */

const SplashView = () => {
  const authContext = useAuthContext();
  const { setAuthState } = authContext;
  const { initialise } = useGlobalContext();

  const getState = async () => {
    let state: IAuthState = {
      id: undefined,
      current_user: undefined,
      token: undefined,
      authenticated: false,
    };

    try {
      const login = (await getCachedData('/login')) as TLoginResponse;

      if (login && login.id && login.token) {
        const user = (await getCachedData('/user/' + login.id)) as TUser;

        if (user) {
          state = {
            authenticated: true,
            current_user: user,
            id: login.id,
            token: login.token,
          };
        }
      }
    } catch (e) {
      console.log(e);
    }

    setAuthState(state);
    if (initialise) initialise();
  };

  useEffect(() => {
    setTimeout(function () {
      getState();
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} size={80} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
});

export default SplashView;
