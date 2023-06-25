import React, { forwardRef, useImperativeHandle } from 'react';
import { TextInput } from 'react-native-paper';

import DialogComponent from '../../../components/Dialog';
import ButtonComponent from '../../../components/Button';

const CreateChatDialog = forwardRef((props, ref) => {
  const { DialogBlock, showDialog, hideDialog } = DialogComponent();
  const dialogContent = [
    {
      children: <TextInput label="Chat name" onChangeText={(e) => (createTextRef.current = e)} />,
    },
  ];

  const createTextRef = React.useRef('');

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
              if (createTextRef.current && createTextRef.current !== '') {
                // dispatcher.addChatSummary({
                //   name: createTextRef.current,
                //   creator: auth,
                // });
                console.log(createTextRef.current);
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
