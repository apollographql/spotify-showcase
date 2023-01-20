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
import PlaylistEpisodeContextMenu from './PlaylistEpisodeContextMenu';
import PlaylistTitleCell from './PlaylistTitleCell';
import PlaylistTrackContextMenu from './PlaylistTrackContextMenu';
import { Get } from 'type-fest';
import TrackNumberCell from './TrackNumberCell';
import useResumePlaybackMutation from '../mutations/useResumePlaybackMutation';

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

const PlaylistTable = ({ className, playlist }: PlaylistTableProps) => {
  const [resumePlayback] = useResumePlaybackMutation();

  const containsAllTracks = playlist.tracks.edges.every(
    ({ node }) => node.__typename === 'Track'
  );
  const containsAllEpisodes = playlist.tracks.edges.every(
    ({ node }) => node.__typename === 'Episode'
  );

  const containsAddedDate = playlist.tracks.edges.some((edge) =>
    Boolean(edge.addedAt)
  );

  const columns = useMemo(() => {
    return [
      columnHelper.accessor('node', {
        id: 'type',
        header: '#',
        cell: (info) => {
          const playlistTrack = info.getValue();
          const { index } = info.row;

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
        cell: (info) => (
          <PlaylistTitleCell
            playlist={playlist}
            playlistTrack={info.getValue()}
          />
        ),
      }),
      columnHelper.accessor(({ node }) => parentOf(node), {
        id: 'albumOrPodcast',
        header: () => {
          switch (true) {
            case containsAllTracks:
              return 'Album';
            case containsAllEpisodes:
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

          return (
            date && <DateTime date={date} format={DateTime.FORMAT.timeAgo} />
          );
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
  }, [playlist, containsAllEpisodes, containsAllTracks]);

  return (
    <Table
      className={className}
      data={playlist.tracks.edges}
      columns={columns}
      contextMenu={(row) => {
        const playlistItem = row.original.node;

        return playlistItem.__typename === 'Track' ? (
          <PlaylistTrackContextMenu track={playlistItem} playlist={playlist} />
        ) : (
          <PlaylistEpisodeContextMenu
            episode={playlistItem}
            playlist={playlist}
          />
        );
      }}
      onDoubleClickRow={(row) => {
        const { node } = row.original;

        resumePlayback({
          contextUri: playlist.uri,
          offset: { uri: node.uri },
        });
      }}
      visibility={{
        addedAt: containsAddedDate,
        releaseDate: !containsAllTracks,
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

              ...PlaylistTrackContextMenu_track
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

              ...PlaylistEpisodeContextMenu_episode
            }

            ...PlaylistTitleCell_playlistTrack
          }
        }
      }

      ...PlaylistEpisodeContextMenu_playlist
      ...PlaylistTrackContextMenu_playlist
    }

    ${PlaylistEpisodeContextMenu.fragments.episode}
    ${PlaylistEpisodeContextMenu.fragments.playlist}
    ${PlaylistTitleCell.fragments.playlistTrack}
    ${PlaylistTrackContextMenu.fragments.playlist}
    ${PlaylistTrackContextMenu.fragments.track}
    ${TrackNumberCell.fragments.track}
  `,
};

export default PlaylistTable;
