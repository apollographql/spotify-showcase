import { RefObject, useState, useEffect } from 'react';
import noop from '../utils/noop';
import useStableCallback from './useStableCallback';

const useIntersectionObserver = (
  ref: RefObject<Element | undefined>,
  options: IntersectionObserverInit = {},
  callback: IntersectionObserverCallback = noop
) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const stableCallback = useStableCallback(callback);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver((entries, observer) => {
      setEntry(entries[0]);
      stableCallback(entries, observer);
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [stableCallback]);

  return { entry };
};

export default useIntersectionObserver;
