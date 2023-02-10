import { PageInfoCursorBased } from '../types/api';
import { FieldPolicy, Reference } from '@apollo/client';

type KeyArgs = FieldPolicy<unknown>['keyArgs'];

interface CursorPagination<T> {
  pageInfo: Partial<PageInfoCursorBased>;
  edges: T[];
}

const cursorConnectionPagination = <T = Reference>(
  keyArgs: KeyArgs = false
): FieldPolicy<CursorPagination<T>> => {
  return {
    keyArgs,
    merge(existing = { pageInfo: {}, edges: [] }, incoming, { mergeObjects }) {
      const result: CursorPagination<T> = {
        pageInfo: mergeObjects(existing.pageInfo, incoming.pageInfo),
        edges: existing.edges.slice(0),
      };

      if (!incoming.edges) {
        return result;
      }

      result.edges.push(...incoming.edges);

      return result;
    },
  };
};

export default cursorConnectionPagination;
