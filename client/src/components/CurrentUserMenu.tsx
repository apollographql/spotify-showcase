import { TypedDocumentNode, gql, useSuspenseQuery } from '@apollo/client';
import { CurrentUserQuery, CurrentUserQueryVariables } from '../types/api';
import DropdownMenu from './DropdownMenu';
import Avatar from './Avatar';
import Skeleton from './Skeleton';

const CURRENT_USER_QUERY: TypedDocumentNode<
  CurrentUserQuery,
  CurrentUserQueryVariables
> = gql`
  query CurrentUserQuery {
    me {
      user {
        id
        displayName
        ...Avatar_user
      }
    }
  }
`;

const CurrentUserMenu = () => {
  const { data } = useSuspenseQuery(CURRENT_USER_QUERY);

  if (!data.me) {
    throw new Error('You must be logged in');
  }

  const { user } = data.me;

  const exploreSchemaUrl =
    process.env.NODE_ENV == 'production'
      ? 'https://studio.apollographql.com/public/spotify-ev3of9/variant/prod/home'
      : import.meta.env.VITE_SERVER_HOST;

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger
        className="hover:bg-surface aria-expanded:bg-surface !bg-black-pure py-[0.125rem] pl-[0.125rem] pr-2 !text-sm normal-case tracking-normal"
        variant="ghost"
        size="sm"
      >
        <Avatar size="2rem" user={user} />
        {user.displayName}
      </DropdownMenu.Trigger>
      <DropdownMenu.Menu align="end">
        <DropdownMenu.Item to="/settings">Settings</DropdownMenu.Item>
        <DropdownMenu.Item to={exploreSchemaUrl}>
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

export const LoadingState = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton.Avatar size="2rem" />
      <Skeleton.Text width="10ch" />
    </div>
  );
};

export default CurrentUserMenu;
