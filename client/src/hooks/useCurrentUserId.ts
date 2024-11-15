import { TypedDocumentNode, gql, useFragment } from '@apollo/client';
import { useCurrentUserIdFragment } from '../types/api';

const CURRENT_USER_FRAGMENT: TypedDocumentNode<useCurrentUserIdFragment> = gql`
  fragment useCurrentUserIdFragment on CurrentUser {
    profile {
      id
    }
  }
`;

const useCurrentUserId = () => {
  const { data } = useFragment({
    fragment: CURRENT_USER_FRAGMENT,
    from: { __typename: 'CurrentUser' },
  });

  return data.profile?.id;
};

export default useCurrentUserId;
