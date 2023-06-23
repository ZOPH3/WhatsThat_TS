import AsyncStorage from '@react-native-async-storage/async-storage';
import log from '../util/LoggerUtil';

type TCachedData = {
  data: any;
  expiresAt: number;
};

const getCachedData = async (url: string, returnType?: unknown) => {
  log.debug(`Fetching from cache: ${url}`);
  const cache = await AsyncStorage.getItem(url);
  if (cache === null) {
    log.debug('No cache found...', url);
    throw new Error(`No cache found... ${url}`);
  }
  // const cdata: TCachedData = JSON.parse(cache);
  const cdata = JSON.parse(cache);

  if (cdata.expiresAt < Date.now()) {
    await clearCachedData(url);
    log.debug('Cache expired...');
    throw new Error('Cache expired...');
  }

  // if (returnType) return cdata.data as typeof returnType;
  return cdata.data;
};

const setCachedData = async (url: string, data: any) => {
  log.debug(`Storing in cache: ${url}`);
  const cdata: TCachedData = {
    data: data,
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  };
  await AsyncStorage.setItem(url, JSON.stringify(cdata));
};

const clearCachedData = async (url: string) => {
  log.debug(`Clearing cache: ${url}`);
  await AsyncStorage.removeItem(url);
};

export { getCachedData, setCachedData, clearCachedData };
