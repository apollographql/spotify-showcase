import { useParams } from 'react-router-dom';
import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { PlaylistQuery, PlaylistQueryVariables } from '../../types/api';

const PLAYLIST_QUERY = gql`
  query PlaylistQuery($id: ID!) {
    playlist(id: $id) {
      id
      name
    }
  }
`;

const Playlist = () => {
  const { playlistId } = useParams() as { playlistId: 'string' };
  const {
    data: { playlist },
  } = useSuspenseQuery<PlaylistQuery, PlaylistQueryVariables>(PLAYLIST_QUERY, {
    variables: { id: playlistId },
  });

  if (!playlist) {
    throw new Response('Playlist not found', { status: 404 });
  }

  return <div>{playlist.name}</div>;
};

export default Playlist;
