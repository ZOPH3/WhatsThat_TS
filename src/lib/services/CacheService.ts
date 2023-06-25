import AsyncStorage from '@react-native-async-storage/async-storage';
import log from '../util/LoggerUtil';

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

  log.debug(`[CACHE] Storing: ${url}`);
  await AsyncStorage.setItem(url, string);
}

async function getCachedData<T>(url: string, expiresIn?: number) {
  log.debug(`[CACHE] Fetching: ${url}`);

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
    log.error(err);
  }
}

const clearCachedData = async (url: string) => {
  log.debug(`[CACHE] Clearing: ${url}`);
  await AsyncStorage.removeItem(url);
};

export { getCachedData, setCachedData, clearCachedData };
