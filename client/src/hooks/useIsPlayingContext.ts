import { gql } from '@apollo/client';
import usePlaybackState from './usePlaybackState';
import { UseISPlayingContextFragment_playbackState as PlaybackState } from '../types/api';

const USE_IS_PLAYING_CONTEXT_FRAGMENT = gql`
  fragment UseISPlayingContextFragment_playbackState on PlaybackState {
    isPlaying
    context {
      uri
    }
  }
`;

interface Context {
  uri: string;
}

const useIsPlayingContext = (context: Context) => {
  const playbackState = usePlaybackState<PlaybackState>({
    fragment: USE_IS_PLAYING_CONTEXT_FRAGMENT,
  });

  if (!playbackState) {
    return false;
  }

  return playbackState.isPlaying && playbackState.context?.uri === context.uri;
};

export default useIsPlayingContext;
