import { ReactNode } from 'react';
import Flex from '../Flex';

interface HeaderContainerProps {
  children?: ReactNode;
}

const HeaderContainer = ({ children }: HeaderContainerProps) => {
  return (
    <Flex
      className="p-[var(--main-content--padding)]"
      gap="2rem"
      alignItems="end"
    >
      {children}
    </Flex>
  );
};

export default HeaderContainer;
