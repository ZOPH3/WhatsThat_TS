import { View } from "react-native";
import ChatListHomeComponent from "../../components/ChatListHomeComponent";
import React from "react";

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

function HomeScreen({ route, navigation }) {
    // const { user_id, user_email } = route.params;
    return (
        <>
            <View>
                <ChatListHomeComponent
                    messages={chatListView}
                    navigation={navigation}
                />
            </View>
        </>
    );
}

export default HomeScreen;