import { ReactNode } from 'react';
import Flex from '../Flex';
import styles from './Page.module.scss';

interface ContentProps {
  children?: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return (
    <Flex
      className={styles.page__content}
      direction="column"
      flex={1}
      gap="1rem"
    >
      {children}
    </Flex>
  );
};

export default Content;
