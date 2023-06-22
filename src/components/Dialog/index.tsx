import React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

interface IDialogContent {
  children?: React.ReactNode;
}

const DialogComponent = () => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const DialogContent = (props: { items: IDialogContent[] }) => {
    const items = props.items;
    return (
      <>
        {items.map((content, key: React.Key) => {
          return <Dialog.Content key={key}>{content.children}</Dialog.Content>;
        })}
      </>
    );
  };

  const DialogBlock = (props: { title: string; content?: IDialogContent[], actions?: React.ReactNode }) => {
    const { title, content, actions } = props;
    return (
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>{title}</Dialog.Title>
            {content ? <DialogContent items={content} /> : null}
            <Dialog.Actions>
              {actions? actions : <Button onPress={hideDialog}>Done</Button>}
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  };

  return { DialogBlock, showDialog, hideDialog };
};

export default DialogComponent;
