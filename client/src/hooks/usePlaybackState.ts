import { gql, useQuery } from '@apollo/client';
import { CachedPlaybackStateQuery } from '../types/api';

const CACHED_PLAYBACK_STATE_QUERY = gql`
  query CachedPlaybackStateQuery {
    me {
      player {
        playbackState {
          isPlaying
        }
      }
    }
  }
`;

const usePlaybackState = () => {
  const { data } = useQuery<CachedPlaybackStateQuery>(
    CACHED_PLAYBACK_STATE_QUERY,
    { fetchPolicy: 'cache-only' }
  );

  return data?.me?.player.playbackState ?? null;
};

export default usePlaybackState;
