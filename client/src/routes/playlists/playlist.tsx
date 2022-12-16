import { Link, useParams } from 'react-router-dom';
import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { Clock, Music, Podcast } from 'lucide-react';
import { PlaylistQuery, PlaylistQueryVariables } from '../../types/api';
import CoverPhoto from '../../components/CoverPhoto';
import DateTime from '../../components/DateTime';
import Flex from '../../components/Flex';
import PlayButton from '../../components/PlayButton';
import PlaceholderCoverPhoto from '../../components/PlaceholderCoverPhoto';
import Table from '../../components/Table';
import useSetBackgroundColorFromImage from '../../hooks/useSetBackgroundColorFromImage';
import styles from './playlist.module.scss';
import { createColumnHelper } from '@tanstack/react-table';
import { Get } from 'type-fest';
import ReleaseDate from '../../components/ReleaseDate';
import Duration from '../../components/Duration';

type TrackEdge = NonNullable<Get<PlaylistQuery, 'playlist.tracks.edges[0]'>>;

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
        edges {
          addedAt
          node {
            id
            name
            durationMs

            ... on Episode {
              releaseDate {
                date
                precision
              }
            }
          }
        }
        pageInfo {
          total
        }
      }
    }
  }
`;

const columnHelper = createColumnHelper<TrackEdge>();

const columns = [
  columnHelper.accessor('node.__typename', {
    id: 'type',
    header: '#',
    cell: (info) => (info.getValue() === 'Episode' ? <Podcast /> : <Music />),
  }),
  columnHelper.accessor('node.name', {
    header: 'Title',
  }),
  // columnHelper.accessor('node.name', {
  //   header: 'Album or podcast',
  // }),
  columnHelper.accessor(
    ({ node }) => {
      return node.__typename === 'Episode' ? node.releaseDate : null;
    },
    {
      id: 'releaseDate',
      header: 'Release date',
      cell: (info) => {
        const releaseDate = info.getValue();

        return releaseDate && <ReleaseDate releaseDate={releaseDate} />;
      },
    }
  ),
  columnHelper.accessor('addedAt', {
    header: 'Date added',
    cell: (info) => (
      <DateTime date={info.getValue()} format={DateTime.FORMAT.timeAgo} />
    ),
  }),
  columnHelper.accessor('node.durationMs', {
    header: () => <Clock size="1rem" />,
    cell: (info) => <Duration durationMs={info.getValue()} />,
  }),
];

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
      <div>
        <Table
          data={playlist.tracks.edges}
          columns={columns}
          visibility={{
            releaseDate: playlist.tracks.edges.some(
              (edge) => edge.node.__typename === 'Episode'
            ),
          }}
        />
      </div>
    </div>
  );
};

export default Playlist;
