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
        context {
          uri
        }
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
      const contextUri = variables?.context?.contextUri;

      return execute({
        variables,
        optimisticResponse: {
          resumePlayback: {
            __typename: 'ResumePlaybackResponse',
            playbackState: {
              __typename: 'PlaybackState',
              context: contextUri
                ? { __typename: 'PlaybackContext', uri: contextUri }
                : null,
              isPlaying: true,
            },
          },
        },
      });
    },
    [execute]
  );

  return [resumePlayback, result] as const;
};

export default useResumePlaybackMutation;
