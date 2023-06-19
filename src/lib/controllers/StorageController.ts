// interface IStorageControllerProps {
//     cacheManager: ICacheManager;
//     dataFetcher: IDataFetcher;
// }

enum EFetchState {
    LOADING,
    LOADED,
    CANCELLED,
    ERROR
}

enum ECacheState {
    CACHED,
    FRESH,
    EXPIRED
}

// const StorageController = () => {
//   /**
//    * - Check if the data is in the cache
//    * - If it is, check if it is fresh,
//    * - If it is, return the data,
//    * - If it isn't, fetch it and save it to the cache
//    * - Return the data
//    */


//   const CACHE_EXPIRY = 1000 * 60 * 60 * 24; // 1 day in miliseconds

// };