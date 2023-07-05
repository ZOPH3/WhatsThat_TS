/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { View, Image } from 'react-native';
import { useApiContext } from '../context/ApiContext';
import { getCachedData, setCachedData } from '../services/CacheService';
import log, { apiLog, cacheLog } from '../util/LoggerUtil';

type ImageCache = {
  index: number;
  url: string;
  data: string;
};

const CACHE_URL = 'IMG_CACHE';

function ImageFetcher(url: string) {
  const [data, setData] = React.useState<any>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [onError, setOnError] = React.useState<any | undefined>(undefined);
  const fetch_count = useRef(0);

  const { useFetch } = useApiContext();

  if (!useFetch) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const cache = async () => {
    setOnError(undefined);
    setData(undefined);
    setIsLoading(true);
    const data = await getCachedData<ImageCache[]>(CACHE_URL)
      .catch((err) => {
        setOnError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    if (data) {
      const c = data.find((cache) => cache.url === url);
      if (c) {
        setData(c.data);
        setOnError(undefined);
        return c.data;
      }
    }

    return null;
  };

  const fetch = useCallback(async () => {
    try {
      let data;
      const response = await useFetch(
        { url, method: 'GET', maxBodyLength: Infinity, responseType: 'blob' },
        true
      );
      const mimeType = response.headers['content-type'];
      const file = new File([response.data], url, { type: mimeType });
      let base64data;
      const fileReaderInstance = new FileReader();
      fileReaderInstance.onload = () => {
        base64data = fileReaderInstance.result;
        data = base64data;
      };
      fileReaderInstance.readAsDataURL(file);

      return data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const makeRequest = async () => {
    setIsLoading(true);
    try {
      const response = await useFetch(
        { url, method: 'GET', maxBodyLength: Infinity, responseType: 'blob' },
        true
      );
      const mimeType = response.headers['content-type'];
      const file = new File([response.data], url, { type: mimeType });

      let base64data;
      const fileReaderInstance = new FileReader();
      fileReaderInstance.onload = () => {
        base64data = fileReaderInstance.result;
        if (base64data !== data) {
          setData(base64data);
          fetch_count.current += 1;
        } else {
          apiLog.debug('ImageFetcher: No change in data...');
        }
      };
      fileReaderInstance.readAsDataURL(file);

      setIsLoading(false);
    } catch (error) {
      setData(undefined);
      setIsLoading(false);
      console.log(error);
    }
  };

  function ImageProfile() {
    return (
      <Image
        source={{
          uri: data,
        }}
        style={{
          width: 100,
          height: 100,
        }}
      />
    );
  }

  let pollId: string | number | NodeJS.Timer | undefined;

  const pollRequest = () => {
    if (!pollId) {
      pollId = setInterval(async () => {
        await makeRequest();
      }, 50000);
    }
  };
  const clear = () => clearInterval(pollId);

  useEffect(() => {
    pollRequest();
    return () => clear();
  }, []);

  useEffect(() => {
    const getCache = async () => cache();
    getCache();
  }, []);

  const getFetch = async () => makeRequest();
  useEffect(() => {
    if (data === undefined) {
      getFetch();
    }
  }, [data]);

  const setCache = async (c: ImageCache[]) => {
    await setCachedData<ImageCache[]>(CACHE_URL, c);
  };

  const filterCache = async () => {
    let c;
    const cached = await getCachedData<ImageCache[]>(CACHE_URL);
    if (cached) {
      c = cached.filter((cache) => cache.url !== url);
    }
    return c || [];
  };

  const pushCache = async () => {
    const c = await filterCache();
    c.push({ index: c.length + 1, url, data });
    await setCache(c);
  };

  useEffect(() => {
    if (data) {
      cacheLog.info(`Caching image ${url} to ${CACHE_URL}...`);
      pushCache();
    }
  }, [fetch_count]);

  return {
    cache,
    data,
    isLoading,
    onError,
    ImageProfile,
    makeRequest,
  };
}

export default ImageFetcher;
