import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from '../../../styles/GlobalStyle';
import { TextInput } from 'react-native-paper';
import ButtonComponent from '../../../components/Button';

const MessageInput = (props: { actions: any }) => {
  const { actions } = props;
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
        onPress={() => {
          if (userInput) {
            actions().sendMessage(userInput);
            setUserInput('');
          }
        }}
      />
    </View>
  );
};

export default MessageInput;
