import { ReactNode } from 'react';

interface SidebarTitleProps {
  children: ReactNode;
}

const SidebarTitle = ({ children }: SidebarTitleProps) => {
  return (
    <header className="px-4 py-2">
      <h2 className="text-muted flex gap-2 items-center py-2 text-base">
        {children}
      </h2>
    </header>
  );
};

export default SidebarTitle;
