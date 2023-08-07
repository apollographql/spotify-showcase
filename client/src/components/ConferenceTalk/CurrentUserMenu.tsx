import CoreCurrentUserMenu, { LoadingState } from '../CurrentUserMenu';

export const CurrentUserMenu = () => {
  return (
    <header className="flex items-center justify-end text-primary bg-transparent pt-[var(--main-content--padding)] px-[var(--main-content--padding)] absolute top-0 w-full pointer-events-none flex-shrink-0 z-10">
      <div className="flex gap-4 items-center pointer-events-auto">
        <CoreCurrentUserMenu />
      </div>
    </header>
  );
};

CurrentUserMenu.LoadingState = () => {
  return (
    <header className="flex items-center justify-end text-primary bg-transparent pt-[var(--main-content--padding)] px-[var(--main-content--padding)] absolute top-0 w-full pointer-events-none flex-shrink-0 z-10">
      <LoadingState />
    </header>
  );
};
