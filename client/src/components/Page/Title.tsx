import { CSSProperties, ReactNode, forwardRef } from 'react';
import styles from './Page.module.scss';

interface TitleProps {
  children?: ReactNode;
  style?: CSSProperties;
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ children, style }, ref) => {
    return (
      <h1 ref={ref} className={styles.page__title} style={style}>
        {children}
      </h1>
    );
  }
);

export default Title;
