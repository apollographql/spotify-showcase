import { useRef, useEffect } from 'react';

const usePrevious = <TValue>(value: TValue) => {
  const ref = useRef<TValue>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
