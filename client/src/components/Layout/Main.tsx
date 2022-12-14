import { ReactNode } from 'react';
import Button from '../Button';
import Header from './Header';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import styles from './Main.module.scss';
import { LOGIN_URL } from '../../constants';

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <main className={styles.main}>
      <Header>
        {!isLoggedIn && (
          <Button as="a" size="sm" variant="primary" href={LOGIN_URL}>
            Log in
          </Button>
        )}
      </Header>
      <article className={styles.mainContent}>{children}</article>
    </main>
  );
};

export default Main;
