import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from '../../../styles/GlobalStyle';
import { TextInput } from 'react-native-paper';
import ButtonComponent from '../../../components/Button';

const MessageInput = () => {
  const [userInput, setUserInput] = useState('');
  return (
    <View style={styles.bottomView}>
        <TextInput
          mode="outlined"
          value={userInput}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === 'Enter') {
              console.log('enter');
            }
          }}
          onChangeText={(e) => setUserInput(e)}
          style={{ flex: 10, padding: 6 }}
        />
        <ButtonComponent
          mode="contained"
          style={styles.btnAdd}
          title="Send"
          onPress={() => console.log('send')}
        />
    </View>
  );
};

export default MessageInput;
