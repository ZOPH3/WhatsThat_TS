import React, { useRef, useEffect } from 'react';

/**
 * @param callback - callback is the function to be called on each interval.
 * @param delay - delay is the interval in milliseconds.
 */
const usePolling = (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const id = setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay]);
};

export default usePolling;
