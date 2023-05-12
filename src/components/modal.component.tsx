import * as React from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput } from '@react-native-material/core';
import ChatService from '../services/chat.services';
import { useNavigation } from '@react-navigation/native';
import IsLoadingIndicator from './utils/isLoadingIndicator.component';

function ModalScreen() {
  const navigation = useNavigation();
  const [text, setText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  async function createChat(text: string) {
    setIsLoading(true);
    let outcome = false;
    try {
      const response = await ChatService.newConversation(text);

      if (!response) {
        throw new Error('Unable to create new chat...');
      }

      outcome = true;
    } catch (err) {
      alert(err);
    }

    return outcome;
  }

  if (isLoading) {
    return <IsLoadingIndicator />;
  } else {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Create New Chat</Text>
        <TextInput style={{ width: '90%' }} value={text} onChangeText={(e) => setText(e)} />
        <Button
          title="Create"
          onPress={async () => {
            const response = await createChat(text).finally(() => setIsLoading(false));
            if (response) {
              navigation.goBack();
            }
          }}
        />
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
      </View>
    );
  }
}

export default ModalScreen;
