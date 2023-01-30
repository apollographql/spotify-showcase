import { useRef } from 'react';
import usePaginationObserver, {
  UsePaginationObserverOptions,
} from '../hooks/usePaginationObserver';

type PaginationObserverProps = UsePaginationObserverOptions;

const PaginationObserver = (props: PaginationObserverProps) => {
  const ref = useRef<HTMLDivElement>(null);
  usePaginationObserver(ref, props);

  return <div ref={ref} />;
};

export default PaginationObserver;
