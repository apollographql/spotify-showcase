import { ReactNode } from 'react';
import styles from './Main.module.scss';

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <main className={styles.main}>
      <article className={styles.mainContent}>{children}</article>
    </main>
  );
};

export default Main;
