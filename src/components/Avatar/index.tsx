import Avatar from '@react-native-material/core/lib/typescript/Avatar';
import React from 'react';
import { ViewStyle } from 'react-native';

interface IAvatar {
  text?: string;
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
  ({ text, color, size = 25, onPress, user_id, style, img, children, icon }: IAvatar) => {
    
    if(!text) return null;


    return (<Avatar label={text} color={color} />)
  }
);

export default AvatarComponent;
