/* eslint-disable camelcase */
import React, { View } from 'react-native';
import { Avatar } from '@react-native-material/core';
import ImageFetcher from '../../lib/hooks/ImageFetcher';
import { stringToColour } from '../../lib/util/ColorGeneratorUtil';
import { TUser } from '../../lib/types/TSchema';

function ProfileAvatar(props: { user: TUser }) {
  const { user } = props;
  const { user_id, first_name, last_name } = user;

  const { data } = ImageFetcher(`user/${user_id}/photo`);

  return (
    <Avatar
      label={`${first_name} ${last_name}`}
      color={stringToColour(`${first_name} ${last_name}`)}
      image={{
        uri: data,
      }}
    />
  );
}

export default ProfileAvatar;
