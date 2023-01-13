import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  ResumePlaybackMutation,
  ResumePlaybackMutationVariables,
  UseResumePlaybackStateFragment,
} from '../types/api';
import usePlaybackState from '../hooks/usePlaybackState';
import { Get } from 'type-fest';

type PlaybackState = NonNullable<
  Get<ResumePlaybackMutation, 'resumePlayback.playbackState'>
>;

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

const USE_RESUME_PLAYBACK_STATE_FRAGMENT = gql`
  fragment UseResumePlaybackStateFragment on PlaybackState {
    context {
      uri
    }
  }
`;

const useResumePlaybackMutation = () => {
  const [execute, result] = useMutation<
    ResumePlaybackMutation,
    ResumePlaybackMutationVariables
  >(RESUME_PLAYBACK_MUTATION);

  const playbackState = usePlaybackState<UseResumePlaybackStateFragment>({
    fragment: USE_RESUME_PLAYBACK_STATE_FRAGMENT,
  });

  const resumePlayback = useCallback(
    (variables?: ResumePlaybackMutationVariables) => {
      const context = playbackState?.context;
      const contextUri = variables?.context?.contextUri;

      const optimisticPlaybackState: PlaybackState = {
        __typename: 'PlaybackState',
        isPlaying: true,
        context: context ?? null,
      };

      if (contextUri) {
        optimisticPlaybackState.context = {
          ...optimisticPlaybackState.context,
          __typename: 'PlaybackContext',
          uri: contextUri,
        };
      }

      return execute({
        variables,
        optimisticResponse: {
          resumePlayback: {
            __typename: 'ResumePlaybackResponse',
            playbackState: optimisticPlaybackState,
          },
        },
      });
    },
    [execute, playbackState]
  );

  return [resumePlayback, result] as const;
};

export default useResumePlaybackMutation;
