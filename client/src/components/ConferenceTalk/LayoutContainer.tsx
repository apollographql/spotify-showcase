import { ReactNode } from 'react';
import Layout from '../Layout';
import { UserMenu } from './UserMenu';
import { Sidebar } from './Sidebar';
import { Playbar } from './Playbar';
import { Route } from './Route';

interface LayoutContainerProps {
  children: ReactNode;
}

export const LayoutContainer = ({ children }: LayoutContainerProps) => {
  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className={
        'grid gap-2 p-2 h-screen grid-cols-[375px_1fr] [grid-template-areas:"sidebar_main-view""playbar_playbar"] [grid-template-rows:1fr_auto]'
      }
    >
      {children}
    </div>
  );
};

LayoutContainer.LoadingState = () => {
  return (
    <Layout type="player">
      <Sidebar.LoadingState />
      <Layout.Main>
        <UserMenu.LoadingState />
        <Route.LoadingState />
      </Layout.Main>
      <Playbar.LoadingState />
    </Layout>
  );
};
