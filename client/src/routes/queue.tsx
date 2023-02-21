import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import {
  QueueRouteQuery,
  QueueRouteQueryVariables,
  QueueRoute_playbackState as PlaybackState,
} from '../types/api';
import { createColumnHelper } from '@tanstack/react-table';
import { Get } from 'type-fest';
import Page from '../components/Page';
import Table from '../components/Table';
import TrackNumberCell from '../components/TrackNumberCell';
import TrackPositionCell from '../components/TrackPositionCell';
import TrackTitleCell from '../components/TrackTitleCell';
import usePlaybackState from '../hooks/usePlaybackState';
import { useEffect, useRef } from 'react';
import usePrevious from '../hooks/usePrevious';
import Duration from '../components/Duration';
import { ListMusic } from 'lucide-react';
import useResumePlaybackMutation from '../mutations/useResumePlaybackMutation';
import { notify } from '../notifications';
import Skeleton from '../components/Skeleton';
import EntityLink from '../components/EntityLink';

type PlaybackItem = NonNullable<
  Get<QueueRouteQuery, 'me.player.playbackQueue.queue[0]'>
>;

interface TableMeta {
  isCurrent: boolean;
  isPlaying: boolean;
  context: PlaybackState['context'];
  positionOffset: number;
  onPlay: (playbackItem: PlaybackItem) => void;
}

const QUEUE_ROUTE_QUERY = gql`
  query QueueRouteQuery {
    me {
      player {
        playbackQueue {
          currentlyPlaying {
            ...QueueRoute_playbackItem
          }
          queue {
            ...QueueRoute_playbackItem
          }
        }
      }
    }
  }

  fragment QueueRoute_playbackItem on PlaybackItem {
    id
    durationMs
    uri
    ... on Track {
      album {
        id
        name
      }
      ...TrackNumberCell_track
      ...TrackTitleCell_track
    }
    ... on Episode {
      show {
        id
        name
      }
    }
  }

  ${TrackNumberCell.fragments.track}
  ${TrackTitleCell.fragments.track}
`;

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment QueueRoute_playbackState on PlaybackState {
    isPlaying
    context {
      __typename
      uri
    }
    item {
      id
    }
  }
`;

export const RouteComponent = () => {
  const isChangingTrack = useRef(false);
  const { data, refetch } = useSuspenseQuery<
    QueueRouteQuery,
    QueueRouteQueryVariables
  >(QUEUE_ROUTE_QUERY, {
    // The queue is volitile and can change often so its easiest to reload the
    // data each time this route is loaded.
    fetchPolicy: 'network-only',
    suspensePolicy: 'initial',
  });

  const [resumePlayback] = useResumePlaybackMutation({
    awaitRefetchQueries: true,
    refetchQueries: [QUEUE_ROUTE_QUERY],
  });

  const playbackState = usePlaybackState<PlaybackState>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  const previousItem = usePrevious(playbackState?.item);

  if (!data.me?.player.playbackQueue) {
    throw new Error('Something went wrong');
  }

  const { playbackQueue } = data.me.player;

  useEffect(() => {
    if (
      playbackState?.item !== previousItem &&
      previousItem &&
      !isChangingTrack.current
    ) {
      refetch();
    }
  }, [playbackState?.item, previousItem, refetch]);

  return (
    <Page className="p-[var(--main-content--padding)]">
      {playbackQueue.queue.length === 0 || !playbackQueue.currentlyPlaying ? (
        <Page.EmptyState
          icon={<ListMusic />}
          title="Add to your queue"
          description={'Tap "Add to queue" from a track\'s menu to see it here'}
        />
      ) : (
        <>
          <h1 className="text-2xl">Queue</h1>
          {playbackQueue.currentlyPlaying && (
            <section className="mb-4">
              <h2 className="text-muted text-lg">Now playing</h2>
              <Table
                enableRowSelection
                data={[playbackQueue.currentlyPlaying as PlaybackItem]}
                columns={columns}
                meta={
                  {
                    context: playbackState && playbackState.context,
                    isCurrent: true,
                    isPlaying: playbackState?.isPlaying ?? false,
                    positionOffset: 0,
                    onPlay: () => resumePlayback(),
                  } satisfies TableMeta
                }
              />
            </section>
          )}
          {playbackQueue.queue.length > 0 && (
            <section>
              <h2 className="text-muted text-lg">Next in queue</h2>
              <Table
                enableRowSelection
                enableMultiSelect
                enableRangeSelect
                data={playbackQueue.queue}
                columns={columns}
                meta={
                  {
                    context: playbackState && playbackState.context,
                    isCurrent: false,
                    isPlaying: false,
                    positionOffset: 1,
                    onPlay: async (playbackItem) => {
                      try {
                        isChangingTrack.current = true;
                        await resumePlayback({
                          contextUri: playbackState?.context?.uri,
                          offset: { uri: playbackItem.uri },
                        });
                      } catch (e) {
                        notify('Unable to play the requested track');
                      } finally {
                        isChangingTrack.current = false;
                      }
                    },
                  } satisfies TableMeta
                }
              />
            </section>
          )}
        </>
      )}
    </Page>
  );
};

export const LoadingState = () => {
  const columns = [
    <Skeleton.Text key="text" />,
    <div key="titleCell" className="flex gap-2 items-end">
      <Skeleton.CoverPhoto size="2.5rem" />
      <div className="flex flex-col flex-1 gap-2">
        <Skeleton.Text width="25%" fontSize="1rem" />
        <Skeleton.Text width="20%" fontSize="0.75rem" />
      </div>
    </div>,
    <Skeleton.Text key="album" />,
    <Skeleton.Text key="duration" />,
  ];

  return (
    <Page className="p-[var(--main-content--padding)]">
      <div className="flex flex-col gap-4">
        <section>
          <Skeleton.Heading level={2} width="25%" />
          <Skeleton.Table headers={false} rows={1} columns={columns} />
        </section>
        <section>
          <Skeleton.Heading level={2} width="25%" />
          <Skeleton.Table headers={false} rows={10} columns={columns} />
        </section>
      </div>
    </Page>
  );
};

const columnHelper = createColumnHelper<PlaybackItem>();

const columns = [
  columnHelper.display({
    id: 'number',
    header: '',
    cell: (info) => {
      const { index, original: playbackItem } = info.row;
      const { positionOffset, isCurrent, isPlaying, onPlay } = info.table
        .options.meta as TableMeta;

      return (
        <TrackPositionCell
          isCurrent={isCurrent}
          isPlaying={isPlaying}
          position={index + positionOffset + 1}
          onPlay={() => onPlay(playbackItem)}
        />
      );
    },
    meta: {
      shrink: true,
      headerAlign: 'right',
    },
  }),
  columnHelper.display({
    id: 'info',
    header: '',
    cell: (info) => {
      const { context } = info.table.options.meta!;
      const { original: playbackItem } = info.row;

      if (playbackItem.__typename === 'Track') {
        return <TrackTitleCell track={playbackItem} context={context} />;
      }

      return null;
    },
  }),
  columnHelper.display({
    id: 'albumOrShow',
    header: '',
    cell: (info) => {
      const { original: playbackItem } = info.row;

      if (playbackItem.__typename === 'Episode') {
        return (
          <EntityLink className="text-muted" entity={playbackItem.show}>
            {playbackItem.show.name}
          </EntityLink>
        );
      }

      return (
        <EntityLink className="text-muted" entity={playbackItem.album}>
          {playbackItem.album.name}
        </EntityLink>
      );
    },
  }),
  columnHelper.accessor('durationMs', {
    header: '',
    cell: (info) => (
      <div className="flex justify-end tabular-nums text-muted">
        <Duration durationMs={info.getValue()} />
      </div>
    ),
    meta: {
      shrink: true,
      headerAlign: 'right',
    },
  }),
];
