import { useRef } from 'react';
import useOffsetBasedPaginationObserver, {
  UseOffsetBasedPaginationObserverOptions,
} from '../hooks/useOffsetBasedPaginationObserver';

type PaginationObserverProps = UseOffsetBasedPaginationObserverOptions;

const OffsetBasedPaginationObserver = (props: PaginationObserverProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useOffsetBasedPaginationObserver(ref, props);

  return <div ref={ref} />;
};

export default OffsetBasedPaginationObserver;
