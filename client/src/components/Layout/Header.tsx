import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Code2 } from 'lucide-react';
import Button from '../Button';
import CurrentUserMenu from '../CurrentUserMenu';
import useNavigationStack from '../../hooks/useNavigationStack';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import Flex from '../Flex';

const Header = () => {
  const isLoggedIn = useIsLoggedIn();
  const { back, forward, canGoBack, canGoForward } = useNavigationStack();

  return (
    <header className="flex items-center justify-between text-primary bg-transparent py-4 px-[var(--main-content--padding)] absolute top-0 h-[var(--main-header--height)] w-full pointer-events-none flex-shrink-0 z-10">
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
      <Flex alignItems="center" gap="1rem" className="pointer-events-auto">
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
    <button
      {...props}
      className="[--size:2rem] pointer-events-auto hidden items-center justify-center cursor-pointer w-8 h-8 rounded-full outline-0 border-none bg-white bg-opacity-20 text-primary disabled:opacity-20 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default Header;
