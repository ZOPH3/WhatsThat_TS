import AsyncStorage from '@react-native-async-storage/async-storage';
import log from '../util/LoggerUtil';

type TCachedData = {
  data: any;
  created: number;
};

const getCachedData = async (url: string, returnType?: unknown, expiresIn?: number) => {
  log.debug(`Fetching from cache: ${url}`);
  const cache = await AsyncStorage.getItem(url);
  if (cache === null) {
    log.debug('No cache found...', url);
    throw new Error(`No cache found... ${url}`);
  }
  // const cdata: TCachedData = JSON.parse(cache);
  const cdata = JSON.parse(cache);

  //TODO: Check if connection is available, if not, return cached data


  expiresIn = expiresIn ? expiresIn : 1000 * 60 * 60 * 24 * 7; // 7 days

  if ((cdata.created + expiresIn) < Date.now()) {
    await clearCachedData(url);
    log.debug('Cache expired...');
    throw new Error('Cache expired...');
  }
  return cdata.data;
};

const setCachedData = async (url: string, data: any) => {
  log.debug(`Storing in cache: ${url}`);
  const cdata: TCachedData = {
    data: data,
    created: Date.now(),
  };
  await AsyncStorage.setItem(url, JSON.stringify(cdata));
};

const clearCachedData = async (url: string) => {
  log.debug(`Clearing cache: ${url}`);
  await AsyncStorage.removeItem(url);
};

export { getCachedData, setCachedData, clearCachedData };
