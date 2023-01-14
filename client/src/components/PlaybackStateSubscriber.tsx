import {
  gql,
  useSubscription,
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
  const { data } = useSuspenseQuery<PlaybackStateSubscriberQuery>(
    PLAYBACK_STATE_SUBSCRIBER_QUERY
  );

  // TODO: Replace with subscribeToMore once https://github.com/apollographql/apollo-client/issues/10429 is complete
  useSubscription<PlaybackStateSubscriberSubscription>(
    PLAYBACK_STATE_SUBSCRIBER_SUBSCRIPTION,
    {
      onData: ({ client, data: result }) => {
        if (!result.data) {
          return;
        }

        const { playbackStateChanged } = result.data;

        const playbackState =
          playbackStateChanged === null
            ? null
            : merge(
                data?.me?.player.playbackState ?? {},
                playbackStateChanged,
                { arrayMerge: overwriteMerge }
              );

        client.writeQuery({
          query: PLAYBACK_STATE_SUBSCRIBER_QUERY,
          data: {
            me: {
              __typename: 'CurrentUser',
              player: { __typename: 'Player', playbackState },
            },
          },
        });
      },
    }
  );

  return null;
};

export default PlaybackStateSubscriber;
