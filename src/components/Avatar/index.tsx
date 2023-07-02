/* eslint-disable camelcase */
/* eslint-disable react/require-default-props */
// import React from 'react';
// import { ViewStyle } from 'react-native';
// import { Avatar } from 'react-native-paper';
// interface IAvatar {
//   label?: string;
//   color?: string;
//   size?: number;
//   onPress?: () => void;
//   user_id?: number;
//   style?: ViewStyle;
//   source?: string;
//   children?: React.ReactElement | null;
//   icon?: React.ReactElement | null;
// }

// const AvatarComponent = React.memo(
//   ({ label, color, size = 25, onPress, user_id, style, source, children, icon }: IAvatar) => {
//     if (!label) return null;

//     return <Avatar.Text label={label} color={color} size={size}/>;
//   },
// );

// export default AvatarComponent;

import { Avatar } from '@react-native-material/core';
import React from 'react';
import { ViewStyle } from 'react-native';

interface IAvatar {
  label?: string;
  color?: string;
  size?: number;
  onPress?: () => void;
  user_id?: number;
  style?: ViewStyle;
  img?: string;
  children?: React.ReactElement | null;
  icon?: React.ReactElement | null;
}

const AvatarComponent = React.memo(
  ({ label, color, size = 25, onPress, user_id, style, img, children, icon }: IAvatar) => {
    if (!label) return null;

    return <Avatar label={label} color={color} />;
  },
);

export default AvatarComponent;
