import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useNavigationStack from '../../hooks/useNavigationStack';
import Flex from '../Flex';
import styles from './Layout.module.scss';

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
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
      {children}
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
