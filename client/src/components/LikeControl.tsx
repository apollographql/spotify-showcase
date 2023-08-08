import { gql, useQuery } from '@apollo/client';
import {
  LikeControlQuery,
  LikeControlQueryVariables,
  LikeControl_playbackItem as PlaybackItem,
} from '../types/api';
import LikeButton, { LikeButtonProps } from './LikeButton';
import useSaveTracksMutation from '../mutations/useSaveTracksMutation';
import useRemoveTracksMutation from '../mutations/useRemoveSavedTracksMutation';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

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

fragmentRegistry.register(gql`
  fragment LikeControl_playbackItem on PlaybackItem {
    __typename
    id
  }
`);

const LikeControl = ({ className, playbackItem, size }: LikeControlProps) => {
  const { data } = useQuery<LikeControlQuery, LikeControlQueryVariables>(
    LIKE_CONTROL_QUERY,
    {
      errorPolicy: 'ignore',
      variables: {
        ids: [playbackItem?.id].filter(Boolean),
      },
    }
  );

  const [saveTracks] = useSaveTracksMutation();
  const [removeTracks] = useRemoveTracksMutation();

  const episodesContains = data?.me?.episodesContains ?? [];
  const tracksContains = data?.me?.tracksContains ?? [];

  const isLiked = Boolean(
    episodesContains.some(Boolean) || tracksContains.some(Boolean)
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

export default LikeControl;
