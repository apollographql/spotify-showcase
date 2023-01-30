import { RefObject, useState, useEffect } from 'react';
import noop from '../utils/noop';

const useIntersectionObserver = (
  ref: RefObject<Element>,
  options: IntersectionObserverInit = {},
  callback: IntersectionObserverCallback = noop
) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver((entries, observer) => {
      setEntry(entries[0]);
      callback(entries, observer);
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { entry };
};

export default useIntersectionObserver;
