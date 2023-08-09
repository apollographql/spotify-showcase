import CorePlaybar, { LoadingState } from '../Playbar';
import { PlaybarQuery, PlaybarQueryVariables } from '../../types/api';

import { TypedDocumentNode, gql, useQuery } from '@apollo/client';

const PLAYBAR_QUERY: TypedDocumentNode<
  PlaybarQuery,
  PlaybarQueryVariables
> = gql`
  query PlaybarQuery {
    me {
      player @synthetics(timeout: 3000) {
        ...Playbar_player
      }
    }
  }
`;

export const Playbar = () => {
  const { data, loading } = useQuery(PLAYBAR_QUERY);

  if (loading) {
    return <Playbar.LoadingState />;
  }

  const me = data?.me;

  if (!me) {
    throw new Error('Oops, not logged in');
  }

  return <CorePlaybar player={me.player} />;
};

Playbar.LoadingState = LoadingState;
