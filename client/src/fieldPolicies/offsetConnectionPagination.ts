import { PageInfo } from '../types/api';
import { FieldPolicy, Reference } from '@apollo/client';

type KeyArgs = FieldPolicy<unknown>['keyArgs'];

interface ConnectionPagination<T> {
  pageInfo: Partial<PageInfo>;
  edges: T[];
}

const offsetConnectionPagination = <T = Reference>(
  keyArgs: KeyArgs = false
): FieldPolicy<ConnectionPagination<T>> => {
  return {
    keyArgs,
    merge(
      existing = { pageInfo: {}, edges: [] },
      incoming,
      { args, mergeObjects }
    ) {
      const result: ConnectionPagination<T> = {
        pageInfo: mergeObjects(existing.pageInfo, incoming.pageInfo),
        edges: existing.edges.slice(0),
      };

      if (!incoming.edges) {
        return result;
      }

      if (args) {
        const { offset = 0 } = args;

        for (let i = 0; i < incoming.edges.length; i++) {
          result.edges[offset + i] = incoming.edges[i];
        }
      } else {
        result.edges.push(...incoming.edges);
      }

      return result;
    },
  };
};

export default offsetConnectionPagination;
