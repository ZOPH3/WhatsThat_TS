import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InsideStackNavigator from './InsideStack';
import OutsideStackNavigator from './OutsideStack';

const MasterStack = createNativeStackNavigator();

const MasterStackNavigator = ({ auth = false }) => {
  return (
    <MasterStack.Navigator>
      {auth ? (
        <MasterStack.Screen name="InsideStackNavigator" component={InsideStackNavigator} />
      ) : (
        <MasterStack.Screen name="OutsideStackNavigator" component={OutsideStackNavigator} />
      )}
    </MasterStack.Navigator>
  );
};

export default MasterStackNavigator;
