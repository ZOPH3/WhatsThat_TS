/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View } from 'react-native';
import { Appbar, List, Modal, Portal, ProgressBar, Text, useTheme } from 'react-native-paper';

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
import { TDraftMessage } from '../../lib/context/services/types';

function DraftList({ chat_id, service, actions }) {
  const [draftList, setDraftList] = useState<TDraftMessage[]>([]);

  useEffect(() => {
    const d = service.draftMessageList.filter((draft) => draft.chat_id === chat_id);
    setDraftList(d);
  }, [chat_id, service.draftMessageList]);

  return (
    <View>
      <ListDrafts draftList={draftList} actions={actions} />
    </View>
  );
}

function ListDrafts({ draftList, actions }: { draftList: TDraftMessage[]; actions: any }) {
  return draftList.map((draft, index) => (
    <List.Item
      key={draft.draft_id}
      title={draft.message?.message}
      description={
        <View>
          <Text>{`Created: ${new Date(draft.created_at || Date.now()).toLocaleString()}`}</Text>
          <Text>{`Scheduled: ${new Date(draft.scheduled || Date.now()).toLocaleString()}`}</Text>
        </View>
      }
      left={(props) => <List.Icon {...props} icon={draft.sent ? 'send-check' : 'send-clock'} />}
      right={(props) => !draft.sent && <List.Icon {...props} icon="send" />}
      onPress={(draft) => actions?.onPress(draft) ?? null}
    />
  ));
}

function ChatViewContainer(props: { chat_id: number }) {
  const editText = useRef<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [chatName, setChatName] = useState<string>('');
  const [messageList, setMessageList] = useState<Partial<TSingleMessage>[]>([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const theme = useTheme();
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
        if (res.data) setChatName(res.data.name);
        if (res.data.messages.length !== messageList.length) {
          // apiLog.info(`Updating message list...`);
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
        setChatName(data.name);
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

  const doSend = async (inputValue: string) => {
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

  const doUpdate = async (inputValue: string, message_id: number) => {
    const toEdit = messageList.find((m) => m.message_id === message_id) as
      | TSingleMessage
      | undefined;

    if (toEdit && toEdit.message_id !== undefined) {
      setButtonLoading(true);
      const updated = { ...toEdit, message: inputValue };
      m.updateMessage(toEdit.message_id, inputValue)
        .then((res) => {
          if (res === 'OK') {
            const newMessages = messageList.map((message) => {
              if (message.message_id === toEdit.message_id) {
                return updated;
              }
              return message;
            });

            setMessageList(newMessages);
          }
        })
        .catch((err) => {
          n.dispatcher.addNotification({ type: 'warn', message: 'Unable to update message...' });
        })
        .finally(() => setButtonLoading(false));
    }
  };

  const setEdit = (message: TSingleMessage) => {
    setEditId(null);
    console.log('Edit message triggered', message.message_id);
    editText.current = messageList.find((m) => m.message_id === message.message_id).message ?? null;

    if (!editText.current) return;

    if (editText.current !== '') {
      setIsEditing(true);
      setEditId(message.message_id);
    }
  };

  const handleSend = (inputValue: string) => {
    if (isEditing) {
      if (editId === null) {
        console.log('Edit id is null');
        return;
      }
      doUpdate(inputValue, editId);
    } else {
      doSend(inputValue);
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
        <Appbar.Content title={chatName} />
        <SettingsMenu items={items} />
      </Appbar.Header>
      <View style={styles.container}>
        <Portal.Host>
          <ProgressBar indeterminate visible={isLoading || buttonLoading} />
          <SafeAreaView style={{ flex: 10, paddingBottom: 75 }}>
            {!!onError && <Text>{onError}</Text>}
            {!messageList && <Text>No Messages</Text>}
            {!!messageList && (
              <MessageList messages={messageList} onDelete={handleDelete} onEdit={setEdit} />
            )}
          </SafeAreaView>
          <MessageInput
            onSend={handleSend}
            onDraft={handleDraft}
            isEditing={isEditing}
            openDraft={() => setModalVisible(true)}
            editText={editText.current}
            setIsEditing={setIsEditing}
          />
        </Portal.Host>

        {/* Draft List */}
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            style={{ backgroundColor: theme.colors.background, padding: 20 }}
          >
            <View>
              <Text>Draft Messages</Text>
              <DraftList chat_id={chat_id} service={service} actions={undefined} />
            </View>
          </Modal>
        </Portal>
      </View>
    </>
  );
}

export default ChatViewContainer;
