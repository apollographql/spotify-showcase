import { useParams } from 'react-router-dom';
import { gql, useSuspenseQuery } from '@apollo/client';
import { PlaylistQuery, PlaylistQueryVariables } from '../../types/api';
import { PlaylistPage } from '../../components/PlaylistPage';

const PLAYLIST_QUERY = gql`
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
  const { playlistId } = useParams() as { playlistId: 'string' };
  const { data, fetchMore } = useSuspenseQuery<
    PlaylistQuery,
    PlaylistQueryVariables
  >(PLAYLIST_QUERY, { variables: { id: playlistId } });
  const playlist = data.playlist;

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
