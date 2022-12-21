import { ReactNode } from 'react';
import Flex from '../Flex';
import styles from './Page.module.scss';

interface HeaderContainerProps {
  children?: ReactNode;
}

const HeaderContainer = ({ children }: HeaderContainerProps) => {
  return (
    <Flex className={styles.page__header} gap="2rem" alignItems="end">
      {children}
    </Flex>
  );
};

export default HeaderContainer;
