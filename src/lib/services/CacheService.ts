import AsyncStorage from '@react-native-async-storage/async-storage';
import log, { cacheLog } from '../util/LoggerUtil';

type TCachedData<T> = {
  data: T;
  created: number;
};

async function setCachedData<T>(url: string, data: T) {
  const cdata: TCachedData<T> = {
    data: data,
    created: Date.now(),
  };

  const string = JSON.stringify(cdata);

  cacheLog.debug(`[CACHE] Storing: ${url}`);
  await AsyncStorage.setItem(url, string);
}

const clearCachedData = async (url: string) => {
  cacheLog.debug(`[CACHE] Clearing: ${url}`);
  await AsyncStorage.removeItem(url);
};

async function getCachedData<T>(url: string, expiresIn?: number) {
  cacheLog.debug(`[CACHE] Fetching: ${url}`);

  try {
    const cache = await AsyncStorage.getItem(url);
    if (!cache) {
      throw new Error(`[CACHE] No cache found: ${url}`);
    }

    const cdata = JSON.parse(cache) as TCachedData<T>;
    expiresIn = expiresIn ? expiresIn : 1000 * 60 * 60 * 24 * 7; // 7 days
    if (cdata.created + expiresIn < Date.now()) {
      await clearCachedData(url);
      throw new Error(`[CACHE] Expired: ${url}`);
    }

    return cdata.data as T;
  } catch (err) {
    cacheLog.warn(err);
  }
}

export { getCachedData, setCachedData, clearCachedData };
