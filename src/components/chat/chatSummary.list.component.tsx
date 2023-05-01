import React from "react";
import { Pressable } from "react-native";
import ListItemComponent from "./chatSummary.item.component";
import ChatInfoType from "../../util/types/chatinfo.type";

export default function ChatListHomeComponent(props: ChatInfoType[]) {
  return props.map((chat) => {
    return (
      <Pressable key={chat.chat_id}>
        <ListItemComponent key={chat.chat_id} chatSummary={chat} />
      </Pressable>
    );
  });
}
