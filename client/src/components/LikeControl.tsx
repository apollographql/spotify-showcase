import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import {
  LikeControlQuery,
  LikeControlQueryVariables,
  LikeControl_playbackItem as PlaybackItem,
} from '../types/api';
import LikeButton, { LikeButtonProps } from './LikeButton';

interface LikeControlProps {
  className?: LikeButtonProps['className'];
  playbackItem: PlaybackItem | null;
  size?: LikeButtonProps['size'];
}

const LIKE_CONTROL_QUERY = gql`
  query LikeControlQuery($trackIds: [ID!], $episodeIds: [ID!]) {
    me {
      contains(episodes: $episodeIds, tracks: $trackIds) {
        tracks
        episodes
      }
    }
  }
`;

const LikeControl = ({ className, playbackItem, size }: LikeControlProps) => {
  const { data } = useSuspenseQuery<
    LikeControlQuery,
    LikeControlQueryVariables
  >(LIKE_CONTROL_QUERY, {
    suspensePolicy: 'initial',
    variables: {
      episodeIds:
        playbackItem?.__typename === 'Episode' ? [playbackItem.id] : null,
      trackIds: playbackItem?.__typename === 'Track' ? [playbackItem.id] : null,
    },
  });

  if (!data.me) {
    throw new Error('You must be logged in');
  }

  const { me } = data;

  const isLiked = Boolean(
    me.contains?.tracks?.some((isInLibrary) => isInLibrary) ||
      me.contains?.episodes?.some((isInLibrary) => isInLibrary)
  );

  return (
    <LikeButton
      className={className}
      size={size}
      liked={isLiked}
      onClick={() => {
        // do nothing
      }}
    />
  );
};

LikeControl.fragments = {
  playbackItem: gql`
    fragment LikeControl_playbackItem on PlaybackItem {
      __typename
      id
    }
  `,
};

export default LikeControl;
