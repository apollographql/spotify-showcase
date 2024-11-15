import { useParams } from 'react-router-dom';
import { TypedDocumentNode, gql, useSuspenseQuery } from '@apollo/client';
import {
  PlaylistQuery,
  PlaylistQueryVariables,
  PlaylistRoutePlaybackStateFragment,
} from '../../types/api';
import CoverPhoto from '../../components/CoverPhoto';
import EntityLink from '../../components/EntityLink';
import Flex from '../../components/Flex';
import Page from '../../components/Page';
import PlayButton from '../../components/PlayButton';
import OffsetBasedPaginationObserver from '../../components/OffsetBasedPaginationObserver';
import Skeleton from '../../components/Skeleton';
import usePlaybackState from '../../hooks/usePlaybackState';
import useResumePlaybackMutation from '../../mutations/useResumePlaybackMutation';
import { parseSpotifyIDFromURI } from '../../utils/spotify';
import useSavedTracksContains from '../../hooks/useSavedTracksContains';
import Table from '../../components/Table';
import { Get } from 'type-fest';
import { createColumnHelper } from '@tanstack/react-table';
import TrackNumberCell from '../../components/TrackNumberCell';
import { Clock, Podcast } from 'lucide-react';
import PlaylistTitleCell from '../../components/PlaylistTitleCell';
import ReleaseDate from '../../components/ReleaseDate';
import DateTime from '../../components/DateTime';
import TrackLikeButtonCell from '../../components/TrackLikeButtonCell';
import Duration from '../../components/Duration';
import ContextMenuAction from '../../components/ContextMenuAction';
import ContextMenu from '../../components/ContextMenu';

const PLAYLIST_QUERY: TypedDocumentNode<
  PlaylistQuery,
  PlaylistQueryVariables
> = gql`
  query PlaylistQuery($id: ID!, $offset: Int) {
    me {
      profile {
        id
      }
    }
    playlist(id: $id) {
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
              artists {
                id
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
        pageInfo {
          hasNextPage
          offset
          limit
          total
        }
      }
    }
  }
`;

const PLAYBACK_STATE_FRAGMENT: TypedDocumentNode<PlaylistRoutePlaybackStateFragment> = gql`
  fragment PlaylistRoutePlaybackStateFragment on PlaybackState {
    isPlaying
    context {
      uri
    }
  }
`;

export const RouteComponent = () => {
  const { playlistId } = useParams() as { playlistId: 'string' };
  const { data, fetchMore } = useSuspenseQuery(PLAYLIST_QUERY, {
    variables: { id: playlistId },
  });
  const playlist = data.playlist;

  if (!playlist) {
    throw new Error('Playlist not found');
  }

  if (!data.me) {
    throw new Error('Must be logged in');
  }

  const currentUser = data.me.profile;

  const tracksContains = useSavedTracksContains(
    playlist.tracks.edges
      .filter((edge) => edge.node.__typename === 'Track')
      .map((edge) => edge.node.id)
  );

  const [resumePlayback] = useResumePlaybackMutation();

  const playbackState = usePlaybackState({ fragment: PLAYBACK_STATE_FRAGMENT });

  const { tracks } = playlist;
  const images = playlist.images ?? [];
  const coverPhoto = images[0];
  const isPlaying = playbackState?.isPlaying ?? false;
  const isPlayingPlaylist = playbackState?.context?.uri === playlist.uri;

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
            {tracks.pageInfo.total}{' '}
            {tracks.pageInfo.total === 1 ? 'song' : 'songs'}
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
        <Table
          enableRowSelection
          enableMultiSelect
          enableRangeSelect
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
        <OffsetBasedPaginationObserver
          fetchMore={fetchMore}
          pageInfo={tracks.pageInfo}
          threshold="1000px"
        />
      </Page.Content>
    </Page>
  );
};

export const LoadingState = () => {
  const { playlistId } = useParams() as { playlistId: 'string' };
  const playbackState = usePlaybackState<PlaylistRoutePlaybackStateFragment>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  const contextUri = playbackState?.context?.uri;
  const isPlaying = playbackState?.isPlaying ?? false;
  const isPlayingPlaylist = contextUri
    ? parseSpotifyIDFromURI(contextUri) === playlistId
    : false;

  return (
    <Page>
      <Page.SkeletonHeader />
      <Page.Content>
        <Page.ActionsBar>
          <PlayButton
            disabled
            variant="primary"
            size="3.5rem"
            playing={isPlaying && isPlayingPlaylist}
          />
        </Page.ActionsBar>
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
      </Page.Content>
    </Page>
  );
};

type Playlist = NonNullable<Get<PlaylistQuery, 'playlist'>>;
type PlaylistTrackEdge = NonNullable<Get<Playlist, 'tracks.edges[0]'>>;

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
          playlistTrack={info.getValue()}
          playlistUri={playlist.uri}
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
