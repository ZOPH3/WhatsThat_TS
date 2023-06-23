/**
 * - Check cache for saved state
 */

import React, { useState, useEffect } from 'react';
import { getCachedData, setCachedData } from '../services/CacheService';

const getStateFromCache = async () => {
  const cachedData = await getCachedData('state');
  return cachedData;
};

const setStateFromCache = async (state: any) => {
  await setCachedData('state', state);
};

const CacheState = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const getState = async () => {
      const cachedState = await getStateFromCache();
      setState(cachedState);
    };
    getState();
  }, []);

  useEffect(() => {
    if (state) {
      setStateFromCache(state);
    }
  }, [state]);

  return state;
};
