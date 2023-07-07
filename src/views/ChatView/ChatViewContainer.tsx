/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View } from 'react-native';
import { Appbar, Portal, ProgressBar, Text } from 'react-native-paper';

import useFetchHook from '../../lib/hooks/useFetchHook';
import { useAuth } from '../../lib/context/auth';
import { useService } from '../../lib/context/services';

import MessageInteractions from './services/interactions';
import MessageList from './list/MessageList';
import MessageInput from './components/MessageInput';
import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';

import { TSingleMessage } from '../../lib/types/TSchema';

import styles from '../../styles/GlobalStyle';
import { getCachedData, setCachedData } from '../../lib/services/CacheService';
import { useNotification } from '../../lib/context/notification';
import { pollingItem } from '../../lib/services/PollingService';
import { apiLog, pollingLog } from '../../lib/util/LoggerUtil';
import { useApi } from '../../lib/context/api';

function ChatViewContainer(props: { chat_id: number }) {
  const [messageList, setMessageList] = useState<Partial<TSingleMessage>[]>([]);
  const [buttonLoading, setButtonLoading] = useState(false);

  const n = useNotification();
  const navigation = useNavigation();
  const service = useService();
  const { apiCaller } = useApi();

  const { chat_id } = props;
  const { current_user } = useAuth().authState;
  const m = MessageInteractions(chat_id);

  const CACHE_URL = `/chat/${chat_id}`;

  const { isLoading, onFetch, onError, getFresh, fetchCacheorFresh } = useFetchHook(
    { url: `/chat/${chat_id}`, method: 'GET' },
    true
  );

  const items: IMenuItem[] = [
    {
      title: 'Refresh',
      onPress: () => {
        onFetch(async () => getFresh())
          .then((res) => {
            if (res) {
              setMessageList(res.messages);
            } else {
              fetchCacheorFresh().then((res) => {
                if (res) {
                  setMessageList(res.messages);
                }
              });
            }
          })
          .catch((err) => {
            n.dispatcher.addNotification({ type: 'warn', message: 'Unable to refresh...' });
          });
      },
    },
    {
      title: 'Invite user',
      onPress: () => navigation.navigate('InviteUserView'),
      disabled: true,
    },
    {
      title: 'Edit Chat',
      onPress: () =>
        navigation.navigate('EditChatView', {
          chat_id,
        }),
      disabled: false,
    },
  ];

  const fetch = () => {
    if (!apiCaller) return;
    apiCaller({ url: `/chat/${chat_id}`, method: 'GET' }, true)
      .then((res) => {
        if (!res) throw new Error('No data');
        if (res.data.messages.length !== messageList.length) {
          apiLog.info(`Updating message list...`);
        }
        return res.data.messages as TSingleMessage[];
      })
      .then((res) => {
        setMessageList(res as TSingleMessage[]);
      })
      .catch((err) => {
        /** */
      });
  };

  const messagePoll = pollingItem(fetch, 5000);

  useEffect(() => {
    pollingLog.debug(`Starting polling for chat ${chat_id}...`);
    messagePoll.startPolling();
    return () => {
      pollingLog.debug(`Clear polling for chat ${chat_id}...`);
      messagePoll.clearPolling();
    };
  }, []);

  useEffect(() => {
    onFetch(async () => getFresh())
      .then((data) => {
        if (!data) throw new Error('No data');
        setMessageList(data.messages);
      })
      .catch((err) => {
        getCachedData<TSingleMessage[]>(CACHE_URL).then((res) => {
          if (res) {
            setMessageList(res);
          }
        });
      });
  }, [chat_id]);

  useEffect(() => {
    const setCache = async () => setCachedData<TSingleMessage[]>(CACHE_URL, messageList);

    if (messageList && messageList.length > 0) {
      setCache();
    }
  }, [messageList]);

  const handleSend = async (inputValue: string) => {
    if (inputValue !== '') {
      setButtonLoading(true);
      m.sendMessage(inputValue)
        .then((res) => {
          if (res) {
            setMessageList([...messageList, res]);
          }
        })
        .catch((err) => {
          n.dispatcher.addNotification({ type: 'warn', message: 'Unable to send message...' });
        })
        .finally(() => setButtonLoading(false));
    }
  };

  const handleDelete = (message_id: number) => {
    if (!message_id) return;
    setButtonLoading(true);
    m.deleteMessage(message_id)
      .then((res) => {
        if (res) {
          const newMessages = messageList.filter((message) => message.message_id !== message_id);
          setMessageList(newMessages);
        }
      })
      .catch((err) => {
        n.dispatcher.addNotification({ type: 'warn', message: 'Unable to delete...' });
      })
      .finally(() => setButtonLoading(false));
  };

  const handleDraft = (inputValue: string, date: string) => {
    const draft = {
      message: {
        message: inputValue,
        author: current_user,
      },
      chat_id,
      created_at: Date.now(),
      scheduled: date,
      sent: false,
    };
    service.dispatcher.addDraftMessage(draft);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Chat" />
        <SettingsMenu items={items} />
      </Appbar.Header>
      <View style={styles.container}>
        <Portal.Host>
          <ProgressBar indeterminate visible={isLoading || buttonLoading} />
          <SafeAreaView style={{ flex: 10, paddingBottom: 75 }}>
            {!!onError && <Text>{onError}</Text>}
            {!messageList && <Text>No Messages</Text>}
            {!!messageList && <MessageList messages={messageList} onDelete={handleDelete} />}
          </SafeAreaView>
          <MessageInput onSend={handleSend} onDraft={handleDraft} />
        </Portal.Host>
      </View>
    </>
  );
}

export default ChatViewContainer;
