import AsyncStorage from '@react-native-async-storage/async-storage';
import log from '../util/LoggerUtil';

type TCachedData = {
  data: any;
  created: number;
};

const getCachedData = async (url: string, returnType?: unknown, expiresIn?: number) => {
  log.debug(`[CACHE] Fetching: ${url}`);
  try {
    const cache = await AsyncStorage.getItem(url);
    if (!cache) {
      throw new Error(`[CACHE] No cache found: ${url}`);
    }
    const cdata = JSON.parse(cache);
    expiresIn = expiresIn ? expiresIn : 1000 * 60 * 60 * 24 * 7; // 7 days

    if (cdata.created + expiresIn < Date.now()) {
      await clearCachedData(url);
      log.debug(`[CACHE] Expired: ${url}`);
      throw new Error(`[CACHE] Expired: ${url}`);
    }
    return cdata.data;
  } catch (err) {
    log.error('[CACHE] Error fetching cache:', err);
  }
};

const setCachedData = async (url: string, data: any) => {
  log.debug(`[CACHE] Storing: ${url}`);
  const cdata: TCachedData = {
    data: data,
    created: Date.now(),
  };
  await AsyncStorage.setItem(url, JSON.stringify(cdata));
};

const clearCachedData = async (url: string) => {
  log.debug(`[CACHE] Clearing: ${url}`);
  await AsyncStorage.removeItem(url);
};

export { getCachedData, setCachedData, clearCachedData };
