import { useEffect } from 'react';
import { gql, useSuspenseQuery } from '@apollo/client';
import { Get } from 'type-fest';
import { createColumnHelper } from '@tanstack/react-table';
import {
  CollectionTracksRouteQuery,
  CollectionTracksRouteQueryVariables,
  CollectionTracksRoutePlaylistStateFragment,
} from '../../types/api';
import DateTime from '../../components/DateTime';
import Flex from '../../components/Flex';
import Page from '../../components/Page';
import Skeleton from '../../components/Skeleton';
import PlayButton from '../../components/PlayButton';
import Table from '../../components/Table';
import TrackTitleCell from '../../components/TrackTitleCell';
import { Clock } from 'lucide-react';
import Duration from '../../components/Duration';
import EntityLink from '../../components/EntityLink';
import TrackNumberCell from '../../components/TrackNumberCell';
import usePlaybackState from '../../hooks/usePlaybackState';
import useResumePlaybackMutation from '../../mutations/useResumePlaybackMutation';
import ContextMenuAction from '../../components/ContextMenuAction';
import ContextMenu from '../../components/ContextMenu';
import OffsetBasedPaginationObserver from '../../components/OffsetBasedPaginationObserver';
import TrackLikeButtonCell from '../../components/TrackLikeButtonCell';
import LikedSongsPlaylistCoverPhoto from '../../components/LikedSongsPlaylistCoverPhoto';

type SavedTrackEdge = NonNullable<
  Get<CollectionTracksRouteQuery, 'me.tracks.edges[0]'>
>;

interface TableMeta {
  spotifyURI: string;
}

const COLLECTION_TRACKS_ROUTE_QUERY = gql`
  query CollectionTracksRouteQuery($offset: Int, $limit: Int) {
    me {
      profile {
        id
        displayName
      }
      tracks(offset: $offset, limit: $limit) {
        pageInfo {
          hasNextPage
          offset
          limit
          total
        }
        edges {
          addedAt
          node {
            id
            name
            durationMs
            album {
              id
            }
            ...TrackNumberCell_track @unmask(mode: "migrate")
            ...TrackTitleCell_track @unmask(mode: "migrate")
          }
        }
      }
    }
  }
`;

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment CollectionTracksRoutePlaylistStateFragment on PlaybackState {
    isPlaying
    context {
      uri
    }
  }
`;

export const RouteComponent = () => {
  const { client, data, fetchMore } = useSuspenseQuery<
    CollectionTracksRouteQuery,
    CollectionTracksRouteQueryVariables
  >(COLLECTION_TRACKS_ROUTE_QUERY, { variables: { limit: 50 } });

  useEffect(() => {
    const { cache } = client;
    const trackIds = data.me?.tracks?.edges.map((edge) => edge.node.id) ?? [];

    if (trackIds.length === 0) {
      return;
    }

    cache.writeFragment({
      fragment: gql`
        fragment CurrentUserFragment on CurrentUser {
          tracksContains(ids: $ids)
        }
      `,
      id: cache.identify({ __typename: 'CurrentUser' }),
      variables: {
        ids: trackIds,
      },
      data: {
        tracksContains: Array(trackIds.length).fill(true),
      },
    });
  }, [client, data]);

  const [resumePlayback] = useResumePlaybackMutation();
  const playbackState =
    usePlaybackState<CollectionTracksRoutePlaylistStateFragment>({
      fragment: PLAYBACK_STATE_FRAGMENT,
    });

  const currentUser = data.me;

  if (!currentUser) {
    throw new Error('You must be logged in');
  }

  const spotifyURI = `spotify:user:${currentUser.profile.id}:collection`;

  const isPlaying = playbackState?.isPlaying ?? false;
  const isPlayingCollection = playbackState?.context?.uri === spotifyURI;

  return (
    <Page bgColor="#1F3363">
      <Page.Header
        title="Liked Songs"
        mediaType="playlist"
        coverPhoto={<LikedSongsPlaylistCoverPhoto iconSize="100px" />}
        details={[
          <EntityLink key={currentUser.profile.id} entity={currentUser.profile}>
            {currentUser.profile.displayName}
          </EntityLink>,
          <span key="numTracks" className="text-muted">
            {new Intl.NumberFormat().format(
              currentUser.tracks?.pageInfo.total ?? 0
            )}{' '}
            songs
          </span>,
        ]}
      />
      <Page.Content>
        <Page.ActionsBar>
          <PlayButton
            variant="primary"
            size="3.5rem"
            playing={isPlaying && isPlayingCollection}
            onPlay={() => {
              const input = isPlayingCollection
                ? undefined
                : { offset: { position: 0 }, contextUri: spotifyURI };

              resumePlayback(input);
            }}
          />
        </Page.ActionsBar>
        <Table
          enableRowSelection
          enableMultiSelect
          enableRangeSelect
          data={currentUser.tracks?.edges ?? []}
          columns={columns}
          meta={{ spotifyURI }}
          onDoubleClickRow={(row) => {
            const { node } = row.original;

            resumePlayback({
              contextUri: spotifyURI,
              offset: { uri: node.uri },
            });
          }}
          contextMenu={(rows) => {
            const tracks = rows.map((row) => row.original.node);
            const uris = tracks.map((track) => track.uri);

            if (tracks.length > 1) {
              return (
                <>
                  <ContextMenuAction.AddToQueue uris={uris} />
                  <ContextMenuAction.RemoveSavedTracks
                    ids={tracks.map((track) => track.id)}
                  />
                  <ContextMenuAction.AddToPlaylist uris={uris} />
                </>
              );
            }

            const [track] = tracks;

            return (
              <>
                <ContextMenuAction.AddToQueue uri={track.uri} />
                <ContextMenu.Separator />
                <ContextMenuAction.LinkToArtist artists={track.artists} />
                <ContextMenu.Link to={`/albums/${track.album.id}`}>
                  Go to album
                </ContextMenu.Link>
                <ContextMenu.Separator />
                <ContextMenuAction.RemoveSavedTracks ids={[track.id]} />
                <ContextMenuAction.AddToPlaylist uri={track.uri} />
                <ContextMenu.Separator />
                <ContextMenu.SubMenu
                  content={
                    <ContextMenuAction.CopyLinkToEntity entity={track} />
                  }
                >
                  Share
                </ContextMenu.SubMenu>
                <ContextMenu.Separator />
                <ContextMenuAction.OpenDesktopApp
                  uri={track.uri}
                  context={{ uri: spotifyURI }}
                />
              </>
            );
          }}
        />
      </Page.Content>
      <OffsetBasedPaginationObserver
        fetchMore={fetchMore}
        pageInfo={currentUser.tracks?.pageInfo}
        threshold="1000px"
      />
    </Page>
  );
};

export const LoadingState = () => {
  return (
    <Page>
      <Page.SkeletonHeader />
      <Page.Content>
        <Page.ActionsBar>
          <PlayButton
            disabled
            variant="primary"
            size="3.5rem"
            playing={false}
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

const columnHelper = createColumnHelper<SavedTrackEdge>();

const columns = [
  columnHelper.accessor('node', {
    id: 'number',
    header: '#',
    cell: (info) => {
      const { spotifyURI } = info.table.options.meta as unknown as TableMeta;

      return (
        <TrackNumberCell
          position={info.row.index}
          track={info.getValue()}
          context={{
            __typename: 'Playlist',
            uri: spotifyURI,
          }}
        />
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
      const { spotifyURI } = info.table.options.meta as unknown as TableMeta;

      return (
        <TrackTitleCell context={{ uri: spotifyURI }} track={info.getValue()} />
      );
    },
  }),
  columnHelper.accessor('addedAt', {
    header: 'Date added',
    cell: (info) => (
      <DateTime date={info.getValue()} format={DateTime.FORMAT.timeAgo} />
    ),
  }),
  columnHelper.accessor('node', {
    id: 'likeButton',
    header: '',
    cell: (info) => {
      return <TrackLikeButtonCell liked={true} track={info.getValue()} />;
    },
    meta: {
      shrink: true,
    },
  }),
  columnHelper.accessor('node.durationMs', {
    header: () => <Clock size="1rem" />,
    cell: (info) => <Duration durationMs={info.getValue()} />,
    meta: {
      headerAlign: 'right',
      shrink: true,
    },
  }),
];
