import cx from 'classnames';
import { TypedDocumentNode, gql, useSuspenseQuery } from '@apollo/client';
import { fragmentRegistry } from '../apollo/fragmentRegistry';
import usePlaybackState from '../hooks/usePlaybackState';
import CoverPhoto from './CoverPhoto';
import TrackPlaybackDetails from './TrackPlaybackDetails';
import EpisodePlaybackDetails from './EpisodePlaybackDetails';
import LikeControl from './LikeControl';
import Flex from './Flex';

// TODO: codegen
const NOW_PLAYING_STATE_FRAGMENT: TypedDocumentNode<any, never> = gql`
  fragment Playbar_playbackState on PlaybackState {
    isPlaying
    repeatState
    shuffleState
    actions {
      disallows
    }
    context {
      ...TrackPlaybackDetails_context
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
        ...TrackPlaybackDetails_track
      }
      ... on Episode {
        show {
          id
          images {
            url
          }
        }
        ...EpisodePlaybackDetails_episode
      }

      ...LikeControl_playbackItem
    }

    ...PlaybackItemProgressBar_playbackState
  }
`;

fragmentRegistry.register(NOW_PLAYING_STATE_FRAGMENT);

const NowPlayingSidebar = () => {
  const playbackState = usePlaybackState({
    fragment: NOW_PLAYING_STATE_FRAGMENT,
  });

  const playbackItem = playbackState?.item ?? null;

  const coverPhoto =
    playbackItem?.__typename === 'Track'
      ? playbackItem.album.images[0]
      : playbackItem?.show.images[0];

  return (
    <div>
      <CoverPhoto image={coverPhoto} />
      <Flex className="mt-2">
        {playbackItem?.__typename === 'Track' ? (
          <TrackPlaybackDetails
            context={playbackState?.context ?? null}
            track={playbackItem}
          />
        ) : playbackItem?.__typename === 'Episode' ? (
          <EpisodePlaybackDetails episode={playbackItem} />
        ) : null}
        {playbackState && (
          <LikeControl
            playbackItem={playbackItem}
            size="1.25rem"
            className="ml-auto"
          />
        )}
      </Flex>
    </div>
  );
};

export default NowPlayingSidebar;
