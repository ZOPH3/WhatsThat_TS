import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

import LoggedStack from './LoggedStack';
import UnauthorisedUserStack from './UnauthorisedUserStack';

const Stack = createNativeStackNavigator();

function UserRoutes() {

  const [isUserStateSet, setIsUserStateSet] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          isLoggedIn ? (
            <LoggedStack stack={Stack} />
          ) : (
            <UnauthorisedUserStack stack={Stack} setIsLoggedIn={setIsLoggedIn} />
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default UserRoutes;