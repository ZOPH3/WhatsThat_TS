import React, { useEffect, useState } from 'react';
import { Button, Dialog, FAB, HelperText, Portal, TextInput } from 'react-native-paper';
import { View } from 'react-native';

/**
 * @description Converts a string in the format "01/07/2023 12:34" to a Date object
 */
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

/**
 * @description Component for the message input field
 */
function MessageInput({ onSend, onDraft, openDraft, isEditing = false, setIsEditing, editText }) {
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
    setIsEditing(false);
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

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (isEditing) setInputValue(editText);
  }, [isEditing]);

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
        right={
          !isEditing ? (
            <TextInput.Icon icon="pencil" disabled={!isEditing} />
          ) : (
            <TextInput.Icon
              icon="close"
              disabled={!isEditing}
              onPress={() => {
                setInputValue('');
                setIsEditing(false);
              }}
            />
          )
        }
      />
      {/* FAB Butons */}
      <Portal>
        <FAB.Group
          style={{ position: 'absolute', right: 2, bottom: -2 }}
          open={open}
          visible
          toggleStackOnLongPress
          icon={open ? 'dots-vertical' : 'send'}
          actions={[
            {
              icon: 'archive',
              label: 'View Drafts',
              onPress: openDraft,
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

      {/* Dialog for adding draft */}
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
