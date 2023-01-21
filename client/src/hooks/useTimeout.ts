import { useEffect } from 'react';
import useStableCallback from './useStableCallback';

const useTimeout = (callback: () => void, delay: number | null) => {
  const stableCallback = useStableCallback(callback);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = setTimeout(stableCallback, delay);

    return () => {
      clearTimeout(id);
    };
  }, [delay, stableCallback]);
};

export default useTimeout;
