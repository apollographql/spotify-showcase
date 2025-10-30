import { useCallback } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import {
  ResumePlaybackMutationMutation,
  ResumePlaybackMutationMutationVariables,
  UseResumePlaybackStateFragmentFragment,
} from '../types/api';
import { PlaybackContextType } from '../types/api.schema';
import usePlaybackState from '../hooks/usePlaybackState';
import { Get } from 'type-fest';
import {
  parseTypenameFromURI,
  parseSpotifyIDFromURI,
  parseSpotifyTypeFromURI,
} from '../utils/spotify';

type PlaybackState = NonNullable<
  Get<ResumePlaybackMutationMutation, 'resumePlayback.playbackState'>
>;

const RESUME_PLAYBACK_MUTATION = gql`
  mutation ResumePlaybackMutation($input: ResumePlaybackInput) {
    resumePlayback(input: $input) {
      playbackState {
        context {
          uri
          type
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
      type
    }
  }
`;

const getContextTypeFromURI = (contextURI: string) => {
  switch (parseSpotifyTypeFromURI(contextURI)) {
    case 'album':
  return PlaybackContextType.ALBUM;
    case 'artist':
  return PlaybackContextType.ARTIST;
    case 'collection':
  return PlaybackContextType.COLLECTION;
    case 'collectionyourepisodes':
  return PlaybackContextType.COLLECTION_YOUR_EPISODES;
    case 'playlist':
  return PlaybackContextType.PLAYLIST;
    case 'show':
  return PlaybackContextType.SHOW;
    default:
      throw new Error('Could not parse context type from URI');
  }
};

type Options = Pick<
  useMutation.Options,
  'refetchQueries' | 'awaitRefetchQueries'
>;

const useResumePlaybackMutation = (options?: Options) => {
  const [execute, result] = useMutation<
    ResumePlaybackMutation,
    ResumePlaybackMutationVariables
  >(RESUME_PLAYBACK_MUTATION, options);

  const playbackState = usePlaybackState<UseResumePlaybackStateFragment>({
    fragment: USE_RESUME_PLAYBACK_STATE_FRAGMENT,
  });

  const resumePlayback = useCallback(
    (input?: ResumePlaybackInput) => {
      const context = playbackState?.context;
      const contextUri = input?.contextUri;

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
          type: getContextTypeFromURI(contextUri),
        };
      }

      return execute({
        variables: { input },
        optimisticResponse: {
          resumePlayback: {
            __typename: 'ResumePlaybackPayload',
            playbackState: optimisticPlaybackState,
          },
        },
        update: (cache) => {
          cache.modify({
            id: cache.identify({ __typename: 'PlaybackState' }),
            fields: {
              progressMs: (existing) => {
                if (!input) {
                  return existing;
                }

                return input.positionMs ?? 0;
              },
              item: (existing, { toReference }) => {
                const uri = input?.offset?.uri || input?.uris?.[0];

                if (!uri) {
                  return existing;
                }

                const ref = toReference({
                  __typename: parseTypenameFromURI(uri),
                  id: parseSpotifyIDFromURI(uri),
                });

                return ref ? ref : existing;
              },
            },
          });
        },
      });
    },
    [execute, playbackState]
  );

  return [resumePlayback, result] as const;
};

export default useResumePlaybackMutation;
