import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Text, SafeAreaView, ScrollView, StatusBar, FlatList, VirtualizedList } from 'react-native';
import { UserModel } from '../core/models/UserModel';
import { Avatar, Badge, Button, ListItem, TextInput } from '@react-native-material/core';
import { contacts } from '../test/TestContacts';

const ContactList = () => {
  const users: Array<UserModel> = contacts;
  const [contactList, setContactList] = useState<UserModel[]>([]);
  const [text, setText] = useState('');

  function renderChatList() {
  }

  function findUser(id: number) {
    // console.info('User List ', users)
    return users.find((user) => { return user.user_id == id })
  }

  function removeUser(id: number) {
    const contact_found = contactList.find((user) => { return user.user_id == id })

    return contact_found ? true : false
  }

  function addContact(id: number) {
    let msg = ''
    const contact_found = findUser(id)

    if (contact_found != null) {
      msg = 'User already added ', id

      if (contactList.indexOf(contact_found) === -1) {
        setContactList(contactList.concat(contact_found))
        msg = 'Contact Added ', id
      }

    } else {
      msg = 'Contact can not be found ', id
    }

    Alert.alert(msg)
  }

  function removeContact(id: number) {
    let msg = ''

    if (removeUser(id)) {
      msg = 'Contact removed'
      const remaining = contactList.filter((user) => {
        return user.user_id != id
      })
      setContactList(remaining)
    } else {
      msg = 'Nothing happened'
    }
    Alert.alert(msg)
  }

  // useEffect(() => {
  //   renderChatList();
  // }, [contactList])

  const ExampleA = (props: { id: number }) => {
    return <>
      <View style={{ flexDirection: 'row' }}>
        <Text>id: {props.id}</Text>
        <Button title='Add' onPress={() => addContact(props.id)} />
        <Button title='Remove' onPress={() => removeContact(props.id)} />
      </View>
      <Button title='show contact list' onPress={() => console.log('contact list ', contactList)} />
    </>
  }

  const UserCard = (props: { id: number }) => {
    const user = findUser(props.id)
    if (user != null) {
      const name = user.first_name + ' ' + user.last_name;
      return <>
        <ListItem
          leadingMode="avatar"
          leading={
            <Avatar label={name} autoColor />
          }
          title={name}
          trailing={() => <Badge label={4} color="primary" />}
          onPress={() => { removeContact(props.id) }}
        />
      </>
    } else {
      return <>
        <ListItem />
      </>
    }
  }

  function GenerateList(): JSX.Element {
    return <>
      <View>
        {contactList.map((props, key) => {
          return <>{<UserCard key={key} id={props.user_id} />}</>
          // return (
          //   <Text>{props.first_name}</Text>
          // )
        })}
      </View>
    </>
  }


  return <>

    <SafeAreaView style={styles.container}>
      {/* <Text> Main Content Here</Text> */}
      <ScrollView style={styles.scrollView}>
        <TextInput onChangeText={newText => setText(newText)}
          defaultValue={text} />

        <ExampleA id={text} />
        <GenerateList />
        {/* <UserCard key={1} id={44} /> */}

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

