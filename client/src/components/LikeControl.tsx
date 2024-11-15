import {
  FragmentType,
  TypedDocumentNode,
  gql,
  useFragment,
  useSuspenseQuery,
} from '@apollo/client';
import {
  LikeControlQuery,
  LikeControlQueryVariables,
  LikeControl_playbackItem as PlaybackItem,
} from '../types/api';
import LikeButton, { LikeButtonProps } from './LikeButton';
import useSaveTracksMutation from '../mutations/useSaveTracksMutation';
import useRemoveTracksMutation from '../mutations/useRemoveSavedTracksMutation';
import { useDeferredValue } from 'react';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface LikeControlProps {
  className?: LikeButtonProps['className'];
  playbackItem: FragmentType<PlaybackItem> | null;
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

const LikeControlFragment: TypedDocumentNode<PlaybackItem> = gql`
  fragment LikeControl_playbackItem on PlaybackItem {
    __typename
    id
  }
`;

fragmentRegistry.register(LikeControlFragment);

const LikeControl = ({ className, playbackItem, size }: LikeControlProps) => {
  const { data: playbackItemData, complete } = useFragment({
    fragment: LikeControlFragment,
    from: playbackItem,
  });

  const deferredId = useDeferredValue(playbackItemData?.id);

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
        if (!complete) {
          return;
        }

        const ids = [playbackItemData.id];

        isLiked ? removeTracks({ ids }) : saveTracks({ ids });
      }}
    />
  );
};

export default LikeControl;
