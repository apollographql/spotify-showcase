import CoreCurrentUserMenu, { LoadingState } from '../CurrentUserMenu';
import cx from 'classnames';
import { withHighlight } from '../LoadingStateHighlighter';

export const CurrentUserMenu = () => {
  return (
    <header className="flex items-center justify-end text-primary bg-transparent pt-[var(--main-content--padding)] px-[var(--main-content--padding)] absolute top-0 w-full pointer-events-none flex-shrink-0 z-10">
      <div className="flex gap-4 items-center pointer-events-auto">
        <CoreCurrentUserMenu />
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
