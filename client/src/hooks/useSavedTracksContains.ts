import {
  gql,
  TypedDocumentNode,
  useApolloClient,
  useBackgroundQuery,
  useFragment,
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

const SAVED_TRACKS_CONTAINS_FRAGMENT: TypedDocumentNode<
  SavedTracksContainsFragment,
  { ids: string[] }
> = gql`
  fragment SavedTracksContainsFragment on CurrentUser {
    tracksContains(ids: $ids)
  }
`;

const MAX_ALLOWED_IDS = 50;
const INITIAL_BATCH_COUNT = 20;

const useSavedTracksContains = (ids: string[]) => {
  const client = useApolloClient();
  // We can only check 50 results at a time. We pick an initial amount to load
  // results that are displayed above the fold. This query is suspended to allow
  // the results to load with the rest of the parent context (such as a playlist).
  // A lower initial count allows us to speed up the initial query. We then
  // recursively load the rest in useEffect to get the rest since the list of
  // ids is an unknown size. This should be ok since this allows us to load the
  // set of results above the fold and (hopefully) have the rest of the items
  // fully loaded once the user scrolls down the page.
  //
  // We rely on the useFragment below to actually return the results for us.
  // This means we can ignore the result returned from this query and the
  // queries loaded in useEffect.
  useBackgroundQuery(SAVED_TRACKS_CONTAINS_QUERY, {
    errorPolicy: 'ignore',
    variables: { ids: ids.slice(0, INITIAL_BATCH_COUNT) },
  });

  useEffect(() => {
    // We've already loaded the first 50 in the useSuspenseQuery above, so we
    // only need to load the rest
    const batches = chunk(ids.slice(INITIAL_BATCH_COUNT), MAX_ALLOWED_IDS);

    batches.forEach((ids) => {
      client.query({ query: SAVED_TRACKS_CONTAINS_QUERY, variables: { ids } });
    });
  }, [client, ids]);

  const { complete, data } = useFragment({
    from: { __typename: 'CurrentUser' },
    fragment: SAVED_TRACKS_CONTAINS_FRAGMENT,
    variables: {
      ids,
    },
  });

  if (!complete) {
    return ids.reduce(
      (map, id) => map.set(id, false),
      new Map<string, boolean>()
    );
  }

  return ids.reduce(
    (map, id, index) => map.set(id, data.tracksContains?.[index] ?? false),
    new Map<string, boolean>()
  );
};

export default useSavedTracksContains;
