import React, { Fragment } from "react";
import { View } from "react-native";
import ChatWindowComponent from "../../components/chat/ChatWindowComponent";
import { useRoute } from "@react-navigation/native";

function ChatScreen() {
    const route = useRoute();
    const chat_id = route.params.chat_id;
    return ChatWindowComponent()
  }

  export default ChatScreen;