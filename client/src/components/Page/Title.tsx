import { ReactNode } from 'react';
import styles from './Page.module.scss';

interface TitleProps {
  children?: ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return <h1 className={styles.page__title}>{children}</h1>;
};

export default Title;
