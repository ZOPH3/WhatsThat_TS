import { getCachedData } from '../../services/CacheService';
import { TDraftMessage } from './types';

const loadCachedData = async () => {
  const data = await getCachedData<TDraftMessage[]>('/drafts');
  return data;
};

// eslint-disable-next-line import/prefer-default-export
export { loadCachedData };
