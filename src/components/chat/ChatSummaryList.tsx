import { Fragment } from 'react';
import { Text } from 'react-native';

import ChatInfoType from '../../util/types/chatinfo.type';
import React from 'react';

export default function ChatSummaryList(messageList : ChatInfoType[]){
    return messageList.map(chatSummary => 
        <Fragment key={chatSummary.chat_id}>
            <Text>{chatSummary.name}</Text>
        </Fragment>
        );
}