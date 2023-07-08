import React, { useState } from 'react';
import { Button, Dialog, Text } from 'react-native-paper';

const useConfirm = () => {
  const [promise, setPromise] = useState<any>(null);
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const setConfirm = (title: string, message: string) => {
    setTitle(title);
    setMessage(message);
  };

  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  function ConfirmationDialog() {
    return (
      <Dialog visible={promise !== null} onDismiss={handleCancel}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Dialog.Content>
            <Text>{message}</Text>
          </Dialog.Content>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleConfirm}>Yes</Button>
          <Button onPress={handleCancel}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    );
  }
  return { ConfirmationDialog, confirm, setConfirm };
};

export default useConfirm;
