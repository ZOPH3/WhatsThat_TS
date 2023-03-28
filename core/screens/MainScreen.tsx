import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import ChatWindowComponent, {
  ChatWindowState,
} from "../../components/messages/ChatWindowComponent";
import ContactList from "../../components/users/ContactList";
import UserComponent from "../../components/users/UserComponent";
import UserAPI from "../../api/UserAPI";
import MessageAPI from "../../api/MessageAPI";
import { AppStateModel } from "../interfaces/AppStateModel";

const messages = new MessageAPI().GetAll();
const users = new UserAPI().GetAll();

const TestData: ChatWindowState = { messages: messages, isLoaded: true };
const AppState: AppStateModel = { isLogged: false, TOKEN: "" };

export default function MainScreen() {
  if (!AppState.isLogged) {
    return (
      <View style={styles.container}>
        <Text>You are not logged in</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>

        <ChatWindowComponent
          messages={TestData.messages}
          isLoaded={TestData.isLoaded}
        />

        <UserComponent {...users[0]} />

        <ContactList users={users} isLoaded={true} />

        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
