/* eslint-disable no-underscore-dangle */
import { useApi } from '../context/api';
import { useService } from '../context/services';
import { getCachedData } from '../services/CacheService';
import { TDraftMessage } from '../context/services/types';
import MessageServices from '../services/MessageServices';

import { pollingLog } from '../util/LoggerUtil';
import { useChat } from '../context/chats';

const DraftController = () => {
  const { apiCaller } = useApi();
  const s = useService();
  const c = useChat();
  const m = MessageServices(apiCaller);

  const _send = (draft: TDraftMessage) => {
    if (!draft || !draft.message || !draft.message.message) return;
    // const chat = c.chatSummaryList.find((c) => c.chat_id === draft.chat_id);
    // if (!chat) {
    //   s.dispatcher.deleteDraftMessage(draft.draft_id);
    //   return;
    // }
    m.sendMessage(draft.chat_id, draft.message?.message)
      .then((res) => {
        if (!res) return;
        pollingLog.info('Draft Sent: ', res);
        s.dispatcher.deleteDraftMessage(draft.draft_id);
      })
      .catch((err) => {
        pollingLog.warn('Unable to send draft...');
      });
  };

  const checkDraft = () => {
    pollingLog.debug('Checking Drafts...');
    getCachedData<TDraftMessage[]>('/drafts').then((data) => {
      if (!data) return;
      if (data.length === 0) return;
      data.forEach(async (draft) => {
        if (!draft.sent) {
          if (draft.scheduled <= Date.now()) {
            // console.log(draft);
            _send(draft);
          }
        }
      });
    });
  };

  return { checkDraft };
};

export default DraftController;
