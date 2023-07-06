/* eslint-disable react-hooks/rules-of-hooks */

import useApi from '../context/api/useApi';
import { useChat } from '../context/chats';

import { TChatSummary, TChat } from '../types/TSchema';

import log, { apiLog, pollingLog } from '../util/LoggerUtil';

const useChatController = () => {
  const { apiCaller } = useApi();
  const { chatSummaryList: prevState, dispatcher } = useChat();

  if (!apiCaller) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const fetchChatSummary = async () => {
    try {
      const response = await apiCaller({ url: `/chat`, method: 'GET' }, true);
      if (!response || !response.data) return;
      pollingLog.debug(`Fetched ChatList: ${response.data.length}`);
      return response.data as TChatSummary[];
    } catch (err) {
      apiLog.warn(`Fetching chat summary: ${err}`);
    }
  };

  const fetchChatDetails = async (chatSummaryList: TChatSummary[]) => {
    const promises = [] as any[];
    try {
      for (let i = 0; i < chatSummaryList.length; i += 1) {
        promises.push(
          apiCaller(
            {
              url: `/chat/${chatSummaryList[i].chat_id}`,
              method: 'GET',
              headers: { polling: true },
            },
            true
          )
        );
        if (i === chatSummaryList.length - 1) {
          Promise.allSettled(promises).then((results) => {
            const chatInfo = [] as Partial<TChat & TChatSummary>[];
            let chatInfoIndex = 0;
            if (!results) return;
            results.forEach((result) => {
              if (!result || result.status === 'rejected' || !result.value || !result.value.data) {
                console.log(
                  `Error on index ${chatInfoIndex}, chat_id ${chatSummaryList[chatInfoIndex].chat_id}: `,
                  result.reason
                );
                chatInfoIndex += 1;
                return;
              }
              const chat = result.value.data as TChat;

              chatInfo.push({
                ...chatSummaryList[chatInfoIndex],
                ...chat,
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

  return { fetchChatSummary, fetchChatDetails };
};

export default useChatController;
