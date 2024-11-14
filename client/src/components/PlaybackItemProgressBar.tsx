import {
  FragmentType,
  TypedDocumentNode,
  gql,
  useFragment,
} from '@apollo/client';
import Flex from './Flex';
import ProgressBar from './ProgressBar';
import Duration from './Duration';
import { PlaybackItemProgressBar_playbackState as PlaybackState } from '../types/api';
import usePlaybackProgress from '../hooks/usePlaybackProgress';
import useSeekToPositionMutation from '../mutations/useSeekToPositionMutation';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface PlaybackItemProgressBarProps {
  playbackState: FragmentType<PlaybackState> | null | undefined;
}

const PlaybackItemProgressBarFragment: TypedDocumentNode<PlaybackState> = gql`
  fragment PlaybackItemProgressBar_playbackState on PlaybackState {
    isPlaying
    progressMs
    timestamp
    item {
      id
      durationMs
    }
  }
`;

fragmentRegistry.register(PlaybackItemProgressBarFragment);

const PlaybackItemProgressBar = ({
  playbackState,
}: PlaybackItemProgressBarProps) => {
  return playbackState ? (
    <CurrentPlayback playbackState={playbackState} />
  ) : (
    <Placeholder />
  );
};

function Placeholder() {
  return (
    <Flex gap="0.5rem" alignItems="center">
      <span className="text-muted text-xs tabular-nums">
        <Duration durationMs={0} />
      </span>
      <ProgressBar animate={false} max={0} value={0} width="100%" />
      <span className="text-muted text-xs tabular-nums">
        <Duration durationMs={0} />
      </span>
    </Flex>
  );
}

interface CurrentPlaybackProps {
  playbackState: FragmentType<PlaybackState>;
}

function CurrentPlayback({ playbackState }: CurrentPlaybackProps) {
  const { data, complete } = useFragment({
    fragment: PlaybackItemProgressBarFragment,
    from: playbackState,
  });

  const playbackItem = data?.item;
  const durationMs = playbackItem?.durationMs ?? 0;
  const progressMs = usePlaybackProgress(complete ? data : null, {
    max: durationMs,
  });
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
}

export default PlaybackItemProgressBar;
