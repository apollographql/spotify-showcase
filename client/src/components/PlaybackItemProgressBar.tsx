import { TypedDocumentNode, gql, useQuery } from '@apollo/client';
import Flex from './Flex';
import ProgressBar from './ProgressBar';
import Duration from './Duration';
import {
  PlaybackItemProgressBarQuery,
  PlaybackItemProgressBarQueryVariables,
} from '../types/api';
import usePlaybackProgress from '../hooks/usePlaybackProgress';
import useSeekToPositionMutation from '../mutations/useSeekToPositionMutation';

// EXERCISE: Convert this to a fragment and add it to the PLAYBACK_STATE_FRAGMENT in playbar.tsx
const PLAYBACK_ITEM_PROGRESS_BAR_QUERY: TypedDocumentNode<
  PlaybackItemProgressBarQuery,
  PlaybackItemProgressBarQueryVariables
> = gql`
  query PlaybackItemProgressBarQuery {
    me {
      player {
        playbackState {
          isPlaying
          progressMs
          timestamp
          item {
            id
            durationMs
          }
        }
      }
    }
  }
`;

const PlaybackItemProgressBar = () => {
  const { data } = useQuery(PLAYBACK_ITEM_PROGRESS_BAR_QUERY);

  const playbackState = data?.me?.player.playbackState;
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

export default PlaybackItemProgressBar;
