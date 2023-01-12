import { ReactNode } from 'react';
import Flex from '../Flex';

interface ActionsBarProps {
  children: ReactNode;
}

const ActionsBar = ({ children }: ActionsBarProps) => {
  return (
    <Flex gap="2rem" alignItems="center">
      {children}
    </Flex>
  );
};

export default ActionsBar;
