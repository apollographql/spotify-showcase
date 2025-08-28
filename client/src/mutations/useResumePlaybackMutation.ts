import { useCallback } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import {
  PlaybackContextType,
  ResumePlaybackInput,
  ResumePlaybackMutation,
  ResumePlaybackMutationVariables,
  UseResumePlaybackStateFragment,
} from '../types/api';
import usePlaybackState from '../hooks/usePlaybackState';
import { Get } from 'type-fest';
import {
  parseTypenameFromURI,
  parseSpotifyIDFromURI,
  parseSpotifyTypeFromURI,
} from '../utils/spotify';

type PlaybackState = NonNullable<
  Get<ResumePlaybackMutation, 'resumePlayback.playbackState'>
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
      return PlaybackContextType.Album;
    case 'artist':
      return PlaybackContextType.Artist;
    case 'collection':
      return PlaybackContextType.Collection;
    case 'collectionyourepisodes':
      return PlaybackContextType.CollectionYourEpisodes;
    case 'playlist':
      return PlaybackContextType.Playlist;
    case 'show':
      return PlaybackContextType.Show;
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
