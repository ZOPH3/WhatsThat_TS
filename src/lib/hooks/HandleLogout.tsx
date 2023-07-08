import { useEffect } from 'react';
import { useAuth } from '../context/auth';
import { useChat } from '../context/chats';
import { useContactContext } from '../context/contact/ContactContext';
import log, { cacheLog } from '../util/LoggerUtil';
import { clearCachedData } from '../services/CacheService';

const HandleLogout = () => {
  const a = useAuth();
  const c = useChat();
  const u = useContactContext();

  const chatList = c.chatSummaryList ?? [];

  const handleState = () => {
    /** Clear the state */
    log.info('Clearing the state...');
    c.dispatcher?.setChatSummaryList([]);
    u.dispatcher?.setContacts([]);
    u.dispatcher?.setBlocked([]);
  };

  const handleCache = () => {
    cacheLog.info('Clearing the cache...');
    if (chatList.length > 0) {
      chatList.forEach((chat) => {
        clearCachedData(`/chat/${chat.chat_id}`);
      });
    }
    clearCachedData('/login');
    clearCachedData(`/user/${a.authState.id}`);
    clearCachedData('/chat');
    clearCachedData('/contacts');
    clearCachedData('/blocked');
    clearCachedData('/drafts');
    clearCachedData('IMG_CACHE');
  };

  return { handleState, handleCache };

  //   useEffect(() => {
  //     if (!a.authState.authenticated) {
  //       handleState();
  //       handleCache();
  //     }
  //   }, [a.authState.authenticated]);
};
export default HandleLogout;
