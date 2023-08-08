import { useParams } from 'react-router-dom';
import { TypedDocumentNode, gql, useSuspenseQuery } from '@apollo/client';
import { PlaylistQuery, PlaylistQueryVariables } from '../../types/api';
import { PlaylistPage } from '../../components/PlaylistPage';

const PLAYLIST_QUERY: TypedDocumentNode<
  PlaylistQuery,
  PlaylistQueryVariables
> = gql`
  query PlaylistQuery($id: ID!, $offset: Int) {
    playlist(id: $id) {
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
  const { data, fetchMore } = useSuspenseQuery(PLAYLIST_QUERY, {
    variables: { id: playlistId },
  });

  const { playlist } = data;

  if (!playlist) {
    throw new Response('Playlist not found', { status: 404 });
  }

  return (
    <PlaylistPage
      playlist={playlist}
      tracks={playlist.tracks}
      onLoadMore={fetchMore}
    />
  );
};
