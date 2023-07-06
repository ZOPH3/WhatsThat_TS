import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InsideStackNavigator from './InsideStack';
import OutsideStackNavigator from './OutsideStack';

const MasterStack = createNativeStackNavigator();

function MasterStackNavigator({ auth = false }: any) {
  return (
    <MasterStack.Navigator>
      {auth ? (
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
}

export default MasterStackNavigator;
