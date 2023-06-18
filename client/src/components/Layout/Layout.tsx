import { ComponentPropsWithoutRef, ReactNode } from 'react';
import cx from 'classnames';

import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar';

interface LayoutProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'className'> {
  children: ReactNode;
  type: 'fullscreen' | 'player' | 'loggedOut';
}

const Layout = ({ children, type, ...props }: LayoutProps) => {
  return (
    <div
      {...props}
      className={cx('grid gap-2 p-2 h-screen', {
        'grid-cols-[375px_1fr]': type === 'player' || type === 'loggedOut',
        'grid-cols-[1fr]': type === 'fullscreen',
        '[grid-template-areas:"sidebar_main-view""playbar_playbar"] [grid-template-rows:1fr_auto]':
          type === 'player',
        '[grid-template-areas:"sidebar_main-view"]': type === 'loggedOut',
        '[grid-template-areas:"main-view"]': type === 'fullscreen',
      })}
    >
      {children}
    </div>
  );
};

Layout.Header = Header;
Layout.Main = Main;
Layout.Sidebar = Sidebar;

export default Layout;
