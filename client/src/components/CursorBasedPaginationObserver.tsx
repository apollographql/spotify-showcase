import { useRef } from 'react';
import useCursorBasedPaginationObserver, {
  UseCursorBasedPaginationObserverOptions,
} from '../hooks/useCursorBasedPaginationObserver';

type CursorBasedPaginationObserverProps =
  UseCursorBasedPaginationObserverOptions;

const CursorBasedPaginationObserver = (
  props: CursorBasedPaginationObserverProps
) => {
  const ref = useRef<HTMLDivElement>(null);
  useCursorBasedPaginationObserver(ref, props);

  return <div ref={ref} />;
};

export default CursorBasedPaginationObserver;
