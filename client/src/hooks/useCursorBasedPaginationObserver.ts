import { RefObject, useRef } from 'react';
import useIntersectionObserver from './useIntersectionObserver';
import useScrollContainer from './useScrollContainer';

interface Cursors {
  after: string | null;
}

interface PageInfo {
  cursors: Cursors | null;
}

export interface UseCursorBasedPaginationObserverOptions {
  fetchMore: (options: { variables: { after: string } }) => Promise<unknown>;
  pageInfo: PageInfo | undefined;
  scrollContainer?: Element | null;
  threshold?: `${string}px`;
}

const useCursorBasedPaginationObserver = (
  ref: RefObject<Element | undefined>,
  {
    fetchMore,
    scrollContainer,
    pageInfo,
    threshold = '500px',
  }: UseCursorBasedPaginationObserverOptions
) => {
  const isLoadingRef = useRef(false);
  const defaultScrollContainer = useScrollContainer();

  useIntersectionObserver(
    ref,
    {
      root: scrollContainer || defaultScrollContainer || null,
      rootMargin: `0px 0px ${threshold} 0px`,
    },
    async ([{ isIntersecting }]) => {
      if (isIntersecting && pageInfo?.cursors?.after && !isLoadingRef.current) {
        const { after } = pageInfo.cursors;

        isLoadingRef.current = true;

        await fetchMore({ variables: { after } });

        isLoadingRef.current = false;
      }
    }
  );
};

export default useCursorBasedPaginationObserver;
