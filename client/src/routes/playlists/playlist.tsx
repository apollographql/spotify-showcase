import { Link, useParams } from 'react-router-dom';
import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { PlaylistQuery, PlaylistQueryVariables } from '../../types/api';
import PlayButton from '../../components/PlayButton';
import LazyImage from '../../components/LazyImage';
import useSetBackgroundColorFromImage from '../../hooks/useSetBackgroundColorFromImage';
import styles from './playlist.module.scss';

const PLAYLIST_QUERY = gql`
  query PlaylistQuery($id: ID!) {
    playlist(id: $id) {
      id
      name
      images {
        url
      }
      owner {
        id
        displayName
      }
    }
  }
`;

const Playlist = () => {
  const { playlistId } = useParams() as { playlistId: 'string' };
  const { data } = useSuspenseQuery<PlaylistQuery, PlaylistQueryVariables>(
    PLAYLIST_QUERY,
    { variables: { id: playlistId } }
  );

  const playlist = data.playlist!;
  const images = playlist.images ?? [];

  useSetBackgroundColorFromImage(images[0].url);

  return (
    <div className={styles.playlist}>
      <div className={styles.playlistInfo}>
        <LazyImage className={styles.playlistImage} src={images[0].url} />
        <h2>{playlist.name}</h2>
        <div>
          <Link
            className={styles.playlistOwnerLink}
            to={`/users/${playlist.owner.id}`}
          >
            {playlist.owner.displayName}
          </Link>
        </div>
        <div>
          <span className={styles.playlistSongCount}>1 Song</span>
        </div>
        <div className={styles.playlistPlayButton}>
          <PlayButton size="sm" playing={false} />
        </div>
      </div>
    </div>
  );
};

export default Playlist;
