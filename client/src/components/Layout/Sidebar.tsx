import { ReactNode } from 'react';
import styles from './Layout.module.scss';

interface SidebarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  return <aside className={styles.sidebar}>{children}</aside>;
};

export default Sidebar;
