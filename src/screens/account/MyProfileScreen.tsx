import React, { useContext } from 'react';
import { UserContext } from '../../lib/context/classes/user.context';
import { View } from 'react-native';
import { Button, Stack, Text } from '@react-native-material/core';
import FileUploader from '../../components/utils/upload.component';
import CameraHelper from '../../util/camera.util';
import UrlBuilder from '../../util/URLBuilder';
//TODO: allow the user to edit and submit their details

function ProfileScreen() {
  const { user } = useContext(UserContext);
  return (
    <View>
      <Stack m={4} spacing={4}>
        <Text variant="h4">
          Hi! {user.first_name} {user.last_name}{' '}
        </Text>
        <Text variant="h6">Email:</Text>
        <Text variant="subtitle1">{user.email}</Text>
        <Button title="Upload profile picture" onPress={() => console.log('upload')} />
      </Stack>
    </View>
  );
}

export default ProfileScreen;
