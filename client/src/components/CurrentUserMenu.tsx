import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { CurrentUserQuery, CurrentUserQueryVariables } from '../types/api';
import DropdownMenu from './DropdownMenu';
import Avatar from './Avatar';
import styles from './CurrentUserMenu.module.scss';

const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    me {
      user {
        id
        displayName
        ...Avatar_user
      }
    }
  }

  ${Avatar.fragments.user}
`;

const CurrentUserMenu = () => {
  const { data } = useSuspenseQuery<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >(CURRENT_USER_QUERY);

  if (!data.me) {
    throw new Error('You must be logged in');
  }

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger
        className={styles.dropdownTrigger}
        variant="ghost"
        size="sm"
      >
        <Avatar size="2rem" user={data.me.user} />
        {data.me?.user.displayName}
      </DropdownMenu.Trigger>
      <DropdownMenu.Menu align="end">
        <DropdownMenu.Item to="/logout">Logout</DropdownMenu.Item>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

export default CurrentUserMenu;
