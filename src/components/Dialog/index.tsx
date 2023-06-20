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

  const DialogBlock = (props: {
    title: string;
    content?: IDialogContent[];
    toggleVisible: () => void;
  }) => {
    const { title, content } = props;
    return (
      <View>
        {/* <Button onPress={showDialog}>Show Dialog</Button> */}
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>{title}</Dialog.Title>
            {content ? <DialogContent items={content} /> : null}
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  };

  return { DialogBlock, showDialog, hideDialog };
};

export default DialogComponent;
