import React, { useState } from 'react';
import { View, Button, Modal, Text, TouchableOpacity } from 'react-native';

function DateTimePicker() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    toggleModal();
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <Text>Select Date</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <Button title="Close" onPress={toggleModal} />
          {/* Your date-time picker UI goes here */}
          {/* e.g., you can use DatePickerIOS or custom components */}
          {/* When a date is selected, call handleDateSelection */}
        </View>
      </Modal>
    </View>
  );
}

function convertStringToDate(dateString) {
  // Split the string into date and time parts
  const [datePart, timePart] = dateString.split(' ');

  // Split the date part into day, month, and year
  const [day, month, year] = datePart.split('/');

  // Split the time part into hour and minutes
  const [hour, minutes] = timePart.split(':');

  // Create a new Date object using the extracted parts
  const date = new Date(year, month - 1, day, hour, minutes);

  return date;
}

// Usage example:
const dateString = '01/07/2023 12:34';
const dateObject = convertStringToDate(dateString);
console.log(dateObject);

export default DateTimePicker;
