import React, { useState } from 'react';
import { FAB, Portal, TextInput } from 'react-native-paper';
import { View } from 'react-native';

import styles from '../../../styles/GlobalStyle';
import ButtonComponent from '../../../components/Button';

function MessageInput({ onSend, onDraft }) {
  const [inputValue, setInputValue] = useState('');

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleSendButtonPress = () => {
    onSend(inputValue);
    setInputValue('');
  };

  const handleDraftButtonPress = () => {
    onDraft(inputValue);
    setInputValue('');
  };

  return (
    <View
      style={{ ...styles.bottomView, width: '80%', padding: 15, margin: 0, paddingHorizontal: 10 }}
    >
      <TextInput
        mode="outlined"
        value={inputValue}
        onKeyPress={(e) => {
          if (e.nativeEvent.key === 'Enter') {
            console.log('enter');
          }
        }}
        onChangeText={handleInputChange}
        style={{ flex: 10, padding: 6 }}
      />
      {/* <ButtonComponent
        mode="contained"
        style={styles.btnAdd}
        title="Send"
        onPress={handleSendButtonPress}
      /> */}
      <Portal>
        <FAB.Group
          style={{ position: 'absolute', margin: 5, bottom: 35 }}
          open={open}
          visible
          toggleStackOnLongPress
          icon={open ? 'dots-vertical' : 'send'}
          actions={[
            {
              icon: 'archive',
              label: 'View Drafts',
              onPress: () => console.log('Pressed notifications'),
            },
            {
              icon: 'file-document-edit',
              label: 'Save to drafts',
              onPress: () => console.log('Save to drafts'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            console.log('Pressed send');
            handleSendButtonPress();
          }}
        />
      </Portal>
    </View>
  );
}

export default MessageInput;
