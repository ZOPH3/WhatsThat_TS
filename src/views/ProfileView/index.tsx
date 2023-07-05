/* eslint-disable camelcase */
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAuthContext } from '../../lib/context/AuthContext';

function ProfileView() {
  const { authState } = useAuthContext();
  const { current_user } = authState;
  const [state, setState] = React.useState(null);

  return (
    <View>
      <Text>ProfileView</Text>
      <Text>{JSON.stringify(current_user)}</Text>
    </View>
  );
}

export default ProfileView;
