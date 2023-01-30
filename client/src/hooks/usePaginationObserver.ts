import { RefObject, useRef } from 'react';
import useIntersectionObserver from './useIntersectionObserver';
import useScrollContainer from './useScrollContainer';

interface PageInfo {
  offset: number;
  limit: number;
  hasNextPage: boolean;
}

export interface UsePaginationObserverOptions {
  fetchMore: (options: { variables: { offset: number } }) => Promise<unknown>;
  pageInfo: PageInfo | undefined;
  scrollContainer?: Element;
  threshold?: `${string}px`;
}

const usePaginationObserver = (
  ref: RefObject<Element | undefined>,
  {
    fetchMore,
    scrollContainer,
    pageInfo,
    threshold = '500px',
  }: UsePaginationObserverOptions
) => {
  const isLoadingRef = useRef(false);
  const defaultScrollContainer = useScrollContainer();

  useIntersectionObserver(
    ref,
    {
      root: defaultScrollContainer || scrollContainer || null,
      rootMargin: `0px 0px ${threshold} 0px`,
    },
    async ([entry]) => {
      const { isIntersecting } = entry;

      if (
        isLoadingRef.current ||
        !isIntersecting ||
        !pageInfo ||
        !pageInfo.hasNextPage
      ) {
        return;
      }

      const { offset, limit } = pageInfo;

      isLoadingRef.current = true;

      await fetchMore({ variables: { offset: offset + limit } });

      isLoadingRef.current = false;
    }
  );
};

export default usePaginationObserver;
