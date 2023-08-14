import CoverPhoto from './CoverPhoto';
import EntityLink from './EntityLink';
import Page from './Page';
import {
  PlaylistPage_playlist as Playlist,
  PlaylistPage_tracks as Tracks,
  PlaylistPagePlaybackStateFragment,
} from '../types/api';
import { fragmentRegistry } from '../apollo/fragmentRegistry';
import { TypedDocumentNode, gql } from '@apollo/client';
import { Clock, Podcast } from 'lucide-react';
import ContextMenuAction from './ContextMenuAction';
import OffsetBasedPaginationObserver from './OffsetBasedPaginationObserver';
import PlayButton from './PlayButton';
import useResumePlaybackMutation from '../mutations/useResumePlaybackMutation';
import useSavedTracksContains from '../hooks/useSavedTracksContains';
import usePlaybackState from '../hooks/usePlaybackState';
import { createColumnHelper } from '@tanstack/react-table';
import { Get } from 'type-fest';
import DateTime from './DateTime';
import Duration from './Duration';
import PlaylistTitleCell from './PlaylistTitleCell';
import ReleaseDate from './ReleaseDate';
import TrackLikeButtonCell from './TrackLikeButtonCell';
import TrackNumberCell from './TrackNumberCell';
import Table from './Table';
import useCurrentUserProfile from '../hooks/useCurrentUserProfile';
import ContextMenu from './ContextMenu';
import Skeleton from './Skeleton';
import Flex from './Flex';

fragmentRegistry.register(gql`
  fragment PlaylistPage_playlist on Playlist {
    id
    name
    uri
    images {
      url
      vibrantColor(format: RGB, alpha: 0.9) @client
    }
    owner {
      id
      displayName
    }
  }
`);

fragmentRegistry.register(gql`
  fragment PlaylistPage_tracks on PlaylistTrackConnection {
    pageInfo {
      total
      hasNextPage
      offset
      limit
    }
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
`);

const PLAYBACK_STATE_FRAGMENT: TypedDocumentNode<PlaylistPagePlaybackStateFragment> = gql`
  fragment PlaylistPagePlaybackStateFragment on PlaybackState {
    isPlaying
    context {
      uri
    }
  }
`;

interface PlaylistDetailsProps {
  playlist: Playlist;
  tracks: Tracks | null;
  onLoadMore: (offset: number) => void;
}

export const PlaylistPage = ({
  playlist,
  tracks,
  onLoadMore,
}: PlaylistDetailsProps) => {
  const coverPhoto = playlist.images[0];
  const totalTracks = tracks?.pageInfo.total ?? 0;

  const tracksContains = useSavedTracksContains(
    tracks?.edges
      .filter((edge) => edge.node.__typename === 'Track')
      .map((edge) => edge.node.id) ?? []
  );

  const [resumePlayback] = useResumePlaybackMutation();

  const playbackState = usePlaybackState({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  const profile = useCurrentUserProfile();

  const isPlaying = playbackState?.isPlaying ?? false;
  const isPlayingPlaylist = playbackState?.context?.uri === playlist.uri;

  const containsAllTracks =
    tracks?.edges.every(({ node }) => node.__typename === 'Track') ?? false;
  const containsAllEpisodes =
    tracks?.edges.every(({ node }) => node.__typename === 'Episode') ?? false;

  const containsAddedDate =
    tracks?.edges.some((edge) => Boolean(edge.addedAt)) ?? false;

  return (
    <Page bgColor={coverPhoto.vibrantColor}>
      <Page.Header
        mediaType="playlist"
        coverPhoto={<CoverPhoto image={coverPhoto} />}
        title={playlist.name}
        details={[
          <EntityLink key="owner" entity={playlist.owner}>
            {playlist.owner.displayName}
          </EntityLink>,
          <span key="numSongs">
            {totalTracks} {totalTracks === 1 ? 'song' : 'songs'}
          </span>,
        ]}
      />
      <Page.Content>
        <Page.ActionsBar>
          <PlayButton
            variant="primary"
            size="3.5rem"
            playing={isPlaying && isPlayingPlaylist}
            onPlay={() => {
              const input = isPlayingPlaylist
                ? undefined
                : { offset: { position: 0 }, contextUri: playlist.uri };

              resumePlayback(input);
            }}
          />
        </Page.ActionsBar>
        {tracks == null ? (
          <TracksLoadingState />
        ) : (
          <Table
            enableRowSelection
            enableMultiSelect
            enableRangeSelect
            data={tracks?.edges ?? []}
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
                    {playlist.owner.id === profile.id && (
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
                      <ContextMenu.Link
                        to={`/artists/${playlistItem.artists[0].id}`}
                      >
                        Go to artist
                      </ContextMenu.Link>
                      <ContextMenu.Link to={`/albums/${playlistItem.album.id}`}>
                        Go to album
                      </ContextMenu.Link>
                    </>
                  )}
                  <ContextMenu.Separator />
                  {tracksContains.get(playlistItem.id) ? (
                    <ContextMenuAction.RemoveSavedTracks
                      ids={[playlistItem.id]}
                    />
                  ) : (
                    <ContextMenuAction.SaveTracks ids={[playlistItem.id]} />
                  )}
                  {playlist.owner.id === profile.id && (
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
                      <ContextMenuAction.CopyLinkToEntity
                        entity={playlistItem}
                      />
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
        )}
        <OffsetBasedPaginationObserver
          fetchMore={({ variables }) =>
            Promise.resolve(onLoadMore(variables.offset))
          }
          pageInfo={tracks?.pageInfo}
          threshold="50px"
        />
      </Page.Content>
    </Page>
  );
};

type PlaylistTrackEdge = NonNullable<Get<Tracks, 'edges[0]'>>;

const columnHelper = createColumnHelper<PlaylistTrackEdge>();

interface PlaylistTableMeta {
  tracksContains: Map<string, boolean>;
  containsAllTracks: boolean;
  containsAllEpisodes: boolean;
  playlist: Playlist;
}

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

const TracksLoadingState = () => {
  return (
    <Skeleton.Table
      rows={10}
      columns={[
        <Skeleton.Text key="text" />,
        <Flex key="header" gap="0.5rem" alignItems="end">
          <Skeleton.CoverPhoto size="2.5rem" />
          <Flex direction="column" flex={1} gap="0.5rem">
            <Skeleton.Text width="25%" fontSize="1rem" />
            <Skeleton.Text width="20%" fontSize="0.75rem" />
          </Flex>
        </Flex>,
        <Skeleton.Text key="text2" />,
        <Skeleton.Text key="text3" />,
      ]}
    />
  );
};
