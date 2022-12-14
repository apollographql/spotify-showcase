import { ComponentPropsWithoutRef, ReactNode, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Flex from '../Flex';
import styles from './Layout.module.scss';

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const [historyStack] = useState([]);
  const [backStack] = useState([]);
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <Flex gap="1rem">
        <NavButton
          disabled={historyStack.length === 0}
          aria-label="Go back"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ChevronLeft size={20} />
        </NavButton>
        <NavButton
          aria-label="Go forward"
          disabled={backStack.length === 0}
          onClick={() => navigate(1)}
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
