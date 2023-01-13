import { useMemo } from 'react';
import { gql } from '@apollo/client';
import { createColumnHelper } from '@tanstack/react-table';
import { Clock, Podcast } from 'lucide-react';
import { PlaylistTable_playlist as Playlist } from '../types/api';
import DateTime from './DateTime';
import Duration from './Duration';
import EntityLink from './EntityLink';
import ReleaseDate from './ReleaseDate';
import Table from './Table';
import PlaylistTitleCell from './PlaylistTitleCell';
import { Get } from 'type-fest';
import TrackNumberCell from './TrackNumberCell';
import useResumePlaybackMutation from '../mutations/useResumePlaybackMutation';

interface PlaylistTableProps {
  className?: string;
  playlist: Playlist;
}

type PlaylistTrackEdge = NonNullable<Get<Playlist, 'tracks.edges[0]'>>;

interface CellMeta {
  containsAllTracks: boolean;
  containsAllEpisodes: boolean;
  containsAddedDate: boolean;
  playlist: Playlist;
}

const columnHelper = createColumnHelper<PlaylistTrackEdge>();

const parentOf = (playlistItem: PlaylistTrackEdge['node']) => {
  if (playlistItem.__typename === 'Episode') {
    return playlistItem.show;
  }

  return playlistItem.album;
};

const columns = [
  columnHelper.accessor('node', {
    id: 'type',
    header: '#',
    cell: (info) => {
      const playlistTrack = info.getValue();
      const meta = info.table.options.meta! as CellMeta;
      const { index } = info.row;
      const { containsAllTracks, playlist } = meta!;

      if (playlistTrack.__typename === 'Track') {
        return (
          <TrackNumberCell
            context={playlist}
            track={playlistTrack}
            position={index}
            preferIcon={!containsAllTracks}
          />
        );
      }

      return <Podcast size="1rem" />;
    },
    meta: {
      headerAlign: 'right',
      shrink: true,
    },
  }),
  columnHelper.accessor('node', {
    id: 'title',
    header: 'Title',
    cell: (info) => <PlaylistTitleCell playlistTrack={info.getValue()} />,
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

      return <EntityLink entity={parent}>{parent.name}</EntityLink>;
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
    cell: (info) => {
      const date = info.getValue();

      return date && <DateTime date={date} format={DateTime.FORMAT.timeAgo} />;
    },
    meta: {
      wrap: false,
    },
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

const PlaylistTable = ({ className, playlist }: PlaylistTableProps) => {
  const [resumePlayback] = useResumePlaybackMutation();

  const meta = useMemo(
    () => ({
      playlist,
      containsAllTracks: playlist.tracks.edges.every(
        ({ node }) => node.__typename === 'Track'
      ),
      containsAllEpisodes: playlist.tracks.edges.every(
        ({ node }) => node.__typename === 'Episode'
      ),
      containsAddedDate: playlist.tracks.edges.some((edge) =>
        Boolean(edge.addedAt)
      ),
    }),
    [playlist]
  );

  return (
    <Table
      className={className}
      data={playlist.tracks.edges}
      columns={columns}
      meta={meta}
      onDoubleClickRow={(row) => {
        const { node } = row.original;

        resumePlayback({
          context: { contextUri: playlist.uri, offset: { uri: node.uri } },
        });
      }}
      visibility={{
        addedAt: meta.containsAddedDate,
        releaseDate: !meta.containsAllTracks,
      }}
    />
  );
};

PlaylistTable.fragments = {
  playlist: gql`
    fragment PlaylistTable_playlist on Playlist {
      id
      uri
      tracks {
        edges {
          addedAt
          node {
            id
            name
            durationMs
            uri

            ... on Track {
              album {
                id
                name
              }

              ...TrackNumberCell_track
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

            ...PlaylistTitleCell_playlistTrack
          }
        }
      }
    }

    ${PlaylistTitleCell.fragments.playlistTrack}
    ${TrackNumberCell.fragments.track}
  `,
};

export default PlaylistTable;
