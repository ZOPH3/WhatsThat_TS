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
  style?: ViewStyle;
  image?: any | null;
  children?: React.ReactElement | null;
  icon?: React.ReactElement | null;
}

const AvatarComponent = React.memo(
  ({ label, color, size = 25, onPress, style, image = null, children, icon }: IAvatar) => {
    if (!label) return null;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Avatar label={label} color={color} icon={icon} image={image} size={size} />;
  }
);

export default AvatarComponent;
