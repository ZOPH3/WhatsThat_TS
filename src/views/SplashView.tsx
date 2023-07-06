import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { useAuth } from '../lib/context/auth';
import { useGlobal } from '../lib/context/global';

import { getCachedData } from '../lib/services/CacheService';

import { IAuthState } from '../lib/context/auth/types';
import { TLoginResponse, TUser } from '../lib/types/TSchema';
/**
 * - Read state from context
 * - Render UI from state
 */

function SplashView() {
  const authContext = useAuth();
  const { setAuthState } = authContext;
  const { initialise } = useGlobal();

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
        const user = (await getCachedData(`/user/${login.id}`)) as TUser;

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
      <ActivityIndicator animating size={80} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
});

export default SplashView;
