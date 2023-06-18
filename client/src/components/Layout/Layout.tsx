import { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';
import cx from 'classnames';

import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar';
import useBackgroundColor from '../../hooks/useBackgroundColor';

interface LayoutProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'className'> {
  children: ReactNode;
  type: 'fullscreen' | 'player' | 'loggedOut';
}

interface BackdropStyle extends CSSProperties {
  '--backdrop-color': string;
}

const Layout = ({ children, type, ...props }: LayoutProps) => {
  const [backgroundColor] = useBackgroundColor();

  return (
    <div
      {...props}
      className={cx('grid h-screen', {
        'grid-cols-[375px_1fr]': type === 'player' || type === 'loggedOut',
        'grid-cols-[1fr]': type === 'fullscreen',
        '[grid-template-areas:"sidebar_main-view""playbar_playbar"] [grid-template-rows:1fr_auto]':
          type === 'player',
        '[grid-template-areas:"sidebar_main-view"]': type === 'loggedOut',
        '[grid-template-areas:"main-view"]': type === 'fullscreen',
      })}
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
