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
import useSaveTracksMutation from '../mutations/useSaveTracksMutation';
import useRemoveTracksMutation from '../mutations/useRemoveSavedTracksMutation';

interface LikeControlProps {
  className?: LikeButtonProps['className'];
  playbackItem: PlaybackItem | null;
  size?: LikeButtonProps['size'];
}

const LIKE_CONTROL_QUERY = gql`
  query LikeControlQuery($ids: [ID!]!) {
    me {
      episodesContains(ids: $ids)
      tracksContains(ids: $ids)
    }
  }
`;

const LikeControl = ({ className, playbackItem, size }: LikeControlProps) => {
  const { data } = useSuspenseQuery<
    LikeControlQuery,
    LikeControlQueryVariables
  >(LIKE_CONTROL_QUERY, {
    errorPolicy: 'ignore',
    suspensePolicy: 'initial',
    variables: {
      ids: [playbackItem?.id].filter(Boolean),
    },
  });

  const [saveTracks] = useSaveTracksMutation();
  const [removeTracks] = useRemoveTracksMutation();

  if (!data.me) {
    throw new Response('You must be logged in', { status: 401 });
  }

  const {
    me: { episodesContains, tracksContains },
  } = data;

  const isLiked = Boolean(
    episodesContains?.some(Boolean) || tracksContains?.some(Boolean)
  );

  return (
    <LikeButton
      className={className}
      size={size}
      liked={isLiked}
      onClick={() => {
        if (!playbackItem) {
          return;
        }

        const ids = [playbackItem.id];

        isLiked ? removeTracks({ ids }) : saveTracks({ ids });
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
