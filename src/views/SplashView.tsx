import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuthContext } from '../lib/context/AuthContext';
import { useGlobalContext } from '../lib/context/GlobalContext';
import { getCachedData } from '../lib/services/CacheService';
import { ActivityIndicator } from 'react-native-paper';

/**
 * - Read state from context
 * - Render UI from state
 */

const SplashView = ({ navigation }) => {
  const authContext = useAuthContext();
  const { setAuthState } = authContext;
  const { initialise } = useGlobalContext();
 
  const getState = async () => {
    const login = await getCachedData('/login');

    if (!login || !login.id || !login.token) {
      setAuthState({
        id: undefined,
        current_user: undefined,
        token: undefined,
        authenticated: false,
      });
    } else {
      setAuthState({
        authenticated: true,
        current_user: undefined,
        id: login.id,
        token: login.token,
      });
    }

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
