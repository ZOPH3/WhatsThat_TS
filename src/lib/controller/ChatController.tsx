/* eslint-disable react-hooks/rules-of-hooks */
import { useApiContext } from '../context/ApiContext';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { TChatSummary, TChat } from '../types/TSchema';
import log, { pollingLog } from '../util/LoggerUtil';

const useChatController = () => {
  const { useFetch } = useApiContext();
  const { dispatcher } = useChatContext();

  if (!useFetch) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const fetchChatSummary = async () => {
    try {
      const response = await useFetch({ url: `/chat`, method: 'GET' }, true);
      if (!response || !response.data) return;
      pollingLog.debug(`Fetched ChatList: ${response.data.length}`);
      return response.data as TChatSummary[];
    } catch (err) {
      log.error(`Error: ${err}`);
    }
  };

  const fetchChatDetails = async (chatSummaryList: TChatSummary[]) => {
    const promises = [] as any[];
    try {
      for (let i = 0; i < chatSummaryList.length; i++) {
        promises.push(
          useFetch(
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

            results.forEach((result) => {
              if (!result || result.status === 'rejected') {
                console.log(
                  `Error on index ${chatInfoIndex}, chat_id ${chatSummaryList[chatInfoIndex].chat_id}: `,
                  result.reason
                );
                chatInfoIndex += 1;
                return;
              }
              chatInfo.push({
                ...chatSummaryList[chatInfoIndex],
                ...(result.value.data as TChat),
              });
              chatInfoIndex += 1;
            });
            dispatcher.setChatSummaryList(chatInfo);
          });
        }
      }
    } catch (err) {
      log.error(`Error: ${err}`);
    }
  };

  return { fetchChatSummary, fetchChatDetails };
};

export default useChatController;
