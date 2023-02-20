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
import usePlaybackState from '../hooks/usePlaybackState';
import TrackTitleCell from '../components/TrackTitleCell';
import { useEffect } from 'react';
import usePrevious from '../hooks/usePrevious';
import Duration from '../components/Duration';
import { ListMusic } from 'lucide-react';

type PlaybackItem = NonNullable<
  Get<QueueRouteQuery, 'me.player.playbackQueue.queue[0]'>
>;

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
    ... on Track {
      ...TrackNumberCell_track
      ...TrackTitleCell_track
    }
  }

  ${TrackNumberCell.fragments.track}
  ${TrackTitleCell.fragments.track}
`;

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment QueueRoute_playbackState on PlaybackState {
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
  const { data, refetch } = useSuspenseQuery<
    QueueRouteQuery,
    QueueRouteQueryVariables
  >(QUEUE_ROUTE_QUERY);

  const playbackState = usePlaybackState<PlaybackState>({
    fragment: PLAYBACK_STATE_FRAGMENT,
  });

  const previousItem = usePrevious(playbackState?.item);

  if (!data.me?.player.playbackQueue) {
    throw new Error('Something went wrong');
  }

  const { playbackQueue } = data.me.player;

  useEffect(() => {
    if (playbackState?.item !== previousItem) {
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
                enableMultiSelect
                enableRangeSelect
                data={[playbackQueue.currentlyPlaying as PlaybackItem]}
                columns={columns}
                meta={{ context: playbackState?.context }}
              />
            </section>
          )}
          {playbackQueue.queue.length > 0 && (
            <section>
              <h2 className="text-muted text-lg">Next</h2>
              <Table
                enableRowSelection
                enableMultiSelect
                enableRangeSelect
                data={playbackQueue.queue}
                columns={columns}
                meta={{ context: playbackState?.context }}
              />
            </section>
          )}
        </>
      )}
    </Page>
  );
};

export const LoadingState = () => {
  return <div />;
};

const columnHelper = createColumnHelper<PlaybackItem>();

const columns = [
  columnHelper.display({
    id: 'number',
    header: '',
    cell: (info) => {
      const { context } = info.table.options.meta!;
      const { index, original: playbackItem } = info.row;

      if (playbackItem.__typename === 'Track') {
        return (
          <TrackNumberCell
            position={index}
            context={context}
            track={playbackItem}
          />
        );
      }

      return null;
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
