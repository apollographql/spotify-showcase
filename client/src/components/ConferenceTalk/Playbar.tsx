import { TypedDocumentNode, gql, useSuspenseQuery } from '@apollo/client';
import CorePlaybar, { LoadingState } from '../Playbar';
import { PlaybarQuery, PlaybarQueryVariables } from '../../types/api';

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
  const { data } = useSuspenseQuery<PlaybarQuery, PlaybarQueryVariables>(
    PLAYBAR_QUERY
  );

  const { me } = data;

  if (!me) {
    throw new Error('Oops, not logged in');
  }

  return <CorePlaybar player={me.player} />;
};

Playbar.LoadingState = LoadingState;
