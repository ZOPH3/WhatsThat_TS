import React from "react";
import { ListItem, Avatar, Stack, Button, Badge, TextInput } from "@react-native-material/core";
import { Alert, Pressable, View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from "react-native";

const App = () => (
  <>
    <View style={styles.containerMain}>
      <SafeAreaView style={styles.container}>
        <Text> Main Content Here</Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.bottomView}>
        {/* <Text style={styles.textStyle}>Bottom View</Text> */}
        <View style={{ flexDirection: "row" }}><TextInput variant="outlined" style={{ flex: 3, padding: 2 }} />
          <Button style={{
            flex: 1, alignItems: 'center', justifyContent: 'center',}} title=">>>" /></View>
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
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
    width: '100%',
    // height: 50,
    backgroundColor: '#EE5407',
    // justifyContent: 'center',
    // alignItems: 'center',
    // position: 'absolute',
    bottom: 0,
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
});

export default App;