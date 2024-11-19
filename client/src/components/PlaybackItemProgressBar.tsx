import { gql, Unmasked } from '@apollo/client';
import Flex from './Flex';
import ProgressBar from './ProgressBar';
import Duration from './Duration';
import { PlaybackItemProgressBar_playbackState as PlaybackState } from '../types/api';
import usePlaybackProgress from '../hooks/usePlaybackProgress';
import useSeekToPositionMutation from '../mutations/useSeekToPositionMutation';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface PlaybackItemProgressBarProps {
  playbackState: Unmasked<PlaybackState> | null | undefined;
}

const PlaybackItemProgressBar = ({
  playbackState,
}: PlaybackItemProgressBarProps) => {
  const playbackItem = playbackState?.item;
  const durationMs = playbackItem?.durationMs ?? 0;
  const progressMs = usePlaybackProgress(playbackState, { max: durationMs });
  const [seekToPosition] = useSeekToPositionMutation();

  return (
    <Flex gap="0.5rem" alignItems="center">
      <span className="text-muted text-xs tabular-nums">
        <Duration durationMs={progressMs} />
      </span>
      <ProgressBar
        animate={false}
        max={durationMs}
        value={progressMs}
        width="100%"
        onChange={(positionMs) => {
          seekToPosition({ positionMs });
        }}
      />
      <span className="text-muted text-xs tabular-nums">
        <Duration durationMs={durationMs} />
      </span>
    </Flex>
  );
};

fragmentRegistry.register(gql`
  fragment PlaybackItemProgressBar_playbackState on PlaybackState {
    isPlaying
    progressMs
    timestamp
    item {
      id
      durationMs
    }
  }
`);

export default PlaybackItemProgressBar;
