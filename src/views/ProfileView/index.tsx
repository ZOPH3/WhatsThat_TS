/* eslint-disable camelcase */
import React from 'react';
import { AxiosResponse } from 'axios';
import { View } from 'react-native';
import { ActivityIndicator, Card, Text } from 'react-native-paper';

import { useApi } from '../../lib/context/api';
import { useAuth } from '../../lib/context/auth';
import ImageFetcher from '../../lib/hooks/ImageFetcher';

import CameraComponent from './CameraComponent';

function ProfileView() {
  const { apiCaller } = useApi();
  const { authState } = useAuth();
  const { current_user } = authState;
  if (!current_user || !apiCaller) return <View />;

  const { user_id, first_name, last_name } = current_user;

  const { isLoading, data, setData } = ImageFetcher(`user/${user_id}/photo`);

  const sendToServer = async (data: any) => {
    const res = await fetch(data.base64);
    const blob = await res.blob();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const response: AxiosResponse = await apiCaller(
      {
        url: `user/${user_id}/photo`,
        method: 'POST',
        data: blob,
        headers: { 'Content-Type': 'image/png' },
      },
      true
    );

    if (response && response.status === 200) setData(data.base64);
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
