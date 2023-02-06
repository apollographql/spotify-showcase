import { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';
import cx from 'classnames';
import styles from './Layout.module.scss';

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
      className={cx(styles.layout, { [styles.isLoggedIn]: isLoggedIn })}
    >
      <div
        className={cx(styles.layoutBackdrop, styles.withGradient)}
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
