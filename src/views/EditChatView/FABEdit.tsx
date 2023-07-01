import * as React from 'react';
import { FAB, Portal } from 'react-native-paper';

function EditFab() {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        style={{ position: 'absolute', bottom: 50, right: 0 }}
        open={open}
        visible
        icon={open ? 'pencil' : 'dots-vertical'}
        actions={[
          //   { icon: 'plus', onPress: () => console.log('Pressed add') },
          {
            icon: 'account-multiple-plus',
            label: 'Invite user',
            onPress: () => console.log('Pressed star'),
          },
          {
            icon: 'file-document-edit',
            label: 'Edit chat',
            onPress: () => console.log('Pressed email'),
          },
          {
            icon: 'archive',
            label: 'View Drafts',
            onPress: () => console.log('Pressed notifications'),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
}

export default EditFab;
