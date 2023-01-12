import { useEffect } from 'react';
import usePrevious from './usePrevious';
import useStableCallback from './useStableCallback';

const useDidUpdateValue = <T>(value: T, handler: (value: T) => void) => {
  const stableHandler = useStableCallback(handler);
  const previousValue = usePrevious(value);
  const valueDidUpdate = value !== previousValue;

  useEffect(() => {
    if (valueDidUpdate) {
      stableHandler(value);
    }
  }, [value, valueDidUpdate, stableHandler]);
};

export default useDidUpdateValue;
