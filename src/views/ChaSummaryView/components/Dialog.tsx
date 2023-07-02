import React, { forwardRef, useImperativeHandle } from 'react';
import { TextInput } from 'react-native-paper';

import DialogComponent from '../../../components/Dialog';
import ButtonComponent from '../../../components/Button';
import { useChatContext } from '../../../lib/context/ChatContext';
import { useApiContext } from '../../../lib/context/ApiContext';
import ChatServices from '../../../lib/services/ChatServices';

const CreateChatDialog = forwardRef((props, ref) => {
  const { DialogBlock, showDialog, hideDialog } = DialogComponent();
  const createTextRef = React.useRef('');
  const { useFetch } = useApiContext();
  const { dispatcher } = useChatContext();
  const [isLoading, setIsLoading] = React.useState(false);

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
                const response = await ChatServices(useFetch)
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
