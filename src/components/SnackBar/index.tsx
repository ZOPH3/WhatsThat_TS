/* eslint-disable react/require-default-props */
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

interface ISnackBar {
  text: string;
  actions?: IActions;
  toggleVisible?: boolean;
}

interface IActions {
  label: string;
  onPress: () => void;
}

function SnackbarComponent({ text, actions, toggleVisible }: ISnackBar) {
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  if (toggleVisible) setVisible(true);

  return (
    <View style={styles.container}>
      <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>
      <Snackbar visible={visible} onDismiss={onDismissSnackBar} action={actions}>
        HELLO
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default SnackbarComponent;
