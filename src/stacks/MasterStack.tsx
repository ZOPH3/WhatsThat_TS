import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InsideStackNavigator from './InsideStack';
import OutsideStackNavigator from './OutsideStack';
import { useAuthContext } from '../lib/context/AuthContext';

const MasterStack = createNativeStackNavigator();

const MasterStackNavigator = () => {
  const authContext = useAuthContext();
  const { authState } = authContext;
  
  return (
    <MasterStack.Navigator>
      {authState.authenticated ? (
        <MasterStack.Screen
          name="InsideStackNavigator"
          component={InsideStackNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <MasterStack.Screen
          name="OutsideStackNavigator"
          component={OutsideStackNavigator}
          options={{ headerShown: false }}
        />
      )}
    </MasterStack.Navigator>
  );
};

export default MasterStackNavigator;
