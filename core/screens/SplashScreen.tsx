import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

function SplashScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Getting token...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }