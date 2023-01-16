import { useEffect, useRef, useCallback } from 'react';

const useStableCallback = <TArgs extends unknown[], TReturn>(
  callback: (...args: TArgs) => TReturn
) => {
  const ref = useRef(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  return useCallback((...args: TArgs) => {
    return ref.current(...args);
  }, []);
};

export default useStableCallback;
