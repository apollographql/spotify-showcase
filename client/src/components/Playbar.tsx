import cx from 'classnames';
import styles from './Playbar.module.scss';
import {
  gql,
  useSubscription,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import {
  Action,
  PlaybarQuery,
  PlaybarQueryVariables,
  PlaybarSubscription,
  PlaybarSubscriptionVariables,
  PlaybarControlButton_playbackState as PlaybackState,
} from '../types/api';
import merge from 'deepmerge';
import {
  List,
  MonitorSpeaker,
  Volume1,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
  Volume,
} from 'lucide-react';
import CoverPhoto from './CoverPhoto';
import CircularPlayButton from './CircularPlayButton';
import Flex from './Flex';
import EpisodePlaybackDetails from './EpisodePlaybackDetails';
import TrackPlaybackDetails from './TrackPlaybackDetails';
import PlaybarControlButton from './PlaybarControlButton';
import ProgressBar from './ProgressBar';
import { overwriteMerge } from '../utils/deepmerge';

interface PlaybarProps {
  className?: string;
}

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment PlaybackStateFragment on PlaybackState {
    isPlaying
    actions {
      disallows
    }
    device {
      id
      name
      volumePercent
    }
    item {
      __typename
      ... on Track {
        id
        album {
          id
          images {
            url
          }
        }
        ...TrackPlaybackDetails_track
      }
      ... on Episode {
        id
        show {
          id
          images {
            url
          }
        }
        ...EpisodePlaybackDetails_episode
      }
    }

    ...PlaybarControlButton_playbackState
  }

  ${PlaybarControlButton.fragments.playbackState}
  ${EpisodePlaybackDetails.fragments.episode}
  ${TrackPlaybackDetails.fragments.track}
`;

const PLAYBAR_QUERY = gql`
  query PlaybarQuery {
    me {
      player {
        playbackState {
          ...PlaybackStateFragment
        }
      }
    }
  }

  ${PLAYBACK_STATE_FRAGMENT}
`;

const PLAYBAR_SUBSCRIPTION = gql`
  subscription PlaybarSubscription {
    playbackStateChanged {
      ...PlaybackStateFragment
    }
  }

  ${PLAYBACK_STATE_FRAGMENT}
`;

const Playbar = ({ className }: PlaybarProps) => {
  const { data } = useSuspenseQuery<PlaybarQuery, PlaybarQueryVariables>(
    PLAYBAR_QUERY
  );

  // TODO: Replace with subscribeToMore once https://github.com/apollographql/apollo-client/issues/10429 is complete
  useSubscription<PlaybarSubscription, PlaybarSubscriptionVariables>(
    PLAYBAR_SUBSCRIPTION,
    {
      onData: ({ client, data: result }) => {
        if (!result.data) {
          return;
        }

        const { playbackStateChanged } = result.data;

        client.writeQuery({
          query: PLAYBAR_QUERY,
          data: {
            me: {
              __typename: 'CurrentUser',
              player: {
                __typename: 'Player',
                playbackState:
                  playbackStateChanged === null
                    ? null
                    : merge(
                      data?.me?.player.playbackState ?? {},
                      playbackStateChanged,
                      { arrayMerge: overwriteMerge }
                    ),
              },
            },
          },
        });
      },
    }
  );

  const playbackState = data.me?.player.playbackState;
  const playbackItem = playbackState?.item ?? null;
  const device = playbackState?.device;
  const coverPhoto =
    playbackItem?.__typename === 'Track'
      ? playbackItem.album.images[0]
      : playbackItem?.show.images[0];

  return (
    <Flex as="footer" direction="column" className={cx(className)}>
      <div className={styles.player}>
        <Flex gap="1rem" alignItems="center">
          <CoverPhoto size="3.5rem" image={coverPhoto} />
          {playbackItem?.__typename === 'Track' ? (
            <TrackPlaybackDetails track={playbackItem} />
          ) : playbackItem?.__typename === 'Episode' ? (
            <EpisodePlaybackDetails episode={playbackItem} />
          ) : null}
        </Flex>
        <Flex direction="column" gap="0.5rem" alignItems="center">
          <Flex alignItems="center" gap="1rem">
            <PlaybarControlButton
              action={Action.TogglingShuffle}
              playbackState={playbackState}
              icon={<Shuffle />}
            />
            <PlaybarControlButton
              action={Action.SkippingPrev}
              playbackState={playbackState}
              icon={<SkipBack fill="currentColor" />}
            />
            <CircularPlayButton
              size="2.5rem"
              playing={playbackState?.isPlaying ?? false}
            />
            <PlaybarControlButton
              action={Action.SkippingNext}
              playbackState={playbackState}
              icon={<SkipForward fill="currentColor" />}
            />
            <PlaybarControlButton
              action={Action.TogglingRepeatTrack}
              playbackState={playbackState}
              icon={<Repeat />}
            />
          </Flex>
        </Flex>
        <Flex justifyContent="end" gap="1rem" alignItems="center">
          <PlaybarControlButton
            action={Action.TransferringPlayback}
            playbackState={playbackState}
            icon={<List strokeWidth={1} />}
          />
          <PlaybarControlButton
            action={Action.TransferringPlayback}
            playbackState={playbackState}
            icon={<MonitorSpeaker strokeWidth={1} />}
          />
          <Flex gap="0.25rem" alignItems="center">
            <PlaybarControlButton
              action={Action.TransferringPlayback}
              playbackState={playbackState}
              icon={<Volume strokeWidth={1} />}
            />
            <ProgressBar
              animate={false}
              max={100}
              value={device?.volumePercent ?? 0}
              width="100px"
            />
          </Flex>
        </Flex>
      </div>
      {device && (
        <Flex
          alignItems="center"
          className={styles.device}
          justifyContent="end"
        >
          <Volume1 /> Listening on {device.name}
        </Flex>
      )}
    </Flex>
  );
};

export default Playbar;
