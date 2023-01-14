import { gql } from '@apollo/client';
import Flex from './Flex';
import ProgressBar from './ProgressBar';
import Duration from './Duration';
import Text from './Text';
import { PlaybackItemProgressBar_playbackState as PlaybackState } from '../types/api';
import usePlaybackProgress from '../hooks/usePlaybackProgress';
import useSeekToPositionMutation from '../mutations/useSeekToPositionMutation';

interface PlaybackItemProgressBarProps {
  playbackState: PlaybackState | null | undefined;
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
      <Text color="muted" size="xs" numericVariant="tabular-nums">
        <Duration durationMs={progressMs} />
      </Text>
      <ProgressBar
        animate={false}
        max={durationMs}
        value={progressMs}
        width="100%"
        onChange={(positionMs) => {
          seekToPosition({ positionMs });
        }}
      />
      <Text color="muted" size="xs" numericVariant="tabular-nums">
        <Duration durationMs={durationMs} />
      </Text>
    </Flex>
  );
};

PlaybackItemProgressBar.fragments = {
  playbackState: gql`
    fragment PlaybackItemProgressBar_playbackState on PlaybackState {
      isPlaying
      progressMs
      timestamp
      item {
        id
        durationMs
      }
    }
  `,
};

export default PlaybackItemProgressBar;
