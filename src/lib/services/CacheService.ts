import AsyncStorage from '@react-native-async-storage/async-storage';
import log from '../util/LoggerUtil';

type TCachedData = {
  data: any;
  created: number;
};

const getCachedData = async (url: string, returnType?: unknown, expiresIn?: number) => {
  log.debug(`[Cache] Fetching: ${url}`);
  try {
    const cache = await AsyncStorage.getItem(url);
    if (!cache) {
      throw new Error(`[Cache] No cache found: ${url}`);
    }
    const cdata = JSON.parse(cache);
    expiresIn = expiresIn ? expiresIn : 1000 * 60 * 60 * 24 * 7; // 7 days

    if (cdata.created + expiresIn < Date.now()) {
      await clearCachedData(url);
      log.debug(`[Cache] Expired: ${url}`);
      throw new Error(`[Cache] Expired: ${url}`);
    }
    return cdata.data;
  } catch (err) {
    log.error('[Cache] Error fetching cache:', err);
  }
};

const setCachedData = async (url: string, data: any) => {
  log.debug(`[Cache] Storing: ${url}`);
  const cdata: TCachedData = {
    data: data,
    created: Date.now(),
  };
  await AsyncStorage.setItem(url, JSON.stringify(cdata));
};

const clearCachedData = async (url: string) => {
  log.debug(`[Cache] Clearing: ${url}`);
  await AsyncStorage.removeItem(url);
};

export { getCachedData, setCachedData, clearCachedData };
