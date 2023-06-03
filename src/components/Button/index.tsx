import { Button } from '@react-native-material/core';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

interface IButton {
  title: string;
  onPress: () => void;
  type: string;
  backgroundColor?: string;
  color?: string;
  loading?: boolean;
  disabled?: boolean;
  fontSize?: number;
  styleText?: StyleProp<TextStyle> | StyleProp<TextStyle>[];
}

const ButtonComponent = ({
  title,
  onPress,
  type,
  backgroundColor,
  color,
  loading = false,
  disabled = false,
  fontSize,
  styleText,
}: IButton): React.ReactElement => {
  return <Button title={title} onPress={onPress} loading={loading} disabled={disabled} />;
};

export default ButtonComponent;
