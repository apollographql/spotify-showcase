import { useEffect } from 'react';
import useStableCallback from './useStableCallback';

const useInterval = (callback: () => void, duration: number | null) => {
  const stableCallback = useStableCallback(callback);

  useEffect(() => {
    if (duration === null) {
      return;
    }

    const id = setInterval(stableCallback, duration);

    return () => clearInterval(id);
  }, [duration, stableCallback]);
};

export default useInterval;
