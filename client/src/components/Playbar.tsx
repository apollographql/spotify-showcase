import cx from 'classnames';
import styles from './Playbar.module.scss';
import {
  gql,
  useSubscription,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import {
  PlaybarQuery,
  PlaybarQueryVariables,
  PlaybarSubscription,
  PlaybarSubscriptionVariables,
} from '../types/api';
import merge from 'deepmerge';
import { Volume1 } from 'lucide-react';
import CoverPhoto from './CoverPhoto';
import Flex from './Flex';
import EpisodePlaybackDetails from './EpisodePlaybackDetails';
import TrackPlaybackDetails from './TrackPlaybackDetails';
import { overwriteMerge } from '../utils/deepmerge';

interface PlaybarProps {
  className?: string;
}

const PLAYBACK_STATE_FRAGMENT = gql`
  fragment PlaybackStateFragment on PlaybackState {
    device {
      id
      name
    }
    item {
      __typename
      ... on Track {
        id
        album {
          id
          images {
            url
          }
        }
        ...TrackPlaybackDetails_track
      }
      ... on Episode {
        id
        show {
          id
          images {
            url
          }
        }
        ...EpisodePlaybackDetails_episode
      }
    }
  }

  ${EpisodePlaybackDetails.fragments.episode}
  ${TrackPlaybackDetails.fragments.track}
`;

const PLAYBAR_QUERY = gql`
  query PlaybarQuery {
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

const PLAYBAR_SUBSCRIPTION = gql`
  subscription PlaybarSubscription {
    playbackStateChanged {
      ...PlaybackStateFragment
      device {
        id
        name
      }

      item {
        __typename
        ... on Track {
          id
          name
        }
      }
    }
  }

  ${PLAYBACK_STATE_FRAGMENT}
`;

const Playbar = ({ className }: PlaybarProps) => {
  const { data } = useSuspenseQuery<PlaybarQuery, PlaybarQueryVariables>(
    PLAYBAR_QUERY
  );

  // TODO: Replace with subscribeToMore once https://github.com/apollographql/apollo-client/issues/10429 is complete
  useSubscription<PlaybarSubscription, PlaybarSubscriptionVariables>(
    PLAYBAR_SUBSCRIPTION,
    {
      onData: ({ client, data: result }) => {
        if (!result.data) {
          return;
        }

        const { playbackStateChanged } = result.data;

        const updated: PlaybarQuery = {
          me: {
            __typename: 'CurrentUser',
            player: {
              __typename: 'Player',
              playbackState:
                playbackStateChanged === null
                  ? null
                  : merge(
                      data?.me?.player.playbackState ?? {},
                      playbackStateChanged as any,
                      { arrayMerge: overwriteMerge }
                    ),
            },
          },
        };

        client.writeQuery({ query: PLAYBAR_QUERY, data: updated });
      },
    }
  );

  const playbackState = data.me?.player.playbackState;
  const playbackItem = playbackState?.item ?? null;
  const device = playbackState?.device;
  const coverPhoto =
    playbackItem?.__typename === 'Track'
      ? playbackItem.album.images[0]
      : playbackItem?.show.images[0];

  return (
    <Flex as="footer" direction="column" className={cx(className)}>
      <div className={styles.player}>
        <Flex gap="1rem" alignItems="center">
          <CoverPhoto size="3.5rem" image={coverPhoto} />
          {playbackItem?.__typename === 'Track' ? (
            <TrackPlaybackDetails track={playbackItem} />
          ) : playbackItem?.__typename === 'Episode' ? (
            <EpisodePlaybackDetails episode={playbackItem} />
          ) : (
            <CoverPhoto size="3.5rem" image={null} />
          )}
        </Flex>
      </div>
      {device && (
        <Flex alignItems="center" className={styles.device}>
          <Volume1 /> Listening on {device.name}
        </Flex>
      )}
    </Flex>
  );
};

export default Playbar;
