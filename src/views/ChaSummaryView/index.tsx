import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ProgressBar, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../../styles/GlobalStyle';
import log from '../../lib/util/LoggerUtil';

import ChatSummaryList from './list/ChatSummaryList';
import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';
import DialogComponent from '../../components/Dialog';

import { useApiContext } from '../../lib/context/ApiContext';
import useFetchHook from '../../lib/hooks/useFetchHook';
import { useAuthContext } from '../../lib/context/AuthContext';
import ButtonComponent from '../../components/Button';
import { useChatContext } from '../../lib/context/ChatContext';
import ComponentContainer, { IComponentState } from '../../components/Loader';
import { clearCachedData } from '../../lib/services/CacheService';

// const ChatSummaryView = () => {
//   const { useFetch } = useApiContext();
//   const { logout } = useAuthContext();
//   const { chatSummaryList, dispatcher } = useChatContext();
//   const navigation = useNavigation();

//   if (!useFetch || !logout) {
//     log.error('Unable to find Auth API...');
//     throw new Error('Unable to find Auth API...');
//   }

//   const { isLoading, onFetch, onError, getFresh } = useFetchHook(
//     { url: '/chat', method: 'GET' },
//     true
//   );

//   const items: IMenuItem[] = [
//     {
//       title: 'Settings',
//       onPress: () => navigation.navigate('Settings'),
//     },
//     {
//       title: 'Reload',
//       onPress: () => {
//         onFetch(async () => await getFresh()).catch();
//       },
//     },
//     {
//       title: 'Logout',
//       onPress: () => logout(),
//       disabled: false,
//     },
//   ];

//   const { DialogBlock, showDialog, hideDialog } = DialogComponent();
//   const dialogContent = [
//     {
//       children: <TextInput label="Chat name" />,
//     },
//   ];

//   useEffect(() => {
//     navigation.setOptions({
//       title: 'Chat',
//       headerRight: () => (
//         <>
//           <ButtonComponent title={'Create'} onPress={() => showDialog()} />
//           <SettingsMenu items={items} />
//         </>
//       ),
//     });
//     onFetch(async () => await getFresh()).then((data) => {
//       if (!data) return;
//       dispatcher.setChatSummaryList(data);
//     })
//   }, []);

//   const Result = () => {
//     if (isLoading) return <ProgressBar indeterminate={true} visible={isLoading} />;
//     if (onError) return <Text>{onError}</Text>;
//     if (chatSummaryList && chatSummaryList.length > 0) {
//       return (
//         <View>
//           <ChatSummaryList chatSummary={chatSummaryList} />
//         </View>
//       );
//     }
//     return <Text>No chats</Text>;
//   };

//   return (
//     <View style={styles.container}>
//       <Result />
//       <DialogBlock
//         title={'Create Chat'}
//         content={dialogContent}
//         actions={
//           <>
//             <ButtonComponent
//               title={'Cancel'}
//               onPress={() => {
//                 hideDialog();
//               }}
//             />
//             <ButtonComponent
//               title={'Create Chat'}
//               mode="contained"
//               onPress={() => {
//                 onFetch(async () => await getFresh());
//                 hideDialog();
//               }}
//             />
//           </>
//         }
//       />
//     </View>
//   );
// };

const ChatSummaryView = () => {
  const createTextRef = React.useRef('');
  const { useFetch } = useApiContext();
  const { logout } = useAuthContext();
  const { chatSummaryList, dispatcher } = useChatContext();
  const navigation = useNavigation();

  const [compState, setState] = useState<IComponentState>({ state: 'idle' });

  if (!useFetch || !logout) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const { isLoading, onFetch, onError, getFresh, init } = useFetchHook(
    { url: '/chat', method: 'GET' },
    true
  );

  const fetch = () => {
    onFetch(async () => await getFresh())
      .then((data) => {
        if (!data || data.length === 0) {
          setState({ state: 'empty' });
          return;
        }
        setState({ state: 'success' });
        dispatcher.setChatSummaryList(data);
      })
      .finally(() => {
        if (onError) setState({ state: 'error' });
      });
  };

  const items: IMenuItem[] = [
    {
      title: 'Settings',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      title: 'Reload',
      onPress: () => {
        fetch();
      },
    },
    {
      title: 'Logout',
      onPress: () => logout(),
      disabled: false,
    },
  ];

  const { DialogBlock, showDialog, hideDialog } = DialogComponent();
  const dialogContent = [
    {
      children: <TextInput label="Chat name" onChangeText={(e) => createTextRef.current = e} />,
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerRight: () => (
        <>
          <ButtonComponent title={'Create'} onPress={() => showDialog()} />
          <SettingsMenu items={items} />
        </>
      ),
    });
    init()
      .then((data) => {
        if (!data || data.length === 0) {
          setState({ state: 'empty' });
          return;
        }
        setState({ state: 'success' });
        dispatcher.setChatSummaryList(data);
      })
      .finally(() => {
        if (onError) setState({ state: 'error' });
      });
  }, []);

  return (
    <View style={styles.container}>
      <ProgressBar indeterminate={true} visible={isLoading} />
      <ButtonComponent title={'clear'} onPress={() => clearCachedData('/chat')} />
      <ComponentContainer
        name={'ChatSummaryList'}
        state={compState.state}
        onEmpty={<Text>No chats</Text>}
        onError={<Text>{onError}</Text>}
        onSuccess={<ChatSummaryList chatSummary={chatSummaryList} />}
      />
      <DialogBlock
        title={'Create Chat'}
        content={dialogContent}
        actions={
          <>
            <ButtonComponent
              title={'Cancel'}
              onPress={() => {
                hideDialog();
              }}
            />
            <ButtonComponent
              title={'Create Chat'}
              mode="contained"
              onPress={() => {
                if (createTextRef.current && createTextRef.current) {
                  dispatcher.addChatSummary({
                    name: createTextRef.current,
                    creator: auth
                  });
                  console.log(createTextRef.current);
                  // hideDialog();
                }
              }}
            />
          </>
        }
      />
    </View>
  );
};

export default ChatSummaryView;
