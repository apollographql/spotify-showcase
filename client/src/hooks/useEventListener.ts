import { useEffect } from 'react';
import useStableCallback from './useStableCallback';

const useEventListener = (type: string, handler: (event: Event) => void) => {
  const stableHandler = useStableCallback(handler);

  useEffect(() => {
    window.addEventListener(type, stableHandler);

    return () => {
      window.removeEventListener(type, stableHandler);
    };
  }, [type, stableHandler]);
};

export default useEventListener;
