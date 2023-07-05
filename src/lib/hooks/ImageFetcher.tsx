/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useState } from 'react';

import { View, Image } from 'react-native';
import { useApiContext } from '../context/ApiContext';
import { getCachedData } from '../services/CacheService';
import log from '../util/LoggerUtil';

type ImageCache = {
  index: number;
  url: string;
  data: string;
};

function ImageFetcher(url: string) {
  const [data, setData] = React.useState<any>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [onError, setOnError] = React.useState<any | undefined>(undefined);

  const CACHE_URL = 'IMG_CACHE';
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

  const fetchImage = useCallback(async () => {
    const res = await useFetch(
      { url, method: 'GET', maxBodyLength: Infinity, responseType: 'blob' },
      true
    );

    const mimeType = res.headers['content-type'];
    const file = new File([res.data], url, { type: mimeType });

    return file;
  }, []);

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
      fileReaderInstance.readAsDataURL(file);
      fileReaderInstance.onload = () => {
        base64data = fileReaderInstance.result;
        setData(base64data);
        // console.log(base64data);
      };
      setIsLoading(false);
    } catch (error) {
      setData(undefined);
      setIsLoading(false);
      console.log(error);
    }
  };

  return {
    fetchImage,
    cache,
    data,
    isLoading,
    onError,
    ImageProfile,
    makeRequest,
  };
}

export default ImageFetcher;
