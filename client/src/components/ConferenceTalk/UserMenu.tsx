import CurrentUserMenu, { LoadingState } from '../CurrentUserMenu';
import { TypedDocumentNode, gql, useSuspenseQuery } from '@apollo/client';
import { UserMenuQuery, UserMenuQueryVariables } from '../../types/api';
import UserMenuContainer from '../UserMenuContainer';

const USER_MENU_QUERY: TypedDocumentNode<
  UserMenuQuery,
  UserMenuQueryVariables
> = gql`
  query UserMenuQuery {
    me {
      profile @synthetics(timeout: 1000) {
        ...CurrentUserMenu_profile
      }
    }
  }
`;

export const UserMenu = () => {
  const { data } = useSuspenseQuery(USER_MENU_QUERY);

  const { me } = data;

  if (!me) {
    throw new Error('Oops, user expected');
  }

  return (
    <UserMenuContainer>
      <CurrentUserMenu profile={me.profile} />
    </UserMenuContainer>
  );
};

UserMenu.LoadingState = LoadingState;
