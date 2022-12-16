import { gql } from '@apollo/client';
import { createColumnHelper } from '@tanstack/react-table';
import { Clock, Music, Podcast } from 'lucide-react';
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

const PlaylistTable = ({
  className,
  playlistTrackEdges,
}: PlaylistTableProps) => {
  return (
    <Table className={className} data={playlistTrackEdges} columns={columns} />
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

        ... on Episode {
          releaseDate {
            date
            precision
          }
        }
      }
    }
  `,
};

export default PlaylistTable;
