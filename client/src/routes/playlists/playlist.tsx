import { Link, useParams } from 'react-router-dom';
import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { Music } from 'lucide-react';
import { PlaylistQuery, PlaylistQueryVariables } from '../../types/api';
import CoverPhoto from '../../components/CoverPhoto';
import Flex from '../../components/Flex';
import PlayButton from '../../components/PlayButton';
import PlaceholderCoverPhoto from '../../components/PlaceholderCoverPhoto';
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
      tracks {
        pageInfo {
          total
        }
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
  const { tracks } = playlist;
  const images = playlist.images ?? [];
  const coverPhoto = images[0];

  useSetBackgroundColorFromImage(coverPhoto?.url, {
    fallback: 'rgba(var(--background--surface--rgb), 0.5)',
  });

  return (
    <div className={styles.playlist}>
      <Flex as="header" gap="2rem" alignItems="end">
        <CoverPhoto
          className={styles.playlistImage}
          src={coverPhoto?.url}
          fallback={<PlaceholderCoverPhoto icon={Music} />}
        />
        <Flex direction="column" gap="0.5rem">
          <h2 className={styles.type}>Playlist</h2>
          <h1 className={styles.playlistName}>{playlist.name}</h1>
          <Flex className={styles.playlistInfo} alignItems="center">
            <Flex alignItems="center" gap="1ch">
              <Link
                className={styles.playlistOwner}
                to={`/users/${playlist.owner.id}`}
              >
                {playlist.owner.displayName}
              </Link>
            </Flex>
            <span>
              {tracks.pageInfo.total}{' '}
              {tracks.pageInfo.total === 1 ? 'song' : 'songs'}
            </span>
          </Flex>
        </Flex>
      </Flex>
      <div>
        <div className={styles.playlistPlayButton}>
          <PlayButton size="sm" playing={false} />
        </div>
      </div>
    </div>
  );
};

export default Playlist;
