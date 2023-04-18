import { View, Text } from "react-native";
import ChatListHomeComponent from "../../components/chat/ChatListHomeComponent";
import React, { useEffect, useState } from "react";
import ChatService from '../services/chat.services';
import ChatInfoType from "../types/chatinfo.type";
import ModalComponent from "../../components/modal/ModalComponent";
import { Button, FAB } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";



// const chatListView = [
//     {
//         "title": "I hate JS Group Chat",
//         "preview": "I have an absolute hatered for javascript",
//         "chat_id": 1,
//         "user_name": "Zophia Javari",
//         "isUnread": true
//     },
//     {
//         "title": "I love JS",
//         "preview": "JS is the superior programming language",
//         "chat_id": 2,
//         "user_name": "Mario Liberato",
//         "isUnread": true
//     },
//     {
//         "title": "",
//         "preview": "I do not tilt after 4 rounds of shooters",
//         "chat_id": 3,
//         "user_name": "Briana Bolton",
//         "isUnread": true
//     },
//     {
//         "title": "Go repent!!!!!!!!!!",
//         "preview": "You should because John Wick said so",
//         "chat_id": 4,
//         "user_name": "God Herself",
//         "isUnread": false
//     }
// ]

function HomeScreen({ route, navigation }) {

    const [messageList, setMessageList] = useState<ChatInfoType[]>();
    const [fetchReady, setFetchReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        const fetchChat = async () => {

            console.log("Fetching all chats...");

            const messages = await ChatService.all();

            setMessageList(messages);
            setIsLoading(false);

            console.log(messageList);
        }

        fetchChat().catch(console.error);

    }, []);

    if (isLoading) {
        return <>
            <Text>is Loading...</Text>
        </>
    } else {
        return <>
            <View>
                <Button
                    onPress={() => navigation.navigate('MyModal')}
                    title="Open Modal"
                />

                <ChatListHomeComponent
                    messages={messageList}
                    navigation={navigation}
                />
            </View>
        </>
    }
}

export default HomeScreen;