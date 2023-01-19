import { useEffect } from 'react';
import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import {
  PlaybackStateSubscriberQuery,
  PlaybackStateSubscriberSubscription,
} from '../types/api';
import merge from 'deepmerge';
import Playbar from './Playbar';
import { overwriteMerge } from '../utils/deepmerge';

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

  ${Playbar.fragments.playbackState}
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

  useEffect(() => {
    return subscribeToMore<PlaybackStateSubscriberSubscription>({
      document: PLAYBACK_STATE_SUBSCRIBER_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const { playbackStateChanged } = subscriptionData.data;

        const playbackState = playbackStateChanged
          ? merge(prev.me?.player.playbackState ?? {}, playbackStateChanged, {
              arrayMerge: overwriteMerge,
            })
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
