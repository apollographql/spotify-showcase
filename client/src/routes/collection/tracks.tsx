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
import usePlaybackState from '../../hooks/usePlaybackState';
import useResumePlaybackMutation from '../../mutations/useResumePlaybackMutation';

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

            ...TrackTitleCell_track
          }
        }
      }
    }
  }

  ${TrackTitleCell.fragments.track}
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

  const { data } = useSuspenseQuery<
    CollectionTracksRouteQuery,
    CollectionTracksRouteQueryVariables
  >(COLLECTION_TRACKS_ROUTE_QUERY);

  const [resumePlayback] = useResumePlaybackMutation();
  const playbackState =
    usePlaybackState<CollectionTracksRoutePlaylistStateFragment>({
      fragment: PLAYBACK_STATE_FRAGMENT,
    });

  const currentUser = data.me!;
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
          <EntityLink entity={currentUser.user}>
            {currentUser.user.displayName}
          </EntityLink>,
          <Text color="muted">
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
              const context = isPlayingCollection
                ? null
                : { offset: { position: 0 }, contextUri: spotifyURI };

              resumePlayback({ context });
            }}
          />
        </Page.ActionsBar>
        <Table data={currentUser.tracks?.edges ?? []} columns={columns} />
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
            <Skeleton.Text />,
            <Flex gap="0.5rem" alignItems="end">
              <Skeleton.CoverPhoto size="2.5rem" />
              <Flex direction="column" flex={1} gap="0.5rem">
                <Skeleton.Text width="25%" fontSize="1rem" />
                <Skeleton.Text width="20%" fontSize="0.75rem" />
              </Flex>
            </Flex>,
            <Skeleton.Text />,
            <Skeleton.Text />,
          ]}
        />
      </Page.Content>
    </Page>
  );
};

const columnHelper = createColumnHelper<SavedTrackEdge>();

const columns = [
  columnHelper.display({
    id: 'number',
    header: '#',
    cell: (info) => <Text color="muted">{info.row.index + 1}</Text>,
    meta: {
      headerAlign: 'center',
      shrink: true,
    },
  }),
  columnHelper.accessor('node', {
    header: 'Title',
    cell: (info) => <TrackTitleCell track={info.getValue()} />,
  }),
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
      headerAlign: 'right',
      shrink: true,
    },
  }),
];

export default CollectionTracksRoute;
