import { useParams } from 'react-router-dom';
import { PlaylistQuery, PlaylistQueryVariables } from '../../types/api';
import { PlaylistPage } from '../../components/PlaylistPage';
import StandardLoadingState from '../../components/StandardLoadingState';
import LoadingStateHighlighter from '../../components/LoadingStateHighlighter';

import { TypedDocumentNode, gql, useQuery } from '@apollo/client';

const PLAYLIST_QUERY: TypedDocumentNode<
  PlaylistQuery,
  PlaylistQueryVariables
> = gql`
  query PlaylistQuery($id: ID!, $offset: Int) {
    playlist(id: $id) @synthetics(timeout: 2000) {
      id
      tracks(offset: $offset, limit: 15) @synthetics(timeout: 2000) {
        ...PlaylistPage_tracks
      }

      ...PlaylistPage_playlist
    }
  }
`;

export const PlaylistRoute = () => {
  const { playlistId } = useParams() as { playlistId: string };
  const { data, fetchMore, loading } = useQuery(PLAYLIST_QUERY, {
    variables: { id: playlistId },
  });

  if (loading) {
    return <PlaylistRoute.LoadingState />;
  }

  const playlist = data?.playlist;

  if (!playlist) {
    throw new Response('Playlist not found', { status: 404 });
  }

  const handleLoadMore = (offset: number) => {
    fetchMore({ variables: { offset } });
  };

  return (
    <PlaylistPage
      playlist={playlist}
      tracks={playlist.tracks}
      onLoadMore={handleLoadMore}
    />
  );
};

PlaylistRoute.LoadingState = () => {
  return (
    <LoadingStateHighlighter>
      <StandardLoadingState />
    </LoadingStateHighlighter>
  );
};
