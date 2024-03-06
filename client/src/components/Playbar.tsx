import cx from 'classnames';
import { TypedDocumentNode, gql } from '@apollo/client';
import {
  Action,
  RepeatMode,
  Playbar_playbackState as PlaybackState,
  Playbar_player as Player,
} from '../types/api';
import { Volume1 } from 'lucide-react';
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
import RepeatControl from './RepeatControl';
import ShufflePlaybackControl from './ShufflePlaybackControl';
import SkipToNextControl from './SkipToNextControl';
import SkipToPreviousControl from './SkipToPreviousControl';
import SkipBackwardControl from './SkipBackwardControl';
import SkipForwardControl from './SkipForwardControl';
import VolumeBar from './VolumeBar';
import useResumePlaybackMutation from '../mutations/useResumePlaybackMutation';
import usePlaybackState from '../hooks/usePlaybackState';
import QueueControlButton from './QueueControlButton';
import { fragmentRegistry } from '../apollo/fragmentRegistry';
import Skeleton from './Skeleton';
import LikeButton from './LikeButton';
import { withHighlight } from './LoadingStateHighlighter';

const EPISODE_SKIP_FORWARD_AMOUNT = 15_000;

fragmentRegistry.register(gql`
  fragment Playbar_player on Player {
    devices {
      id
      ...DevicePopover_devices
    }
  }
`);

const PLAYBACK_STATE_FRAGMENT: TypedDocumentNode<PlaybackState, never> = gql`
  fragment Playbar_playbackState on PlaybackState {
    isPlaying
    repeatState
    shuffleState
    actions {
      disallows
    }
    context {
      ...TrackPlaybackDetails_context
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

      ...LikeControl_playbackItem
    }

    ...PlaybackItemProgressBar_playbackState
  }
`;

fragmentRegistry.register(PLAYBACK_STATE_FRAGMENT);

interface PlaybarProps {
  player: Player;
}

const Playbar = ({ player }: PlaybarProps) => {
  const [resumePlayback] = useResumePlaybackMutation();
  const playbackState = usePlaybackState({ fragment: PLAYBACK_STATE_FRAGMENT });

  const playbackItem = playbackState?.item ?? null;
  const device = playbackState?.device;
  const devices = player.devices ?? [];
  const disallows = playbackState?.actions.disallows ?? [];
  const coverPhoto =
    playbackItem?.__typename === 'Track'
      ? playbackItem.album.images[0]
      : playbackItem?.show.images[0];

  const disallowed = (action: Action) => !device || disallows.includes(action);

  return (
    <footer className="flex flex-col [grid-area:playbar]">
      <div className="items-center grid grid-cols-[30%_1fr_30%] text-primary py-4 px-6">
        <Flex gap="1rem" alignItems="center">
          <CoverPhoto size="4rem" image={coverPhoto} />
          {playbackItem?.__typename === 'Track' ? (
            <TrackPlaybackDetails
              context={playbackState?.context ?? null}
              track={playbackItem}
            />
          ) : playbackItem?.__typename === 'Episode' ? (
            <EpisodePlaybackDetails episode={playbackItem} />
          ) : null}
          {playbackState && (
            <LikeControl playbackItem={playbackItem} size="1.25rem" />
          )}
        </Flex>
        <Flex direction="column" gap="0.5rem">
          <Flex alignItems="center" gap="1.25rem" justifyContent="center">
            {playbackItem?.__typename === 'Track' && (
              <ShufflePlaybackControl
                shuffled={playbackState?.shuffleState ?? false}
                disallowed={disallowed(Action.TogglingShuffle)}
                size="1.25rem"
              />
            )}
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
            {playbackItem?.__typename === 'Track' && (
              <RepeatControl
                disallowed={disallowed(Action.TogglingRepeatTrack)}
                repeatState={playbackState?.repeatState ?? RepeatMode.Off}
              />
            )}
          </Flex>
          <PlaybackItemProgressBar playbackState={playbackState} />
        </Flex>
        <Flex justifyContent="end" gap="1rem" alignItems="center">
          <QueueControlButton />
          <DevicePopover devices={devices}>
            <PlaybarControlButton
              disallowed={devices.length === 0}
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
          className={cx(
            'before:[--arrow-size:0.625rem]',
            'before:[border-left-width:var(--arrow-size)] before:[border-right-width:var(--arrow-size)] before:[border-bottom-width:var(--arrow-size)] before:border-b-green before:border-l-transparent before:border-r-transparent border-solid',
            'bg-green relative py-1 px-6 text-sm leading-none rounded',
            'pointer-events-none before:absolute before:top-0 before:right-[10.5rem] before:-translate-y-full'
          )}
          justifyContent="end"
        >
          <Volume1 size="1.125rem" /> Listening on {device.name}
        </Flex>
      )}
    </footer>
  );
};

export const LoadingState = withHighlight(
  () => {
    return (
      <footer className="[grid-area:playbar] flex flex-col">
        <div className="items-center grid grid-cols-[30%_1fr_30%] text-primary py-5 px-6">
          <div className="flex items-center gap-4">
            <Skeleton.CoverPhoto size="4rem" />
            <div className="flex flex-col gap-2">
              <Skeleton.Text width="4rem" />
              <Skeleton.Text width="8rem" />
            </div>
            <LikeButton disabled liked={false} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-5 justify-center">
              <ShufflePlaybackControl
                disallowed
                size="1.25rem"
                shuffled={false}
              />
              <SkipToPreviousControl disallowed progressMs={0} />
              <PlayButton disabled playing={false} size="2.5rem" />
              <SkipToNextControl disallowed />
              <RepeatControl disallowed repeatState={RepeatMode.Off} />
            </div>
            <PlaybackItemProgressBar playbackState={null} />
          </div>
          <div className="flex justify-end gap-4 items-center">
            <QueueControlButton />
            <PlaybarControlButton
              disallowed
              icon={<DeviceIcon device={undefined} strokeWidth={1.5} />}
              tooltip="Connect to a device"
            />
            <div className="flex gap-2 items-center">
              <MuteControl disallowed volumePercent={100} />
              <VolumeBar volumePercent={100} width="100px" />
            </div>
          </div>
        </div>
      </footer>
    );
  },
  { className: '[grid-area:playbar] flex flex-col', shade: '#0433FF' }
);

export default Playbar;
