import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Code2 } from 'lucide-react';
import Button from '../Button';
import CurrentUserMenu from '../CurrentUserMenu';
import ContextualGuidanceDialog from '../ContextualGuidanceDialog';
import useNavigationStack from '../../hooks/useNavigationStack';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import Flex from '../Flex';
import styles from './Header.module.scss';
import * as Welcome from '../../routes/index.welcome.mdx';
import * as SuspenseContent from '../../routes/root.suspense.mdx';

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
      <Flex alignItems="center" gap="1rem" className={styles.clickable}>
        {/* TODO: Renable when this feature is more built out <ContextualGuidanceDialog documents={[Welcome, SuspenseContent]}>
          <Button
            variant="secondary"
            className="h-9 w-9 justify-center rounded-full !p-px opacity-80 hover:opacity-100"
          >
            <Code2 size="1.25rem" />
          </Button>
        </ContextualGuidanceDialog>*/}
        {isLoggedIn ? (
          <CurrentUserMenu />
        ) : (
          <Button as="a" size="sm" variant="primary" href="/login">
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
