import { useParams } from 'react-router-dom';
import { TypedDocumentNode, gql, useQuery } from '@apollo/client';
import { PlaylistQuery, PlaylistQueryVariables } from '../../types/api';
import { PlaylistPage } from '../../components/PlaylistPage';
import StandardLoadingState from '../../components/StandardLoadingState';
import LoadingStateHighlighter from '../../components/LoadingStateHighlighter';

const PLAYLIST_QUERY: TypedDocumentNode<
  PlaylistQuery,
  PlaylistQueryVariables
> = gql`
  query PlaylistQuery($id: ID!, $offset: Int) {
    playlist(id: $id) @synthetics(timeout: 4000) {
      id
      tracks(offset: $offset) {
        ...PlaylistPage_tracks
      }

      ...PlaylistPage_playlist
    }
  }
`;

export const PlaylistRoute = () => {
  const { playlistId } = useParams() as { playlistId: string };
  const { data, fetchMore, loading, error } = useQuery(PLAYLIST_QUERY, {
    variables: { id: playlistId },
  });

  if (loading) {
    return <PlaylistRoute.LoadingState />;
  }

  if (error) {
    throw error;
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
