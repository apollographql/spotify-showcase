import { RefObject, useRef } from 'react';
import useIntersectionObserver from './useIntersectionObserver';
import useScrollContainer from './useScrollContainer';

interface PageInfo {
  offset: number;
  limit: number;
  hasNextPage: boolean;
}

export interface UseOffsetBasedPaginationObserverOptions {
  fetchMore: (options: { variables: { offset: number } }) => Promise<unknown>;
  pageInfo: PageInfo | undefined;
  scrollContainer?: Element | null;
  threshold?: `${string}px`;
}

const useOffsetBasedPaginationObserver = (
  ref: RefObject<Element | undefined>,
  {
    fetchMore,
    scrollContainer,
    pageInfo,
    threshold = '500px',
  }: UseOffsetBasedPaginationObserverOptions
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
      if (isIntersecting && pageInfo?.hasNextPage && !isLoadingRef.current) {
        const { offset, limit } = pageInfo;

        isLoadingRef.current = true;

        await fetchMore({ variables: { offset: offset + limit } });

        isLoadingRef.current = false;
      }
    }
  );
};

export default useOffsetBasedPaginationObserver;
