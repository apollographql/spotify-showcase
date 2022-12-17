import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../Button';
import CurrentUserMenu from '../CurrentUserMenu';
import DropdownMenu from '../DropdownMenu';
import useNavigationStack from '../../hooks/useNavigationStack';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import Flex from '../Flex';
import styles from './Header.module.scss';
import { LOGIN_URL } from '../../constants';

const Header = () => {
  const isLoggedIn = useIsLoggedIn();
  const { back, forward, canGoBack, canGoForward } = useNavigationStack();

  return (
    <header className={styles.header}>
      <Flex gap="1rem">
        <NavButton aria-label="Go back" disabled={!canGoBack} onClick={back}>
          <ChevronLeft size={20} />
        </NavButton>
        <NavButton
          aria-label="Go forward"
          disabled={!canGoForward}
          onClick={forward}
        >
          <ChevronRight size={20} />
        </NavButton>
      </Flex>
      <Flex gap="1rem" className={styles.clickable}>
        {isLoggedIn ? (
          <CurrentUserMenu />
        ) : (
          <Button as="a" size="sm" variant="primary" href={LOGIN_URL}>
            Log in
          </Button>
        )}
      </Flex>
    </header>
  );
};

type NativeButtonProps = Pick<
  ComponentPropsWithoutRef<'button'>,
  'disabled' | 'onClick' | 'aria-label'
>;

type NavButtonProps = NativeButtonProps & {
  children: ReactNode;
};

const NavButton = ({ children, ...props }: NavButtonProps) => {
  return (
    <button {...props} className={styles.headerNavButton}>
      {children}
    </button>
  );
};

export default Header;
