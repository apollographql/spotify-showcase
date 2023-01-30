import { forwardRef, ReactNode } from 'react';
import styles from './Main.module.scss';

interface MainProps {
  children: ReactNode;
}

const Main = forwardRef<HTMLElement, MainProps>(({ children }, ref) => {
  return (
    <main className={styles.main} ref={ref}>
      <article className={styles.mainContent}>{children}</article>
    </main>
  );
});

export default Main;
