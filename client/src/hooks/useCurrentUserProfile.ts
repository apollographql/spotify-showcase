import { TypedDocumentNode, gql, useFragment } from '@apollo/client';
import { CurrentUserProfileFragment } from '../types/api';

const CURRENT_USER_FRAGMENT: TypedDocumentNode<CurrentUserProfileFragment> = gql`
  fragment CurrentUserProfileFragment on CurrentUserProfile {
    id
  }
`;

const useCurrentUserProfile = () => {
  const { data, complete } = useFragment({
    fragment: CURRENT_USER_FRAGMENT,
    from: { __typename: 'CurrentUserProfile' },
  });

  if (!complete) {
    throw new Error('Must be logged in');
  }

  return data;
};

export default useCurrentUserProfile;
