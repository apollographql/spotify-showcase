import { ReactNode } from 'react';
import Flex from '../Flex';

interface HeaderDetailsProps {
  children?: ReactNode;
}

const HeaderDetails = ({ children }: HeaderDetailsProps) => {
  return (
    <Flex direction="column" gap="0.5rem" flex={1}>
      {children}
    </Flex>
  );
};

export default HeaderDetails;
