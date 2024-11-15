import { gql, useSuspenseQuery } from '@apollo/client';
import { LikeControlQuery, LikeControlQueryVariables } from '../types/api';
import LikeButton, { LikeButtonProps } from './LikeButton';
import useSaveTracksMutation from '../mutations/useSaveTracksMutation';
import useRemoveTracksMutation from '../mutations/useRemoveSavedTracksMutation';
import { useDeferredValue } from 'react';

interface LikeControlProps {
  className?: LikeButtonProps['className'];
  playbackItemId: string | undefined;
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

const LikeControl = ({ className, playbackItemId, size }: LikeControlProps) => {
  const deferredId = useDeferredValue(playbackItemId);

  const { data } = useSuspenseQuery<
    LikeControlQuery,
    LikeControlQueryVariables
  >(LIKE_CONTROL_QUERY, {
    errorPolicy: 'ignore',
    variables: {
      ids: [deferredId].filter(Boolean),
    },
  });

  const [saveTracks] = useSaveTracksMutation();
  const [removeTracks] = useRemoveTracksMutation();

  if (!data?.me) {
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
        if (!playbackItemId) {
          return;
        }

        const ids = [playbackItemId];

        isLiked ? removeTracks({ ids }) : saveTracks({ ids });
      }}
    />
  );
};

export default LikeControl;
