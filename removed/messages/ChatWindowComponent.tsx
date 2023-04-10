// import React, { Component } from 'react';
// import { Text } from 'react-native';
// import { MessageModel } from '../../core/models/MessageModel';
// import MessageComponent from './messageComponent';

// export type ChatWindowState = {
//     messages: Array<MessageModel>,
//     isLoaded: boolean
// }

// const ChatWindowComponent = (props: ChatWindowState) => {

//     if (props.isLoaded) {
//         let i = 1;
//         return <>
//             {props.messages.map(message =>
//                 <MessageComponent
//                     key={i++}
//                     msg={message.msg}
//                     time={message.time}
//                     id={message.id}
//                     user={message.user}
//                 />
//             )}
//         </>
//     } else {
//         return <>
//             <Text>...Messages</Text>
//         </>
//     }
// }

// export default ChatWindowComponent;