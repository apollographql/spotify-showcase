import { gql, useMutation } from '@apollo/client';
import Flex from './Flex';
import ProgressBar from './ProgressBar';
import Duration from './Duration';
import Text from './Text';
import {
  PlaybackItemProgressBar_playbackState as PlaybackState,
  SeekToPositionMutation,
  SeekToPositionMutationVariables,
} from '../types/api';
import usePlaybackProgress from '../hooks/usePlaybackProgress';

interface PlaybackItemProgressBarProps {
  playbackState: PlaybackState | null | undefined;
}

const SEEK_TO_POSITION_MUTATION = gql`
  mutation SeekToPositionMutation($positionMs: Int!) {
    seekToPosition(positionMs: $positionMs) {
      playbackState {
        progressMs
      }
    }
  }
`;

const PlaybackItemProgressBar = ({
  playbackState,
}: PlaybackItemProgressBarProps) => {
  const playbackItem = playbackState?.item;
  const durationMs = playbackItem?.durationMs ?? 0;
  const progressMs = usePlaybackProgress(playbackState, { max: durationMs });

  const [seek] = useMutation<
    SeekToPositionMutation,
    SeekToPositionMutationVariables
  >(SEEK_TO_POSITION_MUTATION);

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
          seek({ variables: { positionMs } });
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
        ... on Track {
          id
          durationMs
        }
        ... on Episode {
          id
          durationMs
        }
      }
    }
  `,
};

export default PlaybackItemProgressBar;
