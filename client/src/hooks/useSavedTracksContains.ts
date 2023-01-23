import {
  gql,
  TypedDocumentNode,
  useApolloClient,
  useFragment_experimental as useFragment,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { useEffect } from 'react';
import {
  SavedTracksContainsFragment,
  SavedTracksContainsQuery,
  SavedTracksContainsQueryVariables,
} from '../types/api';
import { chunk } from 'lodash';

const SAVED_TRACKS_CONTAINS_QUERY: TypedDocumentNode<
  SavedTracksContainsQuery,
  SavedTracksContainsQueryVariables
> = gql`
  query SavedTracksContainsQuery($ids: [ID!]!) {
    me {
      tracksContains(ids: $ids)
    }
  }
`;

const SAVED_TRACKS_CONTAINS_FRAGMENT = gql`
  fragment SavedTracksContainsFragment on CurrentUser {
    tracksContains(ids: $ids)
  }
`;

const MAX_ALLOWED_IDS = 50;

const useSavedTracksContains = (ids: string[]) => {
  const client = useApolloClient();
  const { complete, data } = useFragment<
    SavedTracksContainsFragment,
    { ids: string[] }
  >({
    from: { __typename: 'CurrentUser' },
    fragment: SAVED_TRACKS_CONTAINS_FRAGMENT,
    variables: {
      ids,
    },
  });

  // We can only check 50 results at a time so we pick the first 50 ids and load
  // those. We then recursively load the rest in useEffect to get the rest since
  // the list of ids is an unknown size. This should be ok since this allows us
  // to load the set of results above the fold and (hopefully) have the rest of
  // the items fully loaded once the user scrolls down the page.
  //
  // We rely on the useFragment above to actually pull the results for us, should
  // we don't need to read any of the data loaded by this query or the query
  // in the useEffect.
  useSuspenseQuery(SAVED_TRACKS_CONTAINS_QUERY, {
    errorPolicy: 'ignore',
    variables: { ids: ids.slice(0, MAX_ALLOWED_IDS) },
  });

  useEffect(() => {
    // We've already loaded the first 50 in the useSuspenseQuery above, so we
    // only need to load the rest
    const batches = chunk(ids.slice(MAX_ALLOWED_IDS), MAX_ALLOWED_IDS);

    batches.forEach((ids) => {
      client.query({ query: SAVED_TRACKS_CONTAINS_QUERY, variables: { ids } });
    });
  }, [client, ids]);

  if (!complete) {
    return ids.reduce(
      (map, id) => map.set(id, false),
      new Map<string, boolean>()
    );
  }

  return ids.reduce(
    (map, id, index) => map.set(id, data?.tracksContains?.[index] ?? false),
    new Map<string, boolean>()
  );
};

export default useSavedTracksContains;
