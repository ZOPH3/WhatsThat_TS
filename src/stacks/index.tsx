import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuthContext } from '../context/AuthContext';
import MasterStackNavigator from './MasterStack';

//TODO Add the splash screen here and the state such as loading can be dealt with at this level.
const StackNavigator = () => {
  const { authState } = useAuthContext();
  const { authenticated } = authState;

  return (
    <NavigationContainer>
      <MasterStackNavigator auth={authenticated} />
    </NavigationContainer>
  );
};

export default StackNavigator;
