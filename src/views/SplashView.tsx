import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuthContext } from '../lib/context/AuthContext';
import { useGlobalContext } from '../lib/context/GlobalContext';
import { getCachedData } from '../lib/services/CacheService';
import IsLoadingIndicator from '../components/LoadingIndicator';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * - Read state from context
 * - Render UI from state
 */

const SplashView = ({ navigation }) => {
  const authContext = useAuthContext();
  const { setAuthState } = authContext;
  const { initialise } = useGlobalContext();

  const getState = () => {
    try {
      getCachedData('/login')
        .then((login) => {
          if (!login) {
            throw new Error('No login data');
          }
          console.log('getCachedAuthState', login);
          setAuthState({
            authenticated: true,
            current_user: undefined,
            id: login.id,
            token: login.token,
          });
        })
        .catch((err) => {
          // throw new Error('No cache found (Login)');
        });
    } catch (error) {
      setAuthState({
        id: undefined,
        current_user: undefined,
        token: undefined,
        authenticated: false,
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
