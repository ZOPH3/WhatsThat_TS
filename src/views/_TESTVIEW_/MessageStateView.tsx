import React, { useEffect } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';
import ButtonComponent from '../../components/Button';
import { useChatContext } from '../../lib/context/ChatContext';

const MessageStateView = () => {
  const chatContext = useChatContext();
  const { chatSummaryList, dispatcher } = chatContext;

  const data = [
    {
      chat_id: 1,
      creator: {
        email: 'ashley.williams@mmu.ac.uk',
        first_name: 'Ashlek',
        last_name: 'Williams',
        user_id: 1,
      },
      last_message: {
        author: [Object],
        message: 'tesating',
        message_id: 81,
        timestamp: 1684528155317,
      },
      name: 'The Rod Stewart Appreciation Society',
    },
    {
      chat_id: 2,
      creator: {
        email: 'ashley.williams@mmu.ac.uk',
        first_name: 'Ashlek',
        last_name: 'Williams',
        user_id: 1,
      },
      last_message: {
        author: [Object],
        message: 'kkklllll',
        message_id: 72,
        timestamp: 1683901643989,
      },
      name: 'The Rod Stewart Appreciation Society1',
    },
    {
      chat_id: 3,
      creator: {
        email: 'ashley.williams@mmu.ac.uk',
        first_name: 'Ashlek',
        last_name: 'Williams',
        user_id: 1,
      },
      last_message: {},
      name: 'The Rod Stewart Appreciation Society1',
    },
    {
      chat_id: 4,
      creator: {
        email: 'ashley.williams@mmu.ac.uk',
        first_name: 'Ashlek',
        last_name: 'Williams',
        user_id: 1,
      },
      last_message: {
        author: [Object],
        message: 'hows it going',
        message_id: 59,
        timestamp: 1682971799212,
      },
      name: 'The Rod Stewart Appreciation Society1',
    },
    // {
    //   chat_id: 5,
    //   creator: {
    //     email: 'ashley.williams@mmu.ac.uk',
    //     first_name: 'Ashlek',
    //     last_name: 'Williams',
    //     user_id: 1,
    //   },
    //   last_message: { author: [Object], message: 'dddd', message_id: 83, timestamp: 1684528212906 },
    //   name: 'The Rod Stewart Appreciation Society2',
    // },
    // {
    //   chat_id: 6,
    //   creator: {
    //     email: 'ashley.williams@mmu.ac.uk',
    //     first_name: 'Ashlek',
    //     last_name: 'Williams',
    //     user_id: 1,
    //   },
    //   last_message: {
    //     author: [Object],
    //     message: 'hello',
    //     message_id: 57,
    //     timestamp: 1682971493772,
    //   },
    //   name: 'This is new',
    // },
    // {
    //   chat_id: 7,
    //   creator: {
    //     email: 'ashley.williams@mmu.ac.uk',
    //     first_name: 'Ashlek',
    //     last_name: 'Williams',
    //     user_id: 1,
    //   },
    //   last_message: {
    //     author: [Object],
    //     message: 'this should be first',
    //     message_id: 76,
    //     timestamp: 1684259185058,
    //   },
    //   name: 'request check',
    // },
    // {
    //   chat_id: 8,
    //   creator: {
    //     email: 'ashley.williams@mmu.ac.uk',
    //     first_name: 'Ashlek',
    //     last_name: 'Williams',
    //     user_id: 1,
    //   },
    //   last_message: {},
    //   name: 'request check',
    // },
    // {
    //   chat_id: 9,
    //   creator: {
    //     email: 'ashley.williams@mmu.ac.uk',
    //     first_name: 'Ashlek',
    //     last_name: 'Williams',
    //     user_id: 1,
    //   },
    //   last_message: {},
    //   name: 'request check',
    // },
    // {
    //   chat_id: 10,
    //   creator: {
    //     email: 'ashley.williams@mmu.ac.uk',
    //     first_name: 'Ashlek',
    //     last_name: 'Williams',
    //     user_id: 1,
    //   },
    //   last_message: {},
    //   name: 'request check',
    // },
    // {
    //   chat_id: 11,
    //   creator: {
    //     email: 'ashley.williams@mmu.ac.uk',
    //     first_name: 'Ashlek',
    //     last_name: 'Williams',
    //     user_id: 1,
    //   },
    //   last_message: {},
    //   name: 'Hello new chat from request',
    // },
    // {
    //   chat_id: 12,
    //   creator: {
    //     email: 'ashley.williams@mmu.ac.uk',
    //     first_name: 'Ashlek',
    //     last_name: 'Williams',
    //     user_id: 1,
    //   },
    //   last_message: {},
    //   name: 'request check',
    // },
    // {
    //   chat_id: 13,
    //   creator: {
    //     email: 'ashley.williams@mmu.ac.uk',
    //     first_name: 'Ashlek',
    //     last_name: 'Williams',
    //     user_id: 1,
    //   },
    //   last_message: {},
    //   name: 'request check',
    // },
    // {
    //   chat_id: 14,
    //   creator: {
    //     email: 'ashley.williams@mmu.ac.uk',
    //     first_name: 'Ashlek',
    //     last_name: 'Williams',
    //     user_id: 1,
    //   },
    //   last_message: {},
    //   name: 'request check',
    // },
    // {
    //   chat_id: 15,
    //   creator: {
    //     email: 'ashley.williams@mmu.ac.uk',
    //     first_name: 'Ashlek',
    //     last_name: 'Williams',
    //     user_id: 1,
    //   },
    //   last_message: {},
    //   name: 'Marios new chat',
    // },
    // {
    //   chat_id: 16,
    //   creator: {
    //     email: 'ashley.williams@mmu.ac.uk',
    //     first_name: 'Ashlek',
    //     last_name: 'Williams',
    //     user_id: 1,
    //   },
    //   last_message: {},
    //   name: 'request check',
    // },
    // {
    //   chat_id: 17,
    //   creator: {
    //     email: 'ashley.williams@mmu.ac.uk',
    //     first_name: 'Ashlek',
    //     last_name: 'Williams',
    //     user_id: 1,
    //   },
    //   last_message: {},
    //   name: 'request check',
    // },
    // {
    //   chat_id: 18,
    //   creator: {
    //     email: 'ashley.williams@mmu.ac.uk',
    //     first_name: 'Ashlek',
    //     last_name: 'Williams',
    //     user_id: 1,
    //   },
    //   last_message: {},
    //   name: 'request check',
    // },
    // {
    //   chat_id: 19,
    //   creator: {
    //     email: 'ashley.williams@mmu.ac.uk',
    //     first_name: 'Ashlek',
    //     last_name: 'Williams',
    //     user_id: 1,
    //   },
    //   last_message: {},
    //   name: 'sss',
    // },
    // {
    //   chat_id: 20,
    //   creator: {
    //     email: 'ashley.williams@mmu.ac.uk',
    //     first_name: 'Ashlek',
    //     last_name: 'Williams',
    //     user_id: 1,
    //   },
    //   last_message: {},
    //   name: 'dfsfsdf',
    // },
    // {
    //   chat_id: 21,
    //   creator: {
    //     email: 'ashley.williams@mmu.ac.uk',
    //     first_name: 'Ashlek',
    //     last_name: 'Williams',
    //     user_id: 1,
    //   },
    //   last_message: {
    //     author: [Object],
    //     message: 'this is the new first',
    //     message_id: 77,
    //     timestamp: 1684264552098,
    //   },
    //   name: 'aaaaaaaaa',
    // },
    // {
    //   chat_id: 22,
    //   creator: {
    //     email: 'ashley.williams@mmu.ac.uk',
    //     first_name: 'Ashlek',
    //     last_name: 'Williams',
    //     user_id: 1,
    //   },
    //   last_message: {},
    //   name: 'new chat 1',
    // },
  ];

  const add = {
    chat_id: 99,
    creator: {
      email: 'ashley.williams@mmu.ac.uk',
      first_name: 'Ashlek',
      last_name: 'Williams',
      user_id: 1,
    },
    last_message: {
      author: [Object],
      message: 'tesating',
      message_id: 81,
      timestamp: 1684528155317,
    },
    name: 'asdadasdasdadadadacccccxxxxxxxxxxxxThe Rod Stewart Appreciation Society',
  };

  const update = {
    chat_id: 99,
    creator: {
      email: 'ashley.williams@mmu.ac.uk',
      first_name: 'Ashlek',
      last_name: 'Williams',
      user_id: 1,
    },
    last_message: {
      author: [Object],
      message: 'tesating',
      message_id: 81,
      timestamp: 1684528155317,
    },
    name: 'UPDATED THINGSSSSSSSSSSSSSSSSSSSSSS',
  };
  //FIXME: For some reason, sorting the array here causes undefined function error
  return (
    <View>
      <SafeAreaView>
        <Text>Message State View</Text>
        <ButtonComponent
          title={'set chatrooms'}
          onPress={() => dispatcher.setChatSummaryList(data)}
        />
        <ButtonComponent title={'add chatroom'} onPress={() => dispatcher.addChatSummary(add)} />
        <ButtonComponent
          title={'update chatroom'}
          onPress={() => dispatcher.updateChatSummary(update)}
        />
        <ButtonComponent title={'delete chatroom'} onPress={() => dispatcher.deleteChatSummary(99)} />
        <ButtonComponent title={'get chat rooms'} onPress={() => console.log(chatSummaryList)} />
        {/* <FlatList
          data={state?.messages}
          keyExtractor={(item) => item.message_id.toString()}
          renderItem={(_) => <Text>{_.item.message}</Text>}
        /> */}
      </SafeAreaView>
    </View>
  );
};

export default MessageStateView;
