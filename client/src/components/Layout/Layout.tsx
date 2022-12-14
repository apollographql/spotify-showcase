import { CSSProperties, ReactNode } from 'react';
import cx from 'classnames';
import styles from './Layout.module.scss';

import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar';
import useBackgroundColor from '../../hooks/useBackgroundColor';

interface LayoutProps {
  children: ReactNode;
}

interface BackdropStyle extends CSSProperties {
  '--backdrop-color': string;
}

const Layout = ({ children }: LayoutProps) => {
  const [backgroundColor] = useBackgroundColor();

  return (
    <div className={styles.layout}>
      <div
        className={cx(styles.backdrop, styles.withGradient)}
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
