import { useMemo } from 'react';
import { gql } from '@apollo/client';
import { createColumnHelper } from '@tanstack/react-table';
import { Clock, Music, Podcast } from 'lucide-react';
import {
  PlaylistTable_playlist as Playlist,
  PlaylistTablePlaybackStateFragment,
} from '../types/api';
import DateTime from './DateTime';
import Duration from './Duration';
import EntityLink from './EntityLink';
import ReleaseDate from './ReleaseDate';
import Table from './Table';
import PlaylistTitleCell from './PlaylistTitleCell';
import usePlaybackState from '../hooks/usePlaybackState';
import { Get } from 'type-fest';

interface PlaylistTableProps {
  className?: string;
  playlist: Playlist;
}

type PlaylistTrackEdge = NonNullable<Get<Playlist, 'tracks.edges[0]'>>;

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
      const { meta } = info.table.options;
      const { index } = info.row;

      if (meta?.containsAllTracks) {
        return index + 1;
      }

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

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment PlaylistTablePlaybackStateFragment on PlaybackState {
    isPlaying
    context {
      uri
    }
    item {
      __typename
      ... on Track {
        id
        uri
      }
      ... on Episode {
        id
        uri
      }
    }
  }
`;

const PlaylistTable = ({ className, playlist }: PlaylistTableProps) => {
  const playbackState = usePlaybackState<PlaylistTablePlaybackStateFragment>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });
  const playlistTrackEdges = playlist.tracks.edges;

  const meta = useMemo(
    () => ({
      containsAllTracks: playlistTrackEdges.every(
        ({ node }) => node.__typename === 'Track'
      ),
      containsAllEpisodes: playlistTrackEdges.every(
        ({ node }) => node.__typename === 'Episode'
      ),
      containsAddedDate: playlistTrackEdges.some((edge) =>
        Boolean(edge.addedAt)
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

            ...PlaylistTitleCell_playlistTrack
          }
        }
      }
    }

    ${PlaylistTitleCell.fragments.playlistTrack}
  `,
};

export default PlaylistTable;
