/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import { useApiContext } from '../context/ApiContext';
import { TChatInfo, useChatContext } from '../context/ChatContext';
import { TChatSummary, TChat } from '../types/TSchema';
import log, { apiLog, pollingLog } from '../util/LoggerUtil';

const useChatController = () => {
  const { useFetch } = useApiContext();
  const { chatSummaryList, dispatcher } = useChatContext();

  if (!useFetch) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const _fetchChatInfoDetails = (chat_id: number): Promise<TChat> => {
    return useFetch(
      {
        url: `/chat/${chat_id}`,
        method: 'GET',
        headers: { polling: true },
      },
      true
    );
  };

  const fetchChatSummaryList = async () => {
    try {
      const response = await useFetch({ url: `/chat`, method: 'GET' }, true);
      if (!response || !response.data) return;
      pollingLog.debug(`Fetched ChatList: ${response.data.length}`);
      return response.data as TChatSummary[];
    } catch (err) {
      apiLog.warn(`Fetching chat summary: ${err}`);
    }
  };

  const _handleAll = async (fetchedChatList: TChatSummary[]) => {
    if (!fetchedChatList || fetchedChatList.length === 0) return;

    const promises = [] as any[];

    try {
      for (let i = 0; i < fetchedChatList.length; i += 1) {
        promises.push(
          useFetch(
            {
              url: `/chat/${fetchedChatList[i].chat_id}`,
              method: 'GET',
              headers: { polling: true },
            },
            true
          )
        );

        if (i === fetchedChatList.length - 1) {
          Promise.allSettled(promises).then((results) => {
            const chatInfo = [] as Partial<TChat & TChatSummary>[];

            let chatInfoIndex = 0;

            if (!results) return;

            results.forEach((result) => {
              if (!result || result.status === 'rejected' || !result.value.data) {
                console.log(
                  `Error on index ${chatInfoIndex}, chat_id ${fetchedChatList[chatInfoIndex].chat_id}: `,
                  result
                );
                chatInfoIndex += 1;
                return;
              }
              console.log('Pushing chat to chatInfo...');
              chatInfo.push({
                ...fetchedChatList[chatInfoIndex],
                ...(result.value.data as TChat),
              });

              chatInfoIndex += 1;
            });
            dispatcher.setChatSummaryList(chatInfo);
          });
        }
      }
    } catch (err) {
      apiLog.warn(`Fetching chat details: ${err}`);
    }
  };

  const handleIncomingChatSummary = (newChatList: TChatSummary[]) => {
    for (let i = 0; i < chatSummaryList.length - 1; i += 1) {
      const prevChat = chatSummaryList[i];
      const newChat = newChatList.find((chat) => chat.chat_id === prevChat.chat_id);
      if (!newChat) {
        console.log('Chat Deleted!', prevChat.chat_id);
        dispatcher.removeChatSummary(prevChat.chat_id);
      }
    }

    for (let i = 0; i < newChatList.length - 1; i += 1) {
      const newChat = newChatList[i];
      const prevChat = chatSummaryList.find((chat) => chat.chat_id === newChat.chat_id);

      if (!prevChat) {
        console.log('New Chat Found!', newChat.chat_id);
        const response = _fetchChatInfoDetails(newChat.chat_id);
        if (response) dispatcher.addChatSummary({ ...newChat, ...response });
      } else if (prevChat && prevChat.last_message.message_id !== newChat.last_message.message_id) {
        console.log('Chat Updated!', newChat.chat_id);
        const response = _fetchChatInfoDetails(newChat.chat_id);
        if (response) dispatcher.updateChatSummary({ newChat, ...response });
      }
    }
  };
  // };

  // const removeDeletedChats = (prevList: TChatInfo[], newList: TChatInfo[]) => {
  //   if (prevList.length === 0) return;

  //   prevList.forEach((prevChat, index) => {
  //     const result = newList.filter((newChat) => newChat.chat_id !== prevChat.chat_id);
  //     if (!result) {
  //       console.log('Chat deleted!');
  //       dispatcher.removeChatSummary(prevChat.chat_id);
  //     }
  //   });
  // };

  // const updatedChatSummaryList = (
  //   prevchatSummaryList: TChatInfo[],
  //   newChatSummaryList: TChatInfo[]
  // ) => {
  //   const checkedList: { chatInfo: TChatInfo; actionType: string }[] = [];

  //   newChatSummaryList.forEach((newChatSummary) => {
  //     const prevChatSummary = prevchatSummaryList.find(
  //       (prevChat) => prevChat.chat_id === newChatSummary.chat_id
  //     );

  //     if (!prevChatSummary) {
  //       console.log('New Chat Found!');
  //       checkedList.push({ chatInfo: newChatSummary, actionType: 'new' });
  //       return;
  //     }

  //     if (prevChatSummary.last_message.message_id !== newChatSummary.last_message.message_id) {
  //       console.log('Chat update found!');
  //       checkedList.push({ chatInfo: newChatSummary, actionType: 'update' });
  //     }
  //   });

  //   return checkedList;
  // };

  // const fetchChatDetails = async (fetchedChatList: TChatInfo[]) => {
  //   const prevChatSummary = dispatcher.getChatSummaryList();
  //   if (!fetchedChatList || fetchedChatList.length === 0) return;

  //   removeDeletedChats(prevChatSummary, fetchedChatList);

  //   const requiresUpdate = updatedChatSummaryList(prevChatSummary, fetchedChatList);

  //   if (requiresUpdate.length === 0) return;

  //   const promises = [] as any[];

  //   try {
  //     for (let i = 0; i < requiresUpdate.length; i += 1) {
  //       promises.push(
  //         useFetch(
  //           {
  //             url: `/chat/${requiresUpdate[i].chatInfo.chat_id}`,
  //             method: 'GET',
  //             headers: { polling: true },
  //           },
  //           true
  //         )
  //       );

  //       if (i === requiresUpdate.length - 1) {
  //         Promise.allSettled(promises).then((results) => {
  //           const chatInfo = [] as Partial<TChat & TChatSummary>[];
  //           let chatInfoIndex = 0;

  //           if (!results) return;

  //           results.forEach((result) => {
  //             if (!result || result.status === 'rejected' || !result.value.data) {
  //               console.log(
  //                 `Error on index ${chatInfoIndex}, chat_id ${requiresUpdate[chatInfoIndex].chatInfo.chat_id}: `,
  //                 result.reason
  //               );
  //               chatInfoIndex += 1;
  //               return;
  //             }

  //             if (requiresUpdate[chatInfoIndex].actionType === 'delete') {
  //               console.log('Chat Removed!');
  //               return;
  //             }

  //             if (requiresUpdate[chatInfoIndex].actionType === 'new') {
  //               console.log('New Chat Added!');
  //               const chat = {
  //                 ...requiresUpdate[chatInfoIndex].chatInfo,
  //                 ...(result.value.data as TChat),
  //               };

  //               dispatcher.addChatSummary({
  //                 chat,
  //               });
  //               chatInfoIndex += 1;
  //               return;
  //             }

  //             if (requiresUpdate[chatInfoIndex].actionType === 'update') {
  //               console.log('Chat Updated!');
  //               dispatcher.updateChatSummary({
  //                 ...requiresUpdate[chatInfoIndex].chatInfo,
  //                 ...(result.value.data as TChat),
  //               } as TChatInfo);
  //               chatInfoIndex += 1;
  //               return;
  //             }

  //             // chatInfo.push({
  //             // ...requiresUpdate[chatInfoIndex].chatInfo,
  //             // ...(result.value.data as TChat),
  //             // });

  //             chatInfoIndex += 1;
  //           });
  //           // dispatcher.setChatSummaryList(chatInfo);
  //         });
  //       }
  //     }
  //   } catch (err) {
  //     apiLog.warn(`Fetching chat details: ${err}`);
  //   }
  // };

  return { fetchChatSummaryList, handleIncomingChatSummary };
};

export default useChatController;
