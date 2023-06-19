import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Button } from 'react-native-paper';

interface IButton {
  title: string;
  onPress: () => void;
  mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal" | undefined;
  backgroundColor?: string;
  color?: string;
  loading?: boolean;
  disabled?: boolean;
  fontSize?: number;
  styleText?: StyleProp<TextStyle> | StyleProp<TextStyle>[];
  style?: any;
}

const ButtonComponent = ({
  title,
  onPress,
  mode,
  backgroundColor,
  color,
  loading = false,
  disabled = false,
  fontSize,
  styleText,
  style,
}: IButton): React.ReactElement => {
  return <Button onPress={onPress} loading={loading} disabled={disabled} mode={mode} style={style}>{title}</Button>;
};

export default ButtonComponent;
