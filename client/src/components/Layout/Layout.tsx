import { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';
import cx from 'classnames';

import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar';
import useBackgroundColor from '../../hooks/useBackgroundColor';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';

interface LayoutProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'className'> {
  children: ReactNode;
}

interface BackdropStyle extends CSSProperties {
  '--backdrop-color': string;
}

const Layout = ({ children, ...props }: LayoutProps) => {
  const isLoggedIn = useIsLoggedIn();
  const [backgroundColor] = useBackgroundColor();

  return (
    <div
      {...props}
      className={cx(
        'grid grid-cols-[auto_1fr] h-full',
        isLoggedIn
          ? '[grid-template-areas:"sidebar_main-view""playbar_playbar"] [grid-template-rows:1fr_auto]'
          : '[grid-template-areas:"sidebar_main-view"]'
      )}
    >
      <div
        className="[background:var(--backdrop-color)] fixed transition duration-200 ease-out inset-0 z-[-1] after:absolute after:inset-0 after:bg-[linear-gradient(rgba(255,255,255,0),#04060b)] after:transition-opacity after:duration-300 after:opacity-100"
        style={{ '--backdrop-color': backgroundColor } as BackdropStyle}
      />
      {children}
    </div>
  );
};

Layout.Header = Header;
Layout.Main = Main;
Layout.Sidebar = Sidebar;

export default Layout;
