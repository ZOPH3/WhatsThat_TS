import { Button, TextInput } from '@react-native-material/core';
import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageTemplate = () => {

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
    }
  }

  const storeDataJson = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        return value
      }
    } catch (e) {
      // error reading value
    }
  }

  const getDataJson = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }

  // const [appState, setAppState] = useState({ session_token: '' })
  const [text, setText] = useState('');

  return <>
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TextInput onChangeText={newText => setText(newText)}
          defaultValue={text} />
        <Button title='UpdateToken' onPress={() => { storeData(text); console.log('Stored') }} />
        <Button title='Current Token State' onPress={async () => { 
          var value = await getData()
          console.log('Token ', value) }} />
        <Text>{text}</Text>
      </ScrollView>
    </SafeAreaView>


  </>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  containerMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    width: '95%',
    // height: 50,
    // backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // marginTop: 6,
    bottom: 1,
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AsyncStorageTemplate;