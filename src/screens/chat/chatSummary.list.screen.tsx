import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import ChatService from '../../services/chat.services';
import ChatInfoType from "../../util/types/chatinfo.type";
import { Button } from "@react-native-material/core";
import ChatListHomeComponent from "../../components/chat/chatSummary.list.component";
import { styles } from "./ChatListScreen.styles";

function HomeScreen() {
    const [messageList, setMessageList] = useState<ChatInfoType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        function fetchChat() {
            const result = ChatService.fetchChatList().then(
                (response) => response,
                (err) => err
            )
            return result;
        }

        fetchChat().then((chatSummaries) => {
            // console.log("Chat Summaries List", chatSummaries.result);
            setMessageList(chatSummaries.result);
            setIsSuccess(true);
        },
            (err) => {
                setIsSuccess(false);
                err;
            }).finally(() => setIsLoading(false))

    }, []);

    if (isLoading) {
        return <>
            <Text>is Loading...</Text>
        </>
    } else {
        if (isSuccess && messageList) {
            return <>
                <View style={styles.containerMain}>
                    <SafeAreaView style={styles.container}>
                        <ScrollView style={styles.scrollView}>
                                <View>
                                    {ChatListHomeComponent(messageList)}
                                </View>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </>
        } else {
            return <>
                <Button title="Y" onPress={() => { console.log(messageList) }} />
            </>
        }
    }
}

export default HomeScreen;