import React, { forwardRef, useImperativeHandle } from 'react';
import { TextInput } from 'react-native-paper';

import DialogComponent from '../../../components/Dialog';
import ButtonComponent from '../../../components/Button';

const CreateChatDialog = forwardRef((props, ref) => {
  const { DialogBlock, showDialog, hideDialog } = DialogComponent();
  const [text, setText] = React.useState('');

  const dialogContent = [
    {
      children: (
        <TextInput
          label="Chat name"
          onChangeText={(e) => setText(e)}
        />
      ),
    },
  ];

  useImperativeHandle(ref, () => ({
    show() {
      showDialog();
    },
  }));

  return (
    <DialogBlock
      title={'Create Chat'}
      content={dialogContent}
      actions={
        <>
          <ButtonComponent
            title={'Cancel'}
            onPress={() => {
              hideDialog();
            }}
          />
          <ButtonComponent
            title={'Create Chat'}
            mode="contained"
            onPress={() => {
              if (text && text !== '') {
                // dispatcher.addChatSummary({
                //   name: createTextRef.current,
                //   creator: auth,
                // });
                console.log(text);
                hideDialog();
              }
            }}
          />
        </>
      }
    />
  );
});

export default CreateChatDialog;
