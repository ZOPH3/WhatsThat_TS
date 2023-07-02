import React, { useState } from 'react';
import { Button, Dialog, FAB, HelperText, Portal, TextInput } from 'react-native-paper';
import { View } from 'react-native';

function convertStringToDate(dateString) {
  const pattern = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/;
  if (!pattern.test(dateString)) {
    throw new Error('Invalid date format. Expected format: 01/07/2023 12:34');
  }
  // Split the string into date and time parts
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('/');
  const [hour, minutes] = timePart.split(':');
  const date = new Date(year, month - 1, day, hour, minutes);
  return date;
}

function MessageInput({ onSend, onDraft }) {
  const [inputValue, setInputValue] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleSendButtonPress = () => {
    onSend(inputValue);
    setInputValue('');
  };

  const handleDraftButtonPress = () => {
    if (selectedDate === '' || inputValue === '') return;
    try {
      const date = convertStringToDate(selectedDate);
      if (date < new Date()) throw new Error('Date must be in the future');
      onDraft(inputValue, date.getTime());
      setInputValue('');
      setSelectedDate(null);
      toggleModal();
    } catch (e) {
      console.log(e.message);
    }
  };

  const patternCheck = () => {
    const pattern = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/;
    return pattern.test(selectedDate);
  };

  const isFutureDate = () => {
    try {
      const date = convertStringToDate(selectedDate);
      return date > new Date();
    } catch (e) {
      return false;
    }
  };

  const hasErrors = () => {
    return !patternCheck() || !isFutureDate();
  };

  // const hasErrors = () => {
  //   const pattern = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/;
  //   if (selectedDate === '') return false;
  //   if (pattern.test(selectedDate)) {
  //     try {
  //       const date = convertStringToDate(selectedDate);
  //       return date < new Date();
  //     } catch (e) {
  //       return true;
  //     }
  //   }
  //   return !pattern.test(selectedDate);
  // };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // padding: 6,
        margin: 5,
        bottom: 0,
      }}
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
        style={{ flex: 10, bottom: 10, marginLeft: 10 }}
      />

      <Portal>
        <FAB.Group
          style={{ position: 'absolute', right: 2, bottom: -5 }}
          open={open}
          visible
          toggleStackOnLongPress
          icon={open ? 'dots-vertical' : 'send'}
          actions={[
            {
              icon: 'archive',
              label: 'View Drafts',
              onPress: () => console.log('Pressed view drafts'),
            },
            {
              icon: 'file-document-edit',
              label: 'Save to drafts',
              onPress: toggleModal,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            console.log('Pressed send');
            handleSendButtonPress();
          }}
        />
      </Portal>

      <Portal>
        <Dialog visible={isModalVisible} onDismiss={toggleModal}>
          <Dialog.Title>Schedule Draft</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              placeholder="01/07/2023 12:34"
              value={selectedDate}
              onChangeText={handleDateSelection}
            />
            <HelperText type="error" visible={hasErrors()}>
              Invalid date format. Expected format: 01/07/2023 12:34 (Day/Month/Year Hour:Min) and
              date must be in the future.
            </HelperText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDraftButtonPress}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

export default MessageInput;
