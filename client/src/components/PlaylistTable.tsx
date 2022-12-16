import { useMemo } from 'react';
import { gql } from '@apollo/client';
import { createColumnHelper } from '@tanstack/react-table';
import { Clock, Music, Podcast } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PlaylistTable_PlaylistTrackEdges as PlaylistTrackEdge } from '../types/api';
import DateTime from './DateTime';
import Duration from './Duration';
import ReleaseDate from './ReleaseDate';
import Table from './Table';

interface PlaylistTableProps {
  className?: string;
  playlistTrackEdges: PlaylistTrackEdge[];
}

const columnHelper = createColumnHelper<PlaylistTrackEdge>();

const parentOf = (playlistItem: PlaylistTrackEdge['node']) => {
  if (playlistItem.__typename === 'Episode') {
    return playlistItem.show;
  }

  return playlistItem.album;
};

const columns = [
  columnHelper.accessor('node.__typename', {
    id: 'type',
    header: '#',
    cell: (info) => {
      return info.getValue() === 'Episode' ? (
        <Podcast size="1rem" />
      ) : (
        <Music size="1rem" />
      );
    },
    meta: {
      headerAlign: 'center',
      shrink: true,
    },
  }),
  columnHelper.accessor('node.name', {
    header: 'Title',
  }),
  columnHelper.accessor(({ node }) => parentOf(node), {
    id: 'albumOrPodcast',
    header: ({ table }) => {
      const { meta } = table.options;

      switch (true) {
        case meta?.containsAllTracks:
          return 'Album';
        case meta?.containsAllEpisodes:
          return 'Podcast';
        default:
          return 'Album or podcast';
      }
    },
    cell: (info) => {
      const parent = info.getValue();
      const href =
        parent.__typename === 'Show'
          ? `/shows/${parent.id}`
          : `/albums/${parent.id}`;

      return <Link to={href}>{parent.name}</Link>;
    },
  }),
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
    meta: {
      shrink: true,
      headerAlign: 'right',
    },
  }),
];

const PlaylistTable = ({
  className,
  playlistTrackEdges,
}: PlaylistTableProps) => {
  const meta = useMemo(
    () => ({
      containsAllTracks: playlistTrackEdges.every(
        ({ node }) => node.__typename === 'Track'
      ),
      containsAllEpisodes: playlistTrackEdges.every(
        ({ node }) => node.__typename === 'Episode'
      ),
    }),
    [playlistTrackEdges]
  );

  return (
    <Table
      className={className}
      data={playlistTrackEdges}
      columns={columns}
      meta={meta}
      visibility={{ releaseDate: !meta.containsAllTracks }}
    />
  );
};

PlaylistTable.fragments = {
  playlistTrackEdges: gql`
    fragment PlaylistTable_playlistTrackEdges on PlaylistTrackEdge {
      addedAt
      node {
        id
        name
        durationMs

        ... on Track {
          album {
            id
            name
          }
        }

        ... on Episode {
          releaseDate {
            date
            precision
          }
          show {
            id
            name
          }
        }
      }
    }
  `,
};

export default PlaylistTable;
