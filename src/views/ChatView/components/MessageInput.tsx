import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { View } from 'react-native';

import { styles } from '../../../styles/GlobalStyle';

import ButtonComponent from '../../../components/Button';

const MessageInput = ({ onSend }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleSendButtonPress = () => {
    onSend(inputValue);
    setInputValue('');
  };

  return (
    <View style={styles.bottomView}>
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
      <ButtonComponent
        mode="contained"
        style={styles.btnAdd}
        title="Send"
        onPress={handleSendButtonPress}
      />
    </View>
  );
};

export default MessageInput;
