interface IStorageControllerProps {
    
}
const StorageController = (cacheCallback: any, fetchCallback: any) => {
  /**
   * - Check if the data is in the cache
   * - If it is, check if it is fresh,
   * - If it is, return the data,
   * - If it isn't, fetch it and save it to the cache
   * - Return the data
   */

  const CACHE_EXPIRY = 1000 * 60 * 60 * 24; // 1 day in miliseconds

  const cache = new Map();
  const run = async (key: string) => {
      const data = await cacheCallback.get(key);
      if (data && new Date().getMilliseconds() < data.created + CACHE_EXPIRY) {
        return data;
      } else {
        const fetchedData = await fetchCallback(key);
        cacheCallback.set(key, fetchedData);
        return fetchedData;
      }
  };

};
