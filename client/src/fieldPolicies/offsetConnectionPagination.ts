import { PageInfo } from '../types/api';
import { FieldPolicy, Reference } from '@apollo/client';

type KeyArgs = FieldPolicy<unknown>['keyArgs'];

interface ConnectionPagination<T> {
  __typename: string;
  pageInfo: Partial<PageInfo>;
  edges: T[];
}

// Enforce a typename with this helper. It mostly works without it with the
// exception when connection fields are pulled into fragments. Once that is
// done, the cache seems to lose these values. Enforcing a __typename field
// returned from this merge policy ensures consistency.
const offsetConnectionPagination = <T = Reference>(
  typename: string,
  keyArgs: KeyArgs = false
): FieldPolicy<ConnectionPagination<T>> => {
  return {
    keyArgs,
    merge(existing, incoming, { args, mergeObjects }) {
      const result: ConnectionPagination<T> = {
        __typename: typename,
        pageInfo: mergeObjects(existing?.pageInfo ?? {}, incoming.pageInfo),
        edges: existing?.edges.slice(0) ?? [],
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
