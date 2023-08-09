import { TypedDocumentNode, gql, useQuery } from '@apollo/client';
import CorePlaybar, { LoadingState } from '../Playbar';
import { PlaybarQuery, PlaybarQueryVariables } from '../../types/api';
import LoadingStateHighlighter from '../LoadingStateHighlighter';

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
  const { data, loading, error } = useQuery(PLAYBAR_QUERY);

  if (loading) {
    return <Playbar.LoadingState />;
  }

  if (error) {
    throw error;
  }

  const me = data?.me;

  if (!me) {
    throw new Error('Oops, not logged in');
  }

  return <CorePlaybar player={me.player} />;
};

// Playbar.LoadingState = LoadingState;
Playbar.LoadingState = () => {
  return (
    <LoadingStateHighlighter>
      <LoadingState />
    </LoadingStateHighlighter>
  );
};
