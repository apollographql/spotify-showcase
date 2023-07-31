import { useRef } from 'react';
import useOffsetBasedPaginationObserver, {
  UseOffsetBasedPaginationObserverOptions,
} from '../hooks/useOffsetBasedPaginationObserver';

export type OffsetBasedPaginationObserverProps =
  UseOffsetBasedPaginationObserverOptions;

const OffsetBasedPaginationObserver = (
  props: OffsetBasedPaginationObserverProps
) => {
  const ref = useRef<HTMLDivElement>(null);
  useOffsetBasedPaginationObserver(ref, props);

  return <div ref={ref} />;
};

export default OffsetBasedPaginationObserver;
