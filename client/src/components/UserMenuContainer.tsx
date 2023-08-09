import { ReactNode } from 'react';

interface UserMenuContainerProps {
  children: ReactNode;
}

const UserMenuContainer = ({ children }: UserMenuContainerProps) => {
  return (
    <header className="flex items-center justify-end text-primary bg-transparent pt-[var(--main-content--padding)] px-[var(--main-content--padding)] absolute top-0 w-full pointer-events-none flex-shrink-0 z-10">
      <div className="flex gap-4 items-center pointer-events-auto">
        {children}
      </div>
    </header>
  );
};

export default UserMenuContainer;
