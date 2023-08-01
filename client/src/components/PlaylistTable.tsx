import { gql, useFragment, OperationVariables } from '@apollo/client';
import { createColumnHelper } from '@tanstack/react-table';
import { Clock, Podcast } from 'lucide-react';
import {
  PlaylistTable_currentUser as CurrentUser,
  PlaylistTable_playlist as Playlist,
} from '../types/api';
import DateTime from './DateTime';
import Duration from './Duration';
import EntityLink from './EntityLink';
import ReleaseDate from './ReleaseDate';
import Table from './Table';
import PlaylistTitleCell from './PlaylistTitleCell';
import { Get } from 'type-fest';
import TrackNumberCell from './TrackNumberCell';
import useResumePlaybackMutation from '../mutations/useResumePlaybackMutation';
import ContextMenuAction from './ContextMenuAction';
import ContextMenu from './ContextMenu';
import TrackLikeButtonCell from './TrackLikeButtonCell';

interface PlaylistTableProps {
  className?: string;
  playlist: Playlist;
  tracksContains: Map<string, boolean>;
}

type PlaylistTrackEdge = NonNullable<Get<Playlist, 'tracks.edges[0]'>>;

interface PlaylistTableMeta {
  tracksContains: Map<string, boolean>;
  containsAllTracks: boolean;
  containsAllEpisodes: boolean;
  playlist: Playlist;
}

const columnHelper = createColumnHelper<PlaylistTrackEdge>();

const CURRENT_USER_FRAGMENT = gql`
  fragment PlaylistTable_currentUser on CurrentUser {
    user {
      id
    }
  }
`;

const parentOf = (playlistItem: PlaylistTrackEdge['node']) => {
  if (playlistItem.__typename === 'Episode') {
    return playlistItem.show;
  }

  return playlistItem.album;
};

const PlaylistTable = ({
  className,
  playlist,
  tracksContains,
}: PlaylistTableProps) => {
  const { data } = useFragment<CurrentUser, OperationVariables>({
    from: { __typename: 'CurrentUser' },
    fragment: CURRENT_USER_FRAGMENT,
    fragmentName: 'PlaylistTable_currentUser',
  });

  const currentUser = data?.user;
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

  return (
    <Table
      enableRowSelection
      enableMultiSelect
      enableRangeSelect
      className={className}
      data={playlist.tracks.edges}
      columns={columns}
      meta={
        {
          containsAllTracks,
          containsAllEpisodes,
          tracksContains,
          playlist,
        } satisfies PlaylistTableMeta
      }
      contextMenu={(rows) => {
        const playlistItems = rows.map((row) => row.original.node);
        const uris = playlistItems.map((item) => item.uri);
        const ids = playlistItems.map((item) => item.id);
        const areAllSaved = playlistItems.every((item) =>
          tracksContains.get(item.id)
        );

        if (playlistItems.length > 1) {
          return (
            <>
              <ContextMenuAction.AddToQueue uris={uris} />
              {playlist.owner.id === currentUser?.id && (
                <ContextMenuAction.RemoveFromPlaylist
                  playlistId={playlist.id}
                  uris={uris}
                />
              )}
              {areAllSaved ? (
                <ContextMenuAction.RemoveSavedTracks ids={ids} />
              ) : (
                <ContextMenuAction.SaveTracks ids={ids} />
              )}
              <ContextMenuAction.AddToPlaylist uris={uris} />
            </>
          );
        }
        const [playlistItem] = playlistItems;

        return (
          <>
            <ContextMenuAction.AddToQueue uri={playlistItem.uri} />
            <ContextMenu.Separator />
            {playlistItem.__typename === 'Track' && (
              <>
                <ContextMenu.Link to={`/artists/${playlistItem.artists[0].id}`}>
                  Go to artist
                </ContextMenu.Link>
                <ContextMenu.Link to={`/albums/${playlistItem.album.id}`}>
                  Go to album
                </ContextMenu.Link>
              </>
            )}
            <ContextMenu.Separator />
            {tracksContains.get(playlistItem.id) ? (
              <ContextMenuAction.RemoveSavedTracks ids={[playlistItem.id]} />
            ) : (
              <ContextMenuAction.SaveTracks ids={[playlistItem.id]} />
            )}
            {playlist.owner.id === currentUser?.id && (
              <>
                <ContextMenuAction.RemoveFromPlaylist
                  playlistId={playlist.id}
                  uri={playlistItem.uri}
                />
              </>
            )}
            <ContextMenuAction.AddToPlaylist uri={playlistItem.uri} />
            <ContextMenu.Separator />
            <ContextMenu.SubMenu
              content={
                <ContextMenuAction.CopyLinkToEntity entity={playlistItem} />
              }
            >
              Share
            </ContextMenu.SubMenu>
            <ContextMenu.Separator />
            <ContextMenuAction.OpenDesktopApp
              uri={playlistItem.uri}
              context={playlist}
            />
          </>
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
      owner {
        id
      }
      tracks(offset: $offset) {
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
  `,
};

const columns = [
  columnHelper.accessor('node', {
    id: 'type',
    header: '#',
    cell: (info) => {
      const { containsAllTracks, playlist } = info.table.options
        .meta as unknown as PlaylistTableMeta;
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

      return (
        <div className="flex min-w-[3ch] justify-end">
          <Podcast size="1rem" />
        </div>
      );
    },
    meta: {
      headerAlign: 'right',
      shrink: true,
    },
  }),
  columnHelper.accessor('node', {
    id: 'title',
    header: 'Title',
    cell: (info) => {
      const { playlist } = info.table.options
        .meta as unknown as PlaylistTableMeta;

      return (
        <PlaylistTitleCell
          playlist={playlist}
          playlistTrack={info.getValue()}
        />
      );
    },
  }),
  columnHelper.accessor(({ node }) => parentOf(node), {
    id: 'albumOrPodcast',
    header: (info) => {
      const { containsAllTracks, containsAllEpisodes } = info.table.options
        .meta as unknown as PlaylistTableMeta;

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

      return date && <DateTime date={date} format={DateTime.FORMAT.timeAgo} />;
    },
    meta: {
      wrap: false,
    },
  }),
  columnHelper.accessor('node', {
    id: 'liked',
    header: '',
    cell: (info) => {
      const playlistItem = info.getValue();
      const { tracksContains } = info.table.options
        .meta as unknown as PlaylistTableMeta;

      if (playlistItem.__typename === 'Episode') {
        return null;
      }

      const liked = tracksContains?.get(playlistItem.id) ?? false;

      return <TrackLikeButtonCell liked={liked} track={playlistItem} />;
    },
    meta: {
      shrink: true,
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

export default PlaylistTable;
