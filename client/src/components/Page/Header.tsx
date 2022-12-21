import { ReactNode } from 'react';
import Flex from '../Flex';
import styles from './Page.module.scss';

interface HeaderProps {
  children?: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <Flex className={styles.page__header} gap="2rem" alignItems="end">
      {children}
    </Flex>
  );
};

export default Header;
