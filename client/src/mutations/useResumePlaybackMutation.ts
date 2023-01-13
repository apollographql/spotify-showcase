import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  ResumePlaybackMutation,
  ResumePlaybackMutationVariables,
} from '../types/api';

const RESUME_PLAYBACK_MUTATION = gql`
  mutation ResumePlaybackMutation($context: ResumePlaybackContextInput) {
    resumePlayback(context: $context) {
      playbackState {
        isPlaying
      }
    }
  }
`;

const useResumePlaybackMutation = () => {
  const [execute, result] = useMutation<
    ResumePlaybackMutation,
    ResumePlaybackMutationVariables
  >(RESUME_PLAYBACK_MUTATION);

  const resumePlayback = useCallback(
    (variables?: ResumePlaybackMutationVariables) => {
      return execute({
        variables,
        optimisticResponse: {
          resumePlayback: {
            __typename: 'ResumePlaybackResponse',
            playbackState: { __typename: 'PlaybackState', isPlaying: true },
          },
        },
      });
    },
    [execute]
  );

  return [resumePlayback, result] as const;
};

export default useResumePlaybackMutation;
