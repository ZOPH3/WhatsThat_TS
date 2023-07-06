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

  const getCache = async () => {
    setOnError(undefined);
    setIsLoading(true);
    const response = await getCachedData<ImageCache[]>(CACHE_URL)
      .catch((err) => {
        setOnError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    if (response) {
      const c = response.find((cache: ImageCache) => cache.url === url);
      if (c) {
        if (c.data !== data) setData(c.data);
        setOnError(undefined);
      } else {
        cacheLog.debug('ImageFetcher: No cache found...');
      }
    }
  };

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
          pushCache();
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

  const postImage = async (image: string) => {
    setIsLoading(true);
    try {
      const response = await useFetch(
        { url, method: 'POST', data: image, maxBodyLength: Infinity },
        true
      );
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
    const initialCache = async () => getCache();
    initialCache();
  }, []);

  const getFetch = async () => makeRequest();
  useEffect(() => {
    if (!data) {
      getFetch();
    }
  }, [data]);

  return {
    getCache,
    data,
    setData,
    isLoading,
    onError,
    ImageProfile,
    makeRequest,
  };
}

export default ImageFetcher;
