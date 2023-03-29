import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Options } from "../utils/LoginOption";

export default function LogScreen(status: Options) {

  let requiredFields = { email: '', password: '' }

  if (status === Options.Login) {
    return <>
      <View>
        <Text>Login Form</Text>
      </View>
    </>
  }

  if (status === Options.Signup) {
    return <>
      <View>
        <Text>Signup Form</Text>
      </View>
    </>
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
