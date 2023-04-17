import { View } from "react-native";
import ChatListHomeComponent from "../../components/ChatListHomeComponent";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import AsyncStorageHelper from "../storage/asyncStorage.helper";
import { AsyncStorageKey } from "../storage/AsyncStorageKey";
import ApiMessageClient from "../api/ApiMessageClient";
import { Button } from "@react-native-material/core";
import ChatController from "../controllers/chat.controller";

const chatListView = [
    {
        "title": "I hate JS Group Chat",
        "preview": "I have an absolute hatered for javascript",
        "chat_id": 1,
        "user_name": "Zophia Javari",
        "isUnread": true
    },
    {
        "title": "I love JS",
        "preview": "JS is the superior programming language",
        "chat_id": 2,
        "user_name": "Mario Liberato",
        "isUnread": true
    },
    {
        "title": "",
        "preview": "I do not tilt after 4 rounds of shooters",
        "chat_id": 3,
        "user_name": "Briana Bolton",
        "isUnread": true
    },
    {
        "title": "Go repent!!!!!!!!!!",
        "preview": "You should because John Wick said so",
        "chat_id": 4,
        "user_name": "God Herself",
        "isUnread": false
    }
]

const MessageApi = new ApiMessageClient('http://10.0.2.2:3333/api/1.0.0', '');

// async function setAuth(): Promise<string> {
//     const token = await AsyncStorageHelper.getData(AsyncStorageKey.Authenticated_User);
//     return token;
// }

function HomeScreen({ route, navigation }) {

    const [messageList, setMessageList] = useState<any>([]);
    const [fetchReady, setFetchReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const setMessageApi = async () => {

        const token = '1b6c1bfaa74ed4b180ddd85659d7bba8';

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://10.0.2.2:3333/api/1.0.0/chat',
            headers: {
                'X-Authorization': token
            }
        };



        axios.request(config)
            .then((response) => {
                setMessageList(response.data)
            })
            .catch((error) => {
                console.log(error);
            });


        console.log(messageList);
    }

    const fetchChat = async () => {
        if (fetchReady) {
            try {
                // const newMessages = await MessageApi.getChatList();

                const newMessages = await ChatController.all();

                console.log("NEW MESSAGES...", newMessages)

                setMessageList(newMessages);
                setIsLoading(false);
            } catch (err) {
                console.log("Could not run");
                setMessageList([]);
            }
        } else {
            console.log("Authentication has not been setup");
        }
    }

    //FIXME: At the moment im using buttons, this needs to be done dynamically.

    return (
        <>
            <Button title='AUTH USER' onPress={() => setMessageApi()} />
            <Button title='GET MESSAGES' onPress={() => fetchChat()} />

            <View>
                <ChatListHomeComponent
                    messages={messageList}
                    navigation={navigation}
                />
            </View>
        </>
    );
}

export default HomeScreen;