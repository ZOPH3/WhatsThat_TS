import * as React from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput } from '@react-native-material/core';
import ChatService from '../services/chat.services';
import { useNavigation } from '@react-navigation/native';

function ModalScreen() {
  const navigation = useNavigation();
  const [text, setText] = React.useState('');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Create New Chat</Text>
      <TextInput style={{ width: '90%' }} value={text} onChangeText={(e) => setText(e)} />
      <Button
        title="Create"
        onPress={() => {
          ChatService.newConversation(text);
        }}
      />
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

export default ModalScreen;
