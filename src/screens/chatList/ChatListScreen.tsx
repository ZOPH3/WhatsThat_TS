import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import ChatService from '../../services/chat.services';
import ChatInfoType from "../../types/chatinfo.type";
import { Button } from "@react-native-material/core";
import ChatListHomeComponent from "../../components/chat/ChatListHomeComponent";

import { styles } from "./ChatListScreen.styles";

function HomeScreen({ navigation }) {

    const [messageList, setMessageList] = useState<ChatInfoType[]>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        const fetchChat = async () => {

            console.log("Fetching all chats...");

            const messages = await ChatService.all();

            setMessageList(messages);
            setIsLoading(false);

            console.log("Message List", messageList);
        }

        fetchChat().catch(console.error);

    }, []);

    if (isLoading) {
        return <>
            <Text>is Loading...</Text>
        </>
    } else {
        return <>
            <View style={styles.containerMain}>
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
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
                    </ScrollView>
                </SafeAreaView>
            </View>
        </>
    }
}

export default HomeScreen;