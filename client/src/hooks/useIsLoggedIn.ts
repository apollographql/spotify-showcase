import {
  gql,
  TypedDocumentNode,
  useFragment_experimental as useFragment,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import {
  CurrentUserId,
  CurrentUserIdFragment,
  CurrentUserIdVariables,
} from '../types/api';

export const IS_LOGGED_IN_QUERY: TypedDocumentNode<
  CurrentUserId,
  CurrentUserIdVariables
> = gql`
  query CurrentUserId {
    me {
      id
    }
  }
`;

export const IS_LOGGED_IN_FRAGMENT: TypedDocumentNode<
  CurrentUserIdFragment,
  CurrentUserIdVariables
> = gql`
  fragment CurrentUserIdFragment on CurrentUser {
    id
  }
`;

const useIsLoggedIn = () => {
  useSuspenseQuery(IS_LOGGED_IN_QUERY, {
    suspensePolicy: 'initial',
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  });
  const result = useFragment({
    from: { __typename: 'CurrentUser' },
    fragment: IS_LOGGED_IN_FRAGMENT,
  });
  return !!result.data?.id;
};

export default useIsLoggedIn;
