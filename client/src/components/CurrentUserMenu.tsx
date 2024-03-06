import { gql } from '@apollo/client';
import { CurrentUserMenu_profile as Profile } from '../types/api';
import DropdownMenu from './DropdownMenu';
import Avatar from './Avatar';
import Skeleton from './Skeleton';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

interface CurrentUserMenuProps {
  profile: Profile;
}

fragmentRegistry.register(gql`
  fragment CurrentUserMenu_profile on CurrentUserProfile {
    id
    displayName
    ...Avatar_profile
  }
`);

const CurrentUserMenu = ({ profile }: CurrentUserMenuProps) => {
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
        <Avatar size="2rem" profile={profile} />
        {profile.displayName}
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

CurrentUserMenu.LoadingState = LoadingState;

export default CurrentUserMenu;
