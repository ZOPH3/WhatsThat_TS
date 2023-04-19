import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import ChatListHomeComponent from "../../components/chat/ChatListHomeComponent";
import React, { useEffect, useState } from "react";
import ChatService from '../services/chat.services';
import ChatInfoType from "../types/chatinfo.type";
import { Button } from "@react-native-material/core";

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%"
        // paddingTop: StatusBar.currentHeight,
    },
    scrollView: {

    },
    text: {
        fontSize: 42,
    },
    containerMain: {
        // flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomView: {
        width: '95%',
        // height: 50,
        // backgroundColor: '#EE5407',
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',
        marginTop: 6,
        bottom: 1,
    },
    textStyle: {
        color: '#fff',
        fontSize: 18,
    },
});

export default HomeScreen;