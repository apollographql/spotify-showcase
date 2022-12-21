import { ReactNode } from 'react';

import HeaderContainer from './HeaderContainer';

interface HeaderProps {
  children?: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return <HeaderContainer>{children}</HeaderContainer>;
};

export default Header;
