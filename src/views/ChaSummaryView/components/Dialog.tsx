import React, { forwardRef, useImperativeHandle } from 'react';
import { TextInput } from 'react-native-paper';

import ChatServices from '../../../lib/services/ChatServices';
import { useApi } from '../../../lib/context/api';
import { useChat } from '../../../lib/context/chats';

import DialogComponent from '../../../components/Dialog';
import ButtonComponent from '../../../components/Button';

const CreateChatDialog = forwardRef((props, ref) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const { apiCaller } = useApi();
  const { dispatcher } = useChat();

  const { DialogBlock, showDialog, hideDialog } = DialogComponent();
  const createTextRef = React.useRef('');

  const c = ChatServices(apiCaller);

  const dialogContent = [
    {
      children: <TextInput label="Chat name" onChangeText={(e) => (createTextRef.current = e)} />,
    },
  ];

  useImperativeHandle(ref, () => ({
    show() {
      showDialog();
    },
  }));

  return (
    <DialogBlock
      title="Create Chat"
      content={dialogContent}
      actions={
        <>
          <ButtonComponent
            title="Cancel"
            onPress={() => {
              hideDialog();
            }}
          />
          {/* FIXME: Show helper text when chat cant be created */}
          <ButtonComponent
            title="Create Chat"
            mode="contained"
            loading={isLoading}
            onPress={async () => {
              setIsLoading(true);
              if (createTextRef && createTextRef.current !== '') {
                const response = await c
                  .createChat(createTextRef.current)
                  .catch((e) => {
                    return null;
                  })
                  .finally(() => setIsLoading(false));

                if (!response) return;

                dispatcher.addChatSummary({
                  name: createTextRef.current,
                  chat_id: response.chat_id,
                });

                createTextRef.current = '';
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
