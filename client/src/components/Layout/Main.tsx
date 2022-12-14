import { ReactNode } from 'react';
import Header from './Header';
import styles from './Main.module.scss';

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <main className={styles.main}>
      <Header />
      <article className={styles.mainContent}>{children}</article>
    </main>
  );
};

export default Main;
