import { CSSProperties, ReactNode } from 'react';
import Flex from '../Flex';
import styles from './Page.module.scss';

interface ContentProps {
  children?: ReactNode;
  gap?: CSSProperties['gap'];
}

const Content = ({ children, gap = '1rem' }: ContentProps) => {
  return (
    <Flex
      className={styles.page__content}
      direction="column"
      flex={1}
      gap={gap}
    >
      {children}
    </Flex>
  );
};

export default Content;
