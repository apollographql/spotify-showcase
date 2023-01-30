import { RefObject, useState, useEffect } from 'react';
import noop from '../utils/noop';
import useDeepMemo from './useDeepMemo';
import useStableCallback from './useStableCallback';

const useIntersectionObserver = (
  ref: RefObject<Element | undefined>,
  options: IntersectionObserverInit = {},
  callback: IntersectionObserverCallback = noop
) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const stableCallback = useStableCallback(callback);
  const stableOptions = useDeepMemo(() => options, [options]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver((entries, observer) => {
      setEntry(entries[0]);
      stableCallback(entries, observer);
    }, stableOptions);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [stableCallback, ref, stableOptions]);

  return { entry };
};

export default useIntersectionObserver;
