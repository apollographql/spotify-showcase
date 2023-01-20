import cx from 'classnames';
import styles from './Playbar.module.scss';
import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { Link } from 'react-router-dom';
import {
  Action,
  RepeatMode,
  PlaybarQuery,
  PlaybarQueryVariables,
  Playbar_playbackState as PlaybackState,
} from '../types/api';
import { List, Volume1 } from 'lucide-react';
import CoverPhoto from './CoverPhoto';
import PlayButton from './PlayButton';
import DeviceIcon from './DeviceIcon';
import DevicePopover from './DevicePopover';
import Flex from './Flex';
import EpisodePlaybackDetails from './EpisodePlaybackDetails';
import TrackPlaybackDetails from './TrackPlaybackDetails';
import MuteControl from './MuteControl';
import LikeControl from './LikeControl';
import PlaybarControlButton from './PlaybarControlButton';
import PlaybackItemProgressBar from './PlaybackItemProgressBar';
import Popover from './Popover';
import RepeatControl from './RepeatControl';
import ShufflePlaybackControl from './ShufflePlaybackControl';
import SkipToNextControl from './SkipToNextControl';
import SkipToPreviousControl from './SkipToPreviousControl';
import SkipBackwardControl from './SkipBackwardControl';
import SkipForwardControl from './SkipForwardControl';
import VolumeBar from './VolumeBar';
import useResumePlaybackMutation from '../mutations/useResumePlaybackMutation';
import usePlaybackState from '../hooks/usePlaybackState';

interface PlaybarProps {
  className?: string;
}

const EPISODE_SKIP_FORWARD_AMOUNT = 15_000;

const PLAYBAR_QUERY = gql`
  query PlaybarQuery {
    me {
      player {
        devices {
          id
          ...DevicePopover_devices
        }
      }
    }
  }

  ${DevicePopover.fragments.devices}
`;

const Playbar = ({ className }: PlaybarProps) => {
  const { data } = useSuspenseQuery<PlaybarQuery, PlaybarQueryVariables>(
    PLAYBAR_QUERY
  );
  const [resumePlayback] = useResumePlaybackMutation();
  const playbackState = usePlaybackState<PlaybackState>({
    fragment: Playbar.fragments.playbackState,
  });

  const playbackItem = playbackState?.item ?? null;
  const device = playbackState?.device;
  const devices = data.me?.player.devices ?? [];
  const disallows = playbackState?.actions.disallows ?? [];
  const coverPhoto =
    playbackItem?.__typename === 'Track'
      ? playbackItem.album.images[0]
      : playbackItem?.show.images[0];

  const disallowed = (action: Action) => !device || disallows.includes(action);

  return (
    <Flex as="footer" direction="column" className={cx(className)}>
      <div className={styles.player}>
        <Flex gap="1rem" alignItems="center">
          <CoverPhoto size="4rem" image={coverPhoto} />
          {playbackItem?.__typename === 'Track' ? (
            <TrackPlaybackDetails track={playbackItem} />
          ) : playbackItem?.__typename === 'Episode' ? (
            <EpisodePlaybackDetails episode={playbackItem} />
          ) : null}
          {playbackState && (
            <LikeControl playbackItem={playbackItem} size="1.25rem" />
          )}
        </Flex>
        <Flex direction="column" gap="0.5rem">
          <Flex alignItems="center" gap="1.25rem" justifyContent="center">
            <ShufflePlaybackControl
              shuffled={playbackState?.shuffleState ?? false}
              disallowed={disallowed(Action.TogglingShuffle)}
              size="1.25rem"
            />
            {playbackItem?.__typename === 'Episode' && (
              <SkipBackwardControl
                ms={EPISODE_SKIP_FORWARD_AMOUNT}
                progressMs={playbackState?.progressMs ?? 0}
              />
            )}
            <SkipToPreviousControl
              disallowed={disallowed(Action.SkippingPrev)}
              progressMs={playbackState?.progressMs ?? 0}
            />
            <PlayButton
              disabled={!device}
              size="2.5rem"
              playing={playbackState?.isPlaying ?? false}
              onPlay={() => resumePlayback()}
            />
            <SkipToNextControl disallowed={disallowed(Action.SkippingNext)} />
            {playbackItem?.__typename === 'Episode' && (
              <SkipForwardControl
                ms={EPISODE_SKIP_FORWARD_AMOUNT}
                progressMs={playbackState?.progressMs ?? 0}
              />
            )}
            <RepeatControl
              disallowed={disallowed(Action.TogglingRepeatTrack)}
              repeatState={playbackState?.repeatState ?? RepeatMode.Off}
            />
          </Flex>
          <PlaybackItemProgressBar playbackState={playbackState} />
        </Flex>
        <Flex justifyContent="end" gap="1rem" alignItems="center">
          <Link to="/queue" className={styles.controlLink}>
            <PlaybarControlButton
              disallowed={false}
              icon={<List strokeWidth={1.5} />}
              tooltip="Queue"
            />
          </Link>
          <DevicePopover devices={devices}>
            <PlaybarControlButton
              disallowed={disallowed(Action.TransferringPlayback)}
              icon={<DeviceIcon device={device} strokeWidth={1.5} />}
              tooltip="Connect to a device"
            />
          </DevicePopover>
          <Flex gap="0.25rem" alignItems="center">
            <MuteControl
              disallowed={!device}
              volumePercent={device?.volumePercent ?? 0}
            />
            <VolumeBar
              volumePercent={device?.volumePercent ?? 0}
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

Playbar.fragments = {
  playbackState: gql`
    fragment Playbar_playbackState on PlaybackState {
      isPlaying
      repeatState
      shuffleState
      actions {
        disallows
      }
      device {
        id
        name
        type
        volumePercent
      }
      item {
        id

        ... on Track {
          album {
            id
            images {
              url
            }
          }
          ...TrackPlaybackDetails_track
        }
        ... on Episode {
          show {
            id
            images {
              url
            }
          }
          ...EpisodePlaybackDetails_episode
        }
      }

      ...PlaybackItemProgressBar_playbackState
    }

    ${PlaybackItemProgressBar.fragments.playbackState}
    ${EpisodePlaybackDetails.fragments.episode}
    ${TrackPlaybackDetails.fragments.track}
  `,
};

export default Playbar;
