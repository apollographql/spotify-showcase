import { ReactNode } from 'react';
import styles from './Layout.module.scss';

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return <header className={styles.header}>{children}</header>;
};

export default Header;
