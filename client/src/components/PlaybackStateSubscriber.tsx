import { gql, useSubscription } from '@apollo/client';

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

const PLAYBACK_STATE_SUBSCRIBER_SUBSCRIPTION = gql`
  subscription PlaybackStateSubscriberSubscription {
    playbackStateChanged {
      ...PlaybackStateFragment
    }
  }

  ${PLAYBACK_STATE_FRAGMENT}
`;

const PlaybackStateSubscriber = () => {
  useSubscription(PLAYBACK_STATE_SUBSCRIBER_SUBSCRIPTION);

  return null;
};

export default PlaybackStateSubscriber;
