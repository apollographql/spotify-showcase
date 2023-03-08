import {
  gql,
  useSuspenseQuery_experimental as useSuspenseQuery,
} from '@apollo/client';
import { CurrentUserQuery, CurrentUserQueryVariables } from '../types/api';
import DropdownMenu from './DropdownMenu';
import Avatar from './Avatar';

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

  const { user } = data.me;

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger
        className="hover:bg-surface aria-expanded:bg-surface bg-black-pure py-[0.125rem] pl-[0.125rem] pr-2 text-sm normal-case tracking-normal"
        variant="ghost"
        size="sm"
      >
        <Avatar size="2rem" user={user} />
        {user.displayName}
      </DropdownMenu.Trigger>
      <DropdownMenu.Menu align="end">
        <DropdownMenu.Item to="/settings">Settings</DropdownMenu.Item>
        <DropdownMenu.Item to={`${import.meta.env.VITE_SERVER_HOST}/graphql`}>
          Explore the schema
        </DropdownMenu.Item>
        <DropdownMenu.Item to="https://github.com/apollographql/spotify-showcase">
          View the source code
        </DropdownMenu.Item>
        <DropdownMenu.Item to="https://o0urpu09l9p.typeform.com/to/SrKsN0nv">
          Give us feedback
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item to="/logout">Logout</DropdownMenu.Item>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

export default CurrentUserMenu;
