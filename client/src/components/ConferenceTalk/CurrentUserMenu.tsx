import CoreCurrentUserMenu, { LoadingState } from '../CurrentUserMenu';
import cx from 'classnames';
import { withHighlight } from '../LoadingStateHighlighter';
import { TypedDocumentNode, gql, useSuspenseQuery } from '@apollo/client';
import {
  CurrentUserMenuQuery,
  CurrentUserMenuQueryVariables,
} from '../../types/api';

const CURRENT_USER_QUERY: TypedDocumentNode<
  CurrentUserMenuQuery,
  CurrentUserMenuQueryVariables
> = gql`
  query CurrentUserMenuQuery {
    me {
      profile {
        id
        displayName
        ...Avatar_profile
      }
    }
  }
`;

export const CurrentUserMenu = () => {
  const { data } = useSuspenseQuery(CURRENT_USER_QUERY);

  const { me } = data;

  if (!me) {
    throw new Error('You must be logged in');
  }

  return (
    <header className="flex items-center justify-end text-primary bg-transparent pt-[var(--main-content--padding)] px-[var(--main-content--padding)] absolute top-0 w-full pointer-events-none flex-shrink-0 z-10">
      <div className="flex gap-4 items-center pointer-events-auto">
        <CoreCurrentUserMenu profile={me.profile} />
      </div>
    </header>
  );
};

CurrentUserMenu.LoadingState = withHighlight(
  ({ isActiveSuspenseBoundary }) => {
    return (
      <header
        className={cx(
          'flex items-center text-primary bg-transparent pointer-events-none flex-shrink-0 z-10',
          {
            ['absolute top-[var(--main-content--padding)] right-[var(--main-content--padding)]']:
              !isActiveSuspenseBoundary,
          }
        )}
      >
        <LoadingState />
      </header>
    );
  },
  {
    className:
      '!absolute top-[var(--main-content--padding)] right-[var(--main-content--padding)] z-10',
    shade: '#00F900',
  }
);
