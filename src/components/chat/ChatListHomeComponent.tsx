import React from "react";
import { Stack } from "@react-native-material/core";
import { Pressable, ScrollView, View, Text } from "react-native";
import ListItemComponent from "./ListItemComponent";
import ChatInfoType from "../../util/types/chatinfo.type";

// function generateList(messages: ChatInfoType[]) {

//     return messages.map((message) => {
//         return <>
//             <Pressable key={message.chat_id}>
//                 <ListItemComponent key={message.chat_id} chatSummary={message} />
//             </Pressable>
//         </>
//     })
// }
export default function ChatListHomeComponent(props: ChatInfoType[]) {
    return props.map((message) => {
        return (
            <Pressable key={message.chat_id}>
                <ListItemComponent key={message.chat_id} chatSummary={message} />
            </Pressable>
        )
    })
}
