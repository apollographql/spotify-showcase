import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { Get } from 'type-fest';
import { Heart } from 'lucide-react';
import { createColumnHelper } from '@tanstack/react-table';
import {
  CollectionTracksRouteQuery,
  CollectionTracksRouteQueryVariables,
  CollectionTracksRoutePlaylistStateFragment,
} from '../../types/api';
import DateTime from '../../components/DateTime';
import Flex from '../../components/Flex';
import Page from '../../components/Page';
import GradientIcon from '../../components/GradientIcon';
import Skeleton from '../../components/Skeleton';
import PlayButton from '../../components/PlayButton';
import Table from '../../components/Table';
import Text from '../../components/Text';
import TrackTitleCell from '../../components/TrackTitleCell';
import useSetBackgroundColor from '../../hooks/useSetBackgroundColor';
import { Clock } from 'lucide-react';
import Duration from '../../components/Duration';
import EntityLink from '../../components/EntityLink';
import TrackNumberCell from '../../components/TrackNumberCell';
import usePlaybackState from '../../hooks/usePlaybackState';
import useResumePlaybackMutation from '../../mutations/useResumePlaybackMutation';
import ContextMenuAction from '../../components/ContextMenuAction';
import ContextMenu from '../../components/ContextMenu';
import { useEffect } from 'react';
import TrackLikeButtonCell from '../../components/TrackLikeButtonCell';

type SavedTrackEdge = NonNullable<
  Get<CollectionTracksRouteQuery, 'me.tracks.edges[0]'>
>;

const COLLECTION_TRACKS_ROUTE_QUERY = gql`
  query CollectionTracksRouteQuery {
    me {
      user {
        id
        displayName
      }
      tracks {
        pageInfo {
          total
        }
        edges {
          addedAt
          node {
            id
            name
            durationMs

            ...TrackNumberCell_track
            ...TrackTitleCell_track
          }
        }
      }
    }
  }

  ${TrackTitleCell.fragments.track}
  ${TrackNumberCell.fragments.track}
`;

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment CollectionTracksRoutePlaylistStateFragment on PlaybackState {
    isPlaying
    context {
      uri
    }
  }
`;

const CollectionTracksRoute = () => {
  useSetBackgroundColor('#1F3363');

  const { client, data } = useSuspenseQuery<
    CollectionTracksRouteQuery,
    CollectionTracksRouteQueryVariables
  >(COLLECTION_TRACKS_ROUTE_QUERY);

  useEffect(() => {
    const { cache } = client;
    const trackIds = data.me?.tracks?.edges.map((edge) => edge.node.id) ?? [];

    if (trackIds.length === 0) {
      return;
    }

    cache.modify({
      id: cache.identify({ __typename: 'CurrentUser' }),
      fields: {
        tracksContains: (existing: Record<string, boolean>) => {
          return trackIds.reduce(
            (memo, id) => ({ ...memo, [id]: true }),
            existing
          );
        },
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

  const spotifyURI = `spotify:user:${currentUser.user.id}:collection`;

  const isPlaying = playbackState?.isPlaying ?? false;
  const isPlayingCollection = playbackState?.context?.uri === spotifyURI;

  return (
    <Page>
      <Page.Header
        title="Liked Songs"
        mediaType="playlist"
        coverPhoto={
          <GradientIcon
            backgroundColor="linear-gradient(135deg,#450af5,#c4efd9)"
            lucideIcon={Heart}
            iconSize="100px"
          />
        }
        details={[
          <EntityLink key={currentUser.user.id} entity={currentUser.user}>
            {currentUser.user.displayName}
          </EntityLink>,
          <Text key="numTracks" color="muted">
            {new Intl.NumberFormat().format(
              currentUser.tracks?.pageInfo.total ?? 0
            )}{' '}
            songs
          </Text>,
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
            if (rows.length === 0) {
              return null;
            }

            const [row] = rows;
            const { node } = row.original;

            return (
              <>
                <ContextMenuAction.AddToQueue
                  uris={rows.map((row) => row.original.node.uri)}
                />
                {rows.length === 1 && (
                  <>
                    <ContextMenu.Separator />
                    <ContextMenuAction.LinkToArtist artists={node.artists} />
                    <ContextMenu.Link to={`/albums/${node.album.id}`}>
                      Go to album
                    </ContextMenu.Link>
                    <ContextMenu.Separator />
                    <ContextMenu.SubMenu
                      content={
                        <ContextMenuAction.CopyLinkToEntity entity={node} />
                      }
                    >
                      Share
                    </ContextMenu.SubMenu>
                    <ContextMenu.Separator />
                    <ContextMenuAction.OpenDesktopApp
                      uri={node.uri}
                      context={{ uri: spotifyURI }}
                    />
                  </>
                )}
              </>
            );
          }}
        />
      </Page.Content>
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
    cell: (info) => (
      <TrackNumberCell
        position={info.row.index}
        track={info.getValue()}
        context={{
          __typename: 'Playlist',
          uri: info.table.options.meta!.spotifyURI,
        }}
      />
    ),
    meta: {
      headerAlign: 'right',
      shrink: true,
    },
  }),
  columnHelper.accessor('node', {
    id: 'title',
    header: 'Title',
    cell: (info) => (
      <TrackTitleCell
        context={{ uri: info.table.options.meta!.spotifyURI }}
        track={info.getValue()}
      />
    ),
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

export default CollectionTracksRoute;
