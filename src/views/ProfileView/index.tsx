/* eslint-disable camelcase */
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Card, Text } from 'react-native-paper';
import { useAuthContext } from '../../lib/context/AuthContext';
import CameraComponent from './CameraComponent';
import ImageFetcher from '../../lib/hooks/ImageFetcher';
import { useApiContext } from '../../lib/context/ApiContext';

function ProfileView() {
  const { useFetch } = useApiContext();
  const { authState } = useAuthContext();
  const { current_user } = authState;
  if (!current_user || !useFetch) return <View />;

  const { user_id, first_name, last_name } = current_user;

  const { isLoading, data, makeRequest } = ImageFetcher(`user/${user_id}/photo`);

  const sendToServer = async (data: any) => {
    const res = await fetch(data.base64);
    const blob = await res.blob();
    console.log(blob);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const response = await useFetch(
      {
        url: `user/${user_id}/photo`,
        method: 'POST',
        data: blob,
        headers: { 'Content-Type': 'image/png' },
      },
      true
    );

    console.log(response);
  };

  return (
    <View style={{ margin: 10 }}>
      <Card>
        <Card.Content>
          <Text variant="titleLarge">{`${first_name} ${last_name}`}</Text>
          <Text variant="bodyMedium">Profile</Text>
        </Card.Content>
        {isLoading ? <ActivityIndicator /> : <Card.Cover source={{ uri: data || null }} />}
      </Card>
      <View style={{ marginTop: 10 }}>
        <CameraComponent trigger={sendToServer} />
      </View>
    </View>
  );
}

export default ProfileView;
