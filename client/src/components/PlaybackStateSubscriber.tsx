import { useEffect } from 'react';
import { CombinedGraphQLErrors, gql } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/client/react';
import {
  PlaybackStateSubscriberQuery,
  PlaybackStateSubscriberSubscription,
} from '../types/api';
import merge from 'deepmerge';
import { overwriteMerge } from '../utils/deepmerge';
import { useNavigate } from 'react-router-dom';

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment PlaybackStateFragment on PlaybackState {
    isPlaying
    repeatState
    shuffleState
    actions {
      disallows
    }
    context {
      uri
    }
    device {
      id
      name
      type
      volumePercent
    }
    item {
      id

      ... on Track {
        album {
          id
          images {
            url
          }
        }
      }

      ... on Episode {
        show {
          id
          images {
            url
          }
        }
      }
    }

    ...Playbar_playbackState
  }
`;

const PLAYBACK_STATE_SUBSCRIBER_QUERY = gql`
  query PlaybackStateSubscriberQuery {
    me {
      player {
        playbackState {
          ...PlaybackStateFragment
        }
      }
    }
  }

  ${PLAYBACK_STATE_FRAGMENT}
`;

const PLAYBACK_STATE_SUBSCRIBER_SUBSCRIPTION = gql`
  subscription PlaybackStateSubscriberSubscription {
    playbackStateChanged {
      ...PlaybackStateFragment
    }
  }

  ${PLAYBACK_STATE_FRAGMENT}
`;

const PlaybackStateSubscriber = () => {
  const { subscribeToMore } = useSuspenseQuery<PlaybackStateSubscriberQuery>(
    PLAYBACK_STATE_SUBSCRIBER_QUERY
  );

  const navigate = useNavigate();

  useEffect(() => {
    return subscribeToMore<PlaybackStateSubscriberSubscription>({
      document: PLAYBACK_STATE_SUBSCRIBER_SUBSCRIPTION,
      onError: (error) => {
        if (
          CombinedGraphQLErrors.is(error) &&
          error.errors.some(
            (error) => error.extensions?.code === 'UNAUTHENTICATED'
          )
        ) {
          navigate('/logged-out');
        }
      },
      updateQuery: (_, { subscriptionData, previousData, complete }) => {
        const { playbackStateChanged } = subscriptionData.data;

        const playbackState =
          complete && playbackStateChanged
            ? merge(
                previousData?.me?.player?.playbackState ?? {},
                playbackStateChanged,
                {
                  arrayMerge: overwriteMerge,
                }
              )
            : null;

        return {
          me: {
            __typename: 'CurrentUser',
            player: {
              __typename: 'Player',
              playbackState,
            },
          },
        };
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default PlaybackStateSubscriber;
